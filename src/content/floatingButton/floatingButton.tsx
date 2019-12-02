/**
 * 플로팅 버튼
 *
 * @todo 일단 기본틀만 잡아놓음. 추후에 어떤식으로 발전시킬지 아이디어 필요
 * @author 이강원 (caias)
 * @since 2019.11.06
 */

import React from 'react';
import ReactDOM from 'react-dom';
import ReactShadowRoot from 'react-shadow-root';
import URLS from 'util/URLS';
// import html2canvas from 'html2canvas';

const style = `
a {
  color: inherit;
  text-decoration: none;
}

.menu-item, .menu-open-button {
  background: rgb(245, 210, 39);
  border-radius: 100%;
  width: 60px;
  height: 60px;
  position: absolute;
  color: #fff;
  text-align: center;
  will-change: transform;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  -webkit-transition: -webkit-transform ease-out 200ms;
  transition: -webkit-transform ease-out 200ms;
  transition: transform ease-out 200ms;
  transition: transform ease-out 200ms, -webkit-transform ease-out 200ms;
}

.menu-open { display: none; }

.lines {
  width: 25px;
  height: 3px;
  background: #fff;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -12.5px;
  -webkit-transition: -webkit-transform 200ms;
  transition: -webkit-transform 200ms;
  transition: transform 200ms;
  transition: transform 200ms, -webkit-transform 200ms;
}

.line-1 {
  -webkit-transform: translate3d(0, -8px, 0);
  transform: translate3d(0, -8px, 0);
}

.line-2 {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.line-3 {
  -webkit-transform: translate3d(0, 8px, 0);
  transform: translate3d(0, 8px, 0);
}

.menu-open:checked + .menu-open-button .line-1 {
  -webkit-transform: translate3d(0, 0, 0) rotate(45deg);
  transform: translate3d(0, 0, 0) rotate(45deg);
}

.menu-open:checked + .menu-open-button .line-2 {
  -webkit-transform: translate3d(0, 0, 0) scale(0.1, 1);
  transform: translate3d(0, 0, 0) scale(0.1, 1);
}

.menu-open:checked + .menu-open-button .line-3 {
  -webkit-transform: translate3d(0, 0, 0) rotate(-45deg);
  transform: translate3d(0, 0, 0) rotate(-45deg);
}

.menu {
  margin: auto;
  position: fixed;
  top: 50%;
  margin-top: -30px;
  right: 45px;
  width: 60px;
  height: 60px;
  text-align: center;
  box-sizing: border-box;
  font-size: 16px;
  line-height: 19px;
  z-index: 9999;
}

.menu-item:hover {
  background: #EEEEEE;
  color: #3290B1;
}

.menu-item{
  -webkit-transition-duration: 180ms;
  transition-duration: 180ms;
  box-sizing: border-box;
  padding-top: 10px;
  font-weight:bold;
}

.menu-open-button {
  z-index: 2;
  -webkit-transition-timing-function: cubic-bezier(.75,-0.5,0,1.75);
  transition-timing-function: cubic-bezier(.75,-0.5,0,1.75);
  -webkit-transition-duration: 400ms;
  transition-duration: 400ms;
  -webkit-transform: scale(1.1, 1.1) translate3d(0, 0, 0);
  transform: scale(1.1, 1.1) translate3d(0, 0, 0);
  cursor: pointer;
  box-shadow: 1.5px 1.5px 0 0 rgba(0, 0, 0, 0.14);
}

.menu-open-button:hover {
  -webkit-transform: scale(1.2, 1.2) translate3d(0, 0, 0);
  transform: scale(1.2, 1.2) translate3d(0, 0, 0);
}

.menu-open:checked + .menu-open-button {
  width: 60px;
  height: 60px;
  -webkit-transition-timing-function: linear;
  transition-timing-function: linear;
  -webkit-transition-duration: 200ms;
  transition-duration: 200ms;
  -webkit-transform: scale(0.8, 0.8) translate3d(0, 0, 0);
  transform: scale(0.8, 0.8) translate3d(0, 0, 0);
}

.menu-open:checked ~ .menu-item {
  -webkit-transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
  transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
  box-shadow: 3px 3px 0 0 rgba(0, 0, 0, 0.14);
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.12);
}

.menu-open:checked ~ .menu-item.item-1 {
  -webkit-transform: translate3d(0.08361px, -104.99997px, 0);
  transform: translate3d(0.08361px, -104.99997px, 0);
}

.menu-open:checked ~ .menu-item.item-2 {
  transition-delay: 80ms;
  -webkit-transition-delay: 80ms;
  -webkit-transform: translate3d(-91.03006px, -52.33095px, 0);
  transform: translate3d(-91.03006px, -52.33095px, 0);
}

.menu-open:checked ~ .menu-item.item-3 {
  transition-delay: 160ms;
  -webkit-transition-delay: 160ms;
  -webkit-transform: translate3d(-90.86291px, 52.62064px, 0);
  transform: translate3d(-90.86291px, 52.62064px, 0);
}

.menu-open:checked ~ .menu-item.item-4 {
  transition-delay: 240ms;
  -webkit-transition-delay: 240ms;
  transition-duration: 280ms;
  -webkit-transition-duration: 280ms;
  -webkit-transform: translate3d(0.08361px, 104.99997px, 0);
  transform: translate3d(0.08361px, 104.99997px, 0);
}

.menu-open:checked ~ .menu-item.item-5 {
  transition-delay: 320ms;
  -webkit-transition-delay: 320ms;
  transition-duration: 380ms;
  -webkit-transition-duration: 380ms;
  -webkit-transform: translate3d(0.08361px, -104.99997px, 0);
  transform: translate3d(0.08361px, -104.99997px, 0);
}

.menu-open:checked ~ .menu-item.item-6 {
  transition-delay: 400ms;
  -webkit-transition-delay: 400ms;
  transition-duration: 480ms;
  -webkit-transition-duration: 480ms;
  -webkit-transform: translate3d(90.9466px, -52.47586px, 0);
  transform: translate3d(90.9466px, -52.47586px, 0);
}

.item-1 {
  background-color: #669AE1;
}

.item-2 {
  background-color: #70CC72;
}

.item-3 {
  background-color: #FE4365;
}

.item-4 {
  background-color: #C49CDE;
}

.item-5 {
  background-color: #FC913A;
}
.item-6 {
  background-color: #62C2E4;
}
`;

