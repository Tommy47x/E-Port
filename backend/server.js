const express = require('express');
const cors = require('cors');
const nmap = require('node-nmap');

nmap.nmapLocation = 'nmap'; //default
let app = express();

app.use(cors());

app.get('/scan', (req, res) => {
    const ipAddress = req.query.ip; // Get the IP address from the query parameters
    let fullscan = new nmap.OsAndPortScan(ipAddress); // Use the IP address in the scan
    fullscan.on('complete', function (data) {
        // Analyze the scan results
        let isSecure = true;
        let openPorts = [];
        data.forEach(host => {
            // Check for open ports
            if (host.openPorts && host.openPorts.length > 0) { // If there are open ports
                // Define the ports to check for
                const portsToCheck = [21, 23, 445, 3389, 1433]; // FTP, Telnet, SMB, RDP, SQL-Server
                host.openPorts.forEach(portInfo => {
                    openPorts.push(portInfo.port);
                    if (portsToCheck.includes(portInfo.port)) {
                        console.log(`Vulnerable port found: ${portInfo.port}`);
                        isSecure = false;
                    }
                });
            }
            // Check for outdated operating systems
            if (host.osNmap && host.osNmap.includes('outdated OS')) {
                console.log('Outdated OS found');
                isSecure = false;
            }
        });
        res.json({ isSecure: isSecure, openPorts: openPorts });
    });
    fullscan.startScan(); // Start the scan
});

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});