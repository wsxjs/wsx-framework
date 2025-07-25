import { createServer } from 'http';
import { WSXApp } from './app/index.js';
import { WSXAppConfig, WSXRequest } from './types/index.js';

export function createWSXServer(config: WSXAppConfig) {
  const app = new WSXApp(config);

  const server = createServer(async (req, res) => {
    const url = new URL(req.url!, `http://${req.headers.host}`);
    
    const wsxRequest: WSXRequest = {
      url,
      method: req.method!,
      headers: new Headers(req.headers as any),
      params: {},
      query: url.searchParams
    };

    const wsxResponse = await app.handleRequest(wsxRequest);

    res.statusCode = wsxResponse.status;
    wsxResponse.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    res.end(wsxResponse.body);
  });

  return {
    server,
    listen: (port: number) => {
      server.listen(port, () => {
        console.log(`WSX server running on http://localhost:${port}`);
      });
    }
  };
}