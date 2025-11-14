# 📊 Controle de Orçamentos

Sistema de gestão e controle de orçamentos por blocos e categorias. Interface minimalista e intuitiva para gerenciar orçamentos de projetos, departamentos ou categorias.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Funcionalidades

### Dashboard e KPIs
- 📈 **Total Orçado**: Soma de todos os valores orçados
- 💰 **Total Realizado**: Soma de todos os valores já realizados
- 📊 **Diferença**: Comparativo entre orçado e realizado
- 🔢 **Blocos Ativos**: Quantidade de blocos em andamento

### Gerenciamento de Blocos
- ✅ **Criar blocos**: Adicione novos blocos de orçamento
- ✏️ **Editar blocos**: Modifique blocos existentes (v2.0)
- 🗑️ **Excluir blocos**: Remova blocos com confirmação
- 👁️ **Visualizar progresso**: Acompanhe em tempo real
- 🎯 **Indicadores visuais**: Status por cores (verde/amarelo/vermelho)

### Organização e Filtros
- 📁 **8 categorias pré-definidas**: Infraestrutura, Marketing, RH, Tecnologia, Produção, Administrativo, Cultural, Outros
- 🔍 **Filtro por categoria**: Visualize apenas a categoria desejada (v2.0)
- 📦 **Empty states**: Mensagens quando não há blocos

### Interface e Experiência
- 🎨 **Design minimalista**: Interface clean e moderna
- 🌙 **Modo escuro**: Toggle para tema claro/escuro (v2.0)
- 📱 **Totalmente responsivo**: Funciona em mobile, tablet e desktop
- ⚡ **Feedback instantâneo**: Animações e transições suaves
- 🔔 **Notificações toast**: Confirmações visuais de ações

### Dados e Persistência
- 💾 **LocalStorage**: Todos os dados salvos localmente
- 🔒 **Privacidade total**: Nenhum dado enviado para servidores
- 💡 **Preferências salvas**: Tema escolhido é mantido

## 🛠️ Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Grid, Flexbox, Variáveis CSS, Animações, Dark Mode
- **JavaScript (Vanilla)** - ES6+, Modular, sem dependências
- **LocalStorage** - Persistência de dados local

## 📁 Estrutura do Projeto

```
controle-orcamentario/
│
├── index.html              # Página principal
│
├── css/
│   ├── style.css          # Estilos principais + Dark Mode
│   └── responsive.css     # Media queries
│
├── js/
│   ├── app.js             # Lógica principal (CRUD, filtros, tema)
│   ├── modals.js          # Gerenciamento de modais
│   └── storage.js         # Funções auxiliares LocalStorage
│
├── assets/
│   └── favicon.ico        # Ícone do site
│
├── README.md              # Documentação
├── .gitignore            # Arquivos ignorados
└── LICENSE               # Licença MIT
```

## 🚀 Como Usar

### Instalação Local

1. Clone o repositório:
```bash
git clone https://github.com/felippemcc/controle-orcamentario.git
cd controle-orcamentario
```

2. Abra o arquivo `index.html` no navegador
   - Duplo clique no arquivo, ou
   - Use Live Server no VS Code, ou
   - Use Python: `python -m http.server 8000`

### Deploy

