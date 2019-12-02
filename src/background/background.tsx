/**
 * background script
 *
 * @author 이강원 (caias), 이주영(juu0124)
 * @since 2019.11.05
 */

import APIS from 'util/APIS';
import { AxiosLoader } from 'util/AxiosLoader';
import { storage } from 'util/Storage';
import { IResponseUser, IResponseMembers, IStorage, IUser } from 'background/interface';

// Deploy 관련 승인 멤버
const deployMembers = [
  { name: '', displayName: '' },
  { name: '', displayName: '' }
];

// stash 로그인한 유저 정보 및 프론트엔드 멤버 정보
function initData() {
    Promise.all([
      AxiosLoader<IResponseUser>(APIS.Group.User),
      AxiosLoader<IResponseMembers>(APIS.Group.Members)
    ])
      .then((allData: [IResponseUser, IResponseMembers]): void => {
        const [userData, memberData] = allData;

        // 로그인한 유저정보
        const userInfo = { name: userData.name, displayName: userData.fullName };
        // 유저정보 스토리지 저장
        storage<IStorage<IUser>>('set', 'local', { userInfo });

        // 프론트엔드개발팀 멤버 정보
        const frontMembers = memberData.results.map(member => {
          return { name: member.username, displayName: member.displayName };
        });
        const memberInfo = frontMembers.concat(deployMembers);
        // 프론트엔드 멤버정보 스토리지 저장
        storage<IStorage<IUser[]>>('set', 'local', { memberInfo });
      })
      .catch(err => console.log(err));
}

initData();
