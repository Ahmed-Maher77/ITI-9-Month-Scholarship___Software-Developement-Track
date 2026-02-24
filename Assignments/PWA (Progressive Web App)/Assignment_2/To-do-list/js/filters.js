// Filters module: manages current filter state and provides helpers

let currentFilter = "all";
let cachedTasks = [];

// Initialize filter buttons with click handlers
export function initFilters(filterButtons, onFilterChange) {
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
}

// Update cached tasks list
export function setTasks(tasks) {
    cachedTasks = Array.isArray(tasks) ? tasks : [];
}

// Get tasks filtered by current filter
export function getFilteredTasks() {
    if (!Array.isArray(cachedTasks)) return [];

    if (currentFilter === "all") {
        return cachedTasks;
    }

    return cachedTasks.filter(
        (task) => task && task.status === currentFilter,
    );
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



