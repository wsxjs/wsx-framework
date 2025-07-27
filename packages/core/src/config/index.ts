import { resolve, join } from 'path';
import { pathToFileURL } from 'url';

export interface WSXConfig {
  // Build settings
  outDir?: string;
  srcDir?: string;
  pagesDir?: string;
  publicDir?: string;
  
  // Development settings
  dev?: {
    port?: number;
    host?: string;
    open?: boolean;
  };
  
  // Build settings
  build?: {
    target?: string;
    minify?: boolean;
    sourcemap?: boolean;
  };
  
  // SSR settings
  ssr?: {
    target?: 'node' | 'webworker';
    noExternal?: string[];
  };
  
  // Environment variables
  env?: Record<string, string>;
  
  // Custom Vite config
  vite?: any;
  
  // Redirects (like Next.js)
  redirects?: () => Promise<Array<{
    source: string;
    destination: string;
    permanent: boolean;
  }>>;
  
  // Rewrites (like Next.js)
  rewrites?: () => Promise<Array<{
    source: string;
    destination: string;
  }>>;
}

export const defaultConfig: WSXConfig = {
  outDir: '.wsx',
  srcDir: '.',
  pagesDir: 'pages',
  publicDir: 'public',
  dev: {
    port: 3000,
    host: 'localhost',
    open: false,
  },
  build: {
    target: 'es2020',
    minify: true,
    sourcemap: false,
  },
  ssr: {
    target: 'node',
    noExternal: [],
  },
  env: {},
};

export async function loadConfig(configPath?: string): Promise<WSXConfig> {
  const cwd = process.cwd();
  const configFile = configPath || findConfigFile(cwd);
  
  if (!configFile) {
    return defaultConfig;
  }
  
  try {
    const configUrl = pathToFileURL(configFile).href;
    const configModule = await import(configUrl);
    const userConfig = configModule.default || configModule;
    
    // Merge with defaults
    return mergeConfig(defaultConfig, typeof userConfig === 'function' ? await userConfig() : userConfig);
  } catch (error) {
    console.warn(`Failed to load config from ${configFile}:`, error);
    return defaultConfig;
  }
}

function findConfigFile(cwd: string): string | null {
  const configFiles = [
    'wsx.config.js',
    'wsx.config.mjs',
    'wsx.config.ts',
  ];
  
  for (const file of configFiles) {
    const configPath = resolve(cwd, file);
    try {
      require.resolve(configPath);
      return configPath;
    } catch {
      // File doesn't exist, continue
    }
  }
  
  return null;
}

function mergeConfig(defaults: WSXConfig, user: WSXConfig): WSXConfig {
  return {
    ...defaults,
    ...user,
    dev: { ...defaults.dev, ...user.dev },
    build: { ...defaults.build, ...user.build },
    ssr: { ...defaults.ssr, ...user.ssr },
    env: { ...defaults.env, ...user.env },
  };
}