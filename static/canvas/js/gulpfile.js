var gulp    = require('gulp'),
    jshint  = require('gulp-jshint'),
    uglify  = require ('gulp-uglify'),
    stylish = require('jshint-stylish'),
    minify  = require('gulp-minify-css'),
    rename  = require("gulp-rename"),
    merge   = require('merge-stream');

var dev = {
    css: 'dev/css/',
    js : 'dev/js/'

};

var dist = {
    js : 'dist/js/',
    css: 'dist/css/'
};

gulp.task('default', function () {

    var jh = gulp.src(dev.js + '*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(gulp.dest(dist.js));

    var js = gulp.src(dev.js + '*.js')
        .pipe(uglify())
        .pipe(rename('dot.min.js'))
        .pipe(gulp.dest(dist.js));

    var css = gulp.src(dev.css + '*.css')
        .pipe(gulp.dest(dist.css));

    var min = gulp.src(dev.css + '*.css')
        .pipe(minify())
        .pipe(rename('dot.min.css'))
        .pipe(gulp.dest(dist.css));

    return merge(jh, js, css, min);
});

