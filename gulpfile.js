const gulp = require("gulp");
const hash_src = require("gulp-hash-src");
const htmlmin = require("gulp-html-minifier-terser");
// Uncomment the line below and install the dependency if using Sass.
// const autoprefixer = require("gulp-autoprefixer");

// Uncomment this block if using Sass.
// Prefix CSS
/* function prefixCSS() {
    return gulp.src('site/assets/css/*.css')
        .pipe(autoprefixer({ cascade: false }))
        .pipe(gulp.dest('site/assets/css'));
} */

// Cache busting with query strings
function cacheBusting() {
    return gulp.src(["site/**/*.html", "site/**/*.css"])
        .pipe(hash_src({
            build_dir: "site",
            src_path: "site"
        }))
        .pipe(gulp.dest("site"));
}

// Minify HTML
function processHTML() {
    return gulp.src("site/**/*.html")
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest("site"));
}

module.exports.default = gulp.series(
    // Uncomment the line below if using Sass.
    // prefixCSS,
    cacheBusting, 
    processHTML
);