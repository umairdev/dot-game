const gulp = require('gulp');

const sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

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

gulp.task('watch', () => {
	gulp.watch('./src/js/**/*.js', gulp.series('lint'));
	gulp.watch('./src/js/**/*.js', gulp.series('scripts'));
	gulp.watch('./src/sass/**/*.scss', gulp.series('sass'));
});

// Run Project Task
gulp.task('magic', gulp.series('sass', 'lint', 'scripts'));