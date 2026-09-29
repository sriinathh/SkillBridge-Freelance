import { useEffect, useState } from 'react';
import { getPath, subscribe, matchRoute } from '@/lib/router';

export function useRoute() {
  const [path, setPath] = useState(getPath());

  useEffect(() => {
    const unsub = subscribe(() => setPath(getPath()));
    return unsub;
  }, []);

  const cleanPath = path.split('?')[0];

  return { path, cleanPath };
}

export function useRouteMatch(pattern: string) {
  const { cleanPath } = useRoute();
  return matchRoute(pattern, cleanPath);
}
