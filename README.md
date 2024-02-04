# Simple Chat with Websockets

This project demonstrates the use of Websockets for real-time communication between a web client and a server. It uses Express.js to create a simple server and the browser's WebSocket API for the client-side to establish a WebSocket connection.

## Overview

The project is split into two main components:

- **Server (`server.js`)**: Handles WebSocket connections and broadcasts messages received from any client to all connected clients.
- **Client (`index.html` and `index.js`)**: A simple web page that connects to the server via WebSocket, allowing users to send and receive messages in real-time.

## Getting Started

### Prerequisites

- Node.js installed on your system

### Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory and run the following commands to install dependencies:

   ```bash
   npm init -y
   npm install ws express
   ```

### Running the Server

1. Create a `server.js` file and import the required dependencies:

   ```javascript
   const express = require('express');
   const http = require('http');
   const WebSocket = require('ws');

   const port = 6969;
   const server = http.createServer(express);
   const wss = new WebSocket.Server({ server });
   ```

2. Add logic to handle WebSocket connections and messages:

   ```javascript
   wss.on('connection', (ws) => {
     console.log('Client connected');

     ws.on('message', (data) => {
       wss.clients.forEach((client) => {
         if (client !== ws && client.readyState === WebSocket.OPEN) {
           client.send(data);
         }
       });
     });
   });

   server.listen(port, () => {
     console.log(`Server is listening on ${port}!`);
   });
   ```

3. Start the server using Node.js:

   ```bash
   node server.js
   ```

### Setting Up the Client

1. Create an `index.html` file for the client UI.
2. Link a `styles.css` file for styling the web page.
3. Implement the WebSocket logic in `index.js`:

   ```javascript
   const sendBtn = document.querySelector('#send');
   const messages = document.querySelector('#messages');
   const messageInput = document.querySelector('#message-input');

   let ws;

   // Initialize WebSocket connection and event handlers
   function init() {
     // WebSocket logic here
   }

   // Invoke init to establish WebSocket connection
   init();
   ```

4. Open `index.html` in a browser to access the chat client.

## Challenges

The project includes several challenges to extend the functionality of the chat application:

1. **Implement and Test**: Follow the setup instructions and ensure the chat functions correctly across multiple browser tabs/windows.
2. **Modify the Client**: Enhance the client-side code to improve message display and styling.
3. **Add Usernames**: Extend the client and server to support sending and displaying usernames along with messages.
4. **Style the Client**: Apply custom styles to differentiate between incoming and outgoing messages.
5. **Add Timestamps**: Implement message timestamps to display when messages were sent.