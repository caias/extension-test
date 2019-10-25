'use strict';

import React from 'react';
import SelectReviewer from './SelectReviewer';

const ReviewerList = ({props}) => {
  return (
    <ul className="select2-choices">
      {
        props.map((value, index) => (
          <SelectReviewer key={index} props={value} />
        ))
      }
      <li className="select2-search-field">
        <input type="text" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" className="select2-input" id="s2id_autogen1" style={{ width: 10 + 'px' }} />
      </li>
    </ul>
  );
}

export default ReviewerList;
