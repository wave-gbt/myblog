var gulp = require('gulp');
var babel = require("gulp-babel");
var minifycss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');
var imagemin = require('gulp-imagemin');
var del = require('del');
var runSequence = require('run-sequence');
var Hexo = require('hexo');
gulp.task('clean', function() {
    return del(['public/**/*']);
});
// generate html with 'hexo generate'
var hexo = new Hexo(process.cwd(), {});
gulp.task('generate', function(cb) {
    hexo.init().then(function() {
        return hexo.call('generate', {
            watch: false
        });
    }).then(function() {
        return hexo.exit();
    }).then(function() {
        return cb()
    }).catch(function(err) {
        console.log(err);
        hexo.exit(err);
        return cb(err);
    })
})
gulp.task('minify-css', function() {
    return gulp.src(['./public/**/*.css','public/**/*.min.css'])
        .pipe(minifycss({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('./public'));
});
gulp.task('minify-html', function() {
    return gulp.src('./public/**/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
            removeComments: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        }))
        .pipe(gulp.dest('./public'))
});
gulp.task('minify-js', function() {
    return gulp.src(['./public/**/*.js','!public/**/*.min.js'])
        .pipe(babel({presets: ['es2015']}))
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
});
gulp.task('minify-img', function() {
    return gulp.src('./public/images/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/images'))
})
gulp.task('minify-img-aggressive', function() {
    return gulp.src('./public/images/**/*.*')
        .pipe(imagemin(
            [imagemin.gifsicle({'optimizationLevel': 3}),
                imagemin.jpegtran({'progressive': true}),
                imagemin.optipng({'optimizationLevel': 7}),
                imagemin.svgo()],
            {'verbose': true}))
        .pipe(gulp.dest('./public/images'))
})
gulp.task('compress', function(cb) {
    runSequence(['minify-html', 'minify-css', 'minify-img'], cb);
});
gulp.task('build', function(cb) {
    runSequence('clean', 'generate', 'compress', cb)
});
gulp.task('default', ['build'])