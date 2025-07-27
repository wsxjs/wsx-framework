import { ViteDevServer, createServer, build, mergeConfig } from 'vite';
import { WSXConfig } from '../config/index.js';
import { resolve } from 'path';

export async function createViteDevServer(config: WSXConfig): Promise<ViteDevServer> {
  const cwd = process.cwd();
  const pagesDir = resolve(cwd, config.pagesDir || 'pages');
  
  const viteConfig = mergeConfig({
    root: pagesDir,
    server: {
      port: config.dev?.port || 3000,
      host: config.dev?.host || 'localhost',
      open: config.dev?.open || false,
    },
    define: {
      __WSX_DEV__: true,
      ...Object.entries(config.env || {}).reduce((acc, [key, value]) => {
        acc[`process.env.${key}`] = JSON.stringify(value);
        return acc;
      }, {} as Record<string, string>),
    },
    plugins: [
      // WSX plugin will be added here
    ],
    resolve: {
      alias: {
        '@wsx-framework/core': '@wsx-framework/core',
      },
    },
    ssr: {
      target: config.ssr?.target || 'node',
      noExternal: config.ssr?.noExternal || [],
    },
  }, config.vite || {});

  const server = await createServer(viteConfig);
  return server;
}

export async function buildForProduction(config: WSXConfig) {
  const cwd = process.cwd();
  const pagesDir = resolve(cwd, config.pagesDir || 'pages');
  const outDir = resolve(cwd, config.outDir || '.wsx');
  
  const viteConfig = mergeConfig({
    root: pagesDir,
    build: {
      outDir,
      target: config.build?.target || 'es2020',
      minify: config.build?.minify !== false,
      sourcemap: config.build?.sourcemap || false,
    },
    define: {
      __WSX_DEV__: false,
      ...Object.entries(config.env || {}).reduce((acc, [key, value]) => {
        acc[`process.env.${key}`] = JSON.stringify(value);
        return acc;
      }, {} as Record<string, string>),
    },
    ssr: {
      target: config.ssr?.target || 'node',
      noExternal: config.ssr?.noExternal || [],
    },
  }, config.vite || {});

  await build(viteConfig);
}