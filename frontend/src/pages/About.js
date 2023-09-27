import "../styles/About.css";
import React, { useState, useEffect } from "react";
import MemberCard from "../components/MemberCard";
import { fetchGitLabInfo } from "../utils/GitlabUtils";
import ToolCard, { toolsUsed } from "../components/ToolCard";

const About = () => {
    const [memberInfo, setMemberInfo] = useState([]);
    const [totalStats, setTotalStats] = useState({});
    useEffect(() => {
        fetchData();
        console.log(memberInfo);
    }, []);

    const fetchData = async () => {
        fetchGitLabInfo()
        .then(info => {
            setMemberInfo(info.members);
            setTotalStats(info.stats);
        });
    };

    return (
    <div className="about">
        <h1 className="title">About</h1>
        <div className="about-section">
            <h2>What is Central Valley Farm Aid?</h2>
            <p>
                Central Valley Farm Aid helps rural farmers in the Central Valley region of California identify where they
                can sell their crops in farmers' markets and shows them any non-profit organizations that could potentially
                provide assistance based on their location. As rural and small family farmers inherently face many threats
                to the viability of their establishments, ranging anywhere from infrastructure to financial constraints,
                we hope to provide resources that could help them in any way.
            </p>
        </div>
        <div className="about-section">
            <h2>Team Members</h2>
            <div className="team-members">
                {memberInfo.map((member) => (
                <MemberCard
                key={member.id}
                name={member.name}
                username={member.username}
                bio={member.bio}
                commits={member.commits}
                issues={member.issues}
                />
                ))}
            </div>
        </div>
        <div className="about-section">
            <h2>Total Stats</h2>
            <div className="total-stats">
                <p>Total Issues: {totalStats.totalIssues}</p>
                <p>Total Commits: {totalStats.totalCommits}</p>
            </div>
        </div>
        <div className="about-section">
            <h2>Tools Used</h2>
            <div className="tools-used">
                {toolsUsed.map((tool) => (
                <ToolCard
                key={tool.name}
                name={tool.name}
                img={tool.img}
                />
                ))}
            </div>
        </div>
    </div>
  );
};

export default About;
