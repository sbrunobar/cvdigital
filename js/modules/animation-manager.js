/**
 * Módulo AnimationManager
 * Gerencia as animações de elementos ao entrar na viewport e animações de números.
 */

import { Utils } from '../main.js';

class AnimationManager {
    constructor(animationDelay, scrollOffset) {
        this.animatedElements = document.querySelectorAll('.skill-card, .timeline-item, .contact-form, .contact-info'); // Removido hero-text e profile-image
        this.statNumbers = document.querySelectorAll('.stat-number');
        this.animationDelay = animationDelay;
        this.scrollOffset = scrollOffset;
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.animateHeroStats();
        // this.animateHeroElements(); // Removida a chamada à função específica do Hero
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1, 
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)'; // Removido scale(1)
                    }, index * this.animationDelay);
                    observer.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        this.animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)'; // Reduzido o translateY
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out'; // Transição mais rápida
            observer.observe(element);
        });
    }

    animateHeroStats() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const number = entry.target;
                    const target = parseInt(number.dataset.target || number.textContent);
                    Utils.animateNumber(number, target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 }); 

        this.statNumbers.forEach(number => {
            observer.observe(number);
        });
    }

    // animateHeroElements() { // Função removida
    //     const heroText = document.querySelector('.hero-text');
    //     const profileImage = document.querySelector('.profile-image');

    //     if (heroText) {
    //         heroText.style.opacity = '0';
    //         heroText.style.transform = 'translateY(20px)';
    //         setTimeout(() => {
    //             heroText.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
    //             heroText.style.opacity = '1';
    //             heroText.style.transform = 'translateY(0)';
    //         }, this.animationDelay * 2); 
    //     }

    //     if (profileImage) {
    //         profileImage.style.opacity = '0';
    //         profileImage.style.transform = 'scale(0.8)';
    //         setTimeout(() => {
    //             profileImage.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
    //             profileImage.style.opacity = '1';
    //             profileImage.style.transform = 'scale(1)';
    //         }, this.animationDelay * 3);
    //     }
    // }
}

export default AnimationManager;
