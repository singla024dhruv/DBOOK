// const gulp = require("gulp");

// //const sass = require("gulp-sass");
// const cssnano = require("gulp-cssnano");
// const rev = require("gulp-rev");

// gulp.task("css", function () {
//   console.log("minifying css...");
// //   gulp
// //     .src("./assets/sass/**/*.scss")
// //     .pipe(sass())
    
// //     .pipe(gulp.dest("./assets.css"));

//   return gulp
//     .src("./assets/**/*.css")
//     .pipe(cssnano())
//     .pipe(rev())
//     .pipe(gulp.dest("./public/assets"))
//     .pipe(
//       rev.manifest({
//         cwd: "public",
//         merge: true,
//       })
//     )
//     .pipe(gulp.dest("./public/assets"));
// });
const gulp = require("gulp");
const sass = require("gulp-sass"); // Uncomment if you need Sass compilation
const cssnano = require("gulp-cssnano");
const rev = require("gulp-rev");
const sourcemaps = require("gulp-sourcemaps"); // Optional for sourcemaps

gulp.task("build-css", function () {
  return gulp
    .src("./assets/sass/**/*.scss") // Replace with './assets/**/*.css' if no Sass
    .pipe(sourcemaps.init()) // Optional for sourcemaps
    .pipe(sass())
    .pipe(cssnano())
    .pipe(rev())
    .pipe(sourcemaps.write("./")) // Optional for sourcemaps
    .pipe(gulp.dest("./public/assets"))
    .pipe(
      rev.manifest({
        cwd: "public",
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets"));
});
