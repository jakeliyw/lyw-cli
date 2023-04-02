const program = require("commander"); // commander：命令行框架

// 添加自己的options
const helpOptions = () => {
  // 以下两个指向同一个命令，可用option或on
  program.option("-l --lyw", "a why cli");
  program.option(
    "-d --dest <dest>",
    "a destination folder, 例如: -d/src/components"
  );
  program.option("-f --framework <framework>", "your framework");

  // 监听help指令
  program.on("--help", () => {
    console.log("");
    console.log(" lyw -v");
    console.log(" lyw -version");
  });
};

module.exports = helpOptions;
