export default function getRepository(): string {
  const splitUrl =  window.location.href.split('/projects/');
  return splitUrl[1].split('pull-requests/')[0];
}