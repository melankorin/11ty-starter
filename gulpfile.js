const gulp = require("gulp");
// Uncomment the line below and install the dependency if using Tailwind.
// const replace = require('gulp-replace');
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
        // This pipe (and gulp-replace) can be removed if not using Tailwind.
        /* .pipe(replace(/(\[[^\]]*?url\(.*?)(\?cbh=[a-f0-9]+)(\).*?\])/g, function(match, p1, p2, p3) {
            if (this.file.extname === '.html') { return p1 + p3; }
            return match;
        })) */
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