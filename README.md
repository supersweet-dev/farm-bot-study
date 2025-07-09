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
