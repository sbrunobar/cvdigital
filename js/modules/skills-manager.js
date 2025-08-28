/**
 * Módulo SkillsManager
 * Gerencia a funcionalidade da seção de habilidades, como filtros e animações.
 */

class SkillsManager {
    constructor() {
        this.skillCards = document.querySelectorAll('.skill-card');
        this.init();
    }

    init() {
        // Inicializa barras de nível, se houver
        this.skillCards.forEach(card => {
            const levelFill = card.querySelector('.level-fill');
            if (levelFill) {
                // A largura é definida diretamente no HTML, então não precisamos de JS para isso no carregamento
                // No entanto, podemos adicionar uma pequena lógica se quisermos animar a barra ao rolar
                // (o AnimationManager já cuida da animação do cartão como um todo)
            }
        });

        // Outras funcionalidades de habilidades (filtros, etc.) podem ser adicionadas aqui no futuro.
        // Por enquanto, a funcionalidade é mínima, focando na apresentação via CSS/HTML.
    }
}

export default SkillsManager;
