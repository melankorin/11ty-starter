import 'dotenv/config';
import gulp from "gulp";
import hash_src from "gulp-hash-src";
import html_min from "gulp-html-minifier-terser";
import ftp from "vinyl-ftp";
import log from "fancy-log";
// Uncomment the line below and install the dependency if using Tailwind.
// import replace from "gulp-replace";
// Uncomment the line below and install the dependency if using Sass.
// import autoprefixer from "gulp-autoprefixer";

// TASKS ------------------------------------------------------------------------------------------

// Prefix CSS (Uncomment if using Sass)
/* export function prefixCSS() {
    return gulp.src('site/assets/css/*.css')
        .pipe(autoprefixer({ cascade: false }))
        .pipe(gulp.dest('site/assets/css'));
} */

// Cache busting with query strings
export function cacheBusting() {
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
export function processHTML() {
    return gulp.src("site/**/*.html")
        .pipe(html_min({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest("site"));
}

// FTP upload
export function ftpUpload() {
    const conn = ftp.create({
        host:     process.env.FTP_HOST,
        user:     process.env.FTP_USER,
        password: process.env.FTP_PASS,
        parallel: 4,
        log:      log
    });

    return gulp.src('site/**', { 
            buffer: false, 
            base: 'site', 
            nodir: true,
            encoding: false
        })
        .pipe(conn.newer(process.env.FTP_PATH))
        .pipe(conn.dest(process.env.FTP_PATH))
        .pipe(conn.clean(process.env.FTP_PATH, 'site/**'));
}

// EXPORTS -------------------------------------------------------------------------------------

export default gulp.series(
    // prefixCSS,
    cacheBusting, 
    processHTML
);

export const deploy = ftpUpload;