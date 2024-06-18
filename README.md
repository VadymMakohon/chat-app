# chat-app

This React Native 'Chat App' utilizes Google Firebase and Firestore to provide a modern, feature-rich messaging experience. Users can sign in, customize their background color, and send text messages, images from their device library or camera, and location data. The app integrates Expo libraries such as expo-image-picker and expo-location, alongside various React Native components, ensuring a seamless and robust chat functionality.

## User Stories

- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
- As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.

## Prerequisites

- Install Node.js
- Create a Firebase account

## Installation

1. Clone the repository.
2. Navigate to the project directory in the terminal.
3. Run `npm install` to install the necessary dependencies.
4. Create a Firebase project in your Firebase console.
5. Copy the configuration object and replace the `firebaseConfig` object in the code.
6. Enable Firestore and Storage services in the Firebase console.
7. Run `npx expo install`
8. Run `npx expo start`

## Packages to install: 
* npm install --save @react-navigation/native @react-navigation/native-stack
* expo install react-native-screens react-native-safe-area-context
* npm install react-native-gifted-chat --save
* npm install firebase@9.13.0 --save
* expo install @react-native-async-storage/async-storage
* expo install @react-native-community/netinfo
* expo install expo-image-picker
* expo install expo-location
* expo install react-native-maps

## Technologies Used

- React Native
- Expo
- Firebase (Firestore, Storage)
- React Native Gifted Chat
- Node.js

  # Contributors
- [Vadym Makohon](https://github.com/VadymMakohon)