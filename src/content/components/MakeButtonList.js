'use strict';

import React from 'react';
import DestinationButton from './DestinationButton'
import UserButton from './UserButton';

const MakeButtonList = ({props}) => {

  return (
    <React.Fragment>
      <DestinationButton props={props} />
      {props.map(({ name }, index) => (
        <UserButton key={index} name={name} />
      ))}
    </React.Fragment>
  );
};

export default MakeButtonList;