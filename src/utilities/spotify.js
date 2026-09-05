const clientId = "3b0268425fc64850b661e90a6edc3c55";
const redirectUri = "https://jammingms.netlify.app";
let accessToken;
let tokenExpiration;

//defines a string containing every allowed character and then, for each random number you generated, use it to pick one character out of possible
const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateRandomString(length) {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return array.map(byte => possible[byte % possible.length]).join("");
}

const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
};

async function getAccessToken() {
        if (accessToken && tokenExpiration > Date.now()) {
        return accessToken;
    }

    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');

    if (code) {
       const codeVerifier =  localStorage.getItem('code_verifier');
       const url = "https://accounts.spotify.com/api/token";

        const payload = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier,
            }),
        }

        const body = await fetch(url, payload);
        const response = await body.json();

        accessToken = response.access_token;
        tokenExpiration = (response.expires_in* 1000) + Date.now();
        window.history.pushState({}, document.title, window.location.pathname);

        localStorage.removeItem('code_verifier');

        return accessToken
    } else {
    const codeVerifier = generateRandomString(64);
    const codeChallenge = await sha256(codeVerifier);

    const scope = "playlist-modify-private playlist-modify-public";
    const authUrl = new URL("https://accounts.spotify.com/authorize");

    localStorage.setItem('code_verifier', codeVerifier);

    const params = {
        response_type: 'code',
        client_id: clientId,
        scope, //short hand, acceses a variable 
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
}
}

export async function search(term) {
    const existingAccessToken  = await getAccessToken();
    const params = {
        q: term,
        type: "track"
    }

// const queryString = new URLSearchParams(params).toString();
// const searchURL = `https://api.spotify.com/v1/search?${queryString}`;

const searchURL = 'https://api.spotify.com/v1/search?' + new URLSearchParams(params).toString();

const payload = {
            // method: 'GET', unnecessary because fetch IS get
            headers: {
            Authorization: `Bearer ${existingAccessToken}`
            },
        }

        const body = await fetch(searchURL, payload);
        const response = await body.json();

        return response.tracks.items.map(track => ({
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }));
}



// NOTES:

/*Generate the secret (codeVerifier)
Scramble it into the codeChallenge (hash it)
Save codeVerifier somewhere you can find it again later (you'll need it after the user comes back)
Build the full Spotify login URL, including your client_id, codeChallenge, and other required pieces
Send the browser to that URL*/

/*User visits your app for the first time. getAccessToken() runs. No stored token, no code in URL → goes into else.
Inside else: codeVerifier is created, and localStorage.setItem('code_verifier', codeVerifier) runs — saving that value into the browser's localStorage, which is separate storage that isn't wiped out by navigation.
Still inside else: window.location.href = authUrl.toString() — the browser now navigates away to Spotify's login page entirely.
User logs into Spotify, approves your app. Spotify redirects the browser back to your redirectUri.
Your entire app reloads from scratch — this is a brand new page load. Every variable from before, including the codeVerifier variable itself, no longer exists in memory. But localStorage is untouched — it's still sitting there with 'code_verifier' saved in it, because localStorage survives page reloads.
getAccessToken() runs again (fresh call, brand new execution). This time, window.location.search has ?code=... in it, so it goes into the if (code) branch instead.
Inside if (code): you call localStorage.getItem('code_verifier') — and even though this is a totally different run of the function, on a totally different page load, localStorage still has the value from step 2, because it was never cleared.*/

/*getItem only takes one argument — the key you're looking up. You've added a second argument, codeVerifier, but that variable doesn't even exist in this scope (it's declared inside else, remember — separate block). What should this call look like with just the one argument?*/
