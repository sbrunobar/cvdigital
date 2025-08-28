/**
 * Módulo ThemeManager
 * Gerencia a alternância entre temas claro e escuro.
 */

class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.currentTheme = localStorage.getItem('theme') || this.getPreferredTheme();
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme, false); // Set theme without animation on load
        this.bindEvents();
    }

    getPreferredTheme() {
        return 'dark';
    }

    bindEvents() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 't') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    setTheme(theme, animate = true) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        if (animate && this.themeToggle) {
            // Simple animation for theme toggle button
            this.themeToggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.themeToggle.style.transform = 'scale(1)';
            }, 150);
        }

        this.updateToggleIcon();
        this.announceThemeChange(theme);
    }

    updateToggleIcon() {
        if (!this.themeToggle) return;
        
        const sunIcon = this.themeToggle.querySelector('.fa-sun');
        const moonIcon = this.themeToggle.querySelector('.fa-moon');
        
        if (sunIcon && moonIcon) {
            if (this.currentTheme === 'light') {
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            } else {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            }
        }
    }

    announceThemeChange(theme) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';
        
        const themeNames = {
            light: 'Tema Claro',
            dark: 'Tema Escuro'
        };
        
        announcement.textContent = `${themeNames[theme]} ativado`;
        document.body.appendChild(announcement);
        
        setTimeout(() => document.body.removeChild(announcement), 1000);
    }
}

export default ThemeManager;
