# Trippin' Expense Tracker

## Steps to Run

- Clone the project
- Run `npm install`
  - In case of issues try running `npm audit fix` and force it if needed with `npm audit fix --force` be running to [stack overflow](https://stackoverflow.com/)
- Run `npm start`

## Note to self

- Change `<View>` to `<SafeAreaView>` for Aapel people
- The following line in `app.json` prevents `<BottomButton>` and `<Footer>` from being pushed up when the keyboard opens on android phones.

  ```
  "softwareKeyboardLayoutMode": "pan"
  ```
