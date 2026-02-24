import {
    getAllTasksFromDB,
    storeTaskInDB,
    deleteTaskFromDB,
    getTask,
    updateTask,
} from "./databaseManager.js";
import {
    initFilters,
    setTasks,
    getFilteredTasks,
    getCurrentFilter,
    getTaskCounts,
    getCompletedThisWeekCount,
} from "./filters.js";
import {
    initScrollRevealAnimations,
    observeRevealElement,
} from "./animations.js";

// Selectors
const tabBtns = document.querySelectorAll(".tabs button");
const dateTimeField = document.getElementById("task-time");
const taskTimeText = document.querySelector(".task-time-text");
const submitFormBtn = document.querySelector(".submit-form-btn");
const taskTitleInput = document.getElementById("exampleInputTaskTitle");
const form = document.getElementById("tasks-form");
const toastsContainer = document.getElementById("notifications-container");
const tasksContainer = document.querySelector(".list-group");
const filterButtons = document.querySelectorAll(".tasks-filters [data-filter]");
const themeToggleBtn = document.getElementById("theme-toggle");
const installBtn = document.getElementById("install-btn");
const weeklySummaryEl = document.getElementById("task-weekly-summary");

// Global Variables
let activeTab = "schedule"; // or: no-time
const taskTimers = {}; // store timeout IDs per task id
let hasShownNotificationsPrompt = false; // to show notifications popup only once
let deferredPrompt = null; // for PWA install

// ============== Event Listeners ================
// when click on tab buttons
tabBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => switchTabs(e, btn));
});

// when the task title input value changes
taskTitleInput.addEventListener("input", (e) => {
    const isValid = validateInput(e.target.value, 3);
    submitFormBtn.toggleAttribute("disabled", !isValid);
    toggleInvalidFeedback("#exampleInputTaskTitle", isValid);
});

// when the date-time input value changes
dateTimeField.addEventListener("change", (e) => {
    if (activeTab === "schedule") {
        const isValid = validateInput(e.target.value);
        toggleInvalidFeedback("#task-time", isValid);
    }
});

// when submit the form
submitFormBtn.addEventListener("click", submitForm);

// initialize filters module for filter buttons
initFilters(filterButtons, () => {
    const tasksToRender = getFilteredTasks();
    renderTasksInPage(tasksToRender);
});

// theme toggle button
if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
}

// PWA install handling
function getOS() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobile =
        /android/i.test(userAgent) ||
        (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream);

    const isDesktop =
        /Win/i.test(userAgent) ||
        /Mac/i.test(userAgent) ||
        /Linux/i.test(userAgent);

    if (isMobile) {
        return "Mobile";
    } else if (isDesktop) {
        return "Desktop";
    } else {
        // Fallback based on screen width
        const isMobileScreen = window.matchMedia("(max-width: 992px)").matches;
        return isMobileScreen ? "Mobile" : "Desktop";
    }
}

window.addEventListener("beforeinstallprompt", (event) => {
    if (!installBtn) return;

    event.preventDefault();
    deferredPrompt = event;

    // adjust tooltip based on OS
    const os = getOS();
    installBtn.title = `Install ${os} app`;

    // Show the button (remove d-none)
    installBtn.classList.remove("d-none");

    installBtn.onclick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;

        if (choiceResult.outcome === "accepted") {
            deferredPrompt = null;
            installBtn.classList.add("d-none");
        }
    };
});

window.addEventListener("appinstalled", () => {
    if (installBtn) {
        installBtn.classList.add("d-none");
    }
});

// toggle / delete / complete inside tasks list (event delegation)
tasksContainer.addEventListener("click", (e) => {
    const toggleBtn = e.target.closest(".task-toggle-btn");
    const deleteBtn = e.target.closest(".task-delete-btn");
    const completeBtn = e.target.closest(".task-complete-btn");

    if (toggleBtn) {
        toggleTaskDescription(toggleBtn);
    } else if (deleteBtn) {
        const taskId = deleteBtn.getAttribute("data-id");
        deleteTask(taskId, deleteBtn);
    } else if (completeBtn) {
        const taskId = completeBtn.getAttribute("data-id");
        markTaskCompleted(taskId, completeBtn);
    }
});

// ============== Initialization ================
// Set minimum date-time to current date and time
function initializeDateTimeMin() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const minDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    dateTimeField.setAttribute("min", minDateTime);
}

