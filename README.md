[Visit the project at https://jammingms.netlify.app/](https://jammingms.netlify.app/)

# Jammming

Jammming is a React-based web app that lets users search Spotify's music catalog, build a custom playlist from the results, and save that playlist directly to their own Spotify account.

## Overview

A user can:
- Search Spotify's catalog for tracks by name, artist, or album
- Add tracks from search results to a custom playlist
- Remove tracks from the custom playlist
- Rename the custom playlist
- Save the finished playlist to their Spotify account, where it appears as a real playlist they can play, share, and edit like any other

## Tools & Technologies

- **React** (function components, hooks) — built with **Vite**
- **Spotify Web API** — used for search, user profile lookup, and playlist creation
- **Authorization Code with PKCE** — the OAuth flow used to authenticate users with Spotify (the originally planned Implicit Grant Flow was sunset by Spotify in November 2025, so the app uses Spotify's current recommended flow instead)
- **`fetch()`** — for all HTTP requests to the Spotify API
- **`localStorage`** — used briefly during authentication to persist the PKCE code verifier across the redirect to and from Spotify's login page
- **CSS Modules** — component-scoped styling
- **Netlify** — deployment, required because Spotify no longer accepts insecure (`http`) redirect URIs, even for local development

## Component Tree

```
App
 ├── SearchBar
 ├── SearchResults
 │    └── Track (isPlaylistTrack = false → shows "add" button)
 └── Playlist
      └── TrackList
           └── Track (isPlaylistTrack = true → shows "remove" button)
```

Data flows down from `App` via props; `SearchBar`, `Track`'s buttons, and `Playlist`'s input each call handler functions passed down from `App`, which owns all shared state (`searchResults`, `playlistName`, `playlistTracks`).

## Core State (in `App.js`)

| State | Purpose |
|---|---|
| `searchResults` | Array of track objects returned from the last search |
| `playlistName` | The custom playlist's current name (editable) |
| `playlistTracks` | Array of track objects currently in the custom playlist |

Each track object has the shape: `{ id, name, artist, album, uri }`.

## Spotify Integration (`Spotify.js`)

All Spotify API logic lives in a single utility module, exporting:

- **`search(term)`** — queries `/v1/search`, returns an array of simplified track objects
- **`getUserID()`** — queries `/v1/me`, returns the current user's Spotify ID
- **`createPlaylist(userId, name, description, isPublic)`** — creates a new empty playlist via `/v1/users/{user_id}/playlists`
- **`addTracksToPlaylist(playlistId, uris)`** — adds tracks to a playlist via `/v1/playlists/{playlist_id}/tracks`

Authentication (`getAccessToken()`) is handled internally by this module and is not called directly from anywhere else in the app — every exported function that needs a token fetches one for itself.

## Saving a Playlist

Clicking "Save to Spotify" runs a sequence of three dependent API calls:
1. Get the current user's Spotify ID
2. Create a new (empty) playlist under that user's account, using the current playlist name
3. Add all current playlist tracks (by URI) to that new playlist

After a successful save, the app's playlist state resets so the user can start building a new one.
