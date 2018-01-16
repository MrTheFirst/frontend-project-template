import gulp from 'gulp';
import changed from 'gulp-changed';

gulp.task('fonts', () => {
	gulp.src('app/styles/fonts/**/*.*')
		.pipe(gulp.dest('build/assets/styles/fonts/'))
});
