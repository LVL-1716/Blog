import { Metadata } from 'next';
import { getArtigos } from '@/lib/artigos';
import ArtigoCard from '@/components/ArtigoCard';
import './globals.css';

// Metadados estáticos para a página inicial
export const metadata: Metadata = {
  title: 'Next Blog.tsx - Next.js 15',
  description: 'Blog sobre desenvolvimento web com Next.js, React, TypeScript e boas práticas de SEO',
  keywords: ['Next.js', 'React', 'TypeScript', 'Blog', 'Desenvolvimento Web'],
  authors: [{ name: 'Blog Moderno' }],
  openGraph: {
    title: 'Next Blog.tsx - Next.js 15',
    description: 'Blog sobre desenvolvimento web com Next.js, React, TypeScript e boas práticas de SEO',
    type: 'website',
    locale: 'pt_BR',
  }
};

export default async function Home() {
  // Busca os artigos diretamente no Server Component
  const artigos = await getArtigos();

  return (
    <main className="container">
      <header className="header">
        <h1>Next Blog.tsx</h1>
        <p className="subtitle">Artigos sobre desenvolvimento web e tecnologia</p>
      </header>

      <div className="artigos-grid">
        {artigos.map((artigo) => (
          <ArtigoCard key={artigo.id} artigo={artigo} />
        ))}
      </div>
    </main>
  );
}
