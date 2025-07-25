import { Command } from 'commander';

interface BuildOptions {
  pages: string;
  output: string;
}

export const buildCommand = new Command()
  .name('build')
  .description('Build the application for production')
  .option('--pages <dir>', 'Pages directory', 'pages')
  .option('--output <dir>', 'Output directory', '.wsx')
  .action(async (options: BuildOptions) => {
    console.log('Building application...');
    console.log(`Pages: ${options.pages}`);
    console.log(`Output: ${options.output}`);
    
    // TODO: Implement build logic
    console.log('Build completed!');
  });