Template.logs.helpers({
	logs: function () {
		return History.find();
	},
	truncatedWhat: function () {
    var nWords = 15;
    var truncatedWhat = this.what;
    if (truncatedWhat.length > nWords) {
  		truncatedWhat = truncatedWhat.split(" ").splice(0, nWords).join(" ") + " [...]";
	  }
    return truncatedWhat;
	},
	prettyDate: function () {
		var prettyDate = new Date(this.createdAt);
		var dd = prettyDate.getDate();
		var mm = prettyDate.getMonth() + 1; //January is 0!
		var yyyy = prettyDate.getFullYear();
		var Hours;
		var Minutes;
		if (dd < 10) {
			dd = '0' + dd;
		}
		if (mm < 10) {
			mm = '0' + mm;
		}
		Hours = prettyDate.getHours();
		if ( Hours < 10 ) {
			Hours = '0' + Hours;
		}
		Minutes = prettyDate.getMinutes();
		if (Minutes < 10) {
			Minutes = '0' + Minutes;
		}
		prettyDate = dd + '.' + mm + '.' + yyyy + ' ' + Hours + ':' + Minutes;
		return prettyDate;
	},
});
