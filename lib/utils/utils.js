const path = require("path");
const fs = require("fs");

const ejs = require("ejs");

// 模板编译
const compile = (templateName, data) => {
  const templatePosition = `../templates/${templateName}`;
  const templatePath = path.resolve(__dirname, templatePosition);

  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, {}, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

// 递归判断有没文件夹，然后创建文件夹
const createDirSync = (pathName) => {
  if (fs.existsSync(pathName)) {
    return true;
  } else {
    // 不存在,判断父亲文件夹是否存在？
    if (createDirSync(path.dirname(pathName))) {
      // 存在父亲文件，就直接新建该文件
      fs.mkdirSync(pathName);
      return true;
    }
  }
};

const writeToFile = (path, content) => {
  return fs.promises.writeFile(path, content);
};

module.exports = {
  compile,
  writeToFile,
  createDirSync,
};
