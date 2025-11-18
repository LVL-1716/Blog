// EXEMPLO: Como usar uma API externa (CrudCrud ou outra)
// Descomente e adapte conforme necessário

/*
// ============================================
// OPÇÃO 1: Usar CrudCrud API
// ============================================

const API_BASE_URL = 'https://crudcrud.com/api/SEU_ID_AQUI';

export async function getArtigos(): Promise<Artigo[]> {
  const response = await fetch(`${API_BASE_URL}/artigos`, {
    cache: 'no-store', // SSR - sempre busca dados frescos
    // OU
    // cache: 'force-cache', // SSG - cacheia em build time
    // next: { revalidate: 60 } // ISR - revalida a cada 60 segundos
  });
  
  if (!response.ok) {
    throw new Error('Falha ao carregar artigos');
  }
  
  return response.json();
}

export async function getArtigoPorSlug(slug: string): Promise<Artigo | undefined> {
  const artigos = await getArtigos();
  return artigos.find(artigo => artigo.slug === slug);
}

// ============================================
// OPÇÃO 2: Usar JSON local (implementação atual)
// ============================================

// Lê diretamente do arquivo JSON na pasta /data
// Mais simples e não requer configuração de API externa

// ============================================
// OPÇÃO 3: Usar API própria
// ============================================

export async function getArtigos(): Promise<Artigo[]> {
  const response = await fetch('https://sua-api.com/api/artigos', {
    headers: {
      'Authorization': `Bearer ${process.env.API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });
  
  if (!response.ok) {
    throw new Error('Falha ao carregar artigos');
  }
  
  return response.json();
}

// ============================================
// Configuração de variáveis de ambiente
// ============================================

// Crie um arquivo .env.local na raiz do projeto:

// API_BASE_URL=https://crudcrud.com/api/seu-id
// API_TOKEN=seu-token-aqui

// E use no código:
// const API_URL = process.env.API_BASE_URL;

*/
