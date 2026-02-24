// 1. Registeration
if ("serviceWorker" in navigator) {
window.addEventListener("load", () => {
		navigator.serviceWorker.register("/service-worker.js");
	});
}


// Push Notifications
function requestNotificationPermission() {
	if (!("Notification" in window)) return;

	if (Notification.permission === "granted") return;

	Notification.requestPermission().then(permission => {
		if (permission === "granted") {
		}
	});
}

// Notification Toggler in UI
document.addEventListener("DOMContentLoaded", () => {
	const toggle = document.getElementById("switchCheckChecked");
	if (!toggle) return;

	// Load saved notification preference from localStorage
	const savedPreference = localStorage.getItem("notificationsEnabled");
	if (savedPreference === "true") {
		toggle.checked = true;
	}

	toggle.addEventListener("change", (e) => {
		const isEnabled = e.target.checked;

		// Save preference to localStorage
		localStorage.setItem("notificationsEnabled", isEnabled ? "true" : "false");

		// When user turns notifications ON, request permission
		if (isEnabled) {
			requestNotificationPermission();
		}
	});
});



function sendNotification(taskTitle, taskId) {
    // Respect the toggle in the UI
    const toggle = document.getElementById("switchCheckChecked");
    if (!toggle || !toggle.checked) return;

    // Only try to show a notification if permissions are granted
    if (!("Notification" in window)) return;
    if (Notification.permission !== "granted") return;

    navigator.serviceWorker.getRegistration().then((reg) => {
        if (!reg) return;

        const option = {
            body: `Task Reminder: ${taskTitle}`,
            icon: "../images/logo.png",
            vibrate: [200, 100, 200],
            tag: "notification-tag",
            actions: [
                { action: "open", title: "Open Task" },
                { action: "close", title: "Dismiss" }
            ],
            data: taskId
        };

        reg.showNotification("Task overdue", option);
    });
}