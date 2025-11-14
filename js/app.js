// ========================================
// CONTROLE DE ORÇAMENTOS - APP.JS
// ========================================

let blocos = JSON.parse(localStorage.getItem('blocos')) || [];
let blocoEditando = null; // Armazena o índice do bloco sendo editado
let categoriaFiltro = 'todas'; // Categoria selecionada no filtro

// Inicializar tema
function inicializarTema() {
    const temaSalvo = localStorage.getItem('tema') || 'light';
    aplicarTema(temaSalvo);
}

// Aplicar tema
function aplicarTema(tema) {
    document.documentElement.setAttribute('data-theme', tema);
    localStorage.setItem('tema', tema);
    
    const themeSwitch = document.getElementById('themeSwitch');
    const themeIcon = document.querySelector('.theme-icon');
    
    if (tema === 'dark') {
        themeSwitch.classList.add('active');
        themeIcon.textContent = '🌙';
    } else {
        themeSwitch.classList.remove('active');
        themeIcon.textContent = '☀️';
    }
}

// Toggle tema
function toggleTema() {
    const temaAtual = document.documentElement.getAttribute('data-theme');
    const novoTema = temaAtual === 'dark' ? 'light' : 'dark';
    aplicarTema(novoTema);
}

// Atualizar KPIs
function atualizarKPIs() {
    const totalOrcado = blocos.reduce((sum, b) => sum + parseFloat(b.orcado), 0);
    const totalRealizado = blocos.reduce((sum, b) => sum + parseFloat(b.realizado), 0);
    const diferenca = totalOrcado - totalRealizado;
    const percentRealizado = totalOrcado > 0 ? (totalRealizado / totalOrcado * 100).toFixed(1) : 0;

    document.getElementById('totalOrcado').textContent = formatarMoeda(totalOrcado);
    document.getElementById('totalRealizado').textContent = formatarMoeda(totalRealizado);
    document.getElementById('diferenca').textContent = formatarMoeda(Math.abs(diferenca));
    document.getElementById('totalBlocos').textContent = blocos.length;
    
    const percentEl = document.getElementById('percentRealizado');
    percentEl.textContent = `${percentRealizado}% do orçado`;
    percentEl.className = 'kpi-change ' + (percentRealizado > 100 ? 'negative' : 'positive');
    
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
}

// Renderizar blocos
function renderBlocos() {
    const container = document.getElementById('blocosContainer');
    
    // Filtrar blocos por categoria
    const blocosFiltrados = categoriaFiltro === 'todas' 
        ? blocos 
        : blocos.filter(b => b.categoria === categoriaFiltro);
    
    if (blocosFiltrados.length === 0) {
        const mensagem = categoriaFiltro === 'todas' 
            ? 'Nenhum bloco criado ainda' 
            : `Nenhum bloco na categoria "${categoriaFiltro}"`;
        
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <div class="empty-state-icon">📦</div>
                <h3>${mensagem}</h3>
                <p>${categoriaFiltro === 'todas' ? 'Crie seu primeiro bloco de orçamento clicando no botão acima' : 'Tente selecionar outra categoria'}</p>
            </div>
        `;
        return;
    }

    container.innerHTML = blocosFiltrados.map((bloco) => {
        const index = blocos.indexOf(bloco); // Índice real no array original
        const progresso = (bloco.realizado / bloco.orcado * 100).toFixed(1);
        const progressClass = progresso > 100 ? 'danger' : progresso > 80 ? 'warning' : '';
        
        return `
            <div class="bloco-card">
                <div class="bloco-header">
                    <div>
                        <div class="bloco-name">${bloco.nome}</div>
                        <div class="bloco-meta">${bloco.categoria}</div>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button class="btn btn-secondary" onclick="editarBloco(${index})" style="padding: 8px 12px; font-size: 12px;" title="Editar bloco">
                            ✏️
                        </button>
                        <button class="btn btn-secondary" onclick="excluirBloco(${index})" style="padding: 8px 12px; font-size: 12px;" title="Excluir bloco">
                            🗑️
                        </button>
                    </div>
                </div>
                ${bloco.descricao ? `<p style="color: var(--text-light); font-size: 14px; margin-bottom: 16px;">${bloco.descricao}</p>` : ''}
                <div class="progress-bar">
                    <div class="progress-fill ${progressClass}" style="width: ${Math.min(progresso, 100)}%"></div>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 16px; font-size: 14px;">
                    <span>${progresso}% realizado</span>
                    <span style="color: var(--text-light);">${formatarMoeda(bloco.realizado)} / ${formatarMoeda(bloco.orcado)}</span>
                </div>
                <div class="bloco-stats">
                    <div class="stat">
                        <span class="stat-value">${formatarMoeda(bloco.orcado)}</span>
                        <span class="stat-label">Orçado</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${formatarMoeda(bloco.realizado)}</span>
                        <span class="stat-label">Realizado</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value" style="color: ${bloco.orcado - bloco.realizado >= 0 ? 'var(--success)' : 'var(--danger)'}">
                            ${formatarMoeda(Math.abs(bloco.orcado - bloco.realizado))}
                        </span>
                        <span class="stat-label">${bloco.orcado - bloco.realizado >= 0 ? 'Restante' : 'Excedido'}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Aplicar filtro de categoria
function filtrarPorCategoria(categoria) {
    categoriaFiltro = categoria;
    renderBlocos();
    
    // Atualizar aparência do select
    const selectFiltro = document.getElementById('filtroCategoria');
    if (selectFiltro) {
        selectFiltro.value = categoria;
    }
}

// Formatação de moeda
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}

// Abrir modal
function openModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.add('active');
        const form = document.getElementById('blocoForm');
        if (form) {
            form.reset();
        }
    }
}

