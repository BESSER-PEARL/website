import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="container-narrow grid min-h-[60vh] place-items-center py-24 text-center">
      <div>
        <p className="font-mono text-sm font-medium text-brand-600">404</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-ink-900">Page not found</h1>
        <p className="mt-3 text-ink-600">That URL doesn’t exist (yet).</p>
        <Link to="/" className="btn-primary mt-8">Take me home</Link>
      </div>
    </section>
  );
}
