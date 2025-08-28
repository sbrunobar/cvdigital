/**
 * Módulo ContactManager
 * Gerencia o formulário de contato e o feedback ao usuário.
 */

class ContactManager {
    constructor() {
        this.contactForm = document.querySelector('.contact-form');
        this.formMessage = document.getElementById('formMessage');
        this.init();
    }

    init() {
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    displayMessage(message, type = 'success') {
        if (!this.formMessage) return;

        this.formMessage.textContent = message;
        this.formMessage.classList.add('form-message', type, 'show');
        this.formMessage.style.display = 'block';

        setTimeout(() => {
            this.formMessage.style.display = 'none';
            this.formMessage.textContent = '';
            this.formMessage.classList.remove('form-message', type, 'show');
        }, 5000); // Mensagem visível por 5 segundos
    }

    async handleSubmit(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const formEndpoint = form.action;

        try {
            const response = await fetch(formEndpoint, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                form.reset();
                this.displayMessage('Mensagem enviada com sucesso! Em breve entrarei em contato.', 'success');
            } else {
                const data = await response.json();
                if (data.errors) {
                    this.displayMessage(data.errors.map(error => error.message).join(", "), 'error');
                } else {
                    this.displayMessage('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.', 'error');
                }
            }
        } catch (error) {
            console.error('Erro de rede ou envio:', error);
            this.displayMessage('Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.', 'error');
        }
    }
}

export default ContactManager;
