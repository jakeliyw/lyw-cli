const inquire = require("inquirer");
const repoConfig = require("../config/repo.config");

const promptList = [
  {
    type: "list",
    message: "请选择要使用的模板",
    name: "type",
  },
];

const gitrepo = async () => {};
