'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/List';
import './popup.css'


const data = () => {
  const req = new XMLHttpRequest();
  req.open(
    "GET",
    "https://stash.wemakeprice.com/rest/api/1.0/projects/WONDER/repos/prerender/pull-requests",
    // "https://stash.wemakeprice.com/rest/api/1.0/projects/WONDER/repos/prerender/pull-requests?state=MERGED",
    true);
  req.onload = function() {
  if (this.status >= 200 && this.status < 400) {
      getData(this.response);
    } else {
      console.log(this.response)
    }};
  req.send(null);
}

data();

function getData(res) {
  const data = JSON.parse(res);
  console.log({ data });

  ReactDOM.render(<List props={data} />, document.getElementById('list'));
}
