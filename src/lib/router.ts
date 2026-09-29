export type RouteParams = Record<string, string>;

export interface RouteMatch {
  path: string;
  params: RouteParams;
}

export function getPath(): string {
  const hash = window.location.hash.replace(/^#/, '');
  return hash || '/';
}

export function navigate(path: string): void {
  if (getPath() === path) return;
  window.location.hash = path;
  window.scrollTo({ top: 0, behavior: 'instant' });
}

export function subscribe(cb: () => void): () => void {
  const handler = () => cb();
  window.addEventListener('hashchange', handler);
  return () => window.removeEventListener('hashchange', handler);
}

export function matchRoute(
  pattern: string,
  path: string
): RouteMatch | null {
  const patternParts = pattern.split('/').filter(Boolean);
  const pathParts = path.split('/').filter(Boolean);

  if (patternParts.length !== pathParts.length) return null;

  const params: RouteParams = {};
  for (let i = 0; i < patternParts.length; i++) {
    const pp = patternParts[i];
    const ap = pathParts[i];
    if (pp.startsWith(':')) {
      params[pp.slice(1)] = decodeURIComponent(ap);
    } else if (pp !== ap) {
      return null;
    }
  }
  return { path, params };
}
