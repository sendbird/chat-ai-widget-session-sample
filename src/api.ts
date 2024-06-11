export const createAPI = (appId: string, apiToken: string) => ({
  /**
   * Function to check if a user exists.
   * This should be implemented on your server to secure your API token.
   * */
  hasUser: async (userId: string) => {
    const url = `https://api-${appId}.sendbird.com/v3/users/${userId}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Api-Token': apiToken,
      },
    });

    console.log('User exists:', response.ok);

    return response.ok;
  },
  /**
   * Function to create a user.
   * This should be implemented on your server to secure your API token.
   * */
  createUser: async (userId: string, nickname = '', profileUrl = ''): Promise<void> => {
    const url = `https://api-${appId}.sendbird.com/v3/users`;
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf8',
        'Api-Token': apiToken,
      },
      body: JSON.stringify({ user_id: userId, nickname, profile_url: profileUrl }),
    });

    console.log('User created:', userId);
  },
  /**
   * Function to issue a session token for a user.
   * This should be implemented on your server to secure your API token.
   * */
  issueSessionToken: async (userId: string, expiryDuration = 30 * 60 * 1000): Promise<string> => {
    const url = `https://api-${appId}.sendbird.com/v3/users/${userId}/token`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf8',
        'Api-Token': apiToken,
      },
      body: JSON.stringify({ expires_at: Date.now() + expiryDuration }),
    });

    const data = await response.json();
    if (!data.token) throw new Error('Failed to issue session token');

    console.log('Session token issued:', data.token);
    return data.token;
  },
});
