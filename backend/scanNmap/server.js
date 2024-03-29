const express = require("express");
const nmap = require("node-nmap");
const cors = require("cors");
let app = express();

app.use(cors());


nmap.nmapLocation = "nmap"; //default
app.get("/scan", (req, res) => {
  const ipAddress = req.query.ip; // Get the IP address from the query parameters
  const ipPattern = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

  if (!ipPattern.test(ipAddress)) {
    res.status(400).json({ error: "Invalid IP address" });
    return;
  }

  let fullscan = new nmap.NmapScan(ipAddress); // Use the IP address in the scan
  fullscan.on("complete", function (data) {
    // Analyze the scan results
    let isSecure = true;
    let openPorts = [];
    data.forEach((host) => {
      // Check for open ports
      if (host.openPorts && host.openPorts.length > 0) { // If there are open ports
        // Define the ports to check for
        const portsToCheck = [21, 22, 23, 445, 3389]; // FTP, Telnet, SMB, RDP, SQL-Server and more
        host.openPorts.forEach((portInfo) => {
          openPorts.push(portInfo.port);
          if (portsToCheck.includes(portInfo.port)) {
            isSecure = false;
          }
        });
      }
    });
    res.json({ isSecure: isSecure, openPorts: openPorts }); // Return the results
  });
  fullscan.startScan(); // Start the scan
});

app.listen(5000, function () {
  console.log("App listening on port 5000!");
});

