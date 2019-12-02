/**
 * Pull Request Helper Extension
 * wmp 프론트엔드 개발팀 전용
 *
 * @author 이강원 (caias), 이주영(juu0124)
 * @since 2019.11.04
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { storage } from 'util/Storage';
import MakeButtonList from './components/MakeButtonList';
import { IUser } from 'background/interface';

/**
 * initialize
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

async function init() {
  // Pull Request 페이지의 버튼을 생성할 기준 컨테이너
  const container = document.querySelector('.description');
  container.setAttribute('style', 'width:500px');
  // 현재 로그인되있는 유저의 아이디
  const currentUser = await storage<string>('get', 'local', 'userInfo');

  // 멤버중 로그인되있는 유저 제외한 나머지 추출
  const memberInfo = await storage<string>('get', 'local', 'memberInfo');
  const memberList: IUser[] = memberInfo.filter((value: IUser): boolean => value.name !== currentUser.name);

  ReactDOM.render(<MakeButtonList memberList={memberList} />, container);
}