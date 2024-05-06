# Bufferstack.IO PubSub Server

This is a simple Publish-Subscribe (PubSub) server implemented in Node.js. It allows publishers to publish data to specific busID/subject channels and subscribers to subscribe to these channels to receive the published data.

## Features

- **Publishing**: Publishers can send data to specific channels identified by busID/subject.
- **Subscribing**: Subscribers can receive data published to specific channels.
- **Central Subject Repository**: Provides an endpoint for checking the availability of busID/subject channels.
- **Persistent Storage**: Supports storing published data in a JSON file for persistence.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/hj91/pubsub-server.git
    ```

2. Install dependencies:

    ```bash
    cd pubsub-server
    npm install
    ```

## Usage

1. Start the server:

    ```bash
    npm start
    ```

2. Use the provided client or implement your own to publish data, subscribe to channels, and check channel availability.

## Endpoints

- **Publish**: `/publish/:busID/:subject` (POST) - Publish data to a specific busID/subject channel.
- **Subscribe**: `/subscribe/:busID/:subject` (GET) - Subscribe to a specific busID/subject channel to receive published data.
- **Check Availability**: `/subjects/:busID/:subject` (GET) - Check if a specific busID/subject channel is available for subscription.

## Configuration

- **Settings**: Configuration settings such as port number are stored in `settings.conf`.
- **Persistent Storage**: Published data is stored in `subjects.json` for persistence.

## Usage

# Publishing data

- curl -X POST -H "Content-Type: application/json" -d '{"message": "Hello, world!"}' http://localhost:3000/publish/bus1/news

# Subscribing data

- curl http://localhost:3000/subscribe/bus1/news

# Checking Availibility of channel

- curl http://localhost:3000/subjects/bus1/news


## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.
