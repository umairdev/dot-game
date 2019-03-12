const gulp = require('gulp');

const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const handlebars = require('handlebars');
const config = require('./gulp.config')();
const gulpHandlebars = require('gulp-handlebars-html')(handlebars);
const regexRename = require('gulp-regex-rename');
const replace = require('gulp-replace');
const browserSync = require('browser-sync').create();


// Sass and Styling Task
gulp.task('sass', () => {
	return gulp.src('./src/sass/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(cssnano())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist/css/'));
	});

// Lint Task
gulp.task('lint', () => {
    return gulp.src('./src/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
	});

// Concatenate & Minify JS files
gulp.task('scripts', () => {
    return gulp.src('./src/js/**/*.js')
        .pipe(concat('build.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('build.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
	});

// Templating task
gulp.task('compileHtml', () => {
    var templateData = {

    },
    options = {
        partialsDirectory: [config.templatePartialPath]
    };

    return gulp.src(config.templatePath + "*.page.hbs")
               .pipe(gulpHandlebars(templateData, options))
               .pipe(regexRename(/\.page\.hbs$/, ".html"))
               .pipe(replace(/\uFEFF/ig, "")) //cut out zero width nbsp characters the compiler adds in
               .pipe(gulp.dest(config.templateOutputPath));
});

// Watch tasks
gulp.task('watch', () => {
	
	browserSync.init({
        server: "./dist"
    });

	gulp.watch('./src/js/**/*.js', gulp.series('lint'));
	gulp.watch('./src/js/**/*.js', gulp.series('scripts'));
	gulp.watch('./src/sass/**/*.scss', gulp.series('sass'));
	gulp.watch(config.templates, gulp.series('compileHtml'));
	gulp.watch("dist/*.html").on('change', browserSync.reload);
});

// Run Project Task
gulp.task('magic', gulp.series('lint', 'scripts', 'sass', 'compileHtml'));