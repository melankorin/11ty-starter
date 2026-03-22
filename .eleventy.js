module.exports = function (eleventyConfig) {

    // FILES --------------------------------------------------------------------------------------

    // Copy assets
    eleventyConfig.addPassthroughCopy("src/assets");

    // Copy favicons
    eleventyConfig.addPassthroughCopy({"src/favicons/!(*.liquid)": "/"});

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