#!/usr/bin/env node

import { Command } from 'commander';
import { devCommand } from './commands/dev.js';
import { buildCommand } from './commands/build.js';
import { startCommand } from './commands/start.js';

const program = new Command();

program
  .name('wsx')
  .description('WSX Framework CLI')
  .version('0.1.0');

program.addCommand(devCommand);
program.addCommand(buildCommand);
program.addCommand(startCommand);

program.parse();