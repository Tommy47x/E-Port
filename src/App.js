import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Alert, Card, Form, Offcanvas, Navbar, Container, Modal } from 'react-bootstrap';
import './App.css';
import backgroundImage from 'C:/Users/crist/Downloads/e-port.jpg';

//TO-DO: Add more ports and their meanings (OPTIONAL)
//TO-DO: Re-organize the code with functional components and new files 
//



function App() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [scanData, setScanData] = useState(null);
    const [ipAddress, setIpAddress] = useState('');
    const ipPattern = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    const [showModal, setShowModal] = useState(true); // Set initial state to true
    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        let root = document.getElementById('root');
        root.style.backgroundImage = `url(${backgroundImage})`;
        root.style.backgroundPosition = 'center';
        root.style.backgroundRepeat = 'no-repeat';
        root.style.backgroundSize = 'cover';
        root.style.height = '100vh'; // Set the height to 100% of the viewport height
    }, []);


    const handleScan = () => {
        if (!ipPattern.test(ipAddress)) {
            alert("Please enter a valid IP address.");
        }
        fetch(`http://localhost:5000/scan?ip=${ipAddress}`) // Include the IP address in the request
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
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container>
                        <Navbar.Brand onClick={handleShow}>General port info, here:</Navbar.Brand>

                        <Offcanvas show={show} onHide={handleClose} >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Ports and their meanings:</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Alert variant='success'>If you test a website adress, the scan will probably say 'Not secured' because we don't actually know the protection protocols of every website. We're just telling you that if you're having a website, the security risks you're exposed to.</Alert>
                                <Alert variant='info'>PORT 53: (Phone / PC): You most probably have a dynamic IP Adress, so as long you're DDoSed you should just restart the router. </Alert>
                                <Alert variant='danger'>PORTS 20 and 21(SERVERS): File Transfer Protocol (FTP). FTP is for transferring files between a client and a server.
                                    <ul></ul>You are actually really vulnerable to many types of attacks by having these ports opened on a server.  Buy some protection. </Alert>
                                <Alert variant='danger'>PORT 22, 139 and 137: (SERVERS / PC): Secure Shell (SSH). SSH is a secure protocol used as the primary means of connecting to Linux servers remotely. Beware, this is really dangerous. </Alert>
                                <Alert variant='danger'>PORT 23: (SERVERS / PC): Telnet. Telnet is a protocol that allows you to connect to remote computers (called hosts) over a TCP/IP network (such as the internet).</Alert>
                                <Alert variant='danger'>PORT 25: (SERVERS / PC): Simple Mail Transfer Protocol (SMTP). SMTP is used for sending and receiving email. </Alert>
                                <Alert variant='danger'>PORT 69: (SERVERS / PC): Trivial File Transfer Protocol (TFTP). TFTP is a simpler version of FTP that doesn’t require a username/password to transfer files. This is very common in unethical hacking. </Alert>
                                <Alert variant='danger'>PORT 80: (SERVERS / PC / Phone): Hypertext Transfer Protocol (HTTP). HTTP is the protocol used to transfer data over the web. </Alert>
                                <Alert variant='danger'>PORT 443 and 8443: (SERVERS / PC / Phone): HTTP Secure (HTTPS). HTTPS is the secure version of HTTP, and is used for secure communication over a computer network, and is widely used on the internet. </Alert>
                                <Alert variant='danger'>PORT 445: (SERVERS / PC): Server Message Block (SMB). SMB is a network file sharing protocol. This script can block any 2FA / 2nd confirmation. </Alert>
                                <Alert variant='danger'>PORT 3389: (SERVERS / PC): Remote Desktop Protocol (RDP). RDP is a proprietary protocol developed by Microsoft for connecting to another computer with a graphical interface over a network connection. Basically, legal hacking but without you actually knowing it. </Alert>
                                <Alert variant='danger'>PORT 1433: (SERVERS / PC): Microsoft SQL Server. SQL Server is a relational database management system developed by Microsoft. The SQL can be injected with various viruses or hidden god-modes, so beware of your user data! </Alert>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </Container>
                </Navbar>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Network Scan</Card.Title>
                        <Card.Text>
                            Enter an IP address and click the button below to start the network scan.
                        </Card.Text>
                        <Form.Control type="text" placeholder="Enter IP address" value={ipAddress} onChange={handleIpChange} />
                        <ul></ul>
                        <Button variant='dark' onClick={handleScan}>Start Scan</Button>
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

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Terms of Use</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Welcome to E-Port!! We are the first step for a safer internet!
                        <ul></ul>
                        With out app, you can scan your network and check if it is secure or not.
                        <ul></ul>
                        What do we exactly do? We use nMap to scan your network, and check for the open ports or the outdated OS of routers.
                        <ul></ul>
                        We can't provide exact information about the security of your network, but we can give you a general idea of how secure it is.
                        <ul></ul>
                        Also, by checking the 'General port info' button, you'll see a list of general ports and their meanings.
                        <ul></ul>
                        Now remember, this is just a prototype. We are not responsible for any illegal use of this app.
                        Please, use it only for educational purposes. By closing this modal, you agree with our terms of use.
                        <ul></ul>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Agree to terms
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default App;