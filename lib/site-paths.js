export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function withBasePath(path) {
  if (!path.startsWith('/')) {
    return `${basePath}/${path}`;
  }

  return `${basePath}${path}`;
}

export function stripBasePath(pathname) {
  if (!basePath) {
    return pathname || '/';
  }

  if (pathname === basePath) {
    return '/';
  }

  if (pathname.startsWith(`${basePath}/`)) {
    return pathname.slice(basePath.length) || '/';
  }

  return pathname;
}

export function getBrowserAppPathname() {
  if (typeof window === 'undefined') {
    return '/';
  }

  return stripBasePath(window.location.pathname);
}
