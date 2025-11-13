# 📊 Controle de Orçamentos

Sistema de gestão e controle de orçamentos por blocos e categorias. Interface minimalista e intuitiva para gerenciar orçamentos de projetos, departamentos ou categorias.

![Status](https://img.shields.io/badge/status-active-success.svg)
![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🎯 Funcionalidades

### Dashboard com KPIs
- **Total Orçado**: Soma de todos os valores orçados
- **Total Realizado**: Soma de todos os valores já realizados
- **Diferença**: Comparativo entre orçado e realizado
- **Blocos Ativos**: Quantidade de blocos em andamento

### Gestão de Blocos
- ✅ Criar novos blocos de orçamento
- ✅ Visualizar progresso em tempo real
- ✅ Indicadores visuais de status (verde/amarelo/vermelho)
- ✅ Organização por categorias
- ✅ Exclusão de blocos
- ✅ Persistência local dos dados

### Interface
- 🎨 Design minimalista e moderno
- 📱 Totalmente responsivo (mobile, tablet, desktop)
- ⚡ Feedback visual instantâneo
- 🔔 Notificações toast
- 🌙 Suporte a dark mode (opcional)

## 🛠️ Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Grid, Flexbox, Variáveis CSS, Animações
- **JavaScript (Vanilla)** - ES6+, Modular
- **LocalStorage** - Persistência de dados local

## 📁 Estrutura do Projeto

```
controle-orcamentos/
│
├── index.html                 # Página principal
│
├── css/
│   ├── style.css             # Estilos principais
│   └── responsive.css        # Media queries
│
├── js/
│   ├── app.js                # Lógica principal
│   ├── modal.js              # Gerenciamento de modais
│   └── storage.js            # LocalStorage
│
├── assets/
│   └── favicon.ico           # Ícone do site
│
├── docs/
│   └── screenshots/          # Capturas de tela
│
├── README.md                 # Documentação
├── .gitignore                # Arquivos ignorados
└── LICENSE                   # Licença MIT
```

## 🚀 Como Usar

### Opção 1: Abrir Localmente

1. Clone o repositório:
```bash
git clone https://github.com/felippemcc/controle-orcamentos.git
cd controle-orcamentos
```

2. Abra o arquivo `index.html` no navegador
   - Ou use Live Server no VS Code
   - Ou use Python: `python -m http.server 8000`

### Opção 2: Deploy no Netlify

1. Faça login no [Netlify](https://www.netlify.com)
2. Arraste a pasta do projeto para o Netlify Drop
3. Ou conecte seu repositório GitHub para deploy automático

### Opção 3: GitHub Pages

1. Vá em Settings → Pages
2. Selecione a branch `main` e pasta `root`
3. Salve e aguarde alguns minutos
4. Acesse: `https://felippemcc.github.io/controle-orcamentos`

## 💻 Uso da Aplicação

### Criar um Novo Bloco

1. Clique em **"+ Novo Bloco"**
2. Preencha os dados:
   - Nome do bloco (obrigatório)
   - Descrição (opcional)
   - Valor orçado (obrigatório)
   - Valor realizado
   - Categoria
3. Clique em **"Salvar Bloco"**

### Acompanhar Progresso

- **Verde**: 0-80% do orçamento utilizado
- **Amarelo**: 80-100% do orçamento utilizado  
- **Vermelho**: Acima de 100% (orçamento excedido)

### Excluir um Bloco

1. Clique no ícone 🗑️ no card do bloco
2. Confirme a exclusão

## 🎨 Personalização

### Alterar Cores

Edite as variáveis CSS em `css/style.css`:

```css
:root {
    --bg: #FAFAFA;          /* Fundo */
    --card: #FFFFFF;        /* Cards */
    --text: #1A1A1A;        /* Texto principal */
    --accent: #3B82F6;      /* Cor de destaque */
    --success: #10B981;     /* Verde */
    --warning: #F59E0B;     /* Amarelo */
    --danger: #EF4444;      /* Vermelho */
}
```

### Adicionar Categorias

Edite o `<select>` em `index.html`:

```html
<option value="NovaCategoria">Nova Categoria</option>
```

## 📊 Dados e Privacidade

- Todos os dados são salvos **localmente** no navegador (LocalStorage)
- Nenhum dado é enviado para servidores externos
- Para backup, use a função de exportação (futura feature)
- Limpar cache do navegador apaga os dados

## 🔜 Próximas Funcionalidades

- [ ] Editar blocos existentes
- [ ] Filtros por categoria e período
- [ ] Gráficos interativos (Chart.js)
- [ ] Exportação para PDF/Excel
- [ ] Histórico de alterações
- [ ] Modo escuro
- [ ] Sub-itens dentro dos blocos
- [ ] Multi-usuário com backend

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch: `git checkout -b minha-feature`
3. Commit suas mudanças: `git commit -m 'Adiciona feature X'`
4. Push para a branch: `git push origin minha-feature`
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Felippe Moura**

- GitHub: [@felippemcc](https://github.com/felippemcc)
- LinkedIn: [Felippe Moura](https://linkedin.com/in/seu-perfil)
- Portfolio: [felippemcc.github.io](https://felippemcc.github.io)

## 🙏 Agradecimentos

- Design inspirado em Linear, Notion e Arc Browser
- Ícones: Unicode Emoji
- Fontes: System Fonts Stack

---

**Feito com ❤️ por Felippe Moura**