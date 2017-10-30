(function(global) {
  
  // map tells the System loader where to look for things
  // rikame kde vezmeme jednotlive soubory pro aplikaci @angular odkazuje na lib/@angular
  // do lib se to dostane pomoci tasku spusteneho pomoci Gulpu Gulp:Copy
  var map = {
    'app':        'app', // 'dist',
    '@angular':   'lib/@angular',
    'rxjs':       'lib/rxjs',
    'tslib':      'lib'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  // ty souboru co se nacita, pracuje se jen s *.js files - *.ts jsou prelozeny pomoci tsc
  var packages = {
    'app': { 
      main: 'main.js',  
      defaultExtension: 'js',
      meta: {
        './*.js': {
          loader: 'systemjs-angular-loader.js'
        }
      }
    },
    'rxjs':                 { defaultExtension: 'js' },
    'tslib':                { main: 'tslib', defaultExtension: 'js' },
    '@angular/common/http': { main: '../bundles/common-http.umd.js', defaultExtension: 'js' }
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'upgrade',
  ];

  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }

  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }

  // Most environments should use UMD; some (Karma) need the individual index files
  // definujeme zda nacitame njormalni *.js soubory nebo Bundly
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);

  var config = {
    map: map,
    packages: packages
  };

  System.config(config);

})(this);