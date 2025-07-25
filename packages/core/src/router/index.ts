import { WSXRoute, RouteParams } from '../types/index.js';

export class WSXRouter {
  private routes: WSXRoute[] = [];

  addRoute(route: WSXRoute) {
    this.routes.push(route);
  }

  match(pathname: string): WSXRoute | null {
    for (const route of this.routes) {
      const match = this.matchPath(route.path, pathname);
      if (match) {
        return {
          ...route,
          params: match.params
        };
      }
    }
    return null;
  }

  private matchPath(routePath: string, pathname: string): { params: RouteParams } | null {
    const routeParts = routePath.split('/').filter(Boolean);
    const pathParts = pathname.split('/').filter(Boolean);

    if (routeParts.length !== pathParts.length) {
      return null;
    }

    const params: RouteParams = {};

    for (let i = 0; i < routeParts.length; i++) {
      const routePart = routeParts[i];
      const pathPart = pathParts[i];

      if (routePart.startsWith('[') && routePart.endsWith(']')) {
        // Dynamic route segment
        const paramName = routePart.slice(1, -1);
        params[paramName] = pathPart;
      } else if (routePart !== pathPart) {
        return null;
      }
    }

    return { params };
  }
}

export function createFileSystemRoutes(pagesDir: string): WSXRoute[] {
  // This will be implemented with filesystem scanning
  return [];
}