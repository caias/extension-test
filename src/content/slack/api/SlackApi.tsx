/**
 * Slack 메시지 템플릿
 *
 * @author 이강원 (caias)
 * @since 2019.11.11
 * @since 2019.11.21 - 코드 리펙토링
 */

import URLS from 'util/URLS';
import APIS from 'util/APIS';
import { ISlackInfo, EStatus, ESlackToken } from '../interface/SlackInterface';
import getRepository from 'util/getRepository';
import { AxiosLoader } from 'util/AxiosLoader';

// 1. 테스트할 목적이라면 true설정
// 2. payload 안에 채널에 자신의 bitbucket 아이디 입력
const isTest = false;

const slackAPI = {

  // slack 멘션을 위한 slack id 매칭
  getSlackName: (bitbucketId: string): string => {
    return ESlackToken[bitbucketId];
  },

  // bitbucket id를 slack token값으로 변환한다.
  convertName: (members: string[]): string => {
    let tokenList = '';

    members.forEach((member) => {
      const user = slackAPI.getSlackName(member);
      if (user) tokenList += `<@${user}> `;
    });
    return tokenList;
  },

  // 메시지를 보낼 채널은 구한다.
  getChannel: (stashState: ISlackInfo): string => {
    const { author, toRefId, state } = stashState;
    const channel = toRefId === 'release/release' ? 'release' : toRefId;

    switch (state) {
      case EStatus.approve:
      case EStatus.unapprove:
        return `@${author}`;
      case EStatus.remind:
        return `team-attention`;
      default:
        return `pull-request-${channel}`;
    }
  },
 // 리뷰어들의 아이디값만 추출
  getReviewers: (reviewers) => {
    return reviewers.map(reviewer => {
      return reviewer.user.name;
    });
  },
  // 메시지 템플릿
  sendSlackMessage: (stashState: ISlackInfo): void => {
    const {
      organizer,
      toRefId,
      id,
      title,
      description,
      reviewers,
      reminders,
      state
    } = stashState;

    // repository
    const repository = getRepository();
    const color = state === EStatus.decline || state === EStatus.unapprove ? 'danger' : 'good';
    const currentUrl = `${URLS.STASH.PrList}/${repository}pull-requests/${id}`;
    const payload = {
      text: '`PR ' + state + ' (#' + id + ')` : ' + title,
      username: organizer,
      channel: isTest ? '@juu0124' : slackAPI.getChannel(stashState),
      attachments: [
        {
          // fallback: `${organizer} PR 요청`,
          // pretext: '테스트  테스트  테스트  테스트  테스트  테스트  테스트  테스트  테스트  테스트  ',
          color,
          fields: [
            {
              title: '주최자',
              value: organizer,
              short: true
            },
            {
              title: '대상 브랜치',
              value: toRefId,
              short: true
            },
            {
              title: '상세내용',
              value: description,
              short: false
            }
          ],
          actions: [
            {
              type: 'button',
              text: 'Overview',
              url: `${currentUrl}/overview`
            },
            {
              type: 'button',
              text: 'Diff',
              url: `${currentUrl}/diff`
            },
            {
              type: 'button',
              text: 'Commits',
              url: `${currentUrl}/commits`
            }
          ]
        }
      ]
    };

    // opened, reopened , remind인 경우
    if (state.includes(EStatus.open) || state === EStatus.remind) {
      const poeple = state === EStatus.remind ? reminders : slackAPI.getReviewers(reviewers);
      const slackIds = slackAPI.convertName(poeple);
      const reviewrs = {
        title: '리뷰어',
        value: slackIds,
        short: false
      };
      payload.attachments[0].fields.push(reviewrs);
    }
    // console.log(payload);
    AxiosLoader(APIS.SLACK.WebHook, {data: JSON.stringify(payload), method: 'post'});
  }
};

export default slackAPI;
