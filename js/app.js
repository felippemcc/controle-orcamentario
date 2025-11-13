/**
 * APP.JS
 * Lógica principal da aplicação
 * Controla KPIs, renderização de blocos e interações
 */

const App = {
    // Estado da aplicação
    blocos: [],

    /**
     * Inicializa a aplicação
     */
    init() {
        // Carrega blocos salvos
        this.blocos = Storage.carregarBlocos();

        // Inicializa módulos
        Modal.init();

        // Vincula eventos
        this.bindEvents();

        // Renderiza interface inicial
        this.render();
    },

    /**
     * Vincula eventos globais
     */
    bindEvents() {
        // Submit do formulário
        document.getElementById('blocoForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.salvarBloco();
        });
    },

    /**
     * Renderiza toda a interface
     */
    render() {
        this.atualizarKPIs();
        this.renderBlocos();
    },

    /**
     * Atualiza os cards de KPI
     */
    atualizarKPIs() {
        const totalOrcado = this.blocos.reduce((sum, b) => sum + parseFloat(b.orcado || 0), 0);
        const totalRealizado = this.blocos.reduce((sum, b) => sum + parseFloat(b.realizado || 0), 0);
        const diferenca = totalOrcado - totalRealizado;
        const percentRealizado = totalOrcado > 0 ? (totalRealizado / totalOrcado * 100).toFixed(1) : 0;

        // Atualiza valores
        document.getElementById('totalOrcado').textContent = this.formatarMoeda(totalOrcado);
        document.getElementById('totalRealizado').textContent = this.formatarMoeda(totalRealizado);
        document.getElementById('diferenca').textContent = this.formatarMoeda(Math.abs(diferenca));
        document.getElementById('totalBlocos').textContent = this.blocos.length;

        // Atualiza percentual
        const percentEl = document.getElementById('percentRealizado');
        percentEl.textContent = `${percentRealizado}% do orçado`;
        percentEl.className = 'kpi-change ' + (percentRealizado > 100 ? 'negative' : 'positive');

        // Atualiza status da diferença
        const statusEl = document.getElementById('statusDiferenca');
        if (diferenca > 0) {
            statusEl.textContent = 'Dentro do orçamento';
            statusEl.className = 'kpi-change positive';
        } else if (diferenca < 0) {
            statusEl.textContent = 'Acima do orçamento';
            statusEl.className = 'kpi-change negative';
        } else {
            statusEl.textContent = 'Exato';
            statusEl.className = 'kpi-change';
        }
    },

    /**
     * Renderiza a lista de blocos
     */
    renderBlocos() {
        const container = document.getElementById('blocosContainer');

        // Estado vazio
        if (this.blocos.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📦</div>
                    <h3>Nenhum bloco criado ainda</h3>
                    <p>Crie seu primeiro bloco de orçamento clicando no botão acima</p>
                </div>
            `;
            return;
        }

        // Renderiza blocos
        container.innerHTML = this.blocos
            .map(bloco => this.renderBlocoCard(bloco))
            .join('');

        // Vincula eventos dos cards
        this.bindBlocoEvents();
    },

    /**
     * Renderiza um card de bloco
     * @param {Object} bloco - Dados do bloco
     * @returns {string} HTML do card
     */
    renderBlocoCard(bloco) {
        const progresso = bloco.orcado > 0 
            ? (bloco.realizado / bloco.orcado * 100).toFixed(1) 
            : 0;
        
        const progressClass = progresso > 100 ? 'danger' : progresso > 80 ? 'warning' : '';
        const restante = bloco.orcado - bloco.realizado;
        const statusRestante = restante >= 0 ? 'Restante' : 'Excedido';
        const corRestante = restante >= 0 ? 'var(--success)' : 'var(--danger)';

        return `
            <div class="bloco-card" data-id="${bloco.id}">
                <div class="bloco-header">
                    <div class="bloco-info">
                        <div class="bloco-name">${this.escapeHtml(bloco.nome)}</div>
                        <div class="bloco-meta">${this.escapeHtml(bloco.categoria)}</div>
                    </div>
                    <button class="btn btn-danger btn-excluir" data-id="${bloco.id}">
                        🗑️
                    </button>
                </div>
                ${bloco.descricao ? `
                    <p class="bloco-description">${this.escapeHtml(bloco.descricao)}</p>
                ` : ''}
                <div class="progress-bar">
                    <div class="progress-fill ${progressClass}" 
                         style="width: ${Math.min(progresso, 100)}%"></div>
                </div>
                <div class="progress-info">
                    <span class="progress-percent">${progresso}% realizado</span>
                    <span class="progress-values">
                        ${this.formatarMoeda(bloco.realizado)} / ${this.formatarMoeda(bloco.orcado)}
                    </span>
                </div>
                <div class="bloco-stats">
                    <div class="stat">
                        <span class="stat-value">${this.formatarMoeda(bloco.orcado)}</span>
                        <span class="stat-label">Orçado</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${this.formatarMoeda(bloco.realizado)}</span>
                        <span class="stat-label">Realizado</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value" style="color: ${corRestante}">
                            ${this.formatarMoeda(Math.abs(restante))}
                        </span>
                        <span class="stat-label">${statusRestante}</span>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Vincula eventos dos cards de bloco
     */
    bindBlocoEvents() {
        // Botões de excluir
        document.querySelectorAll('.btn-excluir').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(btn.dataset.id);
                this.excluirBloco(id);
            });
        });

        // Click no card para editar (opcional - descomente para habilitar)
        /*
        document.querySelectorAll('.bloco-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = parseInt(card.dataset.id);
                const bloco = this.blocos.find(b => b.id === id);
                if (bloco) {
                    Modal.abrir(bloco);
                }
            });
        });
        */
    },

    /**
     * Salva (cria ou atualiza) um bloco
     */
    salvarBloco() {
        const dados = Modal.obterDados();
        const validacao = Modal.validar(dados);

        if (!validacao.valido) {
            Modal.exibirErros(validacao.erros);
            return;
        }

        let sucesso = false;

        if (Modal.modoEdicao && Modal.blocoEmEdicao) {
            // Atualizar bloco existente
            sucesso = Storage.atualizarBloco(Modal.blocoEmEdicao.id, dados);
            if (sucesso) {
                this.mostrarToast('Bloco atualizado com sucesso! ✓');
            }
        } else {
            // Criar novo bloco
            sucesso = Storage.adicionarBloco(dados);
            if (sucesso) {
                this.mostrarToast('Bloco criado com sucesso! ✓');
            }
        }

        if (sucesso) {
            this.blocos = Storage.carregarBlocos();
            Modal.fechar();
            this.render();
        } else {
            this.mostrarToast('Erro ao salvar bloco. Tente novamente.', 'error');
        }
    },

    /**
     * Exclui um bloco
     * @param {number} id - ID do bloco
     */
    excluirBloco(id) {
        const bloco = this.blocos.find(b => b.id === id);
        
        if (!bloco) return;

        const confirmar = confirm(
            `Tem certeza que deseja excluir o bloco "${bloco.nome}"?\n\nEsta ação não pode ser desfeita.`
        );

        if (!confirmar) return;

        const sucesso = Storage.removerBloco(id);

        if (sucesso) {
            this.blocos = Storage.carregarBlocos();
            this.render();
            this.mostrarToast('Bloco excluído com sucesso!');
        } else {
            this.mostrarToast('Erro ao excluir bloco. Tente novamente.', 'error');
        }
    },

    /**
     * Exibe notificação toast
     * @param {string} mensagem - Mensagem a exibir
     * @param {string} tipo - Tipo da mensagem (success, error)
     */
    mostrarToast(mensagem, tipo = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = mensagem;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    },

    /**
     * Formata número como moeda brasileira
     * @param {number} valor - Valor a formatar
     * @returns {string} Valor formatado
     */
    formatarMoeda(valor) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    },

    /**
     * Escapa HTML para prevenir XSS
     * @param {string} texto - Texto para escapar
     * @returns {string} Texto escapado
     */
    escapeHtml(texto) {
        const div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML;
    }
};

// Inicializa a aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});