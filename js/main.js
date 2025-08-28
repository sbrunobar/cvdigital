/**
 * Portfolio JavaScript - Versão Moderna
 * Autor: Bruno Barroso Salviano
 * Descrição: Funcionalidades interativas do portfólio profissional
 */

import ThemeManager from './modules/theme-manager.js';
import NavigationManager from './modules/navigation-manager.js';
import AnimationManager from './modules/animation-manager.js';
import SkillsManager from './modules/skills-manager.js';
import ContactManager from './modules/contact-manager.js';

// ===== CONFIGURAÇÃO GERAL =====
const CONFIG = {
    scrollOffset: 80,
    animationDelay: 100,
    debounceDelay: 250
};

// ===== UTILITÁRIOS =====
export class Utils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    static isInViewport(element, offset = 0) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= -offset &&
            rect.left >= -offset &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
        );
    }

    static animateNumber(element, target, duration = 2000) {
        const start = parseInt(element.textContent) || 0;
        const increment = (target - start) / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    const themeManager = new ThemeManager();
    const navigationManager = new NavigationManager(CONFIG.scrollOffset, Utils.throttle);
    const animationManager = new AnimationManager(CONFIG.animationDelay, CONFIG.scrollOffset);
    const skillsManager = new SkillsManager();
    const contactManager = new ContactManager();

    // Handle responsive navigation
    const handleResize = Utils.debounce(() => {
        if (window.innerWidth > 768) {
            navigationManager.closeMenu();
        }
    }, CONFIG.debounceDelay);

    window.addEventListener('resize', handleResize);

    // Implement Scroll Reveal for sections
    const revealSections = document.querySelectorAll('.reveal-section');

    const revealOnScroll = () => {
        revealSections.forEach(section => {
            if (Utils.isInViewport(section, 100)) {
                section.classList.add('is-visible');

                // Animate skill bars if it's the skills section
                
            } else {
                // Optional: remove is-visible class when out of viewport if you want to re-animate
                // section.classList.remove('is-visible');
                // For skill bars, reset width if needed for re-animation
                // if (section.id === 'skills') {
                //     const skillBars = section.querySelectorAll('.level-fill');
                //     skillBars.forEach(bar => { bar.style.width = '0%'; });
                // }
            }
        });
    };

    window.addEventListener('scroll', Utils.throttle(revealOnScroll, 100));
    revealOnScroll(); // Run once on load to reveal elements already in viewport

    // Atualiza o ano no rodapé
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    console.log('🚀 Portfólio carregado com sucesso!');
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
});
