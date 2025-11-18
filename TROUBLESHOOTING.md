# 🛠️ Troubleshooting - Problemas Comuns e Soluções

## 🚨 Problemas de Instalação

### Erro: `Cannot find module 'next'`

**Causa:** Dependências não instaladas

**Solução:**
```bash
npm install
```

Se persistir:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

### Erro: `ENOENT: no such file or directory`

**Causa:** Caminho incorreto ou pasta não existe

**Solução:**
```bash
# Verifique se está na pasta correta
cd c:\Users\Luciano\Desktop\Blog

# Liste os arquivos
dir

# Deve ver: package.json, app/, data/, etc.
```

---

### Erro: `npm ERR! code ELIFECYCLE`

**Causa:** Porta já em uso ou processo travado

**Solução:**
```bash
# Windows: Matar processo na porta 3000
netstat -ano | findstr :3000
taskkill /PID <número_do_pid> /F

# Ou use outra porta
npm run dev -- -p 3001
```

---

## 🔴 Erros de Compilação

### Erro: `Module not found: Can't resolve '@/...'`

**Causa:** Path alias não configurado

**Solução:** Verifique `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

### Erro: `Type 'undefined' is not assignable to type 'Artigo'`

**Causa:** `getArtigoPorSlug()` pode retornar undefined

**Solução:** Já implementado com verificação:
```typescript
const artigo = await getArtigoPorSlug(params.slug);

if (!artigo) {
  notFound(); // Redireciona para 404
}

// Aqui artigo é garantidamente definido
return <div>{artigo.titulo}</div>;
```

---

### Erro: `Objects are not valid as a React child`

**Causa:** Tentando renderizar objeto diretamente

**Solução:**
```typescript
// ❌ Errado
<div>{artigo}</div>

// ✅ Correto
<div>{artigo.titulo}</div>
<div>{JSON.stringify(artigo)}</div> // Para debug
```

---

## 🎨 Problemas de Estilização

### Estilos não aplicados

**Causa:** CSS não importado

**Solução:** Verifique se `globals.css` está importado em `app/page.tsx`:
```typescript
import './globals.css';
```

---

### Layout quebrado / sem estilos

**Causa:** Classes CSS incorretas ou CSS não carregado

**Solução:**
1. Verifique nomes das classes (devem ser kebab-case)
2. Inspecione no navegador (F12 > Elements)
3. Verifique se `globals.css` existe e está importado

---

## 📄 Problemas com Dados

### Erro: `Failed to load artigos.json`

**Causa:** Caminho incorreto ou arquivo não existe

**Solução:** Verifique se `data/artigos.json` existe:
```bash
dir data\artigos.json
```

Verifique a importação em `lib/artigos.ts`:
```typescript
// Importação dinâmica (método atual)
const artigos = await import('@/data/artigos.json');
return artigos.default as Artigo[];
```

---

### Artigos não aparecem na página

**Causa:** Array vazio ou erro no fetch

**Solução:** Debug:
```typescript
export default async function Home() {
  const artigos = await getArtigos();
  console.log('Artigos carregados:', artigos.length); // Deve ser 5
  
  if (artigos.length === 0) {
    return <p>Nenhum artigo encontrado</p>;
  }
  
  return <div>{/* renderizar */}</div>;
}
```

---

### Erro: `JSON.parse unexpected token`

**Causa:** JSON malformado

**Solução:** Valide o JSON em [jsonlint.com](https://jsonlint.com/)

Verifique:
- Todas as strings entre aspas duplas `"`
- Vírgula após cada item (exceto o último)
- Sem trailing comma no último item

```json
// ❌ Errado
{
  "id": 1,
  "titulo": "Teste", // <- Vírgula no último item
}

// ✅ Correto
{
  "id": 1,
  "titulo": "Teste"
}
```

---

## 🔄 Problemas de Roteamento

### Erro 404 ao acessar `/artigos/slug`

**Causa:** Rota dinâmica não configurada corretamente

**Solução:** Verifique estrutura:
```
app/
└── artigos/
    └── [slug]/        <- Deve ter colchetes!
        └── page.tsx
```

---

### Link não funciona

**Causa:** Usando `<a>` ao invés de `<Link>`

**Solução:**
```typescript
// ❌ Errado
<a href="/artigos/slug">Link</a>

// ✅ Correto
import Link from 'next/link';
<Link href="/artigos/slug">Link</Link>
```

---

### Página não atualiza após mudanças

**Causa:** Cache ou hot reload não funcionando

**Solução:**
```bash
# Pare o servidor (Ctrl+C)
# Delete .next
rm -rf .next

# Inicie novamente
npm run dev
```

---

## 🔍 Problemas de SEO

### Meta tags não aparecem

**Causa:** Metadados não exportados ou Server Component não assíncrono

