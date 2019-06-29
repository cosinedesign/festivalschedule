const 
	del = require('del'),
	gulp = require('gulp'),
	concat = require('gulp-concat'),
	sass = require('gulp-sass');//,
	//uglify = require('gulp-uglify');

sass.compiler = require('node-sass');

const config = {
	script: {
		output: 'site.js',
		test_output: 'flybrarian.lib.js',
		fly_src: [
				'flybrarian/site/script/cosinedesign.core.js',
				'flybrarian/site/script/festival.model.js',
				'flybrarian/site/script/flybrarian.core.js',
				'flybrarian/site/script/flybrarian.views.js',
				'flybrarian/site/script/flybrarian.data.js',
				'flybrarian/site/script/flybrarian.services.js',
				'flybrarian/site/script/flybrarian.controllers.js',
				'flybrarian/site/script/flybrarian.app.js'
			]
	},
	style: {
		fly_src: 'flybrarian/site/style/source/style.scss'
	}
};

gulp.task('build-test-watch', function () {
	console.log('Watching');

	gulp.watch(config.script.fly_src, gulp.series('build-test'));
	gulp.watch(config.script.fly_src, gulp.series('build-fly'));
});

gulp.task('copy-assets', function () {
	return gulp.src(['flybrarian/site/index.htm',
		'flybrarian/site/sw.js'])
		.pipe(gulp.dest('flybrarian/dist'));
});

gulp.task('build-fly-sass', function () {
	console.log('running build sass');
	return gulp.src(config.style.fly_src)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('flybrarian/dist/style'));
});

gulp.task('build-fly', function(){
	console.log('running build script');

    return gulp.src(config.script.fly_src)        
		.pipe(concat(config.script.output))		
        .pipe(gulp.dest('flybrarian/dist/script'));
});

gulp.task('clean', function () {
	return del(['flybrarian/dist/**', 'flybrarian/dist'], {force:true});
});

gulp.task('clean-test', function () {
	return del(['temp-test/**', 'temp-test'], {force:true});
});

gulp.task('build-fly-test', function () {
	
	const test_scripts = config.script.fly_src.concat([
		'flybrarian/site/script/jest.module.js'
	]);
	console.log(test_scripts);

    return gulp.src(test_scripts)        
		.pipe(concat(config.script.test_output))		
        .pipe(gulp.dest('temp-test'));
});

gulp.task('build-release', gulp.series('clean', 'build-fly', 'build-fly-sass', 'copy-assets'));
gulp.task('build-test', gulp.series('clean-test', 'build-fly-test'));
//   gulp.task('sass:watch', function () {
// 	gulp.watch('./sass/**/*.scss', ['sass']);
//   });