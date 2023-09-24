import "../styles/About.css";
import React, { useState, useEffect } from "react";
import MemberCard from "../components/MemberCard";
import { fetchGitLabInfo, getStats } from "../utils/GitlabUtils";

const About = () => {
    const [memberInfo, setMemberInfo] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const info = await fetchGitLabInfo();
            setMemberInfo(info);
        };
        fetchData();
        console.log(memberInfo);
    }, []);

    const [totalStats, setTotalStats] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const stats = await getStats();
            setTotalStats(stats);
        };
        fetchData();
    }, []);

    return (
    <div className="about">
        <h1 className="title">About</h1>
        <div className="about-section">
            <h1>What is Central Valley Farm Aid?</h1>
            <p>
                Central Valley Farm Aid helps rural farmers in the Central Valley region of California identify where they
                can sell their crops in farmers' markets and shows them any non-profit organizations that could potentially
                provide assistance based on their location. As rural and small family farmers inherently face many threats
                to the viability of their establishments, ranging anywhere from infrastructure to financial constraints,
                we hope to provide resources that could help them in any way.
            </p>
        </div>
        <div className="about-section">
            <h1>Team Members</h1>
            <div className="team-members">
                {memberInfo.map((member) => (
                <MemberCard
                key={member.id}
                name={member.name}
                gitlab={member.gitlab}
                bio={member.bio}
                commits={member.commits}
                issues={member.issues}
                />
                ))}
            </div>
        </div>
        <div className="about-section">
            <h1>Total Stats</h1>
            <div className="overall-stats">
                <p>Total Issues: {totalStats.totalIssues}</p>
                <p>Total Commits: {totalStats.totalCommits}</p>
            </div>
        </div>
    </div>
  );
};

export default About;
