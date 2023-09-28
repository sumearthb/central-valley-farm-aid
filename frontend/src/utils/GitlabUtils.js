import axios from "axios";

const gitlabGroupId = 74144055;
const gitlabProjectId = 50541840;
const accessToken = "glpat-2WTHZjG82TSvAuB83fmK"

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
            }
            members.push(member);
        });
      });
      console.log(`----------- Members: ${members}`)

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

      for (let i = 0; i < members.length; i++) {
        await axios.get(
            `https://gitlab.com/api/v4/users/${members[i].id}`, {
                headers: {
                  'PRIVATE-TOKEN': `${accessToken}`
                }
              }
          ).then(res => {
            members[i].bio = res.data.bio;
            members[i].role = res.data.job_title;
          });
      }

      return {
        members,
        stats: {
          totalIssues: issues.length,
          totalCommits
        }
      }
}