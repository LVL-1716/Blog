# 🌐 Como Integrar com CrudCrud API

## O que é CrudCrud?

CrudCrud é uma API REST gratuita para protótipos e testes. Não requer cadastro e fornece um endpoint temporário para criar, ler, atualizar e deletar dados.

## Passo 1: Obter seu ID único

1. Acesse: [https://crudcrud.com](https://crudcrud.com)
2. Você receberá automaticamente um ID único (ex: `abc123def456`)
3. Sua URL base será: `https://crudcrud.com/api/abc123def456`

## Passo 2: Criar os artigos na API

Use o seguinte script ou ferramenta como Postman/Insomnia:

```javascript
// Script para popular a API com os artigos
const API_URL = 'https://crudcrud.com/api/SEU_ID_AQUI';

const artigos = [
  {
    slug: "introducao-ao-nextjs-15",
    titulo: "Introdução ao Next.js 15",
    autor: "Maria Silva",
    dataPublicacao: "2025-11-01",
    resumo: "Descubra as novidades do Next.js 15...",
    conteudo: "O Next.js 15 trouxe mudanças significativas..."
  },
  // ... outros artigos
];

// Popular a API
for (const artigo of artigos) {
  await fetch(`${API_URL}/artigos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(artigo)
  });
}
```

## Passo 3: Atualizar o código

### Opção A: Usar variável de ambiente (recomendado)

**1. Crie `.env.local` na raiz do projeto:**

```env
NEXT_PUBLIC_API_URL=https://crudcrud.com/api/SEU_ID_AQUI
```

**2. Atualize `lib/artigos.ts`:**

```typescript
export async function getArtigos(): Promise<Artigo[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
  const response = await fetch(`${API_URL}/artigos`, {
    cache: 'no-store', // SSR - sempre busca dados frescos
    // cache: 'force-cache', // SSG - cacheia em build time
  });
  
  if (!response.ok) {
    throw new Error('Falha ao carregar artigos');
  }
  
  const data = await response.json();
  return data;
}

export async function getArtigoPorSlug(slug: string): Promise<Artigo | undefined> {
  const artigos = await getArtigos();
  return artigos.find(artigo => artigo.slug === slug);
}
```

### Opção B: Hard-coded (apenas para testes)

Substitua diretamente em `lib/artigos.ts`:

```typescript
const API_URL = 'https://crudcrud.com/api/abc123def456';

export async function getArtigos(): Promise<Artigo[]> {
  const response = await fetch(`${API_URL}/artigos`, {
    cache: 'no-store'
  });
  
  if (!response.ok) {
    throw new Error('Falha ao carregar artigos');
  }
  
  return response.json();
}
```

## Passo 4: Testar

```bash
npm run dev
```

Agora os artigos virão da API CrudCrud!

## 📝 Notas Importantes

### Limitações do CrudCrud

- **Temporário**: O ID expira após 24 horas de inatividade
- **Limite**: Máximo 100 requisições/hora
- **Sem autenticação**: Qualquer um com o ID pode acessar/modificar
- **Ideal para**: Protótipos, demos e aprendizado

### Para Produção

Use APIs robustas:
- **Supabase**: Banco de dados PostgreSQL + API REST
- **Firebase**: Firestore + Realtime Database
- **Strapi**: CMS headless
- **Sua própria API**: Node.js + Express + MongoDB

## 🔄 Script Completo para Popular CrudCrud

Crie `scripts/popular-api.js`:

```javascript
const API_URL = 'https://crudcrud.com/api/SEU_ID_AQUI';

const artigos = require('../data/artigos.json');

async function popularAPI() {
  console.log('Populando CrudCrud API...');
  
  for (const artigo of artigos) {
    const { id, ...artigoSemId } = artigo; // Remove o ID local
    
    const response = await fetch(`${API_URL}/artigos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(artigoSemId)
    });
    
    if (response.ok) {
      console.log(`✅ Artigo "${artigo.titulo}" criado`);
    } else {
      console.error(`❌ Erro ao criar "${artigo.titulo}"`);
    }
  }
  
  console.log('Concluído!');
}

popularAPI();
```

Execute:

```bash
node scripts/popular-api.js
```

## 🎯 Comparação: JSON Local vs API

### JSON Local (implementação atual)
✅ Simples e rápido  
✅ Não depende de internet  
✅ Ideal para SSG (Static Site Generation)  
❌ Não é dinâmico  
❌ Requer rebuild para atualizar  

### CrudCrud API
✅ Dados dinâmicos  
✅ Pode ser atualizado sem rebuild  
✅ Bom para demonstrações  
❌ Requer internet  
❌ Temporário (24h)  
❌ Limite de requisições  

### API Própria/Supabase
✅ Controle total  
✅ Sem limites  
✅ Permanente  
✅ Autenticação  
❌ Mais complexo  
❌ Pode ter custos  

---

Escolha a opção que melhor se adequa ao seu caso de uso! 🚀