const body = document.querySelector('body');
const extensionWrap = document.createElement('div');

extensionWrap.setAttribute('class', 'extension-wrap');
body.appendChild(extensionWrap);

const WheelMenu = () => {
  return (
    <ReactShadowRoot>
      <style>{style}</style>
      <nav className='menu'>
        <input className='menu-open' type='checkbox' name='menuControl' id='menuControl' />
        <label className='menu-open-button' htmlFor='menuControl'>
          <span className='lines line-1'></span>
          <span className='lines line-2'></span>
          <span className='lines line-3'></span>
        </label>
        <a href={URLS.CONFLUENCE.DailyReport} className='menu-item item-1'>Daily<br />Report</a>
        <a href={URLS.DEPLOY.GreenDeploy} target='_blank' className='menu-item item-2'>Green<br />deploy</a>
        <a href={URLS.STASH.PrList + '/WONDER/repos/prerender/pull-requests'} target='_blank' className='menu-item item-3'>PR<br />list</a>
        <a href={URLS.STASH.CreatePr} className='menu-item item-4'>PR<br />create</a>
      </nav>
      <div className='extenstion-crop-dim'></div>
      <div className='screen-shot-focus'></div>
    </ReactShadowRoot>
  );
};

ReactDOM.render(<WheelMenu />, extensionWrap);