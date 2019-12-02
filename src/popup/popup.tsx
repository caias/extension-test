/**
 * extension popup temaplte
 *
 * @author 이강원 (caias)
 * @since 2019.11.11
 */

import React from 'react';
import ReactDOM from 'react-dom';
import SwaggerSelectbox from 'popup/SwaggerSelectbox';
import LinkButton from 'popup/LinkButton';
import { Row, Col } from 'antd';
// antd css
import 'antd/dist/antd.css';
import './popup.css';

// 배포 환경
const deployDestination = ['DEV', 'QA', 'STG', 'PROD'];

const Popup = () => {

  return (
    <React.Fragment>
      <h1>Jenkins - static</h1>
      <div className='gutter-example'>
        <Row gutter={16}>
          {deployDestination.map((value) => {
              return <Col className='gutter-row' key={value} span={6}>
                <div className='gutter-box'>
                  <LinkButton name={value} urlType='JENKINS_STATIC' />
                </div>
              </Col>;
          })}
        </Row>
      </div>
      <h1>Jenkins - prerender</h1>
      <div className='gutter-example'>
        <Row gutter={16}>
          {deployDestination.map((value) => {
            return <Col className='gutter-row' key={value} span={6}>
              <div className='gutter-box'>
                <LinkButton name={value} urlType='JENKINS_PRERENDER' />
              </div>
            </Col>;
          })}
        </Row>
      </div>
      <section className='grid'>
        <h1 className='grid-cell'>Swagger List</h1>
        <div className='grid-cell'><SwaggerSelectbox /></div>
      </section>
    </React.Fragment>
  );

};

ReactDOM.render(<Popup />, document.getElementById('list'));