// Fechar modal
function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Salvar bloco (criar ou editar)
function salvarBloco(e) {
    e.preventDefault();
    
    const blocoData = {
        nome: document.getElementById('nomeBloco').value,
        descricao: document.getElementById('descricao').value,
        orcado: parseFloat(document.getElementById('orcado').value),
        realizado: parseFloat(document.getElementById('realizado').value) || 0,
        categoria: document.getElementById('categoria').value,
        data: new Date().toISOString()
    };

    if (blocoEditando !== null) {
        // Editando bloco existente
        blocos[blocoEditando] = blocoData;
        mostrarToast('Bloco atualizado com sucesso! ✓');
        blocoEditando = null;
    } else {
        // Criando novo bloco
        blocos.push(blocoData);
        mostrarToast('Bloco criado com sucesso! ✓');
    }

    localStorage.setItem('blocos', JSON.stringify(blocos));
    
    closeModal();
    renderBlocos();
    atualizarKPIs();
}

// Editar bloco
function editarBloco(index) {
    blocoEditando = index;
    const bloco = blocos[index];
    
    // Preencher o formulário com os dados do bloco
    document.getElementById('nomeBloco').value = bloco.nome;
    document.getElementById('descricao').value = bloco.descricao || '';
    document.getElementById('orcado').value = bloco.orcado;
    document.getElementById('realizado').value = bloco.realizado;
    document.getElementById('categoria').value = bloco.categoria;
    
    // Mudar o título do modal
    document.getElementById('modalTitle').textContent = 'Editar Bloco de Orçamento';
    
    // Abrir o modal
    openModal();
}

// Excluir bloco
function excluirBloco(index) {
    if (confirm('Tem certeza que deseja excluir este bloco?')) {
        blocos.splice(index, 1);
        localStorage.setItem('blocos', JSON.stringify(blocos));
        renderBlocos();
        atualizarKPIs();
        mostrarToast('Bloco excluído com sucesso!');
    }
}

// Toast notification
function mostrarToast(mensagem) {
    const toast = document.getElementById('toast');
    toast.textContent = mensagem;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Inicialização quando o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tema
    inicializarTema();
    
    // Renderizar blocos iniciais
    renderBlocos();
    atualizarKPIs();

    // Toggle de tema
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTema);
    }

    // Botão Novo Bloco
    const btnNovoBloco = document.getElementById('btnNovoBloco');
    if (btnNovoBloco) {
        btnNovoBloco.addEventListener('click', function() {
            openModal();
        });
    }

    // Filtro de categoria
    const filtroCategoria = document.getElementById('filtroCategoria');
    if (filtroCategoria) {
        filtroCategoria.addEventListener('change', function() {
            filtrarPorCategoria(this.value);
        });
    }

    // Botão fechar modal (X)
    const btnCloseModal = document.getElementById('btnCloseModal');
    if (btnCloseModal) {
        btnCloseModal.addEventListener('click', function() {
            closeModal();
        });
    }

    // Botão Cancelar
    const btnCancelar = document.getElementById('btnCancelar');
    if (btnCancelar) {
        btnCancelar.addEventListener('click', function() {
            closeModal();
        });
    }

    // Form submit
    const blocoForm = document.getElementById('blocoForm');
    if (blocoForm) {
        blocoForm.addEventListener('submit', salvarBloco);
    }

    // Fechar modal ao clicar fora
    const modal = document.getElementById('modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target.id === 'modal') {
                closeModal();
            }
        });
    }
});