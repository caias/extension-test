'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/List';
import './components/popup.css'


const data = () => {
  const req = new XMLHttpRequest();
  req.open(
    "GET",
    "https://stash.wemakeprice.com/rest/api/1.0/projects/WONDER/repos/prerender/pull-requests?state=MERGED",
    true);
  req.setRequestHeader("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
  req.setRequestHeader("Access-Control-Allow-Origin", "*");
  req.onload = function() {
  if (this.status >= 200 && this.status < 400) {
      // Success!
      // var resp = this.response;
      getData(this.response);
      // console.log(resp)
      // const { id, title } = resp.values;
      // const { displayName } = resp.values.author;
      // console.log({ id })
      // console.log({ title })
    } else {
      // We reached our target server, but it returned an error

    }};
  req.send(null);
}

data();

function getData(res) {
  const data = JSON.parse(res);
  console.log({ data });

  ReactDOM.render(<List data={data} />, document.getElementById('list'));
}
