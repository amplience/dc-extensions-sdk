module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', 'karma-typescript'],
    files: [
      { pattern: './src/**/*.ts' },
      { pattern: './test/**/*.spec.ts' },
      { pattern: './test/**/*.html', included: false, host: true },
      { pattern: './test/**/*.ts' }
    ],
    preprocessors: {
      './src/**/*.ts': ['karma-typescript'],
      './test/**/*.ts': ['karma-typescript'],
      './src/**/!(*spec).ts': ['karma-typescript', 'coverage']
    },
    reporters: ['dots', 'coverage', 'karma-typescript'],
    browsers: ['Chrome'],
    coverageReporter: {
      type: 'text',
      dir: 'coverage/'
    },
    singleRun: false
  });
};
