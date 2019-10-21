'use strict';

import React, { Component } from 'react';

class ListItem extends Component {
  render() {
    return (
      <li>
        <span>{this.props.id}</span>
        <span>{this.props.title}</span>
        <span>{this.props.author.displayName}</span>
      </li>
    );
  }
}

export default ListItem;