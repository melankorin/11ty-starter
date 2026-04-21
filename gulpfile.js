const gulp = require("gulp");
// Uncomment the line below and install the dependency if using Tailwind.
// const replace = require('gulp-replace');
const hash_src = require("gulp-hash-src");
const htmlmin = require("gulp-html-minifier-terser");
// Uncomment the line below and install the dependency if using Sass.
// const autoprefixer = require("gulp-autoprefixer");
// Uncomment the lines below and install the dependencies if deploying to cPanel.
// const ftp = require("vinyl-ftp");
// const log = require("fancy-log");

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

// FTP upload
// Uncomment the lines below, create an .env file and install the dependencies if deploying to cPanel.
/* function ftpUpload() {
    const conn = ftp.create({
        host:     process.env.FTP_HOST,
        user:     process.env.FTP_USER,
        password: process.env.FTP_PASS,
        parallel: 4,
        log:      require('fancy-log')
    });

    const remotePath = process.env.FTP_PATH || "/";

    return gulp.src('site/**', { 
            buffer: false, 
            base: 'site', 
            nodir: true,
            encoding: false
        })
        .pipe(conn.differentSize(process.env.FTP_PATH))
        .pipe(conn.dest(process.env.FTP_PATH))
        .pipe(conn.clean(process.env.FTP_PATH, 'site/**'));
} */

module.exports.default = gulp.series(
    // Uncomment the line below if using Sass.
    // prefixCSS,
    cacheBusting, 
    processHTML
);

// Uncomment the lines below if deploying to cPanel.
// module.exports.deploy = ftpUpload;