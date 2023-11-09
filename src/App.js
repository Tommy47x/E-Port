import React, { useEffect } from 'react'; // For Functions
import 'bootstrap/dist/css/bootstrap.min.css'; // For BootStrap-Styling
import './App.css'; // For internal styling
import backgroundImage from 'C:/Users/crist/Downloads/e-port.jpg'; // For background image
import Elements from './Elements'; // Offcanvas
import Logic from './Logic'; // Algorithm, Request and Response
import TermsofUse from './TermsofUse'; // Modal

function App() {

    useEffect(() => {
        let root = document.getElementById('root'); // Get the root element
        root.style.backgroundImage = `url(${backgroundImage})`; // Set the background image
        root.style.backgroundPosition = 'center';
        root.style.backgroundRepeat = 'no-repeat'; // Set the background to !repeat
        root.style.backgroundSize = 'cover'; // Set the background size to cover
        root.style.height = '100vh'; // Set the height to 100% of the viewport height
    }, []);

    return (
        <div className="App">
            <div className="center-content">
                <Elements> </Elements>
                <Logic></Logic>
                <TermsofUse></TermsofUse>
            </div>
        </div>
    );
}

export default App;