import gulp from 'gulp';
import plumber from 'gulp-plumber';
import gulpIf from 'gulp-if';
import sassLint from 'gulp-sass-lint';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import normalize from 'node-normalize-scss';
import gcmq from 'gulp-group-css-media-queries';
import nano from 'gulp-cssnano';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import errorHandler from 'gulp-plumber-error-handler';

const isDebug = process.env.NODE_ENV !== 'production';

gulp.task('styles', () => (
	gulp.src('app/styles/*.scss')
		.pipe(plumber({errorHandler: errorHandler(`Error in \'styles\' task`)}))
		.pipe(gulpIf(isDebug, sourcemaps.init()))
		.pipe(sass({
			use: [
				autoprefixer()
			],
			'include css': true,
			includePaths: [normalize.includePaths]
		}))
		.pipe(gulpIf(!isDebug, gcmq()))
		.pipe(gulpIf(!isDebug, nano({zindex: false})))
		.pipe(gulpIf(!isDebug, rename({suffix: '.min'})))
		.pipe(gulpIf(isDebug, sourcemaps.write('/')))
		.pipe(gulp.dest('build/assets/styles'))
));

gulp.task('styles:lint', () => (
	gulp.src(['app/**/*.s+(a|c)ss'])
		.pipe(sassLint({
			files: {
				ignore: 'app/styles/helpers/**.*'
			}
		}))
		.pipe(sassLint.format())
		.pipe(sassLint.failOnError())
));
