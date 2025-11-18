import Link from 'next/link';
import { Artigo } from '@/lib/artigos';
import { formatarData } from '@/lib/artigos';

interface ArtigoCardProps {
  artigo: Artigo;
}

export default function ArtigoCard({ artigo }: ArtigoCardProps) {
  return (
    <article className="artigo-card">
      <Link href={`/artigos/${artigo.slug}`} className="artigo-link">
        <h2 className="artigo-titulo">{artigo.titulo}</h2>
        <div className="artigo-meta">
          <span className="artigo-autor">Por {artigo.autor}</span>
          <span className="artigo-data">{formatarData(artigo.dataPublicacao)}</span>
        </div>
        <p className="artigo-resumo">{artigo.resumo}</p>
        <span className="ler-mais">Ler artigo completo →</span>
      </Link>
    </article>
  );
}