initializeDateTimeMin();
window.onload = async () => {
    initTheme();
    // set footer year
    const yearSpan = document.getElementById("copyright-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    const initialLoader = document.getElementById("initial-loader");
    try {
        await updateUI();
    } finally {
        if (initialLoader) {
            // keep loader visible a bit longer for smoother perception
            setTimeout(() => {
                initialLoader.classList.add("initial-loader--hidden");
                initScrollRevealAnimations();
            }, 700); // 0.7s extra before fade-out
        }
    }
};

// when user clicks a notification
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.addEventListener("message", (event) => {
        const data = event.data;
        if (!data || data.type !== "OPEN_TASK") return;

        const taskId = data.taskId;
        if (!taskId) return;

        focusTask(taskId);
    });
}

/* ====================== Main Functions ===================== */
// Switch Tabs
function switchTabs(e, btn) {
    e.preventDefault();
    tabBtns.forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");
    activeTab = btn.id;
    // show/hide date-time input
    dateTimeField.classList.toggle("d-none", activeTab !== "schedule");
    taskTimeText.classList.toggle("d-none", activeTab == "schedule");
    document
        .querySelector("#task-time + .invalid-feedback")
        .classList.add("d-none");
    activeTab = btn.id;
}

// Toggle Task Description
function toggleTaskDescription(togglerEl) {
    const wrapper = togglerEl.closest(".wrapper");
    if (!wrapper) return;

    const taskDescription = wrapper.querySelector(".content > p");
    if (!taskDescription) return;

    const isExpanded = !togglerEl.classList.contains("active");
    togglerEl.classList.toggle("active", isExpanded);
    taskDescription.classList.toggle("show", isExpanded);
    togglerEl.setAttribute("aria-expanded", isExpanded ? "true" : "false");

    const icon = togglerEl.querySelector(".fa-angle-down");
    if (icon) {
        icon.classList.toggle("active", isExpanded);
    }
}

// Delete Task
async function deleteTask(id, iconEl) {
    try {
        // clear task timer if exists
        if (taskTimers[id]) {
            clearTimeout(taskTimers[id]);
            delete taskTimers[id];
        }

        await deleteTaskFromDB(id);
        // Remove from UI for now
        const li = iconEl.closest("li");
        if (li) li.remove();
        showToast("✓ Task deleted successfully!", "success", 3000);
    } catch (error) {
        showToast(
            "✗ Failed to delete task. Please refresh the page.",
            "error",
            3000,
        );
    }
}

// Mark task as completed (or back to pending)
async function markTaskCompleted(id, iconEl) {
    try {
        const task = await getTask(id);
        if (!task) return;

        // Do not allow changing status for overdue tasks
        if (task.status === "overdue") {
            showToast(
                "Overdue tasks cannot be marked as completed from here.",
                "error",
                3000,
            );
            return;
        }

        const newStatus = task.status === "completed" ? "pending" : "completed";

        // Persist status change in DB
        await updateTaskStatus(id, newStatus);

        // Manage timers: clear on completed, (re)start on pending
        if (newStatus === "completed") {
            if (taskTimers[id]) {
                clearTimeout(taskTimers[id]);
                delete taskTimers[id];
            }
        } else if (newStatus === "pending" && task.endTime) {
            const updatedTask = { ...task, status: newStatus };
            setTimer(updatedTask);
        }

        // Update UI: toggle class on li and icon
        const li = iconEl.closest("li");
        if (li) {
            li.classList.toggle("task-completed", newStatus === "completed");
        }

        const icon = iconEl.querySelector("i");
        if (icon) {
            icon.classList.toggle(
                "fa-circle-check",
                newStatus === "completed",
            );
            icon.classList.toggle("fa-circle", newStatus !== "completed");
            icon.classList.toggle("text-success", newStatus === "completed");
        }

        iconEl.setAttribute(
            "aria-pressed",
            newStatus === "completed" ? "true" : "false",
        );
        iconEl.setAttribute(
            "aria-label",
            newStatus === "completed"
                ? "Mark task as pending"
                : "Mark task as completed",
        );

        showToast(
            newStatus === "completed"
                ? "✓ Task marked as completed!"
                : "Task set back to pending.",
            "success",
            2500,
        );
    } catch (error) {
        showToast("✗ Could not update task. Please try again.", "error", 3000);
    }
}

