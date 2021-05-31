#!/usr/bin/env node
import { cli } from "./cli.js";

console.info(`Cli started with following args: \n${process.argv}`);
cli();
