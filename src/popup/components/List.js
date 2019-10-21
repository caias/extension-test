'use strict';

import React, { Component } from 'react';

const Badge = (isVisible) => {
  console.log(typeof isVisible)
  if (isVisible) {
    return (
      <span className="badge"></span>
    )
  }
}

const Reviewer = ({ status }) => {
  const { reviewers } = status;
  return (
    reviewers.map((member, index) => (
      <span key={index} className={member.approved === true ? 'user approved' : 'user unapproved'}>
        <img src={`http://stash.wemakeprice.com/users/${member.user.name}/avatar.png`} alt={member.user.displayName} original-title={member.user.displayName} />
        <Badge isVisible={member.approved === true} />
      </span>
    ))
  )
}

const List = ({ data }) => {
  const values = data.values;

  return (
    <ul>
      {values.map((value, index) => (
        <li key={index}>
          <a href={`"https://stash.wemakeprice.com/projects/WONDER/repos/prerender/pull-requests/${value.id}`}>
            <div className="user"><img src={`http://stash.wemakeprice.com/users/${value.author.user.name}/avatar.png`} alt={value.author.user.displayName} original-title={value.author.user.displayName}/></div>
            <div className="pullrequest-info">
              <div>
                <span className="from">{value.fromRef.displayId}</span>
                <span>-></span>
                <span className="to">{value.toRef.displayId}</span>
              </div>
              <span className="displayName">{value.author.user.displayName}</span>
              <p>{value.title}</p>
            </div>
            <div className="reviewers">
              <Reviewer status={value} />
            </div>
          </a>
        </li>
      ))}
    </ul>
  )
}

export default List;