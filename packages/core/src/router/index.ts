import { WSXRoute, RouteParams } from '../types/index.js';
import { readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';

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
  const routes: WSXRoute[] = [];
  
  function scanDirectory(dir: string, basePath: string = '') {
    try {
      const files = readdirSync(dir);
      
      for (const file of files) {
        const fullPath = join(dir, file);
        const stat = statSync(fullPath);
        
        if (stat.isDirectory()) {
          // Recursively scan subdirectories
          scanDirectory(fullPath, join(basePath, file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
          // Convert file path to route path
          const routePath = fileToRoutePath(basePath, file);
          
          routes.push({
            path: routePath,
            component: null as any, // Will be loaded dynamically
            filePath: fullPath
          });
        }
      }
    } catch (error) {
      console.warn(`Could not scan directory ${dir}:`, error);
    }
  }
  
  scanDirectory(pagesDir);
  return routes;
}

function fileToRoutePath(basePath: string, filename: string): string {
  // Remove file extension
  const nameWithoutExt = basename(filename, extname(filename));
  
  // Handle index files
  if (nameWithoutExt === 'index') {
    return basePath === '' ? '/' : `/${basePath}`;
  }
  
  // Handle dynamic routes [param]
  const routeName = nameWithoutExt.startsWith('[') && nameWithoutExt.endsWith(']') 
    ? nameWithoutExt 
    : nameWithoutExt;
  
  const fullPath = basePath === '' ? `/${routeName}` : `/${basePath}/${routeName}`;
  return fullPath.replace(/\/+/g, '/'); // Clean up double slashes
}