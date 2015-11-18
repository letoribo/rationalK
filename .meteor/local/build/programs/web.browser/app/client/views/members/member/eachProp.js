(function(){Template.eachProp.helpers({
  keys: function () {
    var key;
    var res;
    var value;
    res = [];
    for (key in this) {
      value = this[key];
      res.push({
        key: key,
        value: value,
      });
    }
    return res;
  },
});

})();
