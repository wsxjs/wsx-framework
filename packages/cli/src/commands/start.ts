import { Command } from 'commander';

interface StartOptions {
  port: string;
  output: string;
}

export const startCommand = new Command()
  .name('start')
  .description('Start production server')
  .option('-p, --port <port>', 'Port to run server on', '3000')
  .option('--output <dir>', 'Build output directory', '.wsx')
  .action(async (options: StartOptions) => {
    console.log('Starting production server...');
    console.log(`Port: ${options.port}`);
    console.log(`Output: ${options.output}`);
    
    // TODO: Implement production server
    console.log(`Server running on http://localhost:${options.port}`);
  });