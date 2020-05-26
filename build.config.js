// bootsrap custom css  and/or custom scss components
// allow for easy bundling
const cssConfig = {
  inputFiles: 'src/scss/bootstrap-custom.scss',
  outputDir: 'assets/css/',
  sourcemap: true,
  minimize: true,
  autoprefixer: {
    flexbox: 'no-2009'
  },
  sass: {
    outputStyle: 'expanded'
  }
};
 
// bootstrap custom js file and/or custom plugins
// allows for easy bundling
const jsConfig = {
  input: './src/js/bootstrap-custom.js',
  external: ['jquery', 'popper.js'],
  minimize: true,
  output: {
    file: './assets/js/bootstrap-custom.min.js',
    name: 'bootstrap-custom',
    format: 'umd',
    sourcemap: true,
    globals: { 
      jquery: 'jQuery', // Ensure we use jQuery which is always available even in noConflict mode
      'popper.js': 'Popper'
    }
  }
};
 
// libs dependencies
// currently only adding .min and .min.map
const libsConfig = [
  {
    outputDirectory: 'assets/libs/jquery/',
    inputFiles: 'node_modules/jquery/dist/jquery.slim.min.*'
  },
  {
    outputDirectory: 'assets/libs/popper.js/',
    inputFiles: 'node_modules/popper.js/dist/umd/popper.min.*'
  },
  {
    outputDirectory: 'assets/libs/fontawesome/css/',
    inputFiles: 'node_modules/@fortawesome/fontawesome-free/css/all.min.css'
  },
  {
    outputDirectory: 'static/libs/fontawesome/webfonts/',
    inputFiles: 'node_modules/@fortawesome/fontawesome-free/webfonts/fa-*'
  }
];

exports.cssConfig = cssConfig;
exports.jsConfig = jsConfig;
exports.libsConfig = libsConfig;