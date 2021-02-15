module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'karma-typescript'],
    files: [{ pattern: './src/**/*.ts' }, { pattern: './test/**/*.ts' }],
    exclude: ['src/**/*.spec.ts'],
    preprocessors: {
      '**/*.ts': 'karma-typescript',
    },
    reporters: ['dots', 'karma-typescript'],
    browsers: ['ChromeHeadless'],
    karmaTypescriptConfig: {
      reports: {
        json: {
          directory: 'coverage',
          subdirectory: 'karma',
        },
        lcovonly: {
          directory: 'coverage',
          subdirectory: 'karma',
        },
      },
    },
    singleRun: true,
  });
};
