import gulp from 'gulp';
import ghpages from 'gulp-gh-pages';

gulp.task('deploy', () => (
	gulp.src(['build/**/*', '!build/robots.txt']).pipe(ghpages({branch: 'build'}))
));
