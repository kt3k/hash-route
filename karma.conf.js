module.exports = _ => _.set({
  frameworks: ['mocha', 'browserify'],
  files: ['test/**/*.js'],
  preprocessors: {'test/**/*.js': 'browserify'},
  browserify: {
    debug: true,
    transform: [['babelify', {presets: ['@babel/preset-env'], plugins: ['istanbul']}]]
  },
  reporters: ['progress', 'coverage'],
  coverageReporter: {type: 'lcov'},
  browsers: ['Chrome'],
  singleRun: true
})
