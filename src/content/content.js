/**
 * Pull Request Helper Extension 
 * wmp 프론트엔드 개발팀 전용
 * 
 * @author 이강원 (caias)
 * @since 2019.10.19
 */

import React from 'react';
import ReactDOM from 'react-dom';
import MakeButtonList from './components/MakeButtonList'

/**
 * 프론트엔드개발팀 멤버
 */
const teamMember = [
  {
    id: 'toybs',
    name : '양반석'
  },
  {
    id: 'hjsjjang',
    name: '한정석'
  },
  {
    id: 'hanpilpark',
    name: '박한필'
  },
  {
    id: 'markone',
    name: '장하련'
  },
  {
    id: 'tjddk88',
    name: '이성아'
  },
  {
    id: 'kern86',
    name: '유한승'
  },
  {
    id: 'caias',
    name: '이강원'
  },
  {
    id: 'juu0124',
    name: '이주영'
  },
  {
    id: 'kkwang',
    name: '남광우'
  }
];

/**
 * initialize
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function init() {
  // Pull Request 페이지의 버튼을 생성할 기준 컨테이너
  const container = document.querySelector('.description');
  // 현재 로그인되있는 유저의 아이디
  const currentUser = document.querySelector('#current-user').getAttribute('data-username');
  // 멤버중 로그인되있는 유저 제외한 나머지 추출
  const memberList = teamMember.filter((value) => {
    return value.id !== currentUser;
  });

  ReactDOM.render(<MakeButtonList props={memberList} />, container);
}
