// Main App Module
import { initAuth, currentUser } from './auth.js';
import { initRouter, navigateTo } from './router.js';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initComponents();
    initAuth((user) => {
        if (user) {
            navigateTo('/dashboard');
        } else {
            navigateTo('/');
        }
    });
    initRouter();
});

// Initialize navbar and footer
function initComponents() {
    // Navbar
    const navbar = document.getElementById('navbar');
    if (navbar) {
        navbar.innerHTML = `
            <div class="gradient-primary text-white shadow-lg">
                <div class="container mx-auto px-4 py-4 flex justify-between items-center">
                    <a href="#/" class="text-2xl font-bold cursor-pointer hover:opacity-80 transition">📚 StudyForge</a>
                    <div id="navButtons">
                        <button onclick="window.location.hash='/login'" class="px-4 py-2 hover:bg-white hover:bg-opacity-20 rounded transition">Login</button>
                        <button onclick="window.location.hash='/signup'" class="px-4 py-2 bg-white text-blue-600 rounded hover:bg-blue-50 transition ml-2 font-semibold">Sign Up</button>
                    </div>
                    <div id="userMenu" class="hidden flex items-center space-x-4">
                        <span id="userName" class="font-medium"></span>
                        <button onclick="window.handleLogout()" class="px-4 py-2 bg-white bg-opacity-20 rounded hover:bg-opacity-30 transition">Logout</button>
                    </div>
                </div>
            </div>
        `;
    }

    // Footer
    const footer = document.getElementById('footer');
    if (footer) {
        footer.innerHTML = `
            <div class="bg-gray-800 text-white mt-auto py-8">
                <div class="container mx-auto px-4 text-center">
                    <p class="text-gray-400 mb-2">© 2025 StudyForge · Open-source learning platform</p>
                    <div class="space-x-6">
                        <a href="https://github.com/Sillybob123/StudyForge" target="_blank" class="text-gray-400 hover:text-white transition">GitHub</a>
                        <a href="https://github.com/sponsors/Sillybob123" target="_blank" class="text-pink-400 hover:text-pink-300 transition">💝 Sponsor</a>
                    </div>
                </div>
            </div>
        `;
    }
}

// Global logout handler
window.handleLogout = async () => {
    const { logout } = await import('./auth.js');
    await logout();
    window.location.hash = '/';
};
