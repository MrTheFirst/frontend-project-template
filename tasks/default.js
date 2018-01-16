import runSequence from 'run-sequence';
import gulp from 'gulp';

gulp.task('styles:dependencies', () => (
	runSequence(
		'icons',
		'styles',
		'fonts'
	)
));

gulp.task('default', () => (
	runSequence(
		[
			'styles:dependencies',
			'templates',
			'fonts',
		],
		'server',
		'watch'
	)
));

gulp.task('build', () => (
	runSequence(
		'styles:dependencies',
		'scripts',
		'fonts',
		'copy',
		'templates'
	)
));
