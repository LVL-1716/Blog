import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArtigoPorSlug, getArtigos, formatarData } from '@/lib/artigos';

// Gerar parâmetros estáticos para SSG (Static Site Generation)
export async function generateStaticParams() {
  const artigos = await getArtigos();
  
  return artigos.map((artigo) => ({
    slug: artigo.slug,
  }));
}

// Gerar metadados dinâmicos para SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const artigo = await getArtigoPorSlug(slug);

  if (!artigo) {
    return {
      title: 'Artigo não encontrado',
      description: 'O artigo solicitado não foi encontrado',
    };
  }

  return {
    title: `${artigo.titulo} | Next Blog.tsx`,
    description: artigo.resumo,
    keywords: [artigo.titulo, artigo.autor, 'Next.js', 'Blog'],
    authors: [{ name: artigo.autor }],
    openGraph: {
      title: artigo.titulo,
      description: artigo.resumo,
      type: 'article',
      publishedTime: artigo.dataPublicacao,
      authors: [artigo.autor],
      locale: 'pt_BR',
    },
    twitter: {
      card: 'summary_large_image',
      title: artigo.titulo,
      description: artigo.resumo,
    },
  };
}

// Página do artigo (Server Component)
export default async function ArtigoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artigo = await getArtigoPorSlug(slug);

  // Se o artigo não existir, mostrar página 404
  if (!artigo) {
    notFound();
  }

  return (
    <main className="container">
      <Link href="/" className="voltar-link">
        ← Voltar para a página inicial
      </Link>

      <article>
        <header className="artigo-header">
          <h1>{artigo.titulo}</h1>
          <div className="artigo-info">
            <span className="artigo-autor">Por {artigo.autor}</span>
            <span className="artigo-data">{formatarData(artigo.dataPublicacao)}</span>
          </div>
        </header>

        <div className="artigo-conteudo">
          {artigo.conteudo}
        </div>
      </article>
    </main>
  );
}
