import Subject from "../components/Subject";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries'

function Home() {

    const token = Auth.getProfile()

    const userId = { userId: token.data._id }

    const { loading, data } = useQuery(QUERY_USER, {
        variables: userId,
    });

    const subjectData = data?.user.subjects;
    const courses = data?.user.courses;
    const projects = data?.user.projects;


    if (loading) {
        return <h2>LOADING...</h2>;
    }

    if (!subjectData || subjectData.length === 0) {
        return (
            <div>
                <Header />
                <div id="main-content" className="main-style">
                    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-5 p-5 border border-blue-500">
                        <p className="text-center text-lg font-semibold text-gray-700">Please click on "add a subject" to add a subject and begin using the planner.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center">
            <div>
                <div className="fixed top-0 left-0 right-0" id="header-content">
                    <Header />
                </div>
                <div id="main-content" className="main-style">
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


