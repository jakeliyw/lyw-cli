const { promisify } = require("util"); // 转成promise
const download = promisify(require("download-git-repo")); // download-git-repo：克隆库
const path = require("path");
const { vueRepo } = require("../config/repo.config"); // 项目地址
const { spawnCommand } = require("../utils/terminal");
const { compile, writeToFile, createDirSync } = require("../utils/utils");
const { writeFile } = require("fs");

const createProjectAction = async (project) => {
  // 克隆项目
  await download(vueRepo, project, { clone: true });

  const npm = process.platform === "win32" ? "npm.cmd" : "npm";
  // 执行npm install，自动安装依赖
  await spawnCommand(npm, ["install"], { cwd: `./${project}` });
  // 执行npm run serve
  spawnCommand(npm, ["run", "dev"], { cwd: `./${project}` });
  // 打开浏览器
  async function openUrl(url) {
    const open = await import("open");
    await open.default(url);
  }
  openUrl("http://localhost:3000/");
};

const handleEjsToFile = async (name, dest, template, fileName) => {
  // 1.编译ejs模板 result
  const result = await compile(template, {
    name,
    lowerName: name.toLowerCase(),
  });
  // 2.拼接绝对路径（C:\Users\Li\Desktop\testCode\wqe\src\views\文件夹）
  const targetDest = path.resolve(dest, name.toLowerCase());
  // 3.判断文件不存在,那么就创建文件
  if (createDirSync(targetDest)) {
    // 4.拼接绝对路径和文件（C:\Users\Li\Desktop\testCode\wqe\src\views\文件夹+ 文件）
    const targetPath = path.resolve(targetDest, fileName);
    // 5.写入文件
    writeToFile(targetPath, result);
  }
};

// 创建组件的action
const addComponentAction = async (name, dest) => {
  // 1.编译ejs模板 result
  // const result = await compile("vue-component.ejs", {
  //   name,
  //   lowerName: name.toLowerCase(),
  // });

  // // 2.写入文件的操作
  // const targetPath = path.resolve(dest, `${name}.vue`);
  // writeToFile(targetPath, result);
  // 4.放到对应的文件夹中

  handleEjsToFile(name, dest, "vue-component.ejs", `${name}.vue`);
};

// 添加组件和路由
const addPageAndRoute = async (name, dest) => {
  // 1.编译ejs模板
  // const data = {
  //   name,
  //   lowerName: name.toLowerCase(),
  // };
  // const pageResult = await compile("vue-component.ejs", data);
  // const routeResult = await compile("vue-router.ejs", data);

  // // 2.写入文件
  // const targetDest = path.resolve(dest, name.toLowerCase());
  // if (createDirSync(targetDest)) {
  //   const targetPagePath = path.resolve(targetDest, `${name}.vue`);
  //   const targetRoutePath = path.resolve(targetDest, "type.js");
  //   writeToFile(targetPagePath, pageResult);
  //   writeToFile(targetRoutePath, routeResult);
  // }
  addComponentAction(name, dest);
  handleEjsToFile(name, dest, "vue-router.ejs", "router.js");
};

const addStoreAction = async (name, dest) => {
  // // 1.编译的过程
  // const storeResult = await compile("vue-store.ejs", {});
  // const typeResult = await compile("vue-types.ejs", {});

  // // 2.创建文件
  // const targetDest = path.resolve(dest, name.toLowerCase());
  // if (createDirSync(targetDest)) {
  //   const targetPagePath = path.resolve(targetDest, `${name}.js`);
  //   const targetRoutePath = path.resolve(targetDest, "types.js");
  //   writeToFile(targetPagePath, storeResult);
  //   writeToFile(targetRoutePath, typeResult);
  // }
  handleEjsToFile(name, dest, "vue-store.ejs", `${name}.js`);
  handleEjsToFile(name, dest, "vue-types.ejs", `types.js`);
};

module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAndRoute,
  addStoreAction,
};
