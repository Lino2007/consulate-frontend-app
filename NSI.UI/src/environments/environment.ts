// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  newsSource: 'https://newsapi.org/v2/top-headlines?country=us&apiKey=1fba2bc8d1b9461bbc31d2fc0efc6962',
  clientId: 'f18b4dc4-a2c6-4df1-97d4-8e24bcc1a342',
  loginRedirectUri: 'https://login.microsoftonline.com/40d05a0d-8aeb-415d-96a1-8722f450a418',
  appRedirectUri: 'http://nsi-dev-ui-echo.azurewebsites.net', //'http://localhost:4200',
  protected: [
    ["https://graph.microsoft.com/v1.0/me","user.read"],
    ["https://graph.microsoft.com/User.ReadBasic.All", "user.readbasic.all"],
   // ["https://localhost:44318/api/*", null]
    //["https://myapplication.com", ["custom.scope"]]
  ],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
