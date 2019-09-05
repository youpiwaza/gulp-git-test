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



// Clone remote repo to sub folder ($CWD/sub/folder/git-test)
task('clone-mine', function() {
  git.clone('https://github.com/youpiwaza/chaos-toolbox', {args: './clonehere/sub'}, function(status) {

    if(status === undefined) {
      fancyLog(colors.green('Repo cloné avec succès'));
      return true;
    }
    else {
      fancyLog(colors.red('Error lel'));
      console.log(status);
      return false;
    }
  });
});

task('clean', function(){
  return del('clonehere/**', {force:true});
});

// Default tesk, executed when using 'gulp'
task('default', series('clean', 'clone-mine'));
