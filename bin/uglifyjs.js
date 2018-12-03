#! /usr/bin/env node

const fs = require('fs');
const UglifyJS = require("uglify-es");
const regex = /(\/pages\/|\-min.js$)/;
let path = require('path');

function uglifyRecursiveSync(src, dest) {
  let exists = fs.existsSync(src),
    stats = exists && fs.statSync(src),
    isDirectory = exists && stats.isDirectory();

  if (exists && isDirectory) {
    if (!fs.existsSync(dest)){
      fs.mkdirSync(dest);
    }

    fs.readdirSync(src).forEach(function(childItemName) {
      uglifyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });

  } else {

    if (regex.exec(src) === null) {
      //ugly
      const code = fs.readFileSync(src, "utf8"),
        result = UglifyJS.minify(code);

      fs.writeFileSync(dest.replace('.js', '-min.js'), result.code);

    } else {

      //copy
      fs.linkSync(src, dest);
    }

  }
};

uglifyRecursiveSync('js/vendor/', 'dist/vendor/');