#!/usr/bin/env node

// 指令库（--version, --help等）
const program = require("commander");
const helpOptions = require("./lib/core/help");
const createCommands = require("./lib/core/create");

// 定义显示模块的版本号
program.version(require("./package.json").version);

// 给help指令添加其它选项
helpOptions();

// 创建命令
createCommands();

// 解析终端指令
program.parse(process.argv);
