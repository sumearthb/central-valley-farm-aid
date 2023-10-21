import axios from "axios";

const gitlabGroupId = 74144055;
const gitlabProjectId = 50541840;
const accessToken = "glpat-2WTHZjG82TSvAuB83fmK"

const memberInfo = [
  {
    id: 15724436,
    bio: "Hi, my name is Martin and I'm a senior majoring in Computer Science at UT. I like lifting weights, bouldering, and watching anime.",
    role: "Full-Stack",
    tests: 10
  },
  {
    id: 11371618,
    bio: "Hello, I'm a senior Computer Science major at UT Austin from Pflugerville. My hobbies are going to the gym, ping pong and playing strictly League of Legends.",
    role: "Frontend Developer"
  },
  {
    id: 13515351,
    bio: "Hi! I'm a junior at the University of Texas at Austin, studying computer science and mathematics. I like playing volleyball, listening to music, and learning new recipes in my free time. ",
    role: "Frontend Developer"
  },
  {
    id: 15632576,
    bio: "Hey! I am a senior studying Computer Science. I'm planning to go into product full time and am excited to better understanding SWE. In my free time, I enjoy working on startups and playing sports.",
    role: "Backend Developer"
  },
  {
    id: 15686186,
    bio: "Hey y'all! I am a senior studying Computer Science, and planning on going into data science full-time. In my free time, I love playing basketball and watching sports in general.",
    role: "Dev Ops"
  },
]

export const fetchGitLabIssues = async() => {
    return axios.get(
        `https://gitlab.com/api/v4/projects/${gitlabProjectId}/issues?scope=all&per_page=1000`
      ).then(res => res.data);
}

export const fetchGitLabContributors = async() => {
    return axios.get(
        `https://gitlab.com/api/v4/projects/${gitlabProjectId}/repository/contributors`,
      ).then(res => res.data);
}

export const fetchGitLabInfo = async() => {
    let members = [];
    // Get all the members from the group
    await axios.get(
        `https://gitlab.com/api/v4/groups/${gitlabGroupId}/members`, {
            headers: {
              'PRIVATE-TOKEN': `${accessToken}`
            }
          }
      ).then(res => {
        res.data.forEach(item => {
            const member = {
                id: item.id,
                name: item.name,
                bio: "Empty",
                role: "Empty,",
                username: item.username, 
                commits: 0,
                issues: 0,
                tests: 0
            }
            members.push(member);
        });
      }).catch();

      let issues = await fetchGitLabIssues();
      let contributors = await fetchGitLabContributors();

      // Sum up the commits
      let totalCommits = 0;
      contributors.forEach(contributor => {
        totalCommits += contributor.commits;
      });

      // Iterate through every member
      members.forEach(async member => {
        // Set number of issues made
        issues.forEach(issue => {
          if (issue.author.id === member.id) {
            member.issues += 1;
          }
        });
        // Set number of commits made
        contributors.forEach(contributor => {
          if (member.name === contributor.name || member.username === contributor.name) {
            member.commits = contributor.commits;
          }
        });
      });

      // GitLab api rate limits /api/users/ very strictly
      // for (let i = 0; i < members.length; i++) {
      //   await axios.get(
      //       `https://gitlab.com/api/v4/users/${members[i].id}`, {
      //           headers: {
      //             'PRIVATE-TOKEN': `${accessToken}`
      //           }
      //         }
      //     ).then(res => {
      //       members[i].bio = res.data.bio;
      //       members[i].role = res.data.job_title;
      //     });
      // }
      
      members.forEach(member => {
        for (let i = 0; i < memberInfo.length; i++) {
          if (member.id === memberInfo[i].id) {
            member.bio = memberInfo[i].bio;
            member.role = memberInfo[i].role;
            member.tests = (memberInfo[i].tests === undefined) ? 0 : memberInfo[i].tests;
            break;
          }
        }
      });

      return {
        members,
        stats: {
          totalIssues: issues.length,
          totalCommits
        }
      }
}