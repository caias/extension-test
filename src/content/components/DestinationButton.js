'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ReviewerList from './ReviewerList';

const DestinationButton = ({props}) => {

  const deployMember = [
    {
      id: 'bjkim',
      name: '김범주'
    },
    {
      id: 'shh',
      name: '김신형'
    },
  ];

  const setReviewer = (e) => {
    e.preventDefault();

    const listWrap = document.querySelector('#2id_reviewer');    
    const submitInput = document.querySelector('#reviewers');
    const dest = e.target.innerText;
    let reviewerTarget;

    switch (dest) {
      case 'DEFAULT': 
        const owner = 'toybs';
        reviewerTarget = props.filter((value) => {
          return value.id !== owner;
        })
        break;
      case 'STG':
        reviewerTarget = props;
        break;
      case 'PROD':
        reviewerTarget = props.concat(deployMember);
        break;
      default:
        reviewerTarget = []
        break;
    }

    const submitValue = reviewerTarget.map((value) => {
      return value.id;
    });

    submitInput.value = submitValue.join('|!|');
    console.log(submitInput.value);

    return ReactDOM.render(<ReviewerList props={reviewerTarget} />, listWrap);
  };
  
  return (
    <div style={{ marginBottom: 10 + 'px' }}>
      <button className="aui-button" onClick={setReviewer}>DEFAULT</button>
      <button className="aui-button" onClick={setReviewer}>STG</button>
      <button className="aui-button" onClick={setReviewer}>PROD</button>
      <button className="aui-button" onClick={setReviewer}>전체삭제</button>
    </div>
  )
}

export default DestinationButton;