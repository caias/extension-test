const URLS = {
  STASH: {
    CreatePr: `http://stash.${'inpur-your-domain'}.com/projects/WONDER/repos/prerender?create`,
    PrList: `http://stash.${'inpur-your-domain'}.com/projects`,
  },
  CONFLUENCE: {
    DailyReport: `http://confluence.${'inpur-your-domain'}.com/display/ScriptTeam/DR.${new Date().getFullYear()}.${new Date().getMonth() + 1}`,
  },
  DEPLOY: {
    GreenDeploy: `http://green-deploy.${'inpur-your-domain'}.com/`,
  },
  JENKINS_STATIC: {
    DEV: `http://jenkins.dev.${'inpur-your-domain'}.com/job/WONDER_STATIC/job/static-front/build`,
    QA: `http://jenkins.qa.${'inpur-your-domain'}.com/job/WONDER/job/STATIC/job/static-front/build`,
    STG: `http://jenkins.stg.${'inpur-your-domain'}.com/job/WONDER/job/STATIC/job/static-front/build`,
    PROD: `http://jenkins.pre-prod.${'inpur-your-domain'}.com/job/Prod)WONDER/job/STATIC/job/static-front/`,
  },
  JENKINS_PRERENDER: {
    DEV: `http://jenkins.dev.${'inpur-your-domain'}.com/job/WONDER_API/job/prerender-api/build`,
    QA: `http://jenkins.qa.${'inpur-your-domain'}.com/job/WONDER/job/API/job/nd-prerender-api/build`,
    STG: `http://jenkins.stg.${'inpur-your-domain'}.com/job/WONDER/job/API/job/nd-prerender-api/build`,
    PROD: `http://jenkins.pre-prod.${'inpur-your-domain'}.com/job/Prod)WONDER/job/API/job/nd-prerender-api/`,
  },
  SWAGGER: {},
};

export default URLS;