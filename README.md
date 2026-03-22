# melankorin's 11ty starter

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