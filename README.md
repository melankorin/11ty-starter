# melankorin's 11ty starter

<!--
npm run clean
npm run start
npm run build
-->

This is a simple (but complete) starter for my indie web art projects. Made for small projects, very highly opinionated, inspired by Jekyll. Guaranteed to give developers a headache, but it works fine for me!

## Features

- Liquid template code absolutely everywhere!
- Either Sass or Tailwind, you get to choose!
- A complete HTML boilerplate built-in!
- An image optimization pipeline via shortcodes!
- Handles YAML data files!
- Date parsing filter powered by Luxon!
- JavaScript bundling with esbuild!
- Dynamically generated metadata!
- Fetches the magical clanker repellant for you!
- Cache busting and HTML minifcation with Gulp!

## CSS processor setup

This starter lets you choose between **Sass** and **Tailwind** for your project.

### Sass

Install these dependencies:

```sh
npm install sass gulp-autoprefixer -D
```

Replace the `watch:css` and `build:css` scripts with these:

```json
"watch:css": "sass --watch src/sass/style.scss:site/assets/css/style.css",
"build:css": "sass src/sass/style.scss:site/assets/css/style.css --no-source-map --style=compressed",
```

Go to the `gulpfile.js` and uncomment the `prefixCSS` function.

Delete the `./src/css` folder.

### Tailwind

Install these dependencies:

```sh
npm install tailwindcss @tailwindcss/cli -D
```

Replace the `watch:css` and `build:css` scripts with these:

```json
"watch:css": "tailwindcss -i src/css/style.css -o ./site/assets/css/style.css --watch",
"build:css": "tailwindcss -i src/css/style.css -o ./site/assets/css/style.css --minify",
```

Delete the `./src/sass` folder and the `prefixCSS` function in `gulpfile.js`.