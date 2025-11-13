/**
 * MODAL.JS
 * Gerenciamento de modais (abrir, fechar, validação)
 */

const Modal = {
    // Elementos do DOM
    modal: null,
    form: null,
    btnAbrir: null,
    btnFechar: null,
    btnCancelar: null,

    // Estado atual
    modoEdicao: false,
    blocoEmEdicao: null,

    /**
     * Inicializa o modal
     */
    init() {
        this.modal = document.getElementById('modal');
        this.form = document.getElementById('blocoForm');
        this.btnAbrir = document.getElementById('btnNovoBloco');
        this.btnFechar = document.getElementById('btnCloseModal');
        this.btnCancelar = document.getElementById('btnCancelar');

        this.bindEvents();
    },

    /**
     * Vincula eventos aos elementos
     */
    bindEvents() {
        // Abrir modal
        this.btnAbrir.addEventListener('click', () => this.abrir());

        // Fechar modal
        this.btnFechar.addEventListener('click', () => this.fechar());
        this.btnCancelar.addEventListener('click', () => this.fechar());

        // Fechar ao clicar fora
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.fechar();
            }
        });

        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.fechar();
            }
        });

        // Prevenir submit padrão
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    },

    /**
     * Abre o modal
     * @param {Object} bloco - Bloco para edição (opcional)
     */
    abrir(bloco = null) {
        if (bloco) {
            // Modo edição
            this.modoEdicao = true;
            this.blocoEmEdicao = bloco;
            this.preencherFormulario(bloco);
            document.getElementById('modalTitle').textContent = 'Editar Bloco';
        } else {
            // Modo criação
            this.modoEdicao = false;
            this.blocoEmEdicao = null;
            this.form.reset();
            document.getElementById('modalTitle').textContent = 'Novo Bloco de Orçamento';
        }

        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Previne scroll
        
        // Foca no primeiro input
        setTimeout(() => {
            document.getElementById('nomeBloco').focus();
        }, 100);
    },

    /**
     * Fecha o modal
     */
    fechar() {
        this.modal.classList.remove('active');
        document.body.style.overflow = ''; // Restaura scroll
        this.form.reset();
        this.modoEdicao = false;
        this.blocoEmEdicao = null;
    },

    /**
     * Preenche o formulário com dados do bloco
     * @param {Object} bloco - Dados do bloco
     */
    preencherFormulario(bloco) {
        document.getElementById('nomeBloco').value = bloco.nome || '';
        document.getElementById('descricao').value = bloco.descricao || '';
        document.getElementById('orcado').value = bloco.orcado || 0;
        document.getElementById('realizado').value = bloco.realizado || 0;
        document.getElementById('categoria').value = bloco.categoria || '';
    },

    /**
     * Obtém os dados do formulário
     * @returns {Object} Dados do formulário
     */
    obterDados() {
        return {
            nome: document.getElementById('nomeBloco').value.trim(),
            descricao: document.getElementById('descricao').value.trim(),
            orcado: parseFloat(document.getElementById('orcado').value) || 0,
            realizado: parseFloat(document.getElementById('realizado').value) || 0,
            categoria: document.getElementById('categoria').value
        };
    },

    /**
     * Valida os dados do formulário
     * @param {Object} dados - Dados para validar
     * @returns {Object} { valido: boolean, erros: Array }
     */
    validar(dados) {
        const erros = [];

        if (!dados.nome || dados.nome.length < 3) {
            erros.push('Nome do bloco deve ter no mínimo 3 caracteres');
        }

        if (dados.orcado <= 0) {
            erros.push('Valor orçado deve ser maior que zero');
        }

        if (dados.realizado < 0) {
            erros.push('Valor realizado não pode ser negativo');
        }

        if (!dados.categoria) {
            erros.push('Selecione uma categoria');
        }

        return {
            valido: erros.length === 0,
            erros
        };
    },

    /**
     * Exibe erros de validação
     * @param {Array} erros - Lista de erros
     */
    exibirErros(erros) {
        const mensagem = erros.join('\n');
        alert(mensagem); // Pode ser substituído por toast ou modal de erro
    }
};

// Torna o Modal disponível globalmente
window.Modal = Modal;