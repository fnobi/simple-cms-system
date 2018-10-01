const path = require('path');
const fs = require('mz/fs');
const pug = require('pug');

const SRC = 'src/';
const POSTS = 'posts/';
const DEST = 'public/post/';

const TEMPLATE_PATH = `${SRC}/pug/post.pug`;

Promise.all([
  fs.readFile(TEMPLATE_PATH, 'utf8'),
  fs.readdir(POSTS)
]).then(([template, files]) => {
  const getHtml = pug.compile(template);

  files.forEach((filePath) => {
    fs.readFile(`${POSTS}${filePath}`, 'utf8').then((body) => {
      const basename = path.basename(filePath, '.json');
      const dest = `${DEST}${basename}.html`;
      const locals = JSON.parse(body);
      const html = getHtml(locals);
      fs.writeFile(dest, html, 'utf8');
    });
  });
});
