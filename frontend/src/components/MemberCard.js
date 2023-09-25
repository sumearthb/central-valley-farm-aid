import PropTypes from "prop-types";
import React from "react";

function MemberCard(props) {
  const {
    name,
    username,
    bio,
    commits,
    issues,
  } = props;

  return (
    <div className="member-card">

      <img className="member-card-image" src={`${process.env.PUBLIC_URL}/member-pics/${username}.jpg`} />

      <div className="member-card-header">
        <h3 className="member-card-name">
          {name}
        </h3>
      </div>

      <div className="member-card-body">
        <p className="member-card-gitlab">
          <a className='btn btn-link' href={"https://gitlab.com/" + username}>
            {username}
          </a>
        </p>
        <p className="member-card-bio">
          {bio}
        </p>
        <p className="member-card-commits">
          {"Commits: " + commits}
        </p>
        <p className="member-card-issues">
          {"Issues: " + issues}
        </p>
      </div>
    </div>
  );
}

MemberCard.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  commits: PropTypes.number.isRequired,
  issues: PropTypes.number.isRequired,
};

export default MemberCard;
