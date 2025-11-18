# 📂 Estrutura do Projeto

```
Blog/
│
├── 📁 app/                          # Diretório principal do App Router
│   ├── 📁 artigos/
│   │   └── 📁 [slug]/              # Rota dinâmica para artigos individuais
│   │       ├── page.tsx            # Página do artigo (Server Component)
│   │       └── not-found.tsx       # Página 404 customizada
│   │
│   ├── layout.tsx                  # Layout raiz da aplicação
│   ├── page.tsx                    # Página inicial (listagem de artigos)
│   └── globals.css                 # Estilos globais
│
├── 📁 components/                   # Componentes reutilizáveis
│   └── ArtigoCard.tsx              # Card de artigo para a listagem
│
├── 📁 data/                         # Dados estáticos
│   └── artigos.json                # JSON com os artigos do blog
│
├── 📁 lib/                          # Funções auxiliares e utilitários
│   ├── artigos.ts                  # Funções de data fetching
│   └── api-exemplos.ts             # Exemplos de integração com APIs
│
├── 📁 Documentação/                 # Guias e documentação
│   ├── README.md                   # Documentação principal
│   ├── GUIA_RAPIDO.md             # Guia rápido de execução
│   ├── SEO_GUIDE.md               # Guia completo de SEO
│   ├── DATA_FETCHING_STRATEGIES.md # Estratégias de data fetching
│   └── CRUDCRUD_INTEGRATION.md    # Como integrar com CrudCrud API
│
├── .gitignore                      # Arquivos ignorados pelo Git
├── next.config.js                  # Configurações do Next.js
├── package.json                    # Dependências e scripts
└── tsconfig.json                   # Configurações do TypeScript
```

---

## 📄 Descrição dos Arquivos Principais

### `app/page.tsx`
Página inicial do blog que lista todos os artigos.

**Características:**
- Server Component assíncrono
- Busca dados com `getArtigos()`
- Metadados estáticos para SEO
- Renderiza grid de artigos usando `ArtigoCard`

```typescript
export default async function Home() {
  const artigos = await getArtigos();
  return <div>{/* listagem */}</div>;
}
```

---

### `app/artigos/[slug]/page.tsx`
Página dinâmica individual de cada artigo.

**Características:**
- Rota dinâmica com parâmetro `[slug]`
- `generateStaticParams()` para SSG
- `generateMetadata()` para SEO dinâmico
- Busca artigo específico com `getArtigoPorSlug()`
- Redireciona para 404 se não encontrado

```typescript
export async function generateStaticParams() {
  // Pré-renderiza todas as rotas em build time
}

export async function generateMetadata({ params }) {
  // Metadados únicos por artigo
}

export default async function ArtigoPage({ params }) {
  // Renderiza o artigo
}
```

---

### `app/layout.tsx`
Layout raiz que envolve todas as páginas.

**Características:**
- Define estrutura HTML base
- Define idioma (`lang="pt-BR"`)
- Metadados globais

---

### `app/globals.css`
Estilos globais da aplicação.

**Inclui:**
- Reset CSS
- Variáveis CSS (cores, fontes)
- Estilos para cards de artigos
- Estilos para página individual
- Media queries para responsividade

---

### `components/ArtigoCard.tsx`
Componente de card reutilizável para exibir artigos na listagem.

**Props:**
- `artigo: Artigo` - Dados do artigo

**Renderiza:**
- Título
- Autor e data
- Resumo
- Link "Ler artigo completo"

---

### `data/artigos.json`
Array JSON com os dados dos artigos.

**Estrutura:**
```json
{
  "id": 1,
  "slug": "url-amigavel",
  "titulo": "Título do Artigo",
  "autor": "Nome do Autor",
  "dataPublicacao": "2025-11-18",
  "resumo": "Breve descrição...",
  "conteudo": "Conteúdo completo..."
}
```

---

### `lib/artigos.ts`
Funções para manipulação de dados dos artigos.

**Funções:**
- `getArtigos()`: Retorna todos os artigos
- `getArtigoPorSlug(slug)`: Retorna artigo específico
- `formatarData(data)`: Formata data para pt-BR

**Interface:**
```typescript
interface Artigo {
  id: number;
  slug: string;
  titulo: string;
  autor: string;
  dataPublicacao: string;
  resumo: string;
  conteudo: string;
}
```

---

