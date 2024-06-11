import { ChatAiWidget } from '@sendbird/chat-ai-widget';
import '@sendbird/chat-ai-widget/dist/style.css';
import { createAPI } from './api.ts';
import { useEffect, useState } from 'react';

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
 * Create a Server API object.
 * */
const api = createAPI(APP_ID, API_TOKEN);

/**
 * Configuration for user session handling.
 * */
const configureSession = () => ({
  onSessionTokenRequired: (resolve: (token: string) => void, reject: (err: Error) => void) => {
    console.log('Session token required');
    api.issueSessionToken(USER_ID).then(resolve).catch(reject);
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

/**
 * Get the session token for the user.
 * */
async function getSessionTokenForUser(userId: string, nickname = 'Widget User', profileUrl = '') {
  const userExists = await api.hasUser(userId);
  if (!userExists) await api.createUser(userId, nickname, profileUrl);
  return await api.issueSessionToken(userId);
}

const App = () => {
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  useEffect(() => {
    getSessionTokenForUser(USER_ID).then((token) => setSessionToken(token));
  }, []);

  if (!sessionToken) return null;

  return <ChatAiWidget applicationId={APP_ID} botId={BOT_ID} userId={USER_ID} configureSession={configureSession} sessionToken={sessionToken} />;
};

export default App;
