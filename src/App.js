import React, { useState, useEffect } from 'react'; // For Functions
import 'bootstrap/dist/css/bootstrap.min.css'; // For BootStrap-Styling
import { Button, Modal } from 'react-bootstrap'; // Elements from Bootstrap
import './App.css'; // For internal styling
import backgroundImage from 'C:/Users/crist/Downloads/e-port.jpg'; // For background image
import Elements from './Elements'; // Offcanvas
import Logic from './Logic'; // Algorithm, Request and Response

function App() {
    const [showModal, setShowModal] = useState(true); // Set initial state to true
    const handleCloseModal = () => setShowModal(false); // 

    useEffect(() => {
        let root = document.getElementById('root'); // Get the root element
        root.style.backgroundImage = `url(${backgroundImage})`; // Set the background image
        root.style.backgroundPosition = 'center'; // Set the background position
        root.style.backgroundRepeat = 'no-repeat'; // Set the background to !repeat
        root.style.backgroundSize = 'cover'; // Set the background size to cover
        root.style.height = '100vh'; // Set the height to 100% of the viewport height
    }, []);

    return (
        <div className="App">
            <div className="center-content">
                <Elements> </Elements>
                <Logic></Logic>

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Terms of Use</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Welcome to E-Port!! We are the first step for a safer internet!
                        <ul></ul>
                        With out app, you can scan your network and check if it is secure or not.
                        <ul></ul>
                        What do we exactly do? We use nMap to scan your network, and check for the open ports of your internal / external IP Adress.
                        <ul></ul>
                        We can't provide exact information about the security of your network, but we can give you a general idea of how secure it is, and if you should worry or not about a specific port and it's meanings.
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