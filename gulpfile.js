const { parallel, series, watch, src, dest } = require('gulp');
const merge = require('merge-stream');
const builder = require('gulp-rollup-bootstrap-custom');
const config = require('./build.config');
const del = require('del');


// only used to copy maps to static dir, only way hugo will copy it to wwwroot
const copyCssMaps = () => {
  return src(`${config.cssConfig.outputDir}*.map`)
          .pipe(dest("static/css/"));
};

const copyJsMaps = () => {
  return src(`${config.jsConfig.output.file}.map`)
          .pipe(dest("static/js/"));
};

const copyLibsMaps = () => {
  return src('assets/libs/**/*.map')
            .pipe(dest("static/libs/"));
};

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
  return del('assets/css/');
}

const cleanJs = () => {
  return del('assets/js/');
}

const cleanLibs = () => {
  return del('assets/libs/');
}

const cleanRoot = () => {
  return del('wwwroot/');
}

const cleanMaps = () => {
  return del(['static/css/', 'static/js/', 'static/libs/']);
}

const watchJs = () => {
  return watch('src/js/**/*.js', series(buildJs, copyJsMaps));
};

const watchCss = () => {
  return watch('src/scss/**/*.scss', series(buildCss, copyCssMaps))
};

const copyMaps = parallel(copyCssMaps,copyJsMaps,copyLibsMaps);
const build = parallel(buildCss, buildJs, buildLibs);
const clean = parallel(cleanCss, cleanJs, cleanLibs, cleanMaps, cleanRoot);
const watchAll = parallel(watchCss, watchJs);

exports.build = series(build, copyMaps);
exports.clean = clean;
exports.watch = watchAll;