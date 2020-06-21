## Overview

This is the front-end of smart commute project, aims to demonstrate the traffic incidents. 


## Create .env file

To avoid sensitive information keeping in the application code, you should load the API URL, Google API key, and Firebase configuration as environment variables.


```
DOMAIN=[API_DOMAIN]
REACT_APP_GOOGLE_MAP_API_KEY=[YOUR_GOOGLE_API_KEY]
REACT_APP_STATION_API=$DOMAIN/[STATION_API_URI]
REACT_APP_EVENT_API=$DOMAIN/[EVENTA_API_URI]
REACT_APP_PUT_SUBSCRIPTION_API=$DOMAIN/api/[SUBSCRIPTION_API_URI]
REACT_APP_API_KEY=[SUBSCRIPTION_API_KEY]
REACT_APP_FIREBASE_API_KEY=[FIREBASE_API_KEY]
REACT_APP_FIREBASE_AUTH_DOMAIN=[FIREBASE_AUTH_DOMAIN]
REACT_APP_FIREBASE_DB_URL=[FIREBASE_DB_URL]
REACT_APP_FIREBASE_PROJECT_ID=[FIREBASE_PROJECT_ID]
REACT_APP_FIREBASE_STORAGE_BUCKET=[FIREBASE_STORAGE_BUCKET]
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=[FIREBASE_MESSAGING_SENDER_ID]
REACT_APP_FIREBASE_APP_ID=[FIREBASE_APP_ID]
```


## How to run this project locally

#### Development

Run following command from the root directory of project to deploy development web app:

1. Run `npm install` to download required dependencies.
2. Run `npm run dev` to build and run web app on localhost:3000


#### Production

Run following command from the root directory of project to deploy production web app:

1. Run `npm install` to download required dependencies.
2. Run `npm run build` to create production build.
3. Run `npm start` to run web app. 