// Update Tasks Container
async function updateUI() {
    try {
        // show loading state while fetching from IndexedDB
        showLoadingState();

        const allTasks = await getAllTasksFromDB();

        // Ensure any tasks whose endTime has passed are marked as overdue in DB
        const now = new Date();
        const pendingUpdates = [];

        allTasks.forEach((task) => {
            if (
                task &&
                task.endTime &&
                new Date(task.endTime) < now &&
                task.status !== "overdue" &&
                task.status !== "completed"
            ) {
                task.status = "overdue";
                pendingUpdates.push(updateTask(task, task.id));
            }
        });

        if (pendingUpdates.length > 0) {
            await Promise.all(pendingUpdates);
        }

        setTasks(allTasks);
        const tasksToRender = getFilteredTasks();
        renderTasksInPage(tasksToRender);
        updateFilterBadges();
        updateWeeklySummary();
    } catch (error) {
        showToast(
            "✗ Failed to fetch tasks. Please refresh the page.",
            "error",
            3000,
        );
        renderWrongMessage("✗ Failed to fetch tasks. Please refresh the page.");
    }
}

/* =================== Form Submit Handling =================== */
async function submitForm(e) {
    e.preventDefault();

    // get form data
    const form = document.getElementById("tasks-form");
    const formData = new FormData(form);
    const taskTitle = formData.get("task-title").trim();
    const taskTime = formData.get("task-time");
    const taskDescription = formData.get("task-description").trim();
    // validate form data
    if (!checkInputValidity(taskTitle, taskTime, taskDescription)) return;

    // create task object
    const task = {
        id: `${taskTitle} - ${Date.now()} - ${Math.random()}`, // generate unique id for each task
        title: taskTitle,
        description: taskDescription,
        endTime: taskTime,
        status: "pending", // pending, completed, overdue
    };

    // store form data in IndexedDB
    try {
        await storeTaskInDB(task);
        showToast(`✓ Task "${taskTitle}" added successfully!`, "success", 3000);

        // reset form
        form.reset();
        submitFormBtn.setAttribute("disabled", "");

        // update UI with new task
        updateUI();

        // set timer to update task status if end time is set
        if (taskTime) setTimer(task);

        // After first successful task add (with time), if notifications are not enabled, show prompt
        if (taskTime) maybePromptEnableNotifications();
    } catch (error) {
        console.error("Error storing task in IndexedDB:", error);
        showToast("✗ Failed to add task. Please try again.", "error", 3000);
    }
}

/* =================== Form Input Validation =================== */
function checkInputValidity(taskTitle, taskTime, taskDescription) {
    const validations = [
        {
            selector: "#exampleInputTaskTitle",
            isValid: validateInput(taskTitle, 3),
        },
        {
            selector: "#task-time",
            isValid: activeTab === "schedule" ? validateInput(taskTime) : true,
        },
    ];

    validations.forEach((field) =>
        toggleInvalidFeedback(field.selector, field.isValid),
    );
    return validations.every((field) => field.isValid);
}

// validate input value
function validateInput(value, minLength = 1) {
    return value.trim().length >= minLength;
}

// toggle invalid feedback element
function toggleInvalidFeedback(selector, isValid) {
    const feedback = document.querySelector(`${selector} + .invalid-feedback`);

    if (!feedback) return;

    if (isValid) {
        feedback.classList.remove("d-block");
        feedback.classList.add("d-none");
    } else {
        feedback.classList.remove("d-none");
        feedback.classList.add("d-block");
    }
}

/* =================== Task Timer Handling =================== */
function setTimer(task) {
    const timeDifference = new Date(task.endTime) - new Date();

    // clear existing timer for this task if any
    if (taskTimers[task.id]) {
        clearTimeout(taskTimers[task.id]);
        delete taskTimers[task.id];
    }

    if (timeDifference > 0) {
        const timeoutId = setTimeout(async () => {
            await updateTaskStatus(task.id, "overdue");
            delete taskTimers[task.id];
            // Trigger browser notification (if enabled)
            sendNotification(task.title, task.id);
        }, timeDifference);

        taskTimers[task.id] = timeoutId;
    } else {
        updateTaskStatus(task.id, "overdue");
    }
}

