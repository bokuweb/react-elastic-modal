module.exports = (config) => {
  config.set({
    plugins: [
      'karma-babel-preprocessor',
      'karma-browserify',
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-phantomjs-launcher',
    ],

    basePath: '',
    frameworks: ['mocha', 'browserify'],
    files: [
      './node_modules/babel-polyfill/dist/polyfill.js',
      'test/*.js',
    ],
    exclude: [
    ],

    babelPreprocessor: {
      options: {
        presets: ['airbnb'],
      },
    },
    browserify: {
      debug: true,
      extensions: ['.js'],
      transform: [
        [require('babelify').configure({
          plugins: ['babel-plugin-espower'],
        }), { presets: ['airbnb'] }],
      ],
      configure: (bundle) => {
        bundle.on('prebundle', () => {
          bundle.external('react/lib/ReactContext');
          bundle.external('react/lib/ExecutionEnvironment');
        });
      },
    },

    preprocessors: {
      'test/*.js': ['babel', 'browserify'],
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['Large_PhantomJS'],
    customLaunchers: {
      Large_PhantomJS: {
        base: 'PhantomJS',
        options: {
          viewportSize: {
            width: 1280,
            height: 1000,
          },
        },
      },
    },
    singleRun: true,
  });
};
