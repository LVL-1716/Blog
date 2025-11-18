// Tipos do artigo
export interface Artigo {
  id: number;
  slug: string;
  titulo: string;
  autor: string;
  dataPublicacao: string;
  resumo: string;
  conteudo: string;
}

// Função para buscar todos os artigos
export async function getArtigos(): Promise<Artigo[]> {
  // Importação dinâmica do JSON local
  const artigos = await import('@/data/artigos.json');
  return artigos.default as Artigo[];
  
  // Alternativa usando fetch (requer servidor rodando):
  // const response = await fetch('http://localhost:3000/data/artigos.json', {
  //   cache: 'force-cache' // SSG - cacheia em build time
  //   // cache: 'no-store' // SSR - sempre busca dados frescos
  // });
  // 
  // if (!response.ok) {
  //   throw new Error('Falha ao carregar artigos');
  // }
  // 
  // return response.json();
}

// Função para buscar um artigo específico por slug
export async function getArtigoPorSlug(slug: string): Promise<Artigo | undefined> {
  const artigos = await getArtigos();
  return artigos.find(artigo => artigo.slug === slug);
}

// Função para formatar data
export function formatarData(data: string): string {
  const dataObj = new Date(data + 'T00:00:00');
  return dataObj.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}
