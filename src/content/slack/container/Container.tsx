/**
 * 컨테이너 컴포넌트
 * @author 이강원 (caias)
 * @since 2019.11.21
 * @since 2019.11.26 - Slack 버튼 추가
 */
import React, { useState, useEffect, useMemo } from 'react';
import slackAPI from '../api/SlackApi';
import SlackButton from '../components/SlackButton';
import APIS from 'util/APIS';
import getRepository from 'util/getRepository';
import { AxiosLoader } from 'util/AxiosLoader';
import {
  IProps,
  IButtonInfo,
  IReminder,
  IAuthor,
  EStatus,
  ISlackInfo,
  IResponse
} from '../interface/SlackInterface';

// Pull Request 페이지의 static 버튼모음
const approveButton: HTMLButtonElement = document.querySelector('.aui-button.approve');
const mergeButton: HTMLButtonElement = document.querySelector('.aui-button.merge-button');
const moreMenuButton: HTMLButtonElement = document.querySelector('.pull-request-more-trigger');

// 버튼에 노출될 데이터 세팅
function handleData(data: IProps): IButtonInfo {
  const {
    infoData: {
      author: {
        user: { name, displayName }
      },
      toRef: { displayId },
      state
    },
    stateData,
    currentUser
  } = data;

  // PR 생성자와 현재 로그인한 유저가 다른 경우
  if (currentUser.name !== name) {
    const index = stateData.findIndex(
      value => value.user.name === currentUser.name
    );

    if (index > -1) {
      // 가장 최근의 값에 따라서 상태여부
      const action = stateData[index].action;
      return { displayName, action };
    }
  }

  // PR생성자와 현재 로그인한 유저가 같은 경우 or PR생성자와 로그인안 유저가 다르면서 활동이 없는 경우 (display 여부로 노출여부 판단)
  const action = stateData[0]?.action === EStatus.rescope ? EStatus.update : state;
  return {
    targetChannel: displayId,
    action,
    display: currentUser.name !== name
  };
}

// 해당 Pull Request의 현재 상태값 체크
function getAction(): string {
  const isPressed = JSON.parse(approveButton.getAttribute('aria-pressed').toLowerCase());
  const action = isPressed ? EStatus.unapprove : EStatus.approve;

  return action;
}

// unapproved한 사용자 추출
function getUnApproved(reviewers: IAuthor[]): string[] {
  return reviewers.reduce((acc, cur) => {
    cur.status === EStatus.unapprove && acc.push(cur.user.name);
    return acc;
  }, []);
}

// 재촉하기 눌렀을 때 api 재호출
async function getRequest(requestId: number): Promise<IAuthor[]> {
  // requestID에 대한 정보 API (유저 및 리뷰어 정보)
  const infoURL = `${APIS.STASH.Request}/${getRepository()}pull-requests/${requestId}`;
  const response = await AxiosLoader<IResponse>(infoURL);
  return response.reviewers;
}

