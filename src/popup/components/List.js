'use strict';

import React, { Component, Fragment } from 'react';

const Badge = () => {
  return (
    <span className="badge"></span>
  );
  
}

const Reviewer = ({props}) => {
  const { reviewers } = props;
  console.log(reviewers)
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

const List = ({ data }) => {
  const values = data.values;

  return (
    <ul>
      {values.map((value, index) => (
        <li key={index}>
          <a href={`"https://stash.wemakeprice.com/projects/WONDER/repos/prerender/pull-requests/${value.id}`}>
            <div className="pullrequest-author">
              <span className="user">
                <img src={`http://stash.wemakeprice.com/users/${value.author.user.name}/avatar.png`} alt={value.author.user.displayName} original-title={value.author.user.displayName}/>
              </span>
            </div>
            <div className="pullrequest-info">
              <div>
                <span className="from">{value.fromRef.displayId}</span>
                <span>-></span>
                <span className="to">{value.toRef.displayId}</span>
              </div>
              <span className="displayName">{value.author.user.displayName}</span>
              <p>{value.title}</p>
            </div>
            <Reviewer props={value} />
          </a>
        </li>
      ))}
    </ul>
  )
}

export default List;