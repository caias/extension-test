import React from 'react';
import Badge from './ApproveBadge';

const Reviewer = ({ props }) => {
  const { reviewers } = props;
  return (
    <div className="reviewers">
      {reviewers.map((member, index) => (
        <span key={index} className="user">
          <img src={`http://stash.wemakeprice.com/users/${member.user.name}/avatar.png`} alt={member.user.displayName} title={member.user.displayName} />
          {
            member.approved && <Badge />
          }
        </span>
      ))}
    </div>
  )
}

export default Reviewer;