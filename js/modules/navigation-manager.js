/**
 * Módulo NavigationManager
 * Gerencia a navegação do site, incluindo scroll spy e menu responsivo.
 */

class NavigationManager {
    constructor(scrollOffset, throttle) {
        this.navbar = document.querySelector('.header'); // Ajustado para a classe .header
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.navOverlay = document.querySelector('.nav-overlay');
        this.isMenuOpen = false;
        this.scrollOffset = scrollOffset;
        this.throttle = throttle;
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupScrollSpy();
        this.handleScroll(); // Define o estado inicial da navbar
    }

    bindEvents() {
        // Mobile menu toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMenu());
        }

        // Close menu on overlay click
        if (this.navOverlay) {
            this.navOverlay.addEventListener('click', () => this.closeMenu());
        }

        // Close menu on link click (mobile)
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Previne o salto padrão da âncora
                const targetId = link.getAttribute('href');
                this.scrollToSection(targetId);
                if (window.innerWidth <= 768) {
                    this.closeMenu();
                }
            });
        });

        // Close menu on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
            }
        });

        // Lidar com o scroll para estilização da navbar e links ativos (throttle para performance)
        window.addEventListener('scroll', this.throttle(() => this.handleScroll(), 100));
    }

    toggleMenu() {
        this.isMenuOpen ? this.closeMenu() : this.openMenu();
    }

    openMenu() {
        this.isMenuOpen = true;
        document.body.classList.add('nav-open');
        this.navToggle.setAttribute('aria-expanded', 'true');
    }

    closeMenu() {
        this.isMenuOpen = false;
        document.body.classList.remove('nav-open');
        this.navToggle.setAttribute('aria-expanded', 'false');
    }

    scrollToSection(targetId) {
        if (targetId && targetId.startsWith('#')) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - this.scrollOffset;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    }

    handleScroll() {
        const scrollY = window.scrollY;
        
        // Fundo e sombra da Navbar
        if (this.navbar) {
            if (scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        }

        // Atualizar link de navegação ativo
        this.updateActiveNavLink(scrollY);
    }

    setupScrollSpy() {
        // Usar Intersection Observer para um scroll spy mais eficiente
        const observerOptions = {
            rootMargin: `-${this.scrollOffset}px 0px -${window.innerHeight / 2}px 0px`,
            threshold: 0 // Aciona assim que qualquer parte do item entra na rootMargin
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    this.setActiveNavLink(sectionId);
                }
            });
        }, observerOptions);

        document.querySelectorAll('section[id]').forEach(section => {
            observer.observe(section);
        });
    }

    updateActiveNavLink(scrollY) {
        // Fallback ou alternativa se Intersection Observer não for preferido para links ativos
        // (Intersection Observer é geralmente melhor, mas esta é uma lógica alternativa)
        const sections = document.querySelectorAll('section[id]');
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - this.scrollOffset;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                currentSectionId = section.id;
            }
        });

        if (currentSectionId) {
            this.setActiveNavLink(currentSectionId);
        } else if (scrollY < sections[0].offsetTop - this.scrollOffset) {
            // Se estiver no topo, garante que nenhum link esteja ativo ou ativa 'Hero' se existir
            this.setActiveNavLink('hero');
        }
    }

    setActiveNavLink(sectionId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }
}

export default NavigationManager;
