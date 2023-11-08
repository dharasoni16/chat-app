# CHAT-APP

Chat-app is a app for mobile device made using React Native.These app will provide users with a chat interface and options to share images and their location.

## Key Features

- A page where users can enter their name and choose a background color for the chat screen
  before joining the chat.

* A page displaying the conversation, as well as an input field and submit button.

- The chat must provide users with two additional communication features: sending images
  and location data.

* Data gets stored online and offline.

## Tech-Stack

- React Native (JavaScript)

* Expo

- React Native Gifted Chat Library

* Android-Studio

- Google Firebase Realtime Database

* Google Firebase Authenticaton

- AsyncStorage Caching For Offline Use

* Firebase Cloud Storage (for image storing)

- Expo ImagePicker & MediaLibrary for Communication Features

## Installation

### To run the 'Chat App' on your computer, follow these steps:

1. Make sure you have Node.js installed. You can download and install it from the official [Node.js website](https://nodejs.org/en "Node.js website").
2. Clone this repository to your computer by using the command:

- `git clone https://github.com/dharasoni16/chat-app`

3. Go to the project directory by typing:

- `cd chat-app`

4. Install the project dependencies by running:

- `npm install`

5. Configure the Firestore database: Create a project in the Firebase Console and enable Firestore as the database.
   Copy the project credentials provided by Firebase.

- Make sure to use your own Firebase config credentials in App.js

6. Start the app by running:

- `npx expo start or npm start`

7. This will start the Expo development server and show a QR code and ip address of expo in the terminal.Select the
   option according to your prefreance where you want to run your app.For example press `a` to run on android.
8. Download the Expo Client app on your iOS or Android device from the app store.
9. Open the Expo Client app make sure you are signedIn into your expo account. if you are it will automatically show your
   expo project link in your app, if for any reason your project is not showing up you can scan the QR code displayed in the terminal or you can also enter the ip address displayed in the terminal manually in your app and press connect button.
10. Now you can view and use the 'Chat App' on your device.

That's it! You have successfully installed the 'Chat App' on your computer.

## User Stories

- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my
  friends and family.

* As a user, I want to be able to send messages to my friends and family members to exchange
  the latest news.

- As a user, I want to send images to my friends to show them what I’m currently doing.

* As a user, I want to share my location with my friends to show them where I am.

- As a user, I want to be able to read my messages offline so I can reread conversations at any
  time.

* As a user with a visual impairment, I want to use a chat app that is compatible with a screen
  reader so that I can engage with a chat interface.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## Acknowledgment

Want to thanks different public resources which I used as a reference to make these project

#### <https://reactnative.dev/>

#### <https://developer.android.com/studio>

#### <https://expo.dev/>

## License

This project is licensed under the [MIT] License.Click here to see the details(https://choosealicense.com/licenses/mit/)
