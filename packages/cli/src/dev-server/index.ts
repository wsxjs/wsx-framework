import { createWSXServer } from '@wsx-framework/core/server';
import { WSXAppConfig } from '@wsx-framework/core';
import { watch } from 'chokidar';

export async function startDevServer(config: WSXAppConfig) {
  console.log('Starting WSX development server...');

  const { server, listen } = createWSXServer(config);

  // Watch for file changes
  const watcher = watch(config.pages, {
    ignored: /node_modules/,
    persistent: true
  });

  watcher.on('change', (path) => {
    console.log(`File changed: ${path}`);
    // TODO: Implement hot module reloading
  });

  listen(config.port);

  process.on('SIGINT', () => {
    console.log('\nShutting down development server...');
    watcher.close();
    server.close();
    process.exit(0);
  });
}