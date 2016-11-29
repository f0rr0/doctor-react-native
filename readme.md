### Who's using React Native
We are in [good company](https://facebook.github.io/react-native/showcase.html).

### Package Manager
This app uses [yarn](https://github.com/yarnpkg/yarn) in favor of `npm`. The advantages include but might not be limited to:
* Deterministic dependencies i.e. no more 'works on my machine' errors.
* Caching and offline support for already installed modules.
* Faster installation due to efficient network utilization.

To install `yarn`:
```
npm i -g yarn
```

### Development
```
brew update
brew install watchman
brew cask install react-native-debugger
yarn global add react-native
git clone https://github.com/1mgOfficial/doctor-react-native && cd doctor-react-native
git checkout prototyping
yarn install
react-native run-ios
react-native run-android
```

### Troubleshooting
* Make sure you're running the latest stable `node` and `npm`.
* Make sure Xcode is installed along with required SDKs and emulator.
* Make sure Android Studio is installed along with required SDKs and emulator.
* [React Native Debugger](https://github.com/jhen0409/react-native-debugger)
* [React Native](https://facebook.github.io/react-native/docs/troubleshooting.html)

### App State
This app uses `redux` for state management, `react-redux` for bindings, `redux-actions` for FSA compliant actions, `redux-effex` for async side effects and `redux-persist` for persisting state to `AsyncStorage`.

![Sample App State Visualized](./screenshots/ReduxAppState.png)

### Screenshots

| Current       | RN Android | RN iOS |
| ------------- | ---------- | ------ |
| ![Home](./screenshots/Home.png)  | ![Home](./screenshots/Home-RN-Android.png)  | ![Home](./screenshots/Home-RN-iOS.png) |
| ![Drawer](./screenshots/Drawer.png)  | ![Drawer](./screenshots/Drawer-RN-Android.png)  | ![Drawer](./screenshots/Drawer-RN-iOS.png) |
| ![Login](./screenshots/Login.png)  | ![Login](./screenshots/Login-RN-Android.png)  | ![Login](./screenshots/Login-RN-iOS.png) |
| ![Login-Active](./screenshots/Login-Active.png)  | ![Login-Active](./screenshots/Login-Active-RN-Android.png)  | ![Login-Active](./screenshots/Login-Active-RN-iOS.png) |
| ![TabView](./screenshots/TabView.png)  | ![TabView](./screenshots/TabView-RN-Android.png)  | ![TabView](./screenshots/TabView-RN-iOS.png) |
| ![ChangePassword](./screenshots/ChangePassword.png)  | ![ChangePassword](./screenshots/ChangePassword-RN-Android.png)  | ![ChangePassword](./screenshots/ChangePassword-RN-iOS.png) |
| ![Messages](./screenshots/Messages.png)  | ![Messages](./screenshots/Messages-RN-Android.png)  | ![Messages](./screenshots/Messages-RN-iOS.png) |
