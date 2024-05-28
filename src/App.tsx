import { ChatAiWidget } from '@sendbird/chat-ai-widget';
import '@sendbird/chat-ai-widget/dist/style.css';

/**
 * Documentation links for obtaining API tokens and Application IDs:
 * API token: https://sendbird.com/docs/chat/platform-api/v3/prepare-to-use-api#2-authentication
 * Application ID: https://sendbird.com/docs/chat/platform-api/v3/prepare-to-use-api#2-base-url
 * */
const APP_ID = 'ENTER_APPLICATION_ID_HERE';
const BOT_ID = 'ENTER_BOT_ID_HERE';
const API_TOKEN = 'ENTER_API_TOKEN_HERE';
const USER_ID = 'ENTER_USER_ID_HERE';

/**
 * Function to issue a session token for a user.
 * This should be implemented on your server to secure your API token.
 * */
const issueSessionToken = async (userId: string, expiryDuration = 30 * 60 * 1000): Promise<string> => {
  const url = `https://api-${APP_ID}.sendbird.com/v3/users/${userId}/token`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf8',
      'Api-Token': API_TOKEN,
    },
    body: JSON.stringify({ expires_at: Date.now() + expiryDuration }),
  });

  const data = await response.json();
  if (!data.token) throw new Error('Failed to issue session token');

  console.log('Session token issued:', data.token);
  return data.token;
};


/**
 * Configuration for user session handling.
 * */
const configureSession = () => ({
  onSessionTokenRequired: (resolve: (token: string) => void, reject: (err: Error) => void) => {
    console.log('Session token required');
    issueSessionToken(USER_ID).then(resolve).catch(reject);
  },
  onSessionRefreshed: () => {
    console.log('Session refreshed');
  },
  onSessionError: (err: Error) => {
    console.error('Session error', err);
  },
  onSessionClosed: () => {
    console.log('Session closed');
  },
});

const App = () => {
  return <ChatAiWidget applicationId={APP_ID} botId={BOT_ID} userId={USER_ID} configureSession={configureSession} />;
};

export default App;
