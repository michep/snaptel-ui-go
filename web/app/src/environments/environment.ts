// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCKDUSBRJ1YRiE-nmAJOEXZYI3lClWuScQ',
    authDomain: 'snaptel-ui.firebaseapp.com',
    databaseURL: 'https://snaptel-ui.firebaseio.com',
    projectId: 'snaptel-ui',
    storageBucket: 'snaptel-ui.appspot.com',
    messagingSenderId: '758148145220'
  }
};
