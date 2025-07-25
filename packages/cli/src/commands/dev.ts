import { Command } from 'commander';
import { startDevServer } from '../dev-server/index.js';

interface DevOptions {
  port: string;
  pages: string;
}

export const devCommand = new Command()
  .name('dev')
  .description('Start development server')
  .option('-p, --port <port>', 'Port to run server on', '3000')
  .option('--pages <dir>', 'Pages directory', 'pages')
  .action(async (options: DevOptions) => {
    const config = {
      pages: options.pages,
      output: '.wsx',
      dev: true,
      port: parseInt(options.port)
    };

    await startDevServer(config);
  });