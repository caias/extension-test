'use strict';

import React from 'react';

const SelectReviewer = ({props}) => {
  const { id, name } = props;

  const deleteItem = (e) => {
    e.preventDefault();

    const target = e.target;
    alert(target);
  }
  
  return (
    <React.Fragment>
      <li className="select2-search-choice">
        <div>
          <div className="avatar-with-name" title={name}>
            <span className="aui-avatar aui-avatar-xsmall user-avatar" data-username={id}>
              <span className="aui-avatar-inner"><img src={`/users/${id}/avatar.png?s=32&amp;v=1554880248410`} alt={name} /></span>
            </span>
            <span className="display-name">{name}</span>
          </div>
        </div>    
        <a href="#" onClick={deleteItem} className="select2-search-choice-close" tabndex="-1"></a>
      </li>
  </React.Fragment>
  );

}

export default SelectReviewer;
