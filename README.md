# Quasar File Manager Sandbox

This is a sandbox that demonstrates managing files in Firebase Storage with Quasar Framework.  You can upload files, even large files.  A card will appear for every file uploaded.  The card has a launch and delete button.  The launch button will open the file in a new tab (try with PDF files).  The delete button will delete the file from Firebase.

The main purpose for building this sandbox was that I was previously handling Storage calls in Cloud Functions that run my application API.  I learned the hard way that Cloud Functions have a 10MB limit on any inbound content.  So all uploads to Storage above this limit will fail.  

You will need to have a Firebase project available with Storage enabled. This can all be done for free without entering payment information.  Since there is no authentication setup in this project, you need to set your Storage rules to allow public access:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

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
