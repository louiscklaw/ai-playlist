function getAddedLink(in_string) {
  const temp = in_string
    .split('\n')
    .filter(m => m != '')
    .filter(s => s.search(/(into|added)/g) > -1)
    .map(m => m.replace(/\((into|added)\) /g, '').trim());

  return temp;
}

module.exports = { getAddedLink };
