// Router Module
import { currentUser } from './auth.js';

export function navigateTo(page) {
    window.location.hash = page;
}

export function initRouter() {
    // Handle hash changes
    window.addEventListener('hashchange', handleRoute);
    
    // Handle initial load
    handleRoute();
}

async function handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const app = document.getElementById('app');
    
    if (!app) return;

    // Show loading
    app.innerHTML = '<div class="flex items-center justify-center min-h-screen"><div class="loading-spinner"></div></div>';

    // Route handling
    if (hash === '/' || hash === '') {
        if (currentUser) {
            await loadPage('dashboard');
        } else {
            await loadPage('home');
        }
    } else if (hash.startsWith('/')) {
        const pageName = hash.slice(1).split('/')[0];
        await loadPage(pageName);
    }
}

async function loadPage(pageName) {
    const app = document.getElementById('app');
    
    try {
        const response = await fetch(`pages/${pageName}.html`);
        if (response.ok) {
            const html = await response.text();
            app.innerHTML = html;
            
            // Load page-specific JavaScript
            if (window[`init_${pageName}`]) {
                window[`init_${pageName}`]();
            }
        } else {
            // Page not found, try loading from js
            const module = await import(`./pages/${pageName}.js`).catch(() => null);
            if (module && module.render) {
                app.innerHTML = module.render();
                if (module.init) module.init();
            } else {
                app.innerHTML = '<div class="container mx-auto px-4 py-20 text-center"><h1 class="text-4xl font-bold text-gray-900">Page Not Found</h1></div>';
            }
        }
    } catch (error) {
        console.error('Error loading page:', error);
        app.innerHTML = '<div class="container mx-auto px-4 py-20 text-center"><h1 class="text-4xl font-bold text-gray-900">Error Loading Page</h1></div>';
    }
}
