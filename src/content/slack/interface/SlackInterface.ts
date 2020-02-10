/**
 * Slack 관련 Interface정보
 *
 * @author 이강원 (caias)
 * @since 2019.11.11
 */

import { IUser } from 'background/interface';

// PR을 요청한 유저 정보 및 상태
export interface IAuthor {
  user: {
    name: string;
    displayName: string;
  };
  status: string;
}

// 현재 요청된 PR정보
export interface IResponse {
  author: IAuthor;
  description: string;
  id: number;
  reviewers: IAuthor[];
  state: string;
  toRef: {
    displayId: string;
  };
  title: string;
}

// 요청된 PR 리뷰어 활동 배열
export interface IActivities {
  values: IAction[];
}

// 요청된 PR 리뷰어의 정보 및 활동
export interface IAction {
  action: string;
  user: IUser;
}

// PR관련 모든 정보 및 현재 로그인한 유저 정보
export interface IProps {
  infoData: IResponse;
  stateData: IAction[];
  currentUser: IUser;
}

/**
 * targetChannel: 메시지 보낼 Slack채널
 * displayName: message 보낼 대상의 아이디
 * action: 현재 로그인한 유저의 액션 (approved, unapproved)
 * display: 현재 PR생성자와 로그인 유저의 일치 여부
 * state: PR현재 상태값 (ex. OPEN,DECLINE 등등)
 */
export interface IButtonInfo {
  targetChannel?: string;
  displayName?: string;
  action: string;
  display?: boolean;
  state?: string;
}

// Approve 하지 않은 유저의 정보
export interface IReminder {
  type: string;
  reminders: string[];
}

// Slack에 메시지 보낼 최종 데이터
export interface ISlackInfo {
  organizer: string;
  toRefId: string;
  title: string;
  id: number;
  author: string;
  description: string;
  reviewers: IAuthor[];
  reminders: string[];
  state: string;
}

// PR상태값
export enum EStatus {
  open = 'OPEN',
  reopen = 'REOPEN',
  approve = 'APPROVED',
  unapprove = 'UNAPPROVED',
  merge = 'MERGED',
  decline = 'DECLINED',
  remind = 'REMIND',
  rescope = 'RESCOPED',
  update = 'UPDATED',
}

// Slack id token값
export enum ESlackToken {
  toybs = 'U0LTUQJ23',
  tjddk88 = 'U15GZT44B',
  kern86 = 'U751VAXAP',
  hjsjjang = 'U124BCU3Z',
  markone = 'U0M284YC8',
  hanpilpark = 'U0M27DS7K',
  caias = 'UHGPX4YDS',
  juu0124 = 'UHSE3HTBQ',
  kkwang = 'ULBK9HSH5'
}