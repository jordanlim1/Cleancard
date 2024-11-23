# Welcome to Cleancard 👋

Where we make cancer detection as easy as a pregnancy test!

## Get started

Install dependencies

```bash
npm install
```

## Start The Client

### You will need to download the Expo Go app on the app store or play store.

```bash
 npx expo start
```

In the output, you'll find multiple options to open the app

- Scan the QR code that appears in the terminal which will open the Expo Go app.
- Under the QR code will say something like **_"Metro waiting on exp://192.168.1.158:8081"_**.
- Please copy the numbers between exp:// and :8081 (ex. 192.168.1.158). This is your IP address!
- Replace the numbers in the .env folder with your own, where it says EXPO_PUBLIC_REACT_URL=192.168.1.158. It does not need to be a string, paste it as is.

## Start The Server

- Open a new terminal and go into the Server directory.

```bash
cd server
```

```bash
npm start
```