// update task status
async function updateTaskStatus(id, newStatus) {
    try {
        const oldTask = await getTask(id);
        const newTask = { ...oldTask, status: newStatus };

        if (newStatus === "completed") {
            newTask.completedAt = new Date().toISOString();
        } else if (newStatus === "pending") {
            delete newTask.completedAt;
        }

        await updateTask(newTask, id);
        document
            .getElementById(id)
            .closest(".custom-list-item")
            .classList.add(`task-${newStatus}`);
        updateUI();
    } catch {}
}

// Scroll to a task, highlight it, and expand its description
function focusTask(taskId) {
    const li = document.getElementById(taskId);
    if (!li) return;

    // Smooth scroll to the task
    window.scrollTo({
        top: li.offsetTop,
        behavior: "smooth",
    });

    // Expand description by triggering the toggle button
    const toggleBtn = li.querySelector(".actions .task-toggle-btn");
    if (toggleBtn) {
        toggleBtn.click();
    }
}

// Show popup after first task to suggest enabling notifications
function maybePromptEnableNotifications() {
    if (hasShownNotificationsPrompt) return;
    if (!("Notification" in window)) return;

    const toggle = document.getElementById("switchCheckChecked");
    const notificationsToggleOn = toggle && toggle.checked;
    const savedPreference =
        localStorage.getItem("notificationsEnabled") === "true";
    const permissionGranted = Notification.permission === "granted";

    // If already enabled (either via toggle or saved preference), nothing to do
    if ((notificationsToggleOn || savedPreference) && permissionGranted) return;

    hasShownNotificationsPrompt = true;
    showNotificationsPopup();
}

function showNotificationsPopup() {
    const backdrop = document.createElement("div");
    backdrop.classList.add("notifications-modal-backdrop");

    const modal = document.createElement("div");
    modal.classList.add("notifications-modal");
    modal.innerHTML = `
        <h3>Enable task notifications?</h3>
        <p class="mt-2 mb-3">
            Turn on notifications so we can remind you when tasks become overdue.
        </p>
        <div class="d-flex justify-content-end gap-2 mt-3">
            <button type="button" class="btn btn-outline-secondary btn-sm" data-action="later">
                Not now
            </button>
            <button type="button" class="btn btn-primary btn-sm" data-action="enable">
                Enable notifications
            </button>
        </div>
    `;

    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);

    backdrop.addEventListener("click", (e) => {
        const action = e.target.getAttribute("data-action");

        if (action === "later") {
            document.body.removeChild(backdrop);
            return;
        }

        if (action === "enable") {
            // Turn on the toggle in UI, if present
            const toggle = document.getElementById("switchCheckChecked");
            if (toggle) {
                toggle.checked = true;
                // Save preference to localStorage
                localStorage.setItem("notificationsEnabled", "true");
            }

            // Ask for permission via handler (if available)
            if (window.requestNotificationPermission) {
                window.requestNotificationPermission();
            } else if (
                "Notification" in window &&
                Notification.permission !== "granted"
            ) {
                Notification.requestPermission();
            }

            document.body.removeChild(backdrop);
            return;
        }

        // clicking backdrop (outside modal) acts like "later"
        if (e.target === backdrop) {
            document.body.removeChild(backdrop);
        }
    });
}

