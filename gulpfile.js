// // Resources
// Plugins
const {
  series,
  task,
} = require('gulp');

const c = require('ansi-colors');
const del = require('del');
const fancyLog = require('fancy-log');
const git = require('gulp-git');


// // Tasks
// Delete cloned repo folder content
task('clean', () => {
  return del('clonehere/**', {force:true});
});

// Clone my repo where it's needed
task('clone-my-repo', async () => {
  const repoUri = 'https://github.com/youpiwaza/chaos-toolbox';
  // Clone remote repo to sub folder ($CWD/clonehere/sub)
  git.clone(repoUri, {args: './clonehere/sub'}, async (status) => {

    if(status === undefined) {
      fancyLog(c.green(`Repo '${c.cyan.italic(repoUri)}' cloné avec succès`));
      await Promise.resolve(`Repo '${repoUri}' cloné avec succès`);
    }
    else {
      fancyLog(c.bold.red(`Erreur lors du clonage du repo '${c.cyan.italic(repoUri)}'`));
      fancyLog(status);
      await Promise.resolve(`Erreur lors du clonage du repo '${repoUri}'`);
    }
  })
});

// Clone private repo
//  Automatically ask for github connexion via a popup <3
task('clone-my-private-repo', async () => {
  const repoUri = 'https://github.com/youpiwaza/boilerplate-exercice';
  // Clone remote repo to sub folder ($CWD/clonehere/sub)
  git.clone(repoUri, {args: './clonehere/sub'}, async (status) => {

    if(status === undefined) {
      fancyLog(c.green(`Repo '${c.cyan.italic(repoUri)}' cloné avec succès`));
      await Promise.resolve(`Repo '${repoUri}' cloné avec succès`);
    }
    else {
      fancyLog(c.bold.red(`Erreur lors du clonage du repo '${c.cyan.italic(repoUri)}'`));
      fancyLog(status);
      await Promise.resolve(`Erreur lors du clonage du repo '${repoUri}'`);
    }
  })
});

// Default tesk, executed when using 'gulp'
//  Clean then clone
task('default', series('clean', 'clone-my-repo'));
task('get-private-repo', series('clean', 'clone-my-private-repo'));
