# Quasar File Manager Sandbox

This is a sandbox that demonstrates managing files in Firebase Storage with Quasar Framework.

You will need to have a Firebase project available with Storage enabled. This can all be done for free without entering payment information.

Create a `.quasar.env.json` file in the root of the project like the file below. Place your Firebase values in the appropriate `dev` key.

```js
{
   "dev": {
      "ENV_TYPE": "Running Development",
      "ENV_DEV": "Development",
      "FIREBASE_APIKEY": "",
      "FIREBASE_AUTHDOMAIN": "",
      "FIREBASE_DATABASEURL": "",
      "FIREBASE_PROJECTID": "",
      "FIREBASE_STORAGEBUCKET": "",
      "FIREBASE_MESSAGINGID": "",
      "FIREBASE_APPID": ""
   },
   "production": {
      "ENV_TYPE": "Running Production",
      "ENV_PROD": "Production"
   },
   "test": {
      "ENV_TYPE": "Running Test",
      "ENV_Test": "Test",
   }
}
```

The enviornment won't load properly with `quasar dev`. You must run `yarn run run:dev` so that the environment variables above are registered.
