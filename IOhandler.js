/*
 * Project:
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */

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
const unzip = (pathIn, pathOut) => {
  fs.createReadStream(pathIn)
  .pipe(unzipper.Parse())
  .on('entry', function (entry) {
    const fileName = entry.path;
    const type = entry.type; // 'Directory' or 'File'
    const size = entry.vars.uncompressedSize; // There is also compressedSize;
    if (fileName === "this IS the file I'm looking for") {
      entry.pipe(fs.createWriteStream(pathOut));
    } else {
      entry.autodrain();
    }
  });

};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */

const grayScale = (pathIn, pathOut) => {
  fs.createReadStream("in.png")
  .pipe(
    new PNG({
      filterType: 4,
    })
  )
  .on("parsed", function () {
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        var idx = (this.width * y + x) << 2;
 
        // invert color
        var color = (this.data[idx] + this.data[idx + 1] + this.data[idx + 2] )/ 3
        this.data[idx] = color;
        this.data[idx + 1] = color;
        this.data[idx + 2] = color;
 
        // and reduce opacity
        this.data[idx + 3] = this.data[idx + 3] >> 1;
      }
    }
 
    this.pack().pipe(fs.createWriteStream("out.png"));
  });
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
