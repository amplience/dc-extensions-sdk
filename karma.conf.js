module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', 'karma-typescript'],
    files: [
      { pattern: './src/**/*.ts' },
      { pattern: './test/**/*.ts' }
    ],
    preprocessors: {
      './src/**/*.ts': ['karma-typescript'],
      './test/**/*.ts': ['karma-typescript']
    },
    reporters: ['dots', 'karma-typescript'],
    browsers: ['ChromeHeadless'],
    karmaTypescriptConfig: {
      reports: {
        json: {
          directory: 'coverage',
          subdirectory: 'karma'
        },
        lcovonly: {
          directory: 'coverage',
          subdirectory: 'karma'
        },
        text: null,
        'text-summary': null,
        html: 'coverage/'
      }
    },
    singleRun: true
  });
};
