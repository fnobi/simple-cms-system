const path = require('path');
const fs = require('mz/fs');
const pug = require('pug');

const SRC = 'src/';
const POSTS = 'posts/';
const DEST = 'public/';

const INDEX_TEMPLATE_PATH = `${SRC}/pug/index.pug`;
const POST_TEMPLATE_PATH = `${SRC}/pug/post.pug`;

Promise.all([
  fs.readFile(INDEX_TEMPLATE_PATH, 'utf8'),
  fs.readFile(POST_TEMPLATE_PATH, 'utf8'),
  fs.readdir(POSTS)
]).then(([indexTemplate, postTemplate, files]) => {
  const getIndexHtml = pug.compile(indexTemplate);
  const getPostHtml = pug.compile(postTemplate);

  Promise.all(
    files.map(
      (filePath) => fs.readFile(`${POSTS}${filePath}`, 'utf8')
    )
  ).then(
    (bodies) => bodies.map((body, index) => {
      const basename = path.basename(files[index], '.json');
      return {
        data: JSON.parse(body),
        href: `post/${basename}.html`
      };
    })
  ).then((posts) => {
    // top page
    fs.writeFile(
      `${DEST}index.html`,
      getIndexHtml({ posts }),
      'utf8'
    );

    // post page
    posts.forEach((post) => {
      fs.writeFile(
        `${DEST}${post.href}`,
        getPostHtml(post.data),
        'utf8'
      );
    });
  });
});
