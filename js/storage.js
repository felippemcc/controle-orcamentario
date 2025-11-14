// ========================================
// STORAGE.JS - LocalStorage
// ========================================

// Funções auxiliares para manipulação de localStorage
const Storage = {
    // Salvar dados
    salvar(chave, dados) {
        try {
            localStorage.setItem(chave, JSON.stringify(dados));
            return true;
        } catch (error) {
            console.error('Erro ao salvar no localStorage:', error);
            return false;
        }
    },

    // Carregar dados
    carregar(chave) {
        try {
            const dados = localStorage.getItem(chave);
            return dados ? JSON.parse(dados) : null;
        } catch (error) {
            console.error('Erro ao carregar do localStorage:', error);
            return null;
        }
    },

    // Remover dados
    remover(chave) {
        try {
            localStorage.removeItem(chave);
            return true;
        } catch (error) {
            console.error('Erro ao remover do localStorage:', error);
            return false;
        }
    },

    // Limpar tudo
    limparTudo() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Erro ao limpar localStorage:', error);
            return false;
        }
    }
};

// Exportar para uso global (opcional)
window.Storage = Storage;