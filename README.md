# Widget Custom Session Configuration Example

This repository provides detailed instructions on configuring a custom session handler for the AI Widget, particularly useful for integrating authentication with your own API.
It includes examples for both React and a embed HTML setup.

## Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/sendbird/chat-ai-widget-session-sample
cd chat-ai-widget-session-sample
```

## React Example

### Installation and Execution

1. **Install Dependencies**

   Ensure you have `yarn` installed. If not, install it from [Yarn's official website](https://yarnpkg.com/).

   ```bash
   yarn install
   ```

2. **Run the Development Server**

   ```bash
   yarn dev
   ```

3. **Configure the Widget**

   In your `src/App.tsx` file, replace the placeholder values with your actual `APP_ID`, `BOT_ID`, `API_TOKEN`, and `USER_ID` obtained from Sendbird:

   ```typescript
   const APP_ID = 'ENTER_APPLICATION_ID_HERE';
   const BOT_ID = 'ENTER_BOT_ID_HERE';
   const API_TOKEN = 'ENTER_API_TOKEN_HERE';
   const USER_ID = 'ENTER_USER_ID_HERE';
   ```

Refer to the comments in the provided code for more information.

## Embed Example

### How to Run

1. **Open the `embed-example.html` file**

   This file contains the HTML and JavaScript necessary to embed the `ChatAiWidget`. Simply open the file in your browser.

2. **Configure the Widget**

   In the script section of `embed-example.html`, replace the placeholder values with your actual `APP_ID`, `BOT_ID`, `API_TOKEN`, and `USER_ID`:

   ```javascript
   const APP_ID = 'ENTER_APPLICATION_ID_HERE';
   const BOT_ID = 'ENTER_BOT_ID_HERE';
   const API_TOKEN = 'ENTER_API_TOKEN_HERE';
   const USER_ID = 'ENTER_USER_ID_HERE';
   ```

Refer to the comments in the provided code for more information.

## Security Note

Always implement sensitive operations like session token issuance on your server to protect your API tokens and other sensitive information.
