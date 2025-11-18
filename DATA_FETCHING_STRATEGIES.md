# 📊 Estratégias de Data Fetching no Next.js 15

## 1. Static Site Generation (SSG) - Padrão

**Quando usar:** Conteúdo que raramente muda (blog posts, documentação)

```typescript
// app/page.tsx
export default async function Page() {
  // Cacheia em build time
  const data = await fetch('https://api.exemplo.com/dados', {
    cache: 'force-cache' // Padrão no Next.js 15
  });
  
  return <div>{/* renderizar */}</div>;
}
```

**Características:**
- ✅ Extremamente rápido (HTML pré-gerado)
- ✅ Melhor SEO
- ✅ CDN friendly
- ❌ Dados podem ficar desatualizados
- ❌ Requer rebuild para atualizar

---

## 2. Server-Side Rendering (SSR)

**Quando usar:** Dados que mudam frequentemente ou são personalizados por usuário

```typescript
// app/page.tsx
export default async function Page() {
  // Busca em toda requisição
  const data = await fetch('https://api.exemplo.com/dados', {
    cache: 'no-store' // Força SSR
  });
  
  return <div>{/* renderizar */}</div>;
}
```

**Características:**
- ✅ Dados sempre atualizados
- ✅ Bom para dados dinâmicos
- ✅ Ainda tem SEO
- ❌ Mais lento que SSG
- ❌ Mais carga no servidor

---

## 3. Incremental Static Regeneration (ISR)

**Quando usar:** Meio termo - conteúdo que muda ocasionalmente

```typescript
// app/page.tsx
export default async function Page() {
  // Revalida a cada 60 segundos
  const data = await fetch('https://api.exemplo.com/dados', {
    next: { revalidate: 60 }
  });
  
  return <div>{/* renderizar */}</div>;
}
```

**Características:**
- ✅ Rápido como SSG
- ✅ Atualiza automaticamente
- ✅ Melhor dos dois mundos
- ⚠️ Primeira requisição pode ser lenta após revalidação

---

## 4. On-Demand Revalidation

**Quando usar:** Atualizar cache sob demanda (ex: webhook após publicar artigo)

```typescript
// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path');
  
  if (path) {
    revalidatePath(path);
    return Response.json({ revalidated: true });
  }
  
  return Response.json({ revalidated: false });
}
```

**Chamada:**
```bash
curl -X POST http://localhost:3000/api/revalidate?path=/artigos/meu-slug
```

---

## 5. Streaming com Suspense

**Quando usar:** Partes da página que podem carregar de forma independente

```typescript
// app/page.tsx
import { Suspense } from 'react';

async function ArtigosLentos() {
  const data = await fetch('https://api-lenta.com/artigos');
  return <div>{/* renderizar */}</div>;
}

export default function Page() {
  return (
    <div>
      <h1>Carrega imediatamente</h1>
      
      <Suspense fallback={<p>Carregando artigos...</p>}>
        <ArtigosLentos />
      </Suspense>
    </div>
  );
}
```

**Características:**
- ✅ Melhor UX - não bloqueia a página
- ✅ Progressive rendering
- ✅ Combina bem com SSR

---

## 6. Parallel Data Fetching

**Quando usar:** Múltiplas requisições independentes

```typescript
// ❌ Sequencial (lento)
const artigos = await fetch('/api/artigos');
const autores = await fetch('/api/autores');

// ✅ Paralelo (rápido)
const [artigos, autores] = await Promise.all([
  fetch('/api/artigos'),
  fetch('/api/autores')
]);
```

---

## 7. Dynamic Routes com generateStaticParams

**Quando usar:** Rotas dinâmicas que podem ser pré-renderizadas

```typescript
// app/artigos/[slug]/page.tsx

// Gera todas as páginas em build time
export async function generateStaticParams() {
  const artigos = await fetch('https://api.com/artigos').then(res => res.json());
  
  return artigos.map((artigo) => ({
    slug: artigo.slug,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const artigo = await fetch(`https://api.com/artigos/${params.slug}`);
  return <article>{/* renderizar */}</article>;
}
```

**Características:**
- ✅ Pré-renderiza todas as páginas dinâmicas
- ✅ Extremamente rápido
- ✅ Ideal para blogs

---

## 8. Force Dynamic

**Quando usar:** Sempre renderizar no servidor (sem cache)

```typescript
// app/page.tsx
export const dynamic = 'force-dynamic';

export default async function Page() {
  const data = await fetch('https://api.com/dados');
  return <div>{/* renderizar */}</div>;
}
```

**Características:**
- ✅ Sempre dados frescos
- ✅ Útil para dashboards
- ❌ Mais lento

---

## 9. Force Static

**Quando usar:** Sempre gerar estático (mesmo com dados dinâmicos)

```typescript
// app/page.tsx
export const dynamic = 'force-static';

export default async function Page() {
  const data = await fetch('https://api.com/dados');
  return <div>{/* renderizar */}</div>;
}
```

---

## 📋 Tabela Comparativa

| Estratégia | Velocidade | Frescor | Build Time | SEO | Custo Servidor |
|-----------|-----------|---------|-----------|-----|---------------|
| SSG | ⚡⚡⚡ | ❌ | Longo | ⭐⭐⭐ | Baixo |
| SSR | ⚡ | ✅✅✅ | Rápido | ⭐⭐⭐ | Alto |
| ISR | ⚡⚡ | ✅✅ | Médio | ⭐⭐⭐ | Médio |
| Streaming | ⚡⚡ | ✅✅ | Rápido | ⭐⭐ | Médio |

---

## 🎯 Recomendações para Blog

### Página Inicial (listagem)
```typescript
// SSG com ISR - atualiza a cada hora
export default async function Home() {
  const artigos = await fetch('http://localhost:3000/data/artigos.json', {
    next: { revalidate: 3600 } // 1 hora
  });
  
  return <ListaArtigos />;
}
```

### Páginas de Artigos
```typescript
// SSG com generateStaticParams
export async function generateStaticParams() {
  const artigos = await getArtigos();
  return artigos.map(a => ({ slug: a.slug }));
}

export default async function ArtigoPage({ params }) {
  const artigo = await getArtigoPorSlug(params.slug);
  return <Artigo />;
}
```

---

## 🔧 Configurações Úteis

### Desabilitar cache globalmente (desenvolvimento)

```typescript
// next.config.js
module.exports = {
  experimental: {
    dynamicIO: true
  }
}
```

### Cache personalizado

```typescript
fetch('https://api.com/dados', {
  next: {
    revalidate: 3600, // 1 hora
    tags: ['artigos'] // Para revalidação por tag
  }
})
```

### Revalidação por tag

```typescript
// Revalidar todas as requisições com a tag 'artigos'
revalidateTag('artigos');
```

---

## 📚 Recursos

- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Caching](https://nextjs.org/docs/app/building-your-application/caching)
- [generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)

---

Escolha a estratégia adequada ao seu caso de uso! 🚀
