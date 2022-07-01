import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
  apiKey: 'AIzaSyAipgWd3gw5bpAfpFM0nZf2HNybPZZTrJ0',
  authDomain: 'my-portfolio-storage-3b178.firebaseapp.com',
  databaseURL: 'https://my-portfolio-storage-3b178.firebaseio.com',
  storageBucket: 'my-portfolio-storage-3b178.appspot.com',
};
const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);
// Get a reference to the storage service, which is used to create references in your storage bucket

export { storage };
