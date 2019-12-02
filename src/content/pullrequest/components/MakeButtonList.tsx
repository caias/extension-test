/**
 * stash pull request page안에 리뷰어 버튼 생성
 *
 * @author 이강원 (caias), 이주영(juu0124)
 * @since 2019.11.08
 */

import React from 'react';
import UserButton from './UserButton';
import AllDeleteButton from './AllDeleteButton';
import { IUser } from 'background/interface';

interface ImemberList {
  memberList: IUser[];
}

const defaultProps: ImemberList = {
  memberList: [],
};

const MakeButtonList = (props: ImemberList = defaultProps) => {
  const { memberList } = props;

  return (
    <React.Fragment>
      {memberList.map((value, index) => (
        <UserButton key={index} name={value.displayName} />
      ))}
      <AllDeleteButton />
    </React.Fragment>
  );
};

export default MakeButtonList;