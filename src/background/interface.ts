/**
 * background script 에 필요한 Interface 정보
 *
 * @author 이강원(caias)
 * @since 2019.11.06
 */

// 로그인한 유저 정보 response data
export interface IResponseUser {
  name: string;
  fullName: string;
}

// 멤버 정보 response data
interface IResponseMember {
  username: string;
  displayName: string;
}

// 멤버정보 배열 response data
export interface IResponseMembers {
  results: IResponseMember[];
}

// 로그인한 유저 인터페이스
export interface IUser {
  name: string;
  displayName: string;
}

// 스토리지 인터페이스
export interface IStorage<T> {
  [key: string]: T;
}