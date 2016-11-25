#### Development
```
brew update
brew install watchman
brew cask install react-native-debugger
yarn global add react-native
git clone https://github.com/1mgOfficial/doctor-react-native && cd doctor-react-native
yarn install
react-native run-ios
react-native run-android
```

#### App State
This app uses `redux` for state management, `react-redux` for bindings, `redux-actions` for FSA compliant actions, `redux-effex` for async side effects and `redux-persist` for persisting state to `AsyncStorage`.

![Sample App State Visualized](./screenshots/ReduxAppState.png)

#### Screenshots

| Current       | RN Android | RN iOS |
| ------------- | ---------- | ------ |
| ![Home](./screenshots/Home.png)  | ![Home](./screenshots/Home-RN-Android.png)  | ![Home](./screenshots/Home-RN-iOS.png) |
| ![Drawer](./screenshots/Drawer.png)  | ![Drawer](./screenshots/Drawer-RN-Android.png)  | ![Drawer](./screenshots/Drawer-RN-iOS.png) |
| ![Login](./screenshots/Login.png)  | ![Login](./screenshots/Login-RN-Android.png)  | ![Login](./screenshots/Login-RN-iOS.png) |
| ![Login-Active](./screenshots/Login-Active.png)  | ![Login-Active](./screenshots/Login-Active-RN-Android.png)  | ![Login-Active](./screenshots/Login-Active-RN-iOS.png) |
| ![TabView](./screenshots/TabView.png)  | ![TabView](./screenshots/TabView-RN-Android.png)  | ![TabView](./screenshots/TabView-RN-iOS.png) |
| ![ChangePassword](./screenshots/ChangePassword.png)  | ![ChangePassword](./screenshots/ChangePassword-RN-Android.png)  | ![ChangePassword](./screenshots/ChangePassword-RN-iOS.png) |
| ![Messages](./screenshots/Messages.png)  | ![Messages](./screenshots/Messages-RN-Android.png)  | ![Messages](./screenshots/Messages-RN-iOS.png) |
