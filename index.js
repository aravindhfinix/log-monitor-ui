const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const basicAuth = require('express-basic-auth');
const fs = require('fs');

const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer);


function logMonitor(inputs, authOptions, otherOptions) {
    const { logFilePath, errorLogFilePath } = inputs;
    const { maxLines, port } = otherOptions;
    const defaultPort = port || 3000;

    if (!logFilePath && errorLogFilePath) {
        throw new Error("Error log file path provided, but not the log file path");
    }

    app.use(express.static(__dirname)); // Serve static files from the current directory

    if (authOptions) {
        const auth = basicAuth(authOptions);
        app.use(auth);
    }

    app.get('/logs', (req, res) => {
        res.sendFile(__dirname + '/logs.html');
    });

    app.get('/success', (req, res) => {
        res.sendFile(__dirname + '/success.html');
    });

    app.get('/errors', (req, res) => {
        res.sendFile(__dirname + '/errors.html');
    });

    app.use((req, res, next) => {
        return res.send('Requested route not found');
    });

    function emitLogFileChange(logData, event) {
        io.emit(event, logData);
    }

    function readLastLogLines(filePath, callback) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading log file:', err);
            } else {
                const lines = data.split('\n');
                const lastLines = lines.slice(-maxLines);
                callback(lastLines.join('\n'));
            }
        });
    }
    if (logFilePath) {
        fs.watch(logFilePath, (event, filename) => {
            if (event === 'change') {
                readLastLogLines(logFilePath, (lastLines) => {
                    emitLogFileChange(lastLines, 'logFileChange');
                });
            }
        });
    }

    if (errorLogFilePath) {
        fs.watch(errorLogFilePath, (event, filename) => {
            if (event === 'change') {
                readLastLogLines(errorLogFilePath, (lastLines) => {
                    emitLogFileChange(lastLines, 'errorLogFileChange');
                });
            }
        });
    }


    io.on('connection', (socket) => {
        console.log('Client connected');
        if (errorLogFilePath) {
            readLastLogLines(errorLogFilePath, (lastLines) => {
                emitLogFileChange(lastLines, 'errorLogFileChange');
            });
        }
        if (logFilePath) {
            readLastLogLines(logFilePath, (lastLines) => {
                emitLogFileChange(lastLines, 'logFileChange');
            });
        }

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    httpServer.listen(defaultPort, () => {
        console.log(`Logs moniter started on port ${defaultPort}`);
    });
}

module.exports = logMonitor

const basicInputs = {
    logFilePath: '/home/sparkout/.pm2/logs/layer-one-x-out-0.log',
};

const authOptions = {
    users: { 'admin': '12345' },
    challenge: true,
    realm: 'Restricted Area',
};

const otherOptions = {
    maxLines: 100,
    port: 8000,
};

startLogMonitor(basicInputs, authOptions, otherOptions);