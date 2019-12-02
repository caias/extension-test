/**
 * Slack Helper Extension
 * wmp 프론트엔드 개발팀 전용
 *
 * @author 이강원 (caias), 이주영(juu0124)
 * @since 2019.11.04
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { storage } from 'util/Storage';
import APIS from 'util/APIS';
import getRepository from 'util/getRepository';
import { AxiosLoader } from 'util/AxiosLoader';
import { IResponse, IActivities } from './interface/SlackInterface';
import Container from './container/Container';

/**
 * initialize
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function init(): void {
  // repository
  const repository = getRepository();
  // requestId
  const requestId = document.querySelector('#content').getAttribute('data-pullrequestid');
  // requestID에 대한 정보 API (유저 및 리뷰어 정보)
  const infoURL = `${APIS.STASH.Request}/${repository}pull-requests/${requestId}`;
  // requestID에 대한 리뷰어들의 activities
  const stateURL = `${APIS.STASH.Request}/${repository}pull-requests/${requestId}/activities`;

  Promise.all([AxiosLoader<IResponse>(infoURL), AxiosLoader<IActivities>(stateURL)])
    .then((allData): void => {
      renderToButton(allData);
    })
    .catch(err => console.log(err));
}

async function renderToButton(allData: [IResponse, IActivities]) {
  const [infoData, stateData] = allData;
  // 로그인한 유저
  const currentUser = await storage<string>('get', 'local', 'userInfo');
  // span 태그 생성
  const container = document.querySelectorAll('h2');
  const span = document.createElement('span');
  container[0].append(span);

  // react 렌더링
  ReactDOM.render(
    <Container
      infoData={infoData}
      stateData={stateData.values}
      currentUser={currentUser}
    />,
    span
  );
}
