import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Alert, Card, Form } from 'react-bootstrap';
import './App.css'; // Make sure to import the CSS file

function App() {
    const [scanData, setScanData] = useState(null);
    const [ipAddress, setIpAddress] = useState('');

    const handleScan = () => {
        fetch(`http://localhost:3000/scan?ip=${ipAddress}`) // Include the IP address in the request
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setScanData(data))
            .catch(error => console.log('Error:', error));
    };

    const handleIpChange = (event) => {
        setIpAddress(event.target.value);
    };

    const messages = {
        21: 'FTP port is open. This is a security risk that can be exploited by hackers.',
        20: 'FTP port is open. This is a security risk that can be exploited by hackers',
        22: 'SSH port is open. This can be a security risk if not properly configured.',
        139: 'SMB port is open. This can be a security risk (WannaCry).',
        137: 'SMB port is open. This can be a security risk.',
        443: 'HTTPS port is open. This can be a security risk.',
        80: 'HTTP port is open. This can be a security risk.',
        8080: 'HTTP port is open. This can be a security risk.',
        8443: 'HTTPS port is open. This can be a security risk.',
        25: 'SMTP port is open. This can be a security risk.',
        69: 'TFTP port is open. This can be a security risk.',
        23: 'Telnet port is open. This can be a security risk.',
        445: 'SMB port is open. This can be a security risk.',
        3389: 'RDP port is open. This can be a security risk.',
        1433: 'SQL-Server port is open. This can be a security risk.',
        53: 'DNS port is open. You are vulnerable to DDoS attacks.'
    };

    return (
        <div className="App">
            <div className="center-content">
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Network Scan</Card.Title>
                        <Card.Text>
                            Enter an IP address and click the button below to start the network scan.
                        </Card.Text>
                        <Form.Control type="text" placeholder="Enter IP address" value={ipAddress} onChange={handleIpChange} />
                        <ul></ul>
                        <Button onClick={handleScan}>Start Scan</Button>
                        <ul></ul>
                        {scanData && (
                            <div>
                                {scanData.isSecure ?
                                    <Alert variant="success">The network is secure.</Alert> :
                                    <Alert variant="danger">The network is not secure.</Alert>
                                }
                                <Alert variant="danger">But... Open ports: {scanData.openPorts.join(', ')} {scanData.openPorts.map(port => messages[port] && <p key={port}>{messages[port]}</p>)}</Alert>

                            </div>
                        )}
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default App;