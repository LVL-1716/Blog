# 🚀 Guia Rápido de Execução

## Passo 1: Instalar Dependências

Abra o terminal no VS Code e execute:

```bash
npm install
```

## Passo 2: Executar em Modo de Desenvolvimento

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## Passo 3: Testar a Aplicação

1. **Página Inicial**: Você verá a listagem com 5 artigos
2. **Clique em um artigo**: Será redirecionado para a página individual
3. **Botão Voltar**: Retorna para a listagem

## 🔍 Verificar SEO

### No Navegador

1. Clique com botão direito na página
2. Selecione "Inspecionar elemento"
3. Vá na aba "Elements" ou "Elementos"
4. Procure por `<head>` e veja as meta tags:
   - `<title>` diferente em cada página
   - `<meta name="description">` único por artigo
   - Tags Open Graph (`og:title`, `og:description`, etc.)

### No Código

Veja como os metadados são gerados:

- **Página inicial**: `app/page.tsx` - metadados estáticos
- **Página do artigo**: `app/artigos/[slug]/page.tsx` - função `generateMetadata()`

## 📝 Estrutura de Rotas

```
http://localhost:3000/                              → Página inicial (listagem)
http://localhost:3000/artigos/introducao-ao-nextjs-15    → Artigo 1
http://localhost:3000/artigos/guia-completo-typescript   → Artigo 2
http://localhost:3000/artigos/seo-em-aplicacoes-react    → Artigo 3
http://localhost:3000/artigos/server-components-vs-client-components → Artigo 4
http://localhost:3000/artigos/data-fetching-com-nextjs   → Artigo 5
```

## 🛠️ Personalizações Rápidas

### Adicionar um novo artigo

Edite `data/artigos.json` e adicione:

```json
{
  "id": 6,
  "slug": "meu-novo-artigo",
  "titulo": "Meu Novo Artigo",
  "autor": "Seu Nome",
  "dataPublicacao": "2025-11-18",
  "resumo": "Breve descrição...",
  "conteudo": "Conteúdo completo do artigo..."
}
```

### Alterar cores

Edite `app/globals.css` na seção `:root`:

```css
:root {
  --primary-color: #ff0066; /* Nova cor principal */
}
```

## 📦 Build para Produção

```bash
npm run build
npm start
```

Isso vai:
1. Gerar páginas estáticas (SSG)
2. Otimizar o código
3. Servir em modo produção

## ⚡ Dicas

- **SSG (Static)**: Páginas geradas em build time (mais rápido)
- **SSR (Server)**: Páginas geradas a cada requisição (dados frescos)
- **ISR**: Revalida páginas após X segundos (híbrido)

Para alterar a estratégia, edite `lib/artigos.ts`:

```typescript
// SSG - Build time
cache: 'force-cache'

// SSR - Runtime
cache: 'no-store'

// ISR - Revalidação
next: { revalidate: 60 } // 60 segundos
```

## 🐛 Troubleshooting

**Erro: Cannot find module 'next'**
```bash
npm install
```

**Porta 3000 já em uso**
```bash
npm run dev -- -p 3001
```

**Alterações não aparecem**
- Salve os arquivos (Ctrl+S)
- Aguarde o hot reload automático
- Ou reinicie o servidor (Ctrl+C e `npm run dev`)

---

✨ Pronto! Seu blog está funcionando!
