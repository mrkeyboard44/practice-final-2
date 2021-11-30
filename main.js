/*
 * Project:Exam Practice Question 2
 * File Name: main.js
 * Description: applies a grayscale filter to photos in a .zip file
 *
 * Created Date: Nov 30 / 2021
 * Author: Matthew Dandar A01180450
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

