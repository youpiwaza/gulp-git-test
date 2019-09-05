// // Resources
// Plugins
const {
  series,
  task,
} = require('gulp');

const colors = require('ansi-colors');
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
  // Clone remote repo to sub folder ($CWD/clonehere/sub)
  git.clone('https://github.com/youpiwaza/chaos-toolbox', {args: './clonehere/sub'}, async (status) => {

    if(status === undefined) {
      fancyLog(colors.green('Repo cloné avec succès'));
      await Promise.resolve('Repo cloné avec succès');
    }
    else {
      fancyLog(colors.red('Error lel'));
      fancyLog(status);
      await Promise.resolve('Error lel');
    }
  })
});

// Default tesk, executed when using 'gulp'
//  Clean then clone
task('default', series('clean', 'clone-my-repo'));
