const APIS = {
  /**
   * your stash Pull Request API url
   */
  STASH: {
    Request: 'http://`${input-your-url}`/rest/api/1.0/projects',
  },
  /**
   * slack incoming webhook url
   */
  SLACK: {
    WebHook: ''
  },
  /**
   * input Your Group API URL
   * User: current Logined User
   * Members: your team Member List
   */
  Group: {
    User: `http://${'input-your-url'}/rest/flowboard/1.0/current-user`,
    Members: `http://${'input-your-url'}/rest/api/group/${'input-your-team-name'}/member`,
  }
};

export default APIS;