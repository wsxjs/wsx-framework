import { Command } from 'commander';
import { startDevServer } from '../dev-server/index.js';
import { loadConfig } from '@wsx-framework/core';

interface DevOptions {
  port?: string;
  config?: string;
}

export const devCommand = new Command()
  .name('dev')
  .description('Start development server')
  .option('-p, --port <port>', 'Port to run server on')
  .option('-c, --config <path>', 'Path to config file')
  .action(async (options: DevOptions) => {
    console.log('🚀 Starting WSX development server...');
    
    // Load config from wsx.config.js
    const config = await loadConfig(options.config);
    
    // Override port if specified
    if (options.port) {
      config.dev = { ...config.dev, port: parseInt(options.port) };
    }
    
    console.log(`📁 Pages directory: ${config.pagesDir}`);
    console.log(`🌐 Server will run on: http://${config.dev?.host}:${config.dev?.port}`);
    
    await startDevServer(config);
  });