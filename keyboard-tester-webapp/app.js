/**
 * app.js
 * Main application logic for the Keyboard Tester.
 */
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// // TODO: Replace with your project's config object from the Firebase Console if you change projects
// const firebaseConfig = {
//     apiKey: "AIzaSyB96V8k_L83P8D7gXpt2IAPdBY30e2Yp_Y",
//     authDomain: "boilerplate-webapp-b4400.firebaseapp.com",
//     projectId: "boilerplate-webapp-b4400",
//     storageBucket: "boilerplate-webapp-b4400.firebasestorage.app",
//     messagingSenderId: "1070667340598",
//     appId: "1:1070667340598:web:0bebe51118a6ac1f737197",
//     measurementId: "G-YX1KZ70NFS"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

document.addEventListener('DOMContentLoaded', () => {
    console.log('Online Keyboard Tester Initialized.');

    const lastKeyDisplay = document.getElementById('last-key');
    const resetBtn = document.getElementById('reset-btn');
    const keys = document.querySelectorAll('.key');

    // Create a generic map for quick lookup if needed, 
    // though querying by data-code is efficient enough for this scale.

    /**
     * Handle Key Down
     * Highlights the key and marks it as 'pressed' (active interaction)
     */
    document.addEventListener('keydown', (e) => {
        // Prevent default actions for specific keys to keep focus on the tool
        const preventDefaults = ['Space', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'AltLeft', 'AltRight', 'F1', 'F3', 'F5', 'F12']; // F-keys often trigger browser actions
        // slightly aggressive prevention to ensure smooth testing experience

        // We generally want to prevent default behaviors like scrolling (Space) or tabbing out (Tab)
        // during the test context.
        e.preventDefault();

        const code = e.code; // e.g. "KeyA", "Space", "Enter"

        // Update Debug Display
        if (lastKeyDisplay) {
            lastKeyDisplay.textContent = code;
        }

        // Find the visual key
        const visualKey = document.querySelector(`.key[data-code="${code}"]`);

        if (visualKey) {
            visualKey.classList.add('pressed');
            visualKey.classList.add('tested'); // Persist the success state
        } else {
            console.log(`Key code not mapped on visualizer: ${code}`);
        }
    });

    /**
     * Handle Key Up
     * Removes the 'pressed' state but keeps the 'tested' state
     */
    document.addEventListener('keyup', (e) => {
        e.preventDefault();
        const code = e.code;
        const visualKey = document.querySelector(`.key[data-code="${code}"]`);

        if (visualKey) {
            visualKey.classList.remove('pressed');
            // Fallback: If OS intercepted keydown (like PrintScreen), 
            // ensure we still mark it as working on release.
            visualKey.classList.add('tested');
        }
    });

    /**
     * Reset Button Logic
     */
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            // Remove 'tested' class from all keys
            keys.forEach(key => {
                key.classList.remove('tested');
                key.classList.remove('pressed'); // Just in case
            });

            // Clear display
            if (lastKeyDisplay) lastKeyDisplay.textContent = '--';

            // Remove focus from button so Spacebar doesn't re-trigger it
            resetBtn.blur();
        });
    }

});
