const { RenderPlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {

    // FILES --------------------------------------------------------------------------------------

    // Copy assets and static images
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy({ "src/img/static": "assets/img" });

    // Copy favicons
    eleventyConfig.addPassthroughCopy({"src/favicons/!(*.liquid)": "/"});

    // Copy optimized images after build
    const fs = require("fs-extra");
    eleventyConfig.on("eleventy.after", async () => {
        const source = "./.cache/images/";
        const dest = "./site/assets/img/";

        if (fs.existsSync(source)) {
            await fs.copy(source, dest);
            console.log(`${chalk.green("[Image Cache]")} Synced to ${dest}`);
        }
    });

    // DATA ---------------------------------------------------------------------------------------

    // Parse YAML files as data
    const yaml = require("js-yaml");
    eleventyConfig.addDataExtension("yaml,yml", (contents) => yaml.load(contents));

    // Add current date and time as global data
    eleventyConfig.addGlobalData("now", () => {
        return new Date().toISOString();
    });

    // FILTERS ------------------------------------------------------------------------------------

    // Date formatting filter
    /*
        To use this:
        {{ variable | date_format: "d LLL yyy", "utc" }}
    */
    const { DateTime } = require("luxon");
    eleventyConfig.addFilter("date_format", (date, format = "d LLL yyyy", timezone = "utc") => {
        return DateTime.fromJSDate(new Date(date), { zone: timezone })
            .setLocale("en")
            .toFormat(format);
    });

    // SHORTCODES ---------------------------------------------------------------------------------

    // For demonstration purposes: container shortcode
    /*
        To use this:
        {% container "bg-pink-300" %} {% endcontainer %}
    */
    eleventyConfig.addPairedShortcode("container", function(content, classes = "") {
        return `
        <div class="container ${classes}">
            ${content}
        </div>
        `
    });

    // Image optimization shortcode
    /*
        To use this:
        {% image "src", "alt", "classes", "widths", "sizes", "formats", "loading", "decoding" %}
        {% image "./src/img/dynamic/ocean.jpg", "A blue ocean", "w-64 h-64 object-cover border-4 border-white", "30, 600", "(max-width: 800px) 100vw, 50vw", "webp", "lazy", "async" %}
    */
    const Image = require("@11ty/eleventy-img");
    const path = require("path");
    const chalk = require("chalk")
    eleventyConfig.addShortcode("image", async function (src, alt, className = "", widths = "300, 600", sizes = "100vw", formats = "webp", loading = "lazy", decoding = "async") {
        const inputBase = "./src/img/dynamic/";
        const outputBase = "./.cache/images/";
        const relativeDir = path.relative(inputBase, path.dirname(src));
        const widthArray = typeof widths === "string" 
            ? widths.split(",").map(s => {
                const val = s.trim();
                return val.toLowerCase() === "auto" ? "auto" : parseInt(val, 10);
            }) 
            : widths;
        const formatArray = typeof formats === "string" ? formats.split(",").map(s => s.trim()) : formats;
        let metadata = await Image(src, {
            widths: widthArray,
            formats: formatArray,
            outputDir: path.join(outputBase, relativeDir),
            urlPath: path.join("/assets/img/", relativeDir).replace(/\\/g, '/'),
            cacheOptions: {
                duration: "*",
                directory: ".cache/eleventy-img/",
                removeFinished: false
            },
            filenameFormat: function (id, src, width, format) {
                const extension = path.extname(src);
                const name = path.basename(src, extension);
                return `${name}-${width}.${format}`;
            }
        });
        return Image.generateHTML(metadata, {alt, sizes, class: className, loading, decoding});
    });
    
    // MARKDOWN -----------------------------------------------------------------------------------

    /*
        To use this, install these dependencies:
        npm install markdown-it markdown-it-attrs markdown-it-div markdown-it-anchor -D
    */

    // Set up Markdown renderer
    /* const markdownIt = require("markdown-it");
    const mdAnchor = require("markdown-it-anchor");
    const mdDiv = require("markdown-it-div");
    const mdAttr = require("markdown-it-attrs"); */
    

    /* const markdownItRenderer = markdownIt({
            html: true,
            breaks: true,
            typographer: true
        })
        .use(mdAnchor)
        .use(mdDiv)
        .use(mdAttr); */

    // Set Markdown renderer as the default renderer for .md files
    /* eleventyConfig.setLibrary("md", markdownItRenderer); */

    // Inline Markdown filter
    /* eleventyConfig.addFilter("markdownifyInline", (str) => {
        return markdownItRenderer.renderInline(str);
    }); */

    // Full Markdown filter
    /* eleventyConfig.addFilter("markdownify", (str) => {
        return markdownItRenderer.render(str);
    }); */

    // CONFIGURATION ------------------------------------------------------------------------------
    
    // Enable render plugin
    eleventyConfig.addPlugin(RenderPlugin);

    // SERVE AND EXPORT ---------------------------------------------------------------------------

    // Dev server options
    eleventyConfig.setServerOptions({
        showAllHosts: true,
        host: "0.0.0.0",
        port: 8080
    });

    return {
        // Set template languages
        templateFormats: ["html", "liquid", "md"],
        // Set default folders
        dir: {
            input: "src",
            output: "site",
            includes: "includes",
            data: "data",
        }
    };

};