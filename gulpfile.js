const { parallel, series, watch } = require('gulp');
const builder = require('gulp-rollup-bootstrap-custom');
const config = require('./build.config');
const del = require('del');

const buildCss = () => {
  return builder.buildCss(config.cssConfig);
};

const buildJs = () => {
  return builder.buildJs(config.jsConfig);
};

const buildLibs = () => {
  return builder.buildLibs(config.libsConfig);
};

const cleanCss = () => {
  return del('wwwroot/css/');
}

const cleanJs = () => {
  return del('wwwroot/js/');
}

const cleanLibs = () => {
  return del('wwwroot/libs/');
}

const watchJs = () => {
  watch('src/js/**/*.js', buildJs);
};
const watchCss = () => {
  watch('src/scss/**/*.scss', buildCss)
};

exports.buildCss = buildCss;
exports.buildJs = buildJs;
exports.buildLibs = buildLibs;
exports.build = parallel(buildCss, buildJs, buildLibs);
exports.cleanCss = cleanCss;
exports.cleanJs = cleanJs;
exports.cleanLibs = cleanLibs;
exports.clean = parallel(cleanCss, cleanJs, cleanLibs);
exports.watchCss = series(buildCss, watchCss);
exports.watchJs = series(buildJs, watchJs);
exports.watch = series(parallel(buildCss, buildJs, buildLibs), parallel(watchCss, watchJs));