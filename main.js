/*
 * Project:
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */

const IOhandler = require("./IOhandler"),
  zipFilePath = `${__dirname}/myfile.zip`,
  pathUnzipped = `${__dirname}/unzipped`,
  pathProcessed = `${__dirname}/grayscaled`;
console.log(zipFilePath)

console.log(__dirname)
IOhandler.unzip(zipFilePath, pathUnzipped)
.then(() => IOhandler.readDir(pathUnzipped))
.then((filePaths) => IOhandler.grayScale(filePaths, pathProcessed))

