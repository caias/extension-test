/**
 * NODE_ENV에 따른 mode (development | production) 분기
 */
'use strict';

const mode = process.env.NODE_ENV;

module.exports = require(`./config/${mode}.js`);