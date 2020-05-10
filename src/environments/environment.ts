// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://api.themoviedb.org/3',
  apiKey: '6b64de12675b0335cf7a8e44c5afb574',
  imgPath: 'https://image.tmdb.org/t/p',
  firebaseConfig: {
    apiKey: 'AIzaSyBlmrkrGvPsn0HWBdAtkFlSPoKh8-Ek9T0',
    authDomain: 'crolab-app.firebaseapp.com',
    databaseURL: 'https://crolab-app.firebaseio.com',
    projectId: 'crolab-app',
    storageBucket: 'crolab-app.appspot.com',
    messagingSenderId: '156317006434',
    appId: '1:156317006434:web:f92c2d8b4a5cf91bdf6f3b',
    measurementId: 'G-GN8GXGG2XE'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
