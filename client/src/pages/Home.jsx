import Subject from "../components/Subject";
import Header from "../components/Header";
import { useState, useEffect } from "react";

function Home() {
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        const updateHeaderHeight = () => {
            // Check that the element with ID "header-content" exists
            const header = document.getElementById("header-content");
            if (header) {
                // Update headerHeight with the offsetHeight of the header element
                setHeaderHeight(header.offsetHeight);
                console.log("Header height updated:", header.offsetHeight);
            } else {
                console.log("Header element not found");
            }
        };

        // Call updateHeaderHeight on page load
        updateHeaderHeight();

        // Add event listener for window resize
        window.addEventListener('resize', updateHeaderHeight);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', updateHeaderHeight);
            console.log("Event listener removed");
        };
    }, []);

    console.log("Current header height:", headerHeight);

    const mainStyle = {
        marginTop: `${headerHeight}px`,
        padding: '20px',
        boxSizing: 'border-box',
    };

    return (
        <div className="flex justify-center">
            <div>
                <div className="fixed top-0 left-0 right-0" id="header-content">
                    <Header />
                </div>
                <div id="main-content" style={mainStyle}>
                    <Subject />
                </div>
            </div>
        </div>
    );
}

export default Home;


