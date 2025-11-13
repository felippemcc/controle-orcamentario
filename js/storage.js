/**
 * STORAGE.JS
 * Gerenciamento de dados com LocalStorage
 * Responsável por salvar, carregar e manipular os blocos
 */

const Storage = {
    // Chave do LocalStorage
    STORAGE_KEY: 'controle_orcamentos_blocos',

    /**
     * Carrega todos os blocos do LocalStorage
     * @returns {Array} Array de blocos
     */
    carregarBlocos() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Erro ao carregar blocos:', error);
            return [];
        }
    },

    /**
     * Salva os blocos no LocalStorage
     * @param {Array} blocos - Array de blocos para salvar
     * @returns {boolean} Sucesso da operação
     */
    salvarBlocos(blocos) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(blocos));
            return true;
        } catch (error) {
            console.error('Erro ao salvar blocos:', error);
            return false;
        }
    },

    /**
     * Adiciona um novo bloco
     * @param {Object} bloco - Objeto do bloco a ser adicionado
     * @returns {boolean} Sucesso da operação
     */
    adicionarBloco(bloco) {
        try {
            const blocos = this.carregarBlocos();
            
            // Adiciona ID único e timestamp
            const novoBloco = {
                id: Date.now(),
                ...bloco,
                dataCriacao: new Date().toISOString(),
                dataAtualizacao: new Date().toISOString()
            };

            blocos.push(novoBloco);
            return this.salvarBlocos(blocos);
        } catch (error) {
            console.error('Erro ao adicionar bloco:', error);
            return false;
        }
    },

    /**
     * Atualiza um bloco existente
     * @param {number} id - ID do bloco
     * @param {Object} dadosAtualizados - Dados para atualizar
     * @returns {boolean} Sucesso da operação
     */
    atualizarBloco(id, dadosAtualizados) {
        try {
            const blocos = this.carregarBlocos();
            const index = blocos.findIndex(b => b.id === id);

            if (index === -1) {
                console.error('Bloco não encontrado');
                return false;
            }

            blocos[index] = {
                ...blocos[index],
                ...dadosAtualizados,
                dataAtualizacao: new Date().toISOString()
            };

            return this.salvarBlocos(blocos);
        } catch (error) {
            console.error('Erro ao atualizar bloco:', error);
            return false;
        }
    },

    /**
     * Remove um bloco
     * @param {number} id - ID do bloco a ser removido
     * @returns {boolean} Sucesso da operação
     */
    removerBloco(id) {
        try {
            const blocos = this.carregarBlocos();
            const blocosFiltrados = blocos.filter(b => b.id !== id);
            return this.salvarBlocos(blocosFiltrados);
        } catch (error) {
            console.error('Erro ao remover bloco:', error);
            return false;
        }
    },

    /**
     * Busca um bloco pelo ID
     * @param {number} id - ID do bloco
     * @returns {Object|null} Bloco encontrado ou null
     */
    buscarBloco(id) {
        try {
            const blocos = this.carregarBlocos();
            return blocos.find(b => b.id === id) || null;
        } catch (error) {
            console.error('Erro ao buscar bloco:', error);
            return null;
        }
    },

    /**
     * Limpa todos os dados (use com cuidado)
     * @returns {boolean} Sucesso da operação
     */
    limparTudo() {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
            return true;
        } catch (error) {
            console.error('Erro ao limpar dados:', error);
            return false;
        }
    },

    /**
     * Exporta os dados como JSON
     * @returns {string} JSON string dos blocos
     */
    exportarDados() {
        try {
            const blocos = this.carregarBlocos();
            return JSON.stringify(blocos, null, 2);
        } catch (error) {
            console.error('Erro ao exportar dados:', error);
            return null;
        }
    },

    /**
     * Importa dados de um JSON
     * @param {string} jsonString - String JSON com os blocos
     * @returns {boolean} Sucesso da operação
     */
    importarDados(jsonString) {
        try {
            const blocos = JSON.parse(jsonString);
            
            if (!Array.isArray(blocos)) {
                throw new Error('Dados inválidos');
            }

            return this.salvarBlocos(blocos);
        } catch (error) {
            console.error('Erro ao importar dados:', error);
            return false;
        }
    }
};

// Torna o Storage disponível globalmente
window.Storage = Storage;