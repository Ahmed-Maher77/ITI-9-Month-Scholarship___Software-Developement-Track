// 1. Registeration
if ("serviceWorker" in navigator) {
window.addEventListener("load", () => {
		navigator.serviceWorker.register("/service-worker.js");
	});
}


// Push Notifications
// Always ask the user for permission when called (e.g. when they click Enable Notifications)
async function requestNotificationPermission() {
	if (!("Notification" in window)) return false;

	const permission = await Notification.requestPermission();
	if (permission === "granted") return true;
	return false;
}

// Sync checkbox and localStorage with actual browser permission (e.g. after user revokes in settings)
function syncNotificationToggleWithPermission() {
	if (!("Notification" in window)) return;
	const toggle = document.getElementById("switchCheckChecked");
	if (!toggle) return;
	if (Notification.permission !== "granted") {
		toggle.checked = false;
		localStorage.setItem("notificationsEnabled", "false");
	}
}

// Notification Toggler in UI
document.addEventListener("DOMContentLoaded", () => {
	const toggle = document.getElementById("switchCheckChecked");
	if (!toggle) return;

	// Load saved preference, but keep checkbox in sync with actual browser permission
	const savedPreference = localStorage.getItem("notificationsEnabled");
	if (savedPreference === "true" && ("Notification" in window) && Notification.permission === "granted") {
		toggle.checked = true;
	} else {
		toggle.checked = false;
		if (savedPreference === "true") localStorage.setItem("notificationsEnabled", "false");
	}

	// When user returns to the tab, re-sync in case they revoked permission in browser settings
	document.addEventListener("visibilitychange", () => {
		if (document.visibilityState === "visible") syncNotificationToggleWithPermission();
	});
	window.addEventListener("focus", syncNotificationToggleWithPermission);

	toggle.addEventListener("change", async (e) => {
		const isEnabled = e.target.checked;

		// Save preference to localStorage
		localStorage.setItem("notificationsEnabled", isEnabled ? "true" : "false");
		// When user turns notifications ON: ensure permission is granted or ask for it
		if (isEnabled) {
			if (!("Notification" in window)) {
				window.dispatchEvent(new CustomEvent("notificationPermissionDenied"));
				return;
			}
			// Already permitted: no need to ask again, just confirm
			if (Notification.permission === "granted") {
				window.dispatchEvent(new CustomEvent("notificationPermissionGranted"));
				return;
			}
			// Not yet permitted: ask for permission
			const granted = await requestNotificationPermission();
			if (granted) {
				window.dispatchEvent(new CustomEvent("notificationPermissionGranted"));
			} else {
				window.dispatchEvent(new CustomEvent("notificationPermissionDenied"));
			}
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