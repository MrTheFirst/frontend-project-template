import gulp from 'gulp';
import gulpIf from 'gulp-if';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import pugLinter from 'gulp-pug-linter';
import prettify from 'gulp-jsbeautifier';
import inheritance from 'gulp-pug-inheritance';
import cached from 'gulp-cached';
import filter from 'gulp-filter';
import rename from 'gulp-rename';
import errorHandler from 'gulp-plumber-error-handler';
import staticHash from 'gulp-static-hash';


gulp.task('templates', () => (
	gulp.src('app/**/*.pug')
		.pipe(plumber({errorHandler: errorHandler('Error in \'templates\' task')}))
		.pipe(cached('pug'))
		.pipe(gulpIf(global.watch, inheritance({basedir: 'app'})))
		.pipe(filter(file => /app[\\\/]pages/.test(file.path)))
		.pipe(pug({basedir: 'app'}))
		.pipe(gulpIf(process.env.PRETTIFY !== false, prettify({
			braceStyle: 'expand',
			indentWithTabs: true,
			indentInnerHtml: true,
			preserveNewlines: true,
			endWithNewline: true,
			wrapLineLength: 120,
			maxPreserveNewlines: 50,
			wrapAttributesIndentSize: 1,
			unformatted: ['use']
		})))
		.pipe(gulpIf(process.env.NODE_ENV === 'production', staticHash({
			asset: 'dist',
			exts: ['js', 'css']
		})))
		.pipe(rename({dirname: '.'}))
		.pipe(gulp.dest('dist'))
));

gulp.task('templates:lint', () =>
	gulp
		.src('app/**/*.pug')
		.pipe(pugLinter())
		.pipe(pugLinter.reporter('fail'))
);
