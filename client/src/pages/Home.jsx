import Subject from "../components/Subject";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries'
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

    const token = Auth.getProfile()

    const userId = { userId: token.data._id }

    const { loading, data } = useQuery(QUERY_USER, {
        variables: userId,
    });

    const subjectData = data?.user.subjects;
    const courses = data?.user.courses;
    const projects = data?.user.projects;
    console.log("SUBJECT DATA", subjectData)
    console.log("COURSES", courses)
    console.log("PROJECTS", projects)

    if (loading) {
        return <h2>LOADING...</h2>;
    }

    return (
        <div className="flex justify-center">
            <div>
                <div className="fixed top-0 left-0 right-0" id="header-content">
                    <Header />
                </div>
                <div id="main-content" style={mainStyle}>
                    {subjectData.map((subject, index) => {
                        const subjectCardData = { subject, courses, projects }
                        return (
                            <Subject key={index} subjectData={subjectCardData} />
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default Home;


