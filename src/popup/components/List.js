'use strict';

import React from 'react';
import Reviewer from './Reviewer';

const List = ({ props }) => {
  const { values } = props;

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