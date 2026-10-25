# Escape Together: The Last Key — prototype

## Included
- Cinematic-styled 3D mansion room, third-person camera, character, desk, diary interaction, locked door, clock, window lighting, fog and dust.
- Mobile joystick, interact, clue and hint controls.
- Room code and share-link UI.
- Node.js + Socket.IO starter for two-player rooms, basic position sync, story messages and experimental WebRTC voice signaling.

## Run
Requires Node.js 20+ and internet for Three.js/Socket.IO CDN modules.
1. Extract ZIP.
2. Run `npm install`
3. Run `npm start`
4. Open `http://localhost:3000`

## Public multiplayer
Deploy this Node app to a Node-compatible host with WebSocket support. Use HTTPS. In `public/index.html`, update `connect()` to use same-origin `socket = io({transports:['websocket','polling']})` if the site and server share one domain. If separate, use the public server URL and restrict Socket.IO CORS to your frontend origin. Share a URL like `https://YOUR-DOMAIN/?room=NIGHT7`.

## Voice chat
Experimental WebRTC signaling is included. Voice requires HTTPS (or localhost), microphone permission, deployed signaling server and network-compatible ICE configuration. Production voice should add TURN servers, mute/end-call buttons, reconnect handling and robust call-state logic.

## Not complete yet
This is an early playable visual prototype, not the finished five-chapter game. The asymmetric clue puzzle, actual door unlock logic, multiple endings, server-authoritative puzzle progress, polished matchmaking and production-ready voice chat still need implementation and testing. Don't assume public multiplayer works until deployed and tested on two separate devices.
