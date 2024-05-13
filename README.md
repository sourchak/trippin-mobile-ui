# Trippin' Expense Tracker

## Steps to Start the server

- Clone the project
- Run `npm install`
  - In case of issues try running `npm audit fix`, and force it if needed with `npm audit fix --force` before running to [stack overflow](https://stackoverflow.com/)
- Run `npm start`

## To view the mobile app

- Download **Expo Go** from your respective app store.
- Scan the QR generated in the above process using Expo Go, or manually enter the link.

## Note to self

- Change `<View>` to `<SafeAreaView>` for Aapel people
- The following line in `app.json` prevents `<BottomButton>` and `<Footer>` from being pushed up when the keyboard opens on android phones.

  ```
  "softwareKeyboardLayoutMode": "pan"
  ```
