const URLS = {
  STASH: {
    CreatePr: `http://stash.${'inpur-your-domain'}.com/`,
    PrList: `http://stash.${'inpur-your-domain'}.com/projects`,
  },
  CONFLUENCE: {
    DailyReport: `http://confluence.${'inpur-your-domain'}.com/display/ScriptTeam/DR.${new Date().getFullYear()}.${new Date().getMonth() + 1}`,
  },
  DEPLOY: {
    GreenDeploy: `http://green-deploy.${'inpur-your-domain'}.com/`,
  },
  JENKINS_STATIC: {
    DEV: `http://jenkins.dev.${'inpur-your-domain'}.com/`,
    QA: `http://jenkins.qa.${'inpur-your-domain'}.com/`,
    STG: `http://jenkins.stg.${'inpur-your-domain'}.com/`,
    PROD: `http://jenkins.pre-prod.${'inpur-your-domain'}.com/`,
  },
  JENKINS_PRERENDER: {
    DEV: `http://jenkins.dev.${'inpur-your-domain'}.com/`,
    QA: `http://jenkins.qa.${'inpur-your-domain'}.com/`,
    STG: `http://jenkins.stg.${'inpur-your-domain'}.com/`,
    PROD: `http://jenkins.pre-prod.${'inpur-your-domain'}.com/`,
  },
  SWAGGER: {},
};

export default URLS;