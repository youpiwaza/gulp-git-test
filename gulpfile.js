//// config
const repoUri = 'https://github.com/youpiwaza/mock-repo-w-gulp-sass';
const pathWhereToClone = './clonehere/sub';

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

// const spawn = require('child_process').spawn;
const spawn2 = require('cross-spawn');


// // Tasks
// Delete cloned repo folder content
task('clean', () => {
  return del('clonehere/**', {force:true});
});

// Clone my repo where it's needed
task('clone-my-repo', (done) => {
  // Clone remote repo to sub folder ($CWD/clonehere/sub)
  git.clone(repoUri, {args: pathWhereToClone}, (status) => {

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
  git.clone(repoUri, {args: pathWhereToClone}, (status) => {

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

// Warn user
task('warn', (done) => {
    fancyLog(c.yellow(`Attention, il ne faut pas laisser le dossier où le clone sera ajouté ouvert (NI explorateur NI IDE) : ${pathWhereToClone}`));
    done();
});

// Cloned repo > execute yarn
task('yarn-cloned-repo', () => {
    //                                                                        if not present, create
    return src([`${pathWhereToClone}/package.json`, `${pathWhereToClone}/yarn.lock`], { allowEmpty: true })
        .pipe(dest(pathWhereToClone))
        .pipe(yarn());
});

// Cloned repo > execute gulp
task('make-cloned-repo-dist', (done) => {
  spawn2('gulp', [], { cwd: pathWhereToClone, stdio: 'inherit' })
  .on('close', done);
});




// Default tesk, executed when using 'gulp'
//  Clean then clone
// task('default', series('warn', 'clean', 'clone-my-repo'));
task('get-private-repo', series('warn', 'clean', 'clone-my-private-repo'));
// task('clone-n-install', series('clean', 'clone-my-private-repo', 'log' ));
task('clone-n-install', series('warn', 'clean', 'clone-my-repo', 'yarn-cloned-repo'));
// task('clone-n-install-n-dist', series('warn', 'clean', 'clone-my-repo', 'yarn-cloned-repo', 'make-cloned-repo-dist'));


task('default', series('warn', 'clean', 'clone-my-repo', 'yarn-cloned-repo', 'make-cloned-repo-dist'));















//
