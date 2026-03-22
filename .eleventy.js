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