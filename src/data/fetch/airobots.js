import EleventyFetch from "@11ty/eleventy-fetch";

export default async function() {
    const url = "https://raw.githubusercontent.com/ai-robots-txt/ai.robots.txt/main/robots.txt";

    return EleventyFetch(url, {
        duration: "7d",
        type: "text"
    });
};