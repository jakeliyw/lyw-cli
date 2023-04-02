const program = require("commander");

const {
  createProjectAction,
  addComponentAction,
  addPageAndRoute,
  addStoreAction,
} = require("./action");

// 创建项目命令
const createCommands = () => {
  program
    .command("create <project> [others...]") // 创建指令 Vue create 项目名称
    .description("clone repository into a folder") // 描述
    .action(createProjectAction); // 创建

  // 新增组件(src/components/xxx.vue)
  program
    .command("addcpn <name>")
    .description(
      "add vue component, 例如：why addcpn Helloword [-d src/components]"
    )
    .action((name) => {
      addComponentAction(name, program.dest || "src/components");
    });

  program
    .command("addpage <page>")
    .description(
      "add vue page and router config, 例如：lyw addpage Home [-d src/views]"
    )
    .action((view) => {
      addPageAndRoute(view, program.dest || "src/views");
    });

  program
    .command("addstore <store>")
    .description(
      "add vue store and router config, 例如：lyw addpage Home [-d src/stores]"
    )
    .action((store) => {
      addStoreAction(store, program.dest || "src/stores/modules");
    });
};

module.exports = createCommands;
