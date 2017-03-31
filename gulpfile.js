var gulp = require("gulp");

//var browserSync = require('browser-sync').create();
//var reload = browserSync.reload;
//// 创建一个静态的服务器
//gulp.task('browser-sync',function() {
//  browserSync.init({
//      server:{
//          baseDir:"src/"
//      }
//  });
//});

var sass = require("gulp-sass");
var cssnano = require("gulp-cssnano");
var concat = require('gulp-concat');
gulp.task("scss", function() {
    gulp.src("src/app/pages/**/*.scss")
    .pipe(sass())//编译scss文件
    .pipe(gulp.dest("src/app/pages/"))
    //.pipe(concat("main.min.css"))//合并
//  .pipe(cssnano())//压缩
    .pipe(gulp.dest("dist/app/pages/"));
//     .pipe(reload({stream:true}));

});



// 压缩合并js文件，并放到上线环境中
var uglify = require("gulp-uglify");
gulp.task("js", function(){
    gulp.src(["src/app/pages/**/*.js"])
        // .pipe(concat("main.min.js"))//合并
//      .pipe(uglify())//使用uglify进行压缩，并保留部分注释
        .pipe(gulp.dest("dist/app/pages/"));
});


gulp.task("libs",function(){
    gulp.src("src/app/common/js/*")
    .pipe(gulp.dest("dist/app/common/js"));
    gulp.src("src/app/common/css/*")
    .pipe(gulp.dest("dist/app/common/css"));
    gulp.src("src/app/app.js")
    .pipe(gulp.dest("dist/app"));
    gulp.src("src/app/common/fonts/*")
    .pipe(gulp.dest("dist/app/common/fonts"));
})


//图片
var imagemin = require("gulp-imagemin");//优化图片
var cache = require("gulp-cache");//可以减少重复压缩
gulp.task("images", function() {
    //指明源文件路径、并进行文件匹配
    gulp.src("src/app/images/**/*.{png,jpg,gif}")
        .pipe(cache(imagemin({
            progressive:true,
            svgoPlugins:[{removeViewBox:false}],
            interlaced: true
        })))
        .pipe(gulp.dest("dist/app/images"));
    
    gulp.src("src/app/common/img/*.{png,jpg,gif}")
        .pipe(cache(imagemin({
            progressive:true,
            svgoPlugins:[{removeViewBox:false}],
            interlaced: true
        })))
        .pipe(gulp.dest("dist/app/common/img"));
});




//发布静态页面到dist目录中
var htmlmin = require("gulp-htmlmin");
gulp.task("html", function() {
    gulp.src("src/**/**/**/**/*.html")
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest("dist"));
});




//监控文件变化 
gulp.task("watch", [ /*"browser-sync",*/ "scss", "js", "images", "html", "libs"],function() {    
    gulp.watch("src/app/pages/**/*.scss", ["scss"]);
    gulp.watch("src/app/pages/**/*.js",["js"]);
    gulp.watch('src/app/images/**/*.*',["images"]);
    gulp.watch('src/**/**/**/**/*.html',["html"]);
//  gulp.watch("src/**/*.+(html|js)").on("change", reload);
});

gulp.task("default", function() {  
    gulp.start(["scss", "js", "images", "html",/*"browser-sync",*/ "watch", "libs"]);  
});





