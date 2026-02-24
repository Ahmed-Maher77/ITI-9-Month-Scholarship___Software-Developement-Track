// Registeration

if ("serviceWorker" in navigator) {
    (async () => {
        try {
            const registration =
                await navigator.serviceWorker.register("sw.js");
            console.log(
                "Service Worker registered with scope:",
                registration.scope,
            );
        } catch (error) {
            console.log("Service Worker registration failed:", error.message);
        }
    })();
}



// ================== PWA Install Button ================
let deferredPrompt;
const installBtn = document.getElementById("installBtn");

// Check if app is already installed
if (!window.matchMedia("(display-mode: standalone)").matches || !window.navigator.standalone === true) {
    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installBtn.style.display = "block";
    });

    // Handle install button click
    installBtn.addEventListener("click", async () => {
        if (!deferredPrompt) {
            return;
        }
        deferredPrompt.prompt();
        deferredPrompt = null;
        installBtn.style.display = "none";
    });

    // Listen for successful installation
    window.addEventListener("appinstalled", () => {
        installBtn.style.display = "none";
        deferredPrompt = null;
    });
}
