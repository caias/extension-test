'use strict';

import React from 'react';

const UserButton = ({name}) => {

  const nameBinding = (e) => {
    e.preventDefault();

    const searchArea = document.querySelector('#s2id_autogen1');
    const name = e.target.innerText;

    searchArea.value = name;
    document.querySelector('.select2-choices').click();
  }
  
  return (
    <React.Fragment>
      <button onClick={nameBinding} className="aui-button">{name}</button>
    </React.Fragment>
  )
}

export default UserButton;