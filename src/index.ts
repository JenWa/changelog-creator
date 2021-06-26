#!/usr/bin/env node
import { cli } from "./cli.js";
import { passCLIArgumentsToOptions } from "./utils";

const { hasHelpFlag } = passCLIArgumentsToOptions();
if (!hasHelpFlag) cli();