**Solução:**
```typescript
// ✅ Correto
export const metadata: Metadata = { /* ... */ };

// Para páginas dinâmicas
export async function generateMetadata({ params }): Promise<Metadata> {
  // Deve retornar Promise<Metadata>
}
```

---

### Open Graph não funciona no Facebook

**Causa:** Cache do Facebook ou metadados incorretos

**Solução:** Teste em [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

Clique em "Scrape Again" para limpar cache.

---

## ⚡ Problemas de Performance

### Página muito lenta

**Causas e Soluções:**

1. **SSR quando deveria ser SSG:**
```typescript
// Troque de:
cache: 'no-store'

// Para:
cache: 'force-cache'
```

2. **Muitas requisições:**
```typescript
// Use Promise.all para paralelizar
const [artigos, autores] = await Promise.all([
  getArtigos(),
  getAutores()
]);
```

3. **Bundle muito grande:**
```bash
# Analise o bundle
npm run build
# Veja o output
```

---

## 🖼️ Problemas com Imagens

### Imagem não carrega

**Causa:** Next.js requer configuração para domínios externos

**Solução em `next.config.js`:**
```javascript
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'exemplo.com',
      },
    ],
  },
}
```

Use sempre `next/image`:
```typescript
import Image from 'next/image';

<Image 
  src="/imagem.jpg"
  width={800}
  height={600}
  alt="Descrição"
/>
```

---

## 🔧 Problemas de Build

### Erro ao fazer build: `Page static generation failed`

**Causa:** Erro em `generateStaticParams` ou data fetching

**Solução:** Debug:
```typescript
export async function generateStaticParams() {
  try {
    const artigos = await getArtigos();
    console.log('Gerando params para:', artigos.length, 'artigos');
    return artigos.map(a => ({ slug: a.slug }));
  } catch (error) {
    console.error('Erro ao gerar params:', error);
    return [];
  }
}
```

---

### Build funciona mas start não

**Causa:** Porta já em uso

**Solução:**
```bash
# Use porta diferente
npm start -- -p 3001
```

---

## 💻 Problemas no VS Code

### IntelliSense não funciona

**Solução:**
1. Instale extensões:
   - ESLint
   - TypeScript and JavaScript Language Features

2. Recarregue VS Code:
   - Ctrl+Shift+P
   - "Developer: Reload Window"

---

### Imports não resolvem

**Solução:**
```bash
# Recrie tsconfig
npm run dev
# O Next.js recria automaticamente
```

---

## 🌐 Problemas com API Externa

### CrudCrud retorna erro 404

**Causa:** ID expirou (expira após 24h)

**Solução:** Gere novo ID em [crudcrud.com](https://crudcrud.com) e atualize a URL.

---

### CORS error ao usar API

**Causa:** API não permite requisições do seu domínio

**Solução:** Use Route Handler:
```typescript
// app/api/artigos/route.ts
export async function GET() {
  const response = await fetch('https://api-externa.com/artigos');
  const data = await response.json();
  return Response.json(data);
}
```

---

## 🐛 Debug Geral

### Como debugar Server Components

**Solução:**
```typescript
export default async function Page() {
  const artigos = await getArtigos();
  
  // Logs aparecem no TERMINAL (não no browser console)
  console.log('Artigos:', artigos.length);
  console.log('Primeiro artigo:', artigos[0]);
  
  return <div>{/* renderizar */}</div>;
}
```

---

### Como debugar Client Components

**Solução:**
```typescript
'use client';

export default function Component() {
  // Logs aparecem no BROWSER CONSOLE (F12)
  console.log('Client side log');
  
  return <div>{/* renderizar */}</div>;
}
```

---

## 📞 Onde Buscar Ajuda

1. **Documentação Next.js:** https://nextjs.org/docs
2. **Stack Overflow:** https://stackoverflow.com/questions/tagged/next.js
3. **GitHub Issues:** https://github.com/vercel/next.js/issues
4. **Discord Next.js:** https://discord.gg/nextjs

---

## ✅ Checklist de Verificação

Antes de buscar ajuda, verifique:

- [ ] `npm install` foi executado?
- [ ] Todas as dependências estão instaladas?
- [ ] Servidor está rodando (`npm run dev`)?
- [ ] Estrutura de pastas está correta?
- [ ] Imports estão corretos?
- [ ] JSON está válido?
- [ ] Não há erros no terminal?
- [ ] Não há erros no browser console (F12)?
- [ ] Cache foi limpo (.next/ deletado)?
- [ ] VS Code foi recarregado?

---

Se nenhuma solução funcionou, abra uma issue com:
- Descrição do problema
- Mensagem de erro completa
- Código relevante
- Versões (Node, npm, Next.js)
- Sistema operacional

---

Bom debug! 🔍
