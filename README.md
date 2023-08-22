# Log Monitor UI

[![npm version](https://badge.fury.io/js/html-conversion-node.svg)](https://badge.fury.io/js/html-conversion-node)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The Log Monitor package provides an easy-to-use middleware for monitoring log files in real-time through a web interface. This module is built using Express and Socket.IO, enabling you to set up a web server to visualize log entries as they're generated. It's a valuable tool for debugging and monitoring applications.

## Installation

To install the Log Monitor package, use the following npm command:

```sh
npm install log-monitor-ui
```

**Note:** Please ensure you have Node.js and npm installed on your system before proceeding with the installation.

## Usage

Follow these steps to incorporate the Log Monitor middleware into your project:

1. **Import the module:**

```javascript
const logMonitor = require('log-monitor-ui');
```

2. **Set up configuration parameters:**

```javascript
const logFilePath = '/path/to/your/log/file.log'; // Path to the main log file
const errorLogFilePath = '/path/to/your/error/log/file.log'; // Path to the error log file (optional)

const authOptions = {
    users: { 'admin': '12345' }, // Users and passwords for basic authentication
    challenge: true,
    realm: 'Restricted Area',
};

const otherOptions = {
    maxLines: 100, // Number of lines to display from the log files
    port: 8000, // Port on which the server will run
};
```

3. **Initialize the log monitor:**

```javascript
const logMonitorInstance = logMonitor(logFilePath, errorLogFilePath, authOptions, otherOptions);
```

4. **Access the log monitor web interface:**

Open a web browser and navigate to `http://localhost:8000/logs` to view the main log file or `http://localhost:8000/errors` to view the error log file (if provided). You will be prompted to enter the authentication credentials defined in the `authOptions`.

## Features

- Real-time Monitoring: Utilizes WebSocket technology to provide real-time updates as new log entries are appended.

- Basic Authentication: Enhance security by applying basic authentication, allowing only authorized users to access the log files.

- Customizable Interface: Customize the HTML interface according to your needs by editing the provided HTML files.

- Error Log Support: If an error log file path is provided, the middleware enables you to view both the main logs and error logs separately.

## Example

Here's a basic example of using the Log Monitor package:

```javascript
const logMonitor = require('log-monitor');

const logFilePath = '/home/sparkout/.pm2/logs/layer-one-x-out-0.log';
const errorLogFilePath = '/home/sparkout/.pm2/logs/error.log';

const authOptions = {
    users: { 'admin': '12345' },
    challenge: true,
    realm: 'Restricted Area',
};

const otherOptions = {
    maxLines: 100,
    port: 8000,
};

const logMonitorInstance = logMonitor(logFilePath, errorLogFilePath, authOptions, otherOptions);
```

## Routes

The Log Monitor package provides the following routes to access the web interface:

1. **Main Log File:**

   ```
   http://localhost:8000/logs
   ```

2. **Error Log File:**

   ```
   http://localhost:8000/errors
   ```

3. **Success Page:**

   ```
   http://localhost:8000/success
   ```

Remember that if you've set up basic authentication using the `authOptions`, you will be prompted to enter the specified authentication credentials when accessing these routes.


## Contributing

Contributions are highly appreciated! If you encounter issues or have suggestions for improvements, please open an issue or submit a pull request on the [GitHub repository](https://github.com/aravindhfinix/log-monitor-ui).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