### `lib/api-exemplos.ts`
Exemplos comentados de como integrar com APIs externas.

**Opções:**
- CrudCrud API
- API própria
- Configuração de variáveis de ambiente

---

## 🔄 Fluxo de Dados

```
1. Usuário acessa "/"
   ↓
2. app/page.tsx é executado no servidor
   ↓
3. getArtigos() busca dados de data/artigos.json
   ↓
4. Renderiza listagem com ArtigoCard
   ↓
5. HTML completo é enviado ao navegador
   ↓
6. Usuário clica em um artigo
   ↓
7. app/artigos/[slug]/page.tsx é executado
   ↓
8. getArtigoPorSlug() busca artigo específico
   ↓
9. generateMetadata() define meta tags
   ↓
10. Renderiza página do artigo
    ↓
11. HTML completo é enviado ao navegador
```

---

## 🎨 Hierarquia de Componentes

```
RootLayout (app/layout.tsx)
│
├─── HomePage (app/page.tsx)
│    └─── ArtigoCard (x5) (components/ArtigoCard.tsx)
│
└─── ArtigoPage (app/artigos/[slug]/page.tsx)
     └─── (conteúdo do artigo)
```

---

## 📦 Dependências

### Produção
- `next`: Framework React (v15.0.0)
- `react`: Biblioteca React (v18.3.0)
- `react-dom`: DOM binding para React (v18.3.0)

### Desenvolvimento
- `typescript`: Suporte a TypeScript (v5.3.0)
- `@types/node`: Tipos do Node.js
- `@types/react`: Tipos do React
- `@types/react-dom`: Tipos do ReactDOM

---

## 🚀 Scripts Disponíveis

```json
{
  "dev": "next dev",        // Inicia servidor de desenvolvimento
  "build": "next build",    // Gera build de produção
  "start": "next start",    // Inicia servidor de produção
  "lint": "next lint"       // Verifica erros de lint
}
```

**Uso:**
```bash
npm run dev      # Desenvolvimento (localhost:3000)
npm run build    # Build para produção
npm start        # Produção (após build)
npm run lint     # Verificar código
```

---

## 🔍 Convenções de Nomenclatura

### Arquivos
- **Páginas**: `page.tsx` (convenção Next.js)
- **Layouts**: `layout.tsx` (convenção Next.js)
- **Componentes**: `PascalCase.tsx` (ex: `ArtigoCard.tsx`)
- **Utilitários**: `camelCase.ts` (ex: `artigos.ts`)
- **Estilos**: `kebab-case.css` ou `globals.css`

### Variáveis e Funções
- **Componentes**: `PascalCase` (ex: `ArtigoCard`)
- **Funções**: `camelCase` (ex: `getArtigos`)
- **Constantes**: `UPPER_SNAKE_CASE` (ex: `API_URL`)
- **Interfaces**: `PascalCase` (ex: `Artigo`)

### Classes CSS
- **Estilo**: `kebab-case` (ex: `artigo-card`, `artigo-titulo`)

---

## 📊 Tamanho Aproximado

```
Total: ~50 KB (sem node_modules)

app/           ~15 KB
components/    ~2 KB
data/          ~5 KB
lib/           ~3 KB
Documentação/  ~25 KB
```

---

## 🔗 Relações entre Arquivos

```
app/page.tsx
├─ import: lib/artigos.ts
├─ import: components/ArtigoCard.tsx
└─ import: app/globals.css

app/artigos/[slug]/page.tsx
├─ import: lib/artigos.ts
└─ import: next/navigation (notFound)

components/ArtigoCard.tsx
├─ import: lib/artigos.ts (Artigo, formatarData)
└─ import: next/link

lib/artigos.ts
└─ import: data/artigos.json
```

---

## 📝 Padrões de Código

### Server Components (padrão)
```typescript
// Sem "use client"
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}
```

### Client Components (quando necessário)
```typescript
'use client';

import { useState } from 'react';

export default function Component() {
  const [state, setState] = useState(0);
  return <button onClick={() => setState(s => s + 1)}>{state}</button>;
}
```

### Data Fetching
```typescript
// Server Component
async function getData() {
  const res = await fetch('...');
  return res.json();
}
```

### Tipagem
```typescript
// Sempre use interfaces/types
interface Props {
  id: number;
  name: string;
}

function Component({ id, name }: Props) {
  // ...
}
```

---

Estrutura completa e documentada! 🎯
