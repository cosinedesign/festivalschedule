const gulp = require('gulp'),
	concat = require('gulp-concat'),
	sass = require('gulp-sass');//,
	//uglify = require('gulp-uglify');

sass.compiler = require('node-sass');

const config = {
	script: {
		output: 'site.js',
		fly_src: [
				'flybrarian/site/script/cosinedesign.core.js',
				'flybrarian/site/script/festival.model.js',
				'flybrarian/site/script/flybrarian.core.js',
				'flybrarian/site/script/flybrarian.views.js',
				'flybrarian/site/script/flybrarian.controllers.js',
				'flybrarian/site/script/flybrarian.data.js',
				'flybrarian/site/script/flybrarian.app.js'
			]
	},
	style: {
		fly_src: 'flybrarian/site/style/source/_style.scss'
	}
};

gulp.task('build-fly-sass', function () {
	console.log('running build sass');
	return gulp.src(config.style.fly_src)
		.pipe(sass().on('error', function(e) { 
			console.log(e); 
		}))
		.pipe(gulp.dest('flybrarian/dist/style'));
});

gulp.task('build-fly', function(){
	console.log('running build script');

    return gulp.src(config.script.fly_src)        
		.pipe(concat(config.script.output))		
        .pipe(gulp.dest('flybrarian/dist/script'));
});

gulp.task('build-release', gulp.series('build-fly', 'build-fly-sass'));
   
//   gulp.task('sass:watch', function () {
// 	gulp.watch('./sass/**/*.scss', ['sass']);
//   });