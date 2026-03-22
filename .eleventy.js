module.exports = function (eleventyConfig) {

    // DATA ---------------------------------------------------------------------------------------

    // Parse YAML files as data
    const yaml = require("js-yaml");
    eleventyConfig.addDataExtension("yaml,yml", (contents) => yaml.load(contents));

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