#### Netlify
1. Faça login no [Netlify](https://www.netlify.com)
2. Arraste a pasta do projeto para o Netlify Drop
3. Ou conecte seu repositório GitHub para deploy automático

#### GitHub Pages
1. Vá em Settings → Pages
2. Selecione a branch `main` e pasta `root`
3. Salve e aguarde alguns minutos
4. Acesse: `https://seu-usuario.github.io/controle-orcamentario`

## 📖 Guia de Uso

### Criar um Bloco
1. Clique em "+ Novo Bloco"
2. Preencha os dados:
   - Nome do bloco (obrigatório)
   - Descrição (opcional)
   - Valor orçado (obrigatório)
   - Valor realizado
   - Categoria
3. Clique em "Salvar Bloco"

### Editar um Bloco
1. Clique no ícone ✏️ no card do bloco
2. Modifique os dados desejados
3. Clique em "Salvar Bloco"

### Filtrar por Categoria
1. Use o dropdown no topo da seção "Blocos de Orçamento"
2. Selecione a categoria desejada
3. Os blocos serão filtrados automaticamente

### Alternar Tema (Claro/Escuro)
1. Clique no toggle ☀️/🌙 no header
2. A preferência será salva automaticamente

### Indicadores de Status
- 🟢 **Verde**: 0-80% do orçamento utilizado
- 🟡 **Amarelo**: 80-100% do orçamento utilizado
- 🔴 **Vermelho**: Acima de 100% (orçamento excedido)

### Excluir um Bloco
1. Clique no ícone 🗑️ no card do bloco
2. Confirme a exclusão

## 🎨 Personalização

### Cores do Tema

Edite as variáveis CSS em `css/style.css`:

```css
:root {
  --bg: #FAFAFA;           /* Fundo claro */
  --card: #FFFFFF;         /* Cards */
  --text: #1A1A1A;         /* Texto principal */
  --accent: #3B82F6;       /* Cor de destaque */
  --success: #10B981;      /* Verde */
  --warning: #F59E0B;      /* Amarelo */
  --danger: #EF4444;       /* Vermelho */
}

[data-theme="dark"] {
  --bg: #0F0F0F;           /* Fundo escuro */
  --card: #1A1A1A;         /* Cards escuros */
  --text: #FAFAFA;         /* Texto claro */
  /* ... */
}
```

### Adicionar Categorias

Edite o `<select>` em `index.html` (aparece em 2 lugares):

```html
<option value="NovaCategoria">🆕 Nova Categoria</option>
```

## 🔐 Privacidade e Segurança

- ✅ Todos os dados são salvos **localmente** no navegador (LocalStorage)
- ✅ **Nenhum dado** é enviado para servidores externos
- ✅ Não há coleta de informações pessoais
- ⚠️ Limpar cache do navegador **apaga todos os dados**
- 💡 Para backup futuro, será implementada exportação em PDF/Excel

## 🔜 Roadmap

### ✅ Implementado (v2.0)
- [x] Criar blocos de orçamento
- [x] Visualizar progresso em tempo real
- [x] Indicadores visuais de status
- [x] Organização por categorias
- [x] Exclusão de blocos
- [x] Persistência local dos dados
- [x] Design responsivo
- [x] **Editar blocos existentes** (Novo!)
- [x] **Filtros por categoria** (Novo!)
- [x] **Modo escuro completo** (Novo!)

### 🚧 Em Desenvolvimento
- [ ] Gráficos interativos (Chart.js)
- [ ] Exportação para PDF/Excel
- [ ] Filtros por período/data

### 🔮 Futuro (v3.0+)
- [ ] Histórico de alterações
- [ ] Sub-itens dentro dos blocos
- [ ] Múltiplos projetos/workspaces
- [ ] Tags personalizadas
- [ ] Busca textual
- [ ] Importação de dados (CSV)
- [ ] Multi-usuário com backend (opcional)
- [ ] Notificações de orçamento próximo do limite
- [ ] Relatórios automáticos

## 🤝 Como Contribuir

Contribuições são muito bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature: `git checkout -b feature/MinhaFeature`
3. Commit suas mudanças: `git commit -m 'Adiciona MinhaFeature'`
4. Push para a branch: `git push origin feature/MinhaFeature`
5. Abra um Pull Request

### Diretrizes
- Mantenha o código limpo e documentado
- Siga o padrão de código existente
- Teste suas alterações antes de enviar
- Atualize o README se necessário

## 📝 Changelog

### v2.0.0 (2024)
- ✨ Adicionado edição de blocos existentes
- ✨ Implementado filtro por categoria
- ✨ Sistema completo de modo escuro (dark mode)
- 🎨 Melhorias visuais no layout
- 🐛 Correções de bugs menores

### v1.0.0 (2024)
- 🎉 Lançamento inicial
- ✅ CRUD básico de blocos
- 📊 Dashboard com KPIs
- 📱 Interface responsiva

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Felippe Moura**

- GitHub: [@felippemcc](https://github.com/felippemcc)
- LinkedIn: [Felippe Moura](https://linkedin.com/in/seu-perfil)
- Portfolio: [felippemcc.github.io](https://felippemcc.github.io)

## 🙏 Agradecimentos

- Design inspirado em [Linear](https://linear.app), [Notion](https://notion.so) e [Arc Browser](https://arc.net)
- Ícones: Unicode Emoji
- Fontes: System Fonts Stack

---

<div align="center">
  Feito com ❤️ por Felippe Moura
  <br>
  ⭐ Deixe uma estrela se este projeto foi útil!
</div>
