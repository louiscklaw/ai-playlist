function getAddedLink(messages) {
  const temp = messages
    .filter(m => m != '')
    .filter(s => s.search(/(into|added)/g) > -1)
    .map(m => m.replace(/\((into|added)\) /g, ''))
    .map(m => m.split('?')[0].trim());

  return temp;
}

module.exports = { getAddedLink };
