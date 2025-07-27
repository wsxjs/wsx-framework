import { createViteDevServer, WSXConfig } from '@wsx-framework/core';

export async function startDevServer(config: WSXConfig) {
  console.log('Starting WSX development server with Vite...');

  try {
    const server = await createViteDevServer(config);
    
    await server.listen();
    
    console.log(`🚀 WSX dev server running at:`);
    server.printUrls();

    process.on('SIGINT', async () => {
      console.log('\n🛑 Shutting down development server...');
      await server.close();
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Failed to start development server:', error);
    process.exit(1);
  }
}