// 컨테이너 컴포넌트
const Container = (props: IProps): JSX.Element => {
  const {
    infoData: {
      author: {
        user: { name, displayName }
      },
      toRef: { displayId },
      id,
      title,
      description,
      reviewers,
      state
    },
    currentUser
  } = props;

  // 버튼 라벨 값
  const [label, setLabel] = useState('');
  // 현재 stash 상태값(OPEN,APPROVED,UNAPPROVED,REOPEN,DECLINE)
  const [status, setStatus] = useState('');
  // 버튼 비노출
  const [disabled, setDisabled] = useState(false);
  // DM 및 재촉하기 버튼 누른 후 disable된 후에 다른 상태값 변경시 버튼 초기화를 위한 Flag
  const [reset, setReset] = useState(true);

  // componentDidMount 시점
  useEffect((): void => {
    // 외부 이벤트 바인딩
    connetDocumentEvent();
    // 버튼 정보
    const buttonInfo = handleData(props);
    // 버튼 label 생성
    createButtonLabel(buttonInfo);

    // reopen 버튼 바인딩 (init시점 status = decline)
    state === EStatus.decline && reopenEvent();
  }, []);

  useMemo((): void => {
    // status가 decline상태로 바뀌었을 때 다시열기 버튼 바인딩
    if (status === EStatus.decline) {
      // stash에서 동적으로 생성되는 이벤트 바인딩으로 인한 setTimeout
      setTimeout(() => {
        reopenEvent();
      }, 100);
    }
  }, [status]);

  /**
   * 외부 이벤트 (stash 페이지)
   * pull request page안에 버튼 변화가 CSR로 이루어져 동적으로 생성 될때마다 이벤트 바인딩
   */
  function connetDocumentEvent(): void {
    // approve / unapprove 버튼 눌렀을때
    approveButton?.addEventListener('click', () => {
      const action = getAction();
      createButtonLabel({ displayName, action });
    });

    // merged 버튼 눌렀을 때
    mergeButton?.addEventListener('click', function () {
      const buttonInfo = {
        targetChannel: displayId,
        action: EStatus.merge
      };
      createButtonLabel(buttonInfo);
    });

    // ... 버튼(more 버튼) 눌렀을 때
    moreMenuButton?.addEventListener('click', function () {
      const declineButton: HTMLButtonElement = document.querySelector('[data-action="decline"]');
      // 팝업에 거절 버튼 눌렀을 때
      declineButton?.addEventListener('click', function () {
        setTimeout(() => {
          /**
           * 동적으로 생성되는 다이얼로그에 이벤트 바인딩 하기위한 setTimeout
           */
          const declineConfirmButton = document.querySelectorAll('.confirm-button')[1];
          declineConfirmButton?.addEventListener('click', function () {
            const buttonInfo = {
              targetChannel: displayId,
              action: EStatus.decline
            };
            createButtonLabel(buttonInfo);
          });
        }, 1000);
      });
    });
  }

  // PR거절 후 다시열기 버튼 눌렀을때
  function reopenEvent(): void {
    const reopenButton: HTMLButtonElement = document.querySelector('.reopen-button');

    reopenButton.addEventListener('click', function () {
      const buttonInfo = {
        targetChannel: displayId,
        action: EStatus.reopen
      };
      createButtonLabel(buttonInfo);
      setTimeout(() => {
        connetDocumentEvent();
      }, 1000);
    });
  }

  // 버튼 라벨 생성
  function createButtonLabel(buttonInfo: IButtonInfo): void {
    const { targetChannel, displayName, action, display = false } = buttonInfo;
    const label = targetChannel ? `${targetChannel} 채널로 ${action} 메세지 보내기` : `${displayName} 님에게 ${action} DM 보내기`;

    setReset(currentReset => !currentReset);
    setLabel(label);
    setDisabled(display);
    setStatus(action);
  }

  // 슬랙 api에 보낼 정보 세팅
  function setSlackInfo(remindValue?: IReminder): ISlackInfo {
    return {
      organizer: currentUser.displayName,
      toRefId: displayId,
      author: name,
      id,
      title,
      description,
      reviewers,
      reminders: remindValue?.reminders,
      state: remindValue?.type || status
    };
  }

  // 채널 or 개인 버튼 클릭 시
  async function handleClick(): Promise<void> {
    const stashData = setSlackInfo();
    slackAPI.sendSlackMessage(stashData);
  }

  // 재촉하기 버튼 눌렀을 때
  async function handleRemind(): Promise<void> {
    // PR 새로 조회
    const updateReviewers = await getRequest(id);
    // 미승인한 유저정보
    const unApprovedUsers = getUnApproved(updateReviewers);
    const remindValue = {type: EStatus.remind, reminders: unApprovedUsers};
    // 슬랙 정보 세팅
    const stashData = setSlackInfo(remindValue);
     // slack hook API 호출
     slackAPI.sendSlackMessage(stashData);
  }

  // 로그인한 유저와 PR생성자 일치여부 체크 (재촉하기 버튼 노출 유무)
  const correspondUser = currentUser.name === name;

  return (
    <span>
      {!disabled && <SlackButton
        className='aui-button'
        buttonType='primary'
        label={label}
        style={{ marginLeft: '10px' }}
        onClick={handleClick}
        reset={reset}
      />}
      {correspondUser &&
        (
          <SlackButton
            buttonType='danger'
            className='aui-button'
            label={'재촉하기'}
            onClick={handleRemind}
            reset={reset}
          />
        )
      }
    </span>
  );
};
export default Container;
