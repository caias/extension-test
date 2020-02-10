/**
 * stash pull request page안에 멤버이름별 버튼
 *
 * @author 이강원 (caias)
 * @since 2019.11.08
 */

import React from 'react';

interface Iname {
  name: string;
}

const defaultProps: Iname = {
  name: '',
};

const UserButton = (props: Iname = defaultProps) => {
  const { name } = props;

  const nameBinding = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const searchArea: HTMLInputElement = document.querySelector('#s2id_autogen1');
    searchArea.value = name;

    const choice: HTMLElement = document.querySelector('.select2-choices');
    choice.click();
  };

  return (
    <React.Fragment>
      <button onClick={nameBinding} style={{ 'margin': '0 10px 10px 0' }} className='aui-button'>{name}</button>
    </React.Fragment>
  );
};

export default UserButton;