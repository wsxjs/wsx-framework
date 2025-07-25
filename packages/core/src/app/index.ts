import { WSXRouter } from '../router/index.js';
import { WSXRequest, WSXResponse, WSXAppConfig } from '../types/index.js';

export class WSXApp {
  private router = new WSXRouter();
  private config: WSXAppConfig;

  constructor(config: WSXAppConfig) {
    this.config = config;
  }

  async handleRequest(request: WSXRequest): Promise<WSXResponse> {
    const route = this.router.match(request.url.pathname);
    
    if (!route) {
      return {
        status: 404,
        headers: new Headers(),
        body: 'Not Found'
      };
    }

    try {
      // Get server-side props if available
      let props = {};
      if (route.component.getServerSideProps) {
        props = await route.component.getServerSideProps();
      }

      // Render component server-side
      const html = await this.renderToString(route.component, props);
      
      return {
        status: 200,
        headers: new Headers({ 'Content-Type': 'text/html' }),
        body: html
      };
    } catch (error) {
      console.error('Error rendering page:', error);
      return {
        status: 500,
        headers: new Headers(),
        body: 'Internal Server Error'
      };
    }
  }

  private async renderToString(component: any, props: any): Promise<string> {
    // This will implement WSX component server-side rendering
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>WSX App</title>
</head>
<body>
  <div id="app"><!-- Component will be rendered here --></div>
  <script type="module">
    // Client-side hydration code
  </script>
</body>
</html>`;
  }
}