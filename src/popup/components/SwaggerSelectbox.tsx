/**
 * popup페이지 안에 swagger선택 selectbox 생성
 *
 * @author 이강원 (caias)
 * @since 2019.11.14
 */

import React from 'react';
import URLS from 'util/URLS';

const SwaggerSelectbox = () => {

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = e.target.value;

    window.open(URLS.SWAGGER[value]);
  };

  return (
    <React.Fragment>
      <select value='SELECT' className='swagger-selectbox' onChange={handleChange}>
        <option value='SELECT'>SELECT</option>
        <option value='BOARD'>BOARD</option>
        <option value='EXTSERVICE'>EXTSERVICE</option>
        <option value='FRONT'>FRONT</option>
        <option value='FDEAL'>FDEAL</option>
        <option value='LISTINGSEACH'>LISTINGSEACH</option>
        <option value='LIVEORDERLIST'>LIVEORDERLIST</option>
        <option value='MATERIAL'>MATERIAL</option>
        <option value='ORDERLIST_COMPOSITE'>ORDERLIST_COMPOSITE</option>
        <option value='PROMOTION'>PROMOTION</option>
        <option value='REVIEW'>REVIEW</option>
        <option value='SHIPPING'>SHIPPING</option>
        <option value='TOTALSEACH'>TOTALSEACH</option>
        <option value='USER'>USER</option>
      </select>
    </React.Fragment>
  );
};

export default SwaggerSelectbox;