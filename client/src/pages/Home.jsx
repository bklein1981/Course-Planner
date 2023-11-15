import Subject from "../components/Subject";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { QUERY_USER } from "../utils/queries";
import { useQuery } from '@apollo/client';
import Auth from "../utils/auth";

function Home() {
    const [headerHeight, setHeaderHeight] = useState(0);

    const [userId, setUserId] = useState(null); // State to store user id
    const [user, setUserData] = useState({}); // State to store user data returned from the query

    const { loading, data, error, refetch } = useQuery(QUERY_USER, {
      variables: { id: userId },
      skip: !userId,
    });
  
    useEffect(() => {
      // Fetch the userId using Auth
      const loggedInUserId = Auth.getProfile()?.data?._id;
      if (loggedInUserId) {
        setUserId(loggedInUserId);
        console.log(loggedInUserId)
      }
    }, []);
  
  
    useEffect(() => {
      if (userId) {
        // Trigger the query when userId changes
        refetch({ userId }); // Re-fetch the user data with the updated userId
      }
    }, [userId, refetch]);
  
    useEffect(() => {
      if (userId && data) {
        console.log("User Data:", data);
        const userData = data.user || {};
        console.log("User:", userData); // Log the user object
        setUserData(userData); // Set the user data in state
      }
    }, [loading, data]);

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
                <div className="fixed top-0 left-0 right-0 w-full sm:w-auto" id="header-content">
                    <Header user={user} />
                </div>
                <div id="main-content" style={mainStyle}>
                    <Subject />
                </div>
            </div>
        </div>
    );
}

export default Home;


