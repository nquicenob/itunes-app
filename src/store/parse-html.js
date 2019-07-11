const regex1 = /<meta\s*.*\s*.*\s*name="web-experience-app\/config\/environment\s*.*\s*.*\s*\/>/i;
const regex2 = /\scontent="\s*(?<info>%7B.*%7D)\s*"/i;

export default function parseHTML(doc) {
  const arrResult = doc.match(regex1);
  if (arrResult === null) {
    throw new Error('The text does not exists');
  }
  const firstResult = doc.match(regex1)[0];
  const result = firstResult.match(regex2).groups;
  return JSON.parse(unescape(result.info));
}
