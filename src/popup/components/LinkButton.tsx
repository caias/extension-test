/**
 * popup페이지 안에 jenkins 버튼 생성
 *
 * @author 이강원 (caias)
 * @since 2019.11.14
 */

import React from 'react';
import URLS from 'util/URLS';
import { Button, Icon } from 'antd';

interface IUrlLink {
  name: string;
  urlType: string;
}

const defaultProps: IUrlLink = {
  name: '',
  urlType: '',
};

const LinkButton = (props: IUrlLink = defaultProps): JSX.Element => {

  const { name, urlType } = props;

  const openUrl = () => {
    window.open(URLS[urlType][name]);
  };

  return(
    <React.Fragment>
      <Button type='primary' style={{ width: '100%' }} size='small' shape='round' onClick={openUrl}>{name}<Icon type='link' /></Button>
    </React.Fragment>
  );
};

export default LinkButton;