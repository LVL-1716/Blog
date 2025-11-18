import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container not-found">
      <h1>404 - Artigo não encontrado</h1>
      <p>O artigo que você está procurando não existe.</p>
      <Link href="/" className="voltar-link">
        ← Voltar para a página inicial
      </Link>
    </div>
  );
}
