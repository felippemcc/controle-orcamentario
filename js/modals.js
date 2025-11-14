// ========================================
// MODALS.JS - Gerenciamento de Modais
// ========================================

function openModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.add('active');
        
        // Se não estiver editando, limpar o form e resetar título
        if (window.blocoEditando === null || window.blocoEditando === undefined) {
            const form = document.getElementById('blocoForm');
            if (form) {
                form.reset();
            }
            document.getElementById('modalTitle').textContent = 'Novo Bloco de Orçamento';
        }
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('active');
        // Resetar o estado de edição
        if (typeof blocoEditando !== 'undefined') {
            window.blocoEditando = null;
        }
    }
}