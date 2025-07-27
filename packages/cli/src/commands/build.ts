import { Command } from 'commander';
import { loadConfig, buildForProduction } from '@wsx-framework/core';

interface BuildOptions {
  config?: string;
}

export const buildCommand = new Command()
  .name('build')
  .description('Build the application for production')
  .option('-c, --config <path>', 'Path to config file')
  .action(async (options: BuildOptions) => {
    console.log('🏗️  Building WSX application for production...');
    
    try {
      // Load config from wsx.config.js
      const config = await loadConfig(options.config);
      
      console.log(`📁 Pages directory: ${config.pagesDir}`);
      console.log(`📦 Output directory: ${config.outDir}`);
      
      // Build using Vite
      await buildForProduction(config);
      
      console.log('✅ Build completed successfully!');
    } catch (error) {
      console.error('❌ Build failed:', error);
      process.exit(1);
    }
  });