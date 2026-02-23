// Filters module: manages current filter state and provides helpers

let currentFilter = "all";
let cachedTasks = [];
let priorityFilter = "all"; // all, high, medium, low
let tagFilter = ""; // free-text, matches tag labels
let sortMode = "default"; // default, priority

// Initialize filter buttons and optional extra filter controls
export function initFilters(filterButtons, onFilterChange, extraControls = {}) {
    if (!filterButtons || typeof filterButtons.forEach !== "function") return;

    filterButtons.forEach((btn) => {
        // initialize aria-pressed based on current active state
        const isActive = btn.classList.contains("active");
        btn.setAttribute("aria-pressed", isActive ? "true" : "false");

        btn.addEventListener("click", () => {
            const filter = btn.getAttribute("data-filter");
            if (!filter) return;

            currentFilter = filter;

            // update active state
            filterButtons.forEach((b) => {
                const isCurrent = b === btn;
                b.classList.toggle("active", isCurrent);
                b.setAttribute("aria-pressed", isCurrent ? "true" : "false");
            });

            if (typeof onFilterChange === "function") {
                onFilterChange();
            }
        });
    });

    const { prioritySelect, tagInput, sortSelect } = extraControls || {};

    if (prioritySelect) {
        prioritySelect.addEventListener("change", () => {
            const value = (prioritySelect.value || "all").toLowerCase();
            priorityFilter = value;
            if (typeof onFilterChange === "function") {
                onFilterChange();
            }
        });
    }

    if (tagInput) {
        tagInput.addEventListener("input", () => {
            tagFilter = (tagInput.value || "").trim().toLowerCase();
            if (typeof onFilterChange === "function") {
                onFilterChange();
            }
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener("change", () => {
            const value = sortSelect.value || "default";
            sortMode = value;
            if (typeof onFilterChange === "function") {
                onFilterChange();
            }
        });
    }
}

// Update cached tasks list
export function setTasks(tasks) {
    cachedTasks = Array.isArray(tasks) ? tasks : [];
}

// Get all cached tasks in display order (by order field)
export function getOrderedCachedTasks() {
    if (!Array.isArray(cachedTasks)) return [];
    return [...cachedTasks].sort(
        (a, b) => (a.order ?? 999999) - (b.order ?? 999999),
    );
}

// Get tasks filtered by current filter / priority / tag, and sorted if needed
export function getFilteredTasks() {
    if (!Array.isArray(cachedTasks)) return [];

    let tasks = getOrderedCachedTasks();

    // status filter
    if (currentFilter !== "all") {
        tasks = tasks.filter(
            (task) => task && task.status === currentFilter,
        );
    }

    // priority filter
    if (priorityFilter !== "all") {
        tasks = tasks.filter((task) => {
            if (!task || !task.priority) return false;
            const value =
                typeof task.priority === "string"
                    ? task.priority.toLowerCase()
                    : String(task.priority).toLowerCase();
            return value === priorityFilter;
        });
    }

    // tag filter (free text, matches any tag containing the text)
    if (tagFilter) {
        tasks = tasks.filter((task) => {
            if (!task || !Array.isArray(task.tags) || task.tags.length === 0)
                return false;
            return task.tags.some((tag) => {
                if (typeof tag !== "string") return false;
                return tag.toLowerCase().includes(tagFilter);
            });
        });
    }

    // sorting
    if (sortMode === "priority") {
        const priorityRank = {
            high: 0,
            medium: 1,
            low: 2,
        };

        tasks.sort((a, b) => {
            const aVal = a && typeof a.priority === "string"
                ? a.priority.toLowerCase()
                : "";
            const bVal = b && typeof b.priority === "string"
                ? b.priority.toLowerCase()
                : "";

            const aRank = priorityRank.hasOwnProperty(aVal)
                ? priorityRank[aVal]
                : 3;
            const bRank = priorityRank.hasOwnProperty(bVal)
                ? priorityRank[bVal]
                : 3;

            if (aRank !== bRank) return aRank - bRank;

            // tie-breaker: preserve manual order
            return (a.order ?? 999999) - (b.order ?? 999999);
        });
    }

    return tasks;
}


// Get current active filter key
export function getCurrentFilter() {
    return currentFilter;
}

// Get counts for all tasks by status
export function getTaskCounts() {
    if (!Array.isArray(cachedTasks)) {
        return {
            total: 0,
            pending: 0,
            completed: 0,
            overdue: 0,
        };
    }

    let pending = 0;
    let completed = 0;
    let overdue = 0;

    cachedTasks.forEach((task) => {
        if (!task || !task.status) return;

        if (task.status === "pending") pending += 1;
        else if (task.status === "completed") completed += 1;
        else if (task.status === "overdue") overdue += 1;
    });

    return {
        total: cachedTasks.length,
        pending,
        completed,
        overdue,
    };
}

// Get how many tasks were completed this week (Mon–Sun, local time)
export function getCompletedThisWeekCount() {
    if (!Array.isArray(cachedTasks)) return 0;

    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setHours(0, 0, 0, 0);    // midnight of the current day

    // Make Monday the first day of the week
    const day = startOfWeek.getDay(); // 0 = Sun, 1 = Mon, ...
    const diffFromMonday = (day + 6) % 7; // 0 when Monday
    startOfWeek.setDate(startOfWeek.getDate() - diffFromMonday);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 7);

    return cachedTasks.filter((task) => {
        if (!task || task.status !== "completed" || !task.completedAt) return false;
        const completedDate = new Date(task.completedAt);
        return completedDate >= startOfWeek && completedDate < endOfWeek;
    }).length;
}



