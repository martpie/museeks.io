const gulp = require('gulp');
const pug = require('gulp-pug');
const stylus = require('gulp-stylus');
const del = require('del');


/**
 * Main tasks
 */

gulp.task('clean', () => {
    return del([
        'dist/**/*',
        '!dist/mobile/.keep',
    ]);
});

gulp.task('root', () => {
    return gulp.src('src/*')
        .pipe(gulp.dest('./dist/'));
});


gulp.task('views', () => {
    return gulp.src(['src/views/*.pug', '!src/views/layout.pug'])
        .pipe(pug({}))
        .pipe(gulp.dest('./dist/'));
});


gulp.task('styles', () => {
    return gulp.src('src/styles/main.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./dist/styles'));
});


gulp.task('scripts', () => {
    return gulp.src('src/scripts/*.js')
        .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('images', () => {
    return gulp.src('src/images/*')
        .pipe(gulp.dest('./dist/images'));
});

gulp.task('fonts', () => {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('./dist/fonts'));
});


/**
 * Default tasks
 */

gulp.task('default', ['root', 'views', 'styles', 'scripts', 'images', 'fonts']);

gulp.task('dev', () => {

    const pugWatcher = gulp.watch('src/**/*', ['default']);

    pugWatcher.on('change', handleFileChange);
})


/**
 * Utils
 */

const handleFileChange = function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}
