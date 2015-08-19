Template.eachProp.helpers({
  keys: function () {
    var key, res, value;
    res = [];
    for (key in this) {
      value = this[key];
      res.push({
        key: key,
        value: value
      });
    }
    return res;
  }
});