/* =================== Helper Functions =================== */
// Show floating toast / notification message
function showToast(message, type = "success", duration = 3000) {
    if (!toastsContainer) return;

    const toast = document.createElement("div");
    toast.classList.add("notification", type);
    toast.innerHTML = `<p class="notification-message">${message}</p>`;

    toastsContainer.appendChild(toast);

    // Initial slide-in animation
    toast.style.animation = "slideIn 0.3s ease-in-out forwards";

    // Auto remove toast after duration
    setTimeout(() => {
        toast.style.animation = "slideOut 0.3s ease-in-out forwards";
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}

// Render tasks in the page
function renderTasksInPage(tasks) {
    tasksContainer.innerHTML = ""; // Clear existing tasks
    if (!tasks || tasks.length === 0) {
        showEmptyListMessage();
    } else {
        showTaskLists(tasks);
    }
}

// Update badge counts beside filter tabs
function updateFilterBadges() {
    const { total, pending, completed, overdue } = getTaskCounts();

    const allBadge = document.querySelector(
        '.tasks-filters [data-filter="all"] .filter-badge',
    );
    const pendingBadge = document.querySelector(
        '.tasks-filters [data-filter="pending"] .filter-badge',
    );
    const completedBadge = document.querySelector(
        '.tasks-filters [data-filter="completed"] .filter-badge',
    );
    const overdueBadge = document.querySelector(
        '.tasks-filters [data-filter="overdue"] .filter-badge',
    );

    if (allBadge) allBadge.textContent = total;
    if (pendingBadge) pendingBadge.textContent = pending;
    if (completedBadge) completedBadge.textContent = completed;
    if (overdueBadge) overdueBadge.textContent = overdue;
}

// Update "tasks completed this week" indicator
function updateWeeklySummary() {
    if (!weeklySummaryEl) return;
    const count = getCompletedThisWeekCount();
    weeklySummaryEl.textContent = `Tasks completed this week: ${count}`;
}

/* =================== Theme Handling =================== */
function applyTheme(theme) {
    const html = document.documentElement;
    html.setAttribute("data-bs-theme", theme);
    // also set custom data-theme for CSS variables
    html.setAttribute("data-theme", theme);

    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector("i");

    if (theme === "dark") {
        if (icon) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        }
        themeToggleBtn.title = "Switch to light mode";
        themeToggleBtn.setAttribute("aria-label", "Switch to light mode");
        themeToggleBtn.setAttribute("aria-pressed", "true");
    } else {
        if (icon) {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        }
        themeToggleBtn.title = "Switch to dark mode";
        themeToggleBtn.setAttribute("aria-label", "Switch to dark mode");
        themeToggleBtn.setAttribute("aria-pressed", "false");
    }
}

function initTheme() {
    const saved = localStorage.getItem("theme");
    const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initialTheme = saved || (prefersDark ? "dark" : "light");
    applyTheme(initialTheme);
}

function toggleTheme() {
    const current =
        document.documentElement.getAttribute("data-bs-theme") || "light";
    const next = current === "light" ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem("theme", next);
}

// Show wrong message
function renderWrongMessage(msg) {
    const li = document.createElement("li");
    li.classList.add(
        "d-flex",
        "flex-column",
        "align-items-center",
        "py-4",
        "text-danger",
    );
    li.innerHTML = `
        <h5 class="text-danger d-flex align-items-baseline gap-1">${msg} <i class="fa-regular fa-face-meh-blank"></i></h5>
    `;
    tasksContainer.appendChild(li);
}

// Show loading state while fetching tasks
function showLoadingState() {
    tasksContainer.innerHTML = "";

    const li = document.createElement("li");
    li.classList.add(
        "d-flex",
        "flex-column",
        "align-items-center",
        "py-4",
        "text-secondary",
    );
    li.innerHTML = `
        <div class="spinner-border text-primary mb-2" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mb-0">Loading your tasks...</p>
    `;

    tasksContainer.appendChild(li);
}

// show empty list message (depends on current filter)
function showEmptyListMessage() {
    const li = document.createElement("li");
    li.classList.add("d-flex", "flex-column", "align-items-center", "py-3");

    let titleText = "";
    let subtitleText = "";

    const filter = getCurrentFilter();

    switch (filter) {
        case "pending":
            titleText = "No pending tasks";
            subtitleText = "You have no tasks waiting right now.";
            break;
        case "completed":
            titleText = "No completed tasks";
            subtitleText =
                "Finish a task and mark it as completed to see it here.";
            break;
        case "overdue":
            titleText = "No overdue tasks";
            subtitleText = "Great job! You have no overdue tasks.";
            break;
        default:
            titleText = "No tasks to show";
            subtitleText = "Add a new task to get started.";
            break;
    }

    li.innerHTML = `
        <h5 class="text-secondary d-flex align-items-baseline gap-1">${titleText} <i class="fa-regular fa-face-meh-blank"></i></h5>
        <p class="text-muted">${subtitleText}</p>
    `;
    tasksContainer.appendChild(li);
}

// show task lists
function showTaskLists(tasks) {
    if (!tasks || !Array.isArray(tasks)) return;

    const fragment = document.createDocumentFragment();
    tasks.forEach((task) => {
        if (!task || typeof task !== "object") return;

        const li = document.createElement("li");
        li.classList.add(
            "p-4",
            "d-flex",
            "flex-column",
            "gap-2",
            "rounded",
            "custom-list-item",
            "reveal-on-scroll",
        );
        // Set id so we can target this task later
        if (task.id) {
            li.id = task.id;
        }
        // If task is completed, mark it in the UI
        if (task.status === "completed") {
            li.classList.add("task-completed");
        }

        // Hook into scroll reveal animations for this dynamically added item
        observeRevealElement(li);

        // Wrapper
        const wrapper = document.createElement("div");
        wrapper.classList.add(
            "wrapper",
            "d-flex",
            "gap-2",
            "justify-content-between",
        );

        // Content
        const content = document.createElement("div");
        content.classList.add("content");

        const title = document.createElement("h4");
        title.textContent = task.title ?? "";

        const description = document.createElement("p");
        description.classList.add("text-secondary", "my-3");
        description.textContent = task.description ?? "";

        content.append(title, description);

        // Actions
        const actions = document.createElement("div");
        actions.classList.add(
            "actions",
            "d-flex",
            "gap-2",
            "h-fit",
            "align-items-center",
        );

        // Complete button (toggle completed / pending)
        const completeBtn = document.createElement("button");
        completeBtn.type = "button";
        completeBtn.classList.add("task-complete-btn", "icon-btn");
        completeBtn.setAttribute("data-id", task.id);
        completeBtn.setAttribute(
            "aria-label",
            task.status === "completed"
                ? `Mark task "${task.title}" as pending`
                : `Mark task "${task.title}" as completed`,
        );
        completeBtn.setAttribute(
            "aria-pressed",
            task.status === "completed" ? "true" : "false",
        );

        const completeIcon = document.createElement("i");
        completeIcon.classList.add(
            "fa-regular",
            task.status === "completed" ? "fa-circle-check" : "fa-circle",
            "fs-5",
        );
        if (task.status === "completed") {
            completeIcon.classList.add("text-success");
        }
        completeBtn.appendChild(completeIcon);

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.classList.add("icon-btn", "task-delete-btn");
        deleteBtn.setAttribute("data-id", task.id);
        deleteBtn.setAttribute(
            "aria-label",
            `Delete task "${task.title}"`,
        );

        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add(
            "fa-solid",
            "fa-xmark",
            "text-danger",
            "fs-5",
            "trans-3",
        );
        deleteBtn.appendChild(deleteIcon);

        // Toggle description button
        const toggleBtn = document.createElement("button");
        toggleBtn.type = "button";
        toggleBtn.classList.add("icon-btn", "task-toggle-btn");
        toggleBtn.setAttribute(
            "aria-label",
            `Toggle description for task "${task.title}"`,
        );
        toggleBtn.setAttribute("aria-expanded", "false");

        const toggleIcon = document.createElement("i");
        toggleIcon.classList.add(
            "fa-solid",
            "fa-angle-down",
            "fs-5",
            "trans-3",
        );
        toggleBtn.appendChild(toggleIcon);

        // Only show complete control when task is not overdue
        if (task.status !== "overdue") {
            actions.append(completeBtn);
        }
        actions.append(deleteBtn, toggleBtn);
        wrapper.append(content, actions);

        // Time / status
        const timeSpan = document.createElement("span");
        timeSpan.classList.add(
            "d-flex",
            "justify-content-end",
            "text-primary",
            "font-small",
            "time-label",
        );

        const isCompleted = task.status === "completed";

        // Add overdue class if task status is overdue OR its endTime is in the past
        const isOverdueByStatus = task.status === "overdue";
        const isOverdueByTime =
            task.endTime && new Date(task.endTime) < new Date() && !isCompleted;

        if (isOverdueByStatus || isOverdueByTime) {
            li.classList.add("task-overdue");
            timeSpan.classList.add("task-overdue");
            timeSpan.innerHTML = `! Overdue - ${formatDateTime(task.endTime)}`;
            if (!isOverdueByStatus) {
                updateTaskStatus(task.id, "overdue");
            }
        } else if (isCompleted) {
            // Completed label, with or without time
            const label = "✓ Completed";
            const timeText = task.endTime
                ? ` - ${formatDateTime(task.endTime)}`
                : " - No time";
            timeSpan.innerHTML = `<span class="text-success">${label} ${timeText}</span>`;
        } else {
            timeSpan.textContent = task.endTime
                ? formatDateTime(task.endTime)
                : "No time";
        }

        li.append(wrapper, timeSpan);
        fragment.appendChild(li);
    });

    tasksContainer.appendChild(fragment);
}

// format date-time string to be more readable
function formatDateTime(dateTime) {
    if (!dateTime) return "";

    const date = new Date(dateTime);
    return date.toLocaleString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}
