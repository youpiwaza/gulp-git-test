// // Resources
// Plugins
const {
  series,
  task,
  src,
  dest
} = require('gulp');

const c = require('ansi-colors');
const del = require('del');
const fancyLog = require('fancy-log');
const git = require('gulp-git');
const yarn = require('gulp-yarn');


// // Tasks
// Delete cloned repo folder content
task('clean', () => {
  return del('clonehere/**', {force:true});
});

// Clone my repo where it's needed
task('clone-my-repo', (done) => {
  const repoUri = 'https://github.com/youpiwaza/chaos-toolbox';
  // Clone remote repo to sub folder ($CWD/clonehere/sub)
  git.clone(repoUri, {args: './clonehere/sub'}, (status) => {

    if(status === undefined) {
      fancyLog(c.green(`Repo '${c.cyan.italic(repoUri)}' cloné avec succès`));
    }
    else {
      fancyLog(c.bold.red(`Erreur lors du clonage du repo '${c.cyan.italic(repoUri)}'`));
      fancyLog(status);
    }
    done();
  })
});

// Clone private repo
//  Automatically ask for github connexion via a popup <3
task('clone-my-private-repo', (done) => {
  const repoUri = 'https://github.com/youpiwaza/boilerplate-exercice';
  // Clone remote repo to sub folder ($CWD/clonehere/sub)
  git.clone(repoUri, {args: './clonehere/sub'}, (status) => {

    if(status === undefined) {
      fancyLog(c.green(`Repo '${c.cyan.italic(repoUri)}' cloné avec succès`));
    }
    else {
      fancyLog(c.bold.red(`Erreur lors du clonage du repo '${c.cyan.italic(repoUri)}'`));
      fancyLog(status);
    }
    done();
  })
});

// Test async
// task('log', (done) => {
//     console.log('yarn');
//     done();
// });

task('yarn', () => {
    //                                                                        if not present, create
    return src(['./clonehere/sub/package.json', './clonehere/sub/yarn.lock'], { allowEmpty: true })
        .pipe(dest('./clonehere/sub'))
        .pipe(yarn());
});

// Default tesk, executed when using 'gulp'
//  Clean then clone
task('default', series('clean', 'clone-my-repo'));
task('get-private-repo', series('clean', 'clone-my-private-repo'));
// task('clone-n-install', series('clean', 'clone-my-private-repo', 'log' ));
task('clone-n-install', series('clean', 'clone-my-private-repo', 'yarn'));















//
