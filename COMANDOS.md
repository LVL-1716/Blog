# ⚙️ Comandos Úteis

Referência rápida de comandos para o projeto.

---

## 📦 NPM - Gerenciamento de Pacotes

### Instalação
```bash
# Instalar todas as dependências
npm install

# Instalar pacote específico
npm install nome-do-pacote

# Instalar como dev dependency
npm install -D nome-do-pacote

# Limpar e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Atualização
```bash
# Ver pacotes desatualizados
npm outdated

# Atualizar pacote específico
npm update nome-do-pacote

# Atualizar todos
npm update

# Atualizar para versão major
npm install nome-do-pacote@latest
```

---

## 🚀 Next.js - Desenvolvimento e Build

### Desenvolvimento
```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Iniciar em porta específica
npm run dev -- -p 3001

# Limpar cache e reiniciar
rm -rf .next
npm run dev
```

### Build e Produção
```bash
# Build para produção
npm run build

# Iniciar servidor de produção
npm start

# Build e start em porta específica
npm run build
npm start -- -p 3001

# Analisar bundle
npm run build
# Veja o output no terminal
```

### Lint
```bash
# Verificar erros de lint
npm run lint

# Corrigir automaticamente
npm run lint -- --fix
```

---

## 📁 Arquivos e Diretórios (Windows)

### Navegação
```bash
# Listar arquivos
dir

# Mudar diretório
cd pasta

# Voltar um nível
cd ..

# Ir para raiz do projeto
cd c:\Users\Luciano\Desktop\Blog
```

### Manipulação
```bash
# Criar pasta
mkdir nome-da-pasta

# Criar arquivo vazio
type nul > arquivo.txt

# Copiar arquivo
copy origem.txt destino.txt

# Mover arquivo
move origem.txt destino.txt

# Deletar arquivo
del arquivo.txt

# Deletar pasta
rmdir /s pasta
```

### Busca
```bash
# Procurar por texto em arquivos
findstr "texto" *.tsx

# Procurar arquivo por nome
dir /s arquivo.tsx
```

---

## 🔧 Git - Controle de Versão

### Configuração Inicial
```bash
# Inicializar repositório
git init

# Configurar usuário
git config user.name "Seu Nome"
git config user.email "seu@email.com"

# Adicionar remote
git remote add origin https://github.com/usuario/repo.git
```

### Operações Básicas
```bash
# Ver status
git status

# Adicionar arquivos
git add .
git add arquivo.tsx

# Commit
git commit -m "Mensagem do commit"

# Push
git push origin main

# Pull
git pull origin main
```

### Branches
```bash
# Ver branches
git branch

# Criar branch
git branch nome-branch

# Mudar de branch
git checkout nome-branch

# Criar e mudar
git checkout -b nome-branch

# Deletar branch
git branch -d nome-branch
```

### Histórico
```bash
# Ver histórico
git log

# Ver histórico resumido
git log --oneline

# Ver diff
git diff

# Ver diff de arquivo específico
git diff arquivo.tsx
```

---

## 🌐 Vercel - Deploy

### Instalação CLI
```bash
# Instalar Vercel CLI
npm install -g vercel
```

### Deploy
```bash
# Login
vercel login

# Deploy (preview)
vercel

# Deploy (produção)
vercel --prod

# Ver logs
vercel logs
```

---

## 🔍 Debug e Teste

### Node.js
```bash
# Verificar versão do Node
node --version

# Verificar versão do npm
npm --version

# Executar script Node
node script.js
```

### Processos e Portas (Windows)
```bash
# Ver processos na porta 3000
netstat -ano | findstr :3000

# Matar processo por PID
taskkill /PID 1234 /F

# Ver todos os processos Node
tasklist | findstr node
```

### Limpeza
```bash
# Limpar cache do npm
npm cache clean --force

# Limpar .next
rmdir /s .next

# Limpar node_modules
rmdir /s node_modules
```

---

## 📝 Utilitários

### JSON
```bash
# Validar JSON (usando Python)
python -m json.tool data/artigos.json

# Formatar JSON (Node)
node -e "console.log(JSON.stringify(require('./data/artigos.json'), null, 2))"
```

### Contagem
```bash
# Contar linhas de código
find . -name "*.tsx" -o -name "*.ts" | xargs wc -l

# Windows (PowerShell)
Get-ChildItem -Recurse -Include *.tsx,*.ts | Get-Content | Measure-Object -Line
```

### Informações do Sistema
```bash
# Ver informações do sistema (Windows)
systeminfo

# Ver espaço em disco
wmic logicaldisk get size,freespace,caption
```

---

## 🧪 Testing (Futuro)

### Jest (se adicionar)
```bash
# Instalar Jest
npm install -D jest @testing-library/react @testing-library/jest-dom

# Rodar testes
npm test

# Rodar com coverage
npm test -- --coverage

# Rodar em watch mode
npm test -- --watch
```

### Playwright (se adicionar)
```bash
# Instalar Playwright
npm install -D @playwright/test

# Rodar testes E2E
npx playwright test

# Rodar em modo UI
npx playwright test --ui
```

---

## 📊 Análise de Performance

### Lighthouse
```bash
# Instalar Lighthouse CLI
npm install -g lighthouse

# Rodar análise
lighthouse http://localhost:3000 --view

# Salvar relatório
lighthouse http://localhost:3000 --output=html --output-path=./lighthouse-report.html
```

### Bundle Analyzer
```bash
# Instalar
npm install -D @next/bundle-analyzer

# Configurar em next.config.js
# Rodar com análise
ANALYZE=true npm run build
```

---

## 🔐 Variáveis de Ambiente

### Criar .env.local
```bash
# Criar arquivo
type nul > .env.local

# Editar (use seu editor preferido)
notepad .env.local
```

### Variáveis úteis
```env
# .env.local
NEXT_PUBLIC_API_URL=https://api.exemplo.com
API_SECRET_KEY=sua-chave-secreta
NODE_ENV=development
```

### Uso
```typescript
// Acessível no browser
const publicUrl = process.env.NEXT_PUBLIC_API_URL;

// Apenas no servidor
const secretKey = process.env.API_SECRET_KEY;
```

---

## 🎨 VS Code - Atalhos Úteis

### Navegação
- `Ctrl+P` - Buscar arquivo
- `Ctrl+Shift+F` - Buscar em arquivos
- `Ctrl+G` - Ir para linha
- `Ctrl+B` - Toggle sidebar

### Edição
- `Alt+↑/↓` - Mover linha
- `Ctrl+D` - Selecionar próxima ocorrência
- `Ctrl+/` - Comentar linha
- `Alt+Shift+↓` - Duplicar linha

### Terminal
- `Ctrl+'` - Toggle terminal
- `Ctrl+Shift+'` - Novo terminal

---

## 📦 Scripts Personalizados (Adicionar ao package.json)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "clean": "rm -rf .next node_modules",
    "reinstall": "npm run clean && npm install",
    "analyze": "ANALYZE=true npm run build"
  }
}
```

Uso:
```bash
npm run clean
npm run reinstall
npm run analyze
```

---

## 🔗 Links Rápidos

- [NPM Documentation](https://docs.npmjs.com/)
- [Git Documentation](https://git-scm.com/doc)
- [Vercel CLI](https://vercel.com/docs/cli)
- [VS Code Shortcuts](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)

---

Mantenha este arquivo como referência rápida! 📌
