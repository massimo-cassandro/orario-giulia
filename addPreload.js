/*
  from:
  https://github.com/facebook/create-react-app/issues/3319
  https://github.com/facebook/create-react-app/issues/6860

  To run it automatically, change your package,json buid script to:

      "build": "react-scripts build && node addPreload.js"
*/

const fs = require('fs'),
  path = require('path'),
  glob = require('glob');

// grabbing of woff2, css and svg file in static dir
// NB: .woff fonts are not preloaded
const staticAssets = glob.sync(__dirname + '/build/static/*/*.@(woff2|svg|css)')
    .map( item => '/' + path.relative(__dirname + '/build', item)),

  pathToEntry = './build/index.html',
  builtHTMLContent = fs.readFileSync(pathToEntry).toString();


// grabbing of js files from html code
// runtime-main.xxxx.js is inlined by default: this way only really used js are preloaded
const scriptRegExp = /<script.*?src="(\/static\/[a-z0-9_./]+\.js)"/g,
  scriptSrcs = builtHTMLContent.match(scriptRegExp)
    .map(item => item.slice(item.indexOf('/static/'), -1));

// console.log(scriptSrcs);

// preload tags building
let preloadTags = [];

for (const asset of staticAssets.concat(scriptSrcs)) {
  let ext = asset.split('.').pop(),
    preload = `<link rel="preload" href="${asset}" `;

  switch (ext) {
    case 'svg':
      preload += 'as="image">';
      break;

    case 'css':
      preload += 'as="style">';
      break;

    case 'js':
      preload += 'as="script">';
      break;

    // case 'woff':
    case 'woff2':
      preload += `as="font" type="font/${ext}" crossorigin>`;
      break;

    default: // this should not occur
      preload += '>';
      break;
  }

  // console.log(preload);

  preloadTags.push(preload);
}

// index.html rewrite
const splitBy = '</title>',
  HTMLparts = builtHTMLContent.split(splitBy);

fs.writeFileSync(pathToEntry,
  [
    HTMLparts[0],
    splitBy,
    ...preloadTags,
    HTMLparts[1]
  ].join('')
);

console.log('*** addPreload.js end ***'); // eslint-disable-line
