/*
 * Project:
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date: Nov 29 / 2021
 * Author: Matthew Dandar
 *
 */

const { resolve } = require("path");
const unzipper = require("unzipper"),
  fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = async (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(pathIn)
    .pipe(unzipper.Extract({ path: pathOut }))
    .on("error", reject)
    .on("finish", resolve);
  })
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} unzippedPath
 * @return {promise}
 */
const readDir = async (unzippedPath) => {
  return new Promise((resolve, reject) => {
    let files = fs.readdirSync(unzippedPath)
    console.log(files)
    files = files.filter(item => item !== '__MACOSX')
    files = files.map(item => path.join(unzippedPath, item))
    console.log(files)
    resolve(files)
  })
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {Array} filePaths
 * @param {string} pathProcessed
 * @return {promise}
 */

const grayScale = (filePaths, pathProcessed) => {
    filePaths.forEach((file, i) => {
      console.log(file)
      fs.createReadStream(file)
      .pipe(
        new PNG({
          filterType: 4,
        })
      )
      .on("parsed", function () {
        for (var y = 0; y < this.height; y++) {
          for (var x = 0; x < this.width; x++) {
            var idx = (this.width * y + x) << 2;
    
            // make gray
            var color = (this.data[idx] + this.data[idx + 1] + this.data[idx + 2] )/ 3
            this.data[idx] = color;
            this.data[idx + 1] = color;
            this.data[idx + 2] = color;
          }
        }
        let newPath = path.join(pathProcessed + '/' + i + '.png')
        this.pack().pipe(fs.createWriteStream(newPath));
        console.log(`edited file ${i}`)
      });
  })
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
