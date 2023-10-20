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
        // Need empty array so that the function doesnt call infinitely but eslint gives a warning for some reason.
        // eslint-disable-next-line
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
                Central Valley Farm Aid is a website that aggregates data such as non-profit organizations and farmers' markets
                from various APIs and displays them in such a way that helps farmers in the Central Valley region of California.
            </p>
        </div>
        <div className="about-section">
            <h2>Why?</h2>
            <p>
                Many rural farmers in the Central Valley region are family owned. We hope to help these farmers by identifying
                where they can sell their crops in farmers' markets and by showing them any non-profit organizations that could
                potentially provide assistance based on their location. As rural and small family farmers inherently face many threats
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
                role={member.role}
                commits={member.commits}
                issues={member.issues}
                tests={member.tests}
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
            <h2>Project Repository</h2>
            <div className="repository-link">
                <h3>
                    <a href="https://gitlab.com/cs373-group-14/idb">
                        https://gitlab.com/cs373-group-14/idb
                    </a>
                </h3>
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
