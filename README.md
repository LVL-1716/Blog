# Blog Moderno com Next.js 15

Aplicação de blog desenvolvida com Next.js 15, utilizando App Router, rotas dinâmicas, data fetching otimizado e boas práticas de SEO.

## 🚀 Funcionalidades

- ✅ **App Router** com rotas dinâmicas
- ✅ **Server Components** por padrão
- ✅ **Data Fetching** assíncrono direto nos componentes
- ✅ **SEO Dinâmico** com `generateMetadata()`
- ✅ **Static Site Generation (SSG)** com `generateStaticParams()`
- ✅ **Rotas personalizadas** baseadas em slugs
- ✅ **Design responsivo** e moderno
- ✅ **TypeScript** para type safety

## 📁 Estrutura do Projeto

```
Blog/
├── app/
│   ├── artigos/
│   │   └── [slug]/
│   │       ├── page.tsx          # Página individual do artigo
│   │       └── not-found.tsx     # Página 404 customizada
│   ├── page.tsx                  # Página inicial (listagem)
│   ├── layout.tsx                # Layout raiz
│   └── globals.css               # Estilos globais
├── data/
│   └── artigos.json              # Dados dos artigos
├── lib/
│   └── artigos.ts                # Funções auxiliares
├── package.json
├── tsconfig.json
└── next.config.js
```

## 🛠️ Instalação e Execução

### 1. Instalar dependências

```bash
npm install
```

### 2. Executar em modo de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000)

### 3. Build para produção

```bash
npm run build
npm start
```

## 📝 Detalhes Técnicos

### Data Fetching

A aplicação utiliza **Server Components** com `async/await` para buscar dados diretamente do JSON local:

```typescript
// app/page.tsx - Busca todos os artigos
const artigos = await getArtigos();
```

```typescript
// app/artigos/[slug]/page.tsx - Busca artigo específico
const artigo = await getArtigoPorSlug(params.slug);
```

### Estratégias de Renderização

- **SSG (Static Site Generation)**: Utilizado para pré-renderizar todas as páginas de artigos em build time através de `generateStaticParams()`
- **SSR (Server-Side Rendering)**: Pode ser ativado alterando o cache strategy em `lib/artigos.ts`

```typescript
// Para SSG (padrão)
cache: 'force-cache'

// Para SSR
cache: 'no-store'
```

### SEO Dinâmico

Cada página possui metadados otimizados usando `generateMetadata()`:

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const artigo = await getArtigoPorSlug(params.slug);
  
  return {
    title: `${artigo.titulo} | Blog Moderno`,
    description: artigo.resumo,
    keywords: [...],
    openGraph: { ... },
    twitter: { ... }
  };
}
```

### Rotas Dinâmicas

As rotas são geradas automaticamente baseadas nos slugs dos artigos:

- `/` - Página inicial com listagem
- `/artigos/introducao-ao-nextjs-15` - Artigo individual
- `/artigos/guia-completo-typescript` - Outro artigo
- etc.

## 🎨 Customização

### Adicionar Novos Artigos

Edite o arquivo `data/artigos.json`:

```json
{
  "id": 6,
  "slug": "seu-slug-personalizado",
  "titulo": "Seu Título",
  "autor": "Seu Nome",
  "dataPublicacao": "2025-11-18",
  "resumo": "Resumo do artigo...",
  "conteudo": "Conteúdo completo do artigo..."
}
```

### Usar API Externa

Modifique a função `getArtigos()` em `lib/artigos.ts`:

```typescript
export async function getArtigos(): Promise<Artigo[]> {
  const response = await fetch('https://api.exemplo.com/artigos', {
    cache: 'no-store'
  });
  
  return response.json();
}
```

### Alterar Estilos

Edite o arquivo `app/globals.css` para customizar cores, fontes e layout:

```css
:root {
  --primary-color: #0070f3;  /* Cor principal */
  --text-color: #333;        /* Cor do texto */
  /* ... */
}
```

## 📚 Conceitos Aplicados

1. **App Router**: Nova arquitetura de roteamento do Next.js 15
2. **Server Components**: Renderização no servidor por padrão
3. **Data Fetching**: Busca de dados otimizada com async/await
4. **generateStaticParams**: Pré-renderização de rotas dinâmicas
5. **generateMetadata**: Metadados dinâmicos para SEO
6. **TypeScript**: Tipagem estática para maior segurança
7. **Slugs**: URLs amigáveis e otimizadas para SEO

## 🔍 Boas Práticas Implementadas

- ✅ Server Components por padrão
- ✅ Metadados únicos por página
- ✅ URLs semânticas (slugs)
- ✅ Estrutura de código organizada
- ✅ Tipagem forte com TypeScript
- ✅ Design responsivo
- ✅ Tratamento de erros (404)
- ✅ Open Graph e Twitter Cards para redes sociais

## 📚 Documentação Completa

Este projeto inclui documentação extensiva para ajudá-lo a entender e estender o código:

- **[📖 INDICE.md](./INDICE.md)** - Índice completo de toda a documentação
- **[⚡ GUIA_RAPIDO.md](./GUIA_RAPIDO.md)** - Guia rápido de 5 minutos para começar
- **[🏗️ ESTRUTURA.md](./ESTRUTURA.md)** - Estrutura detalhada do projeto
- **[🔍 SEO_GUIDE.md](./SEO_GUIDE.md)** - Guia completo de SEO e otimização
- **[📊 DATA_FETCHING_STRATEGIES.md](./DATA_FETCHING_STRATEGIES.md)** - Estratégias de data fetching
- **[🌐 CRUDCRUD_INTEGRATION.md](./CRUDCRUD_INTEGRATION.md)** - Como integrar com APIs externas
- **[🛠️ TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Solução de problemas comuns

**👉 Comece com [GUIA_RAPIDO.md](./GUIA_RAPIDO.md) para rodar o projeto agora!**

## 📖 Referências Externas

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)
- [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

---

Desenvolvido com ❤️ usando Next.js 15
