# Farm Bot Soundboard

A lightweight **Wizard of Oz** control app using:

-   [Astro](https://astro.build/) + [React](https://react.dev/)
-   [Pusher Channels](https://pusher.com/channels) for real-time communication
-   Hosted on [Vercel](https://vercel.com/)
-   Designed for robot-mounted phones or tablets to play back sounds remotely

---

## How It Works

-   **`/` (Dashboard):**
    Control panel with buttons for triggering sounds.
    Sends `play-audio` events to all connected clients via Pusher.

-   **`/client`:**
    Robot-facing display page.
    Subscribes to a channel and plays audio in response to events triggered from the dashboard.

> All dashboards control all clients — no pairing required.

## Set Up

```bash
npm install
```

local development:

```bash
npm run dev -- --host
```

Requires the following .env variables:

```env
PUBLIC_PUSHER_KEY
PUBLIC_PUSHER_CLUSTER
pusher_app_id
pusher_key
pusher_secret
pusher_cluster
```

`PUBLIC_` variables are necessary for Astro.

## Usage

Requires one controller device (host) and one listener device (client).

Navigate to the app's web address on both devices. On the client device, click on View Client.

The client device will show a prompt to `Start Session`. Clicking on this will promp full-screen if the device allows it, request a wake-lock, and open an audio streaming channel.

If the client ever exists full screen or loses the audio stream, simply refresh the page and restart the session.

Once the client is set up, the host can be used to play audio out through the client. Tracks can be selected with the available buttons. Playing a new sound will cut off the previous sound. Sounds cannot be queued.

Feel free to request additional features via the issues page, or directly contacting the authors.
