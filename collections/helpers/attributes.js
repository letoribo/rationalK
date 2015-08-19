Meteor.checkAttributes = function (attributes, names) {
  var i, len, name, results;
  results = [];
  for (i = 0, len = names.length; i < len; i++) {
    name = names[i];
    if (!attributes[name]) {
      throw new Meteor.Error(422, "Missing " + name);
    } else {
      results.push(void 0);
    }
  }
  return results;
};
