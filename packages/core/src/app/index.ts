import { WSXRouter, createFileSystemRoutes } from '../router/index.js';
import { WSXRequest, WSXResponse, WSXAppConfig } from '../types/index.js';
import { pathToFileURL } from 'url';

export class WSXApp {
  private router = new WSXRouter();
  private config: WSXAppConfig;

  constructor(config: WSXAppConfig) {
    this.config = config;
    this.loadRoutes();
  }

  private loadRoutes() {
    const routes = createFileSystemRoutes(this.config.pages);
    routes.forEach(route => this.router.addRoute(route));
    
    if (this.config.dev) {
      console.log(`Loaded ${routes.length} routes:`);
      routes.forEach(route => console.log(`  ${route.path} -> ${route.filePath}`));
    }
  }

  async handleRequest(request: WSXRequest): Promise<WSXResponse> {
    const route = this.router.match(request.url.pathname);
    
    if (!route) {
      return {
        status: 404,
        headers: new Headers({ 'Content-Type': 'text/html' }),
        body: this.render404Page()
      };
    }

    try {
      // Load component dynamically
      const component = await this.loadComponent(route.filePath!);
      
      // Get server-side props if available
      let props = {};
      if (component.getServerSideProps) {
        props = await component.getServerSideProps({ params: route.params || {} });
      }

      // Render component server-side
      const html = await this.renderToString(component, props, request.url.pathname);
      
      return {
        status: 200,
        headers: new Headers({ 'Content-Type': 'text/html' }),
        body: html
      };
    } catch (error) {
      console.error('Error rendering page:', error);
      return {
        status: 500,
        headers: new Headers({ 'Content-Type': 'text/html' }),
        body: this.render500Page(error)
      };
    }
  }

  private async loadComponent(filePath: string): Promise<any> {
    try {
      const moduleUrl = pathToFileURL(filePath).href;
      const module = await import(moduleUrl);
      return module.default || module;
    } catch (error) {
      console.error(`Failed to load component from ${filePath}:`, error);
      throw error;
    }
  }

  private async renderToString(component: any, props: any, pathname: string): Promise<string> {
    // Basic HTML template with component placeholder
    const componentName = component.name || 'WSXComponent';
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>WSX App</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; padding: 0; }
  </style>
</head>
<body>
  <div id="app">
    <${componentName.toLowerCase()} ${Object.keys(props).map(key => `${key}="${props[key]}"`).join(' ')}>
    </${componentName.toLowerCase()}>
  </div>
  <script type="module">
    // Client-side hydration will be added later
    console.log('WSX App loaded for:', '${pathname}');
  </script>
</body>
</html>`;
  }

  private render404Page(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>404 - Page Not Found</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; padding: 2rem; text-align: center; }
    h1 { color: #333; }
  </style>
</head>
<body>
  <h1>404 - Page Not Found</h1>
  <p>The page you're looking for doesn't exist.</p>
  <a href="/">← Go Home</a>
</body>
</html>`;
  }

  private render500Page(error: any): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>500 - Internal Server Error</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; padding: 2rem; }
    h1 { color: #d32f2f; }
    pre { background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow-x: auto; }
  </style>
</head>
<body>
  <h1>500 - Internal Server Error</h1>
  <p>Something went wrong while rendering this page.</p>
  ${this.config.dev ? `<pre>${error.stack || error.message}</pre>` : ''}
  <a href="/">← Go Home</a>
</body>
</html>`;
  }
}