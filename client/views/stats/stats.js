Template.stats.rendered = function () {

};

Template.stats.helpers({
	docStats: function () {
		categories = Categories.find().fetch();
		var arrayLength = categories.length;
		var str = '<table class="table table-striped">';
		for (var i = 0; i < arrayLength; i++) {
				docCountInThisCategory = Docs.find({categoryId : categories[i]._id }).count();
		    str = str.concat('<tr><td>'+categories[i].name+'</td><td>' + docCountInThisCategory + '</td></tr>');
		}
		str.concat('</table>');
		return new Spacebars.SafeString(str);
	},
	duplicateValuesThatShouldBeUnique: function () {
		return Categories.find();
	},
	SearchQueries: function () {
		return SearchQueries.find(
			{},
			{
				sort: { searchDate: -1 },
				limit : 500
			}
		).fetch();
	},
	queriesStats: function () {
		// searchDate
		var str = '';
		var beginningOfPeriod = moment().startOf('week');

		//console.log(beginningOfPeriod.format("DD.MM.YYYY"))
		beginningOfPeriod=new Date(beginningOfPeriod.year(),beginningOfPeriod.month(),beginningOfPeriod.date());
		searchQueriesCount =  SearchQueries.find({"searchDate" : { $gte : beginningOfPeriod }}).count();

		str = str.concat("<p>" + TAPi18n.__("Number of search since the beginning of the week") + " : "+searchQueriesCount + "</p>")

		var beginningOfPeriod = moment().startOf('month');
		beginningOfPeriod=new Date(beginningOfPeriod.year(),beginningOfPeriod.month(),beginningOfPeriod.date());
		searchQueriesCount =  SearchQueries.find({"searchDate" : { $gte : beginningOfPeriod }}).count();

		str = str.concat("<p>" + TAPi18n.__("Number of search since the beginning of the month") + " : "+searchQueriesCount + "</p>")

		var beginningOfPeriod = moment().startOf('week');

		beginningOfPeriod=new Date(beginningOfPeriod.year(),beginningOfPeriod.month(),beginningOfPeriod.date());
		searchQueriesCount =  SearchQueries.find({
			$and :[
				{
					"searchDate" : { $gte : beginningOfPeriod }
				},
				{
					"numberOfSearchResults" :  0
				}
				]
			}).count();

		str = str.concat("<p>" + TAPi18n.__("Number of search since the beginning of the week returning 0 result") + " : "+searchQueriesCount + "</p>");

		var beginningOfPeriod = moment().startOf('month');
		beginningOfPeriod=new Date(beginningOfPeriod.year(),beginningOfPeriod.month(),beginningOfPeriod.date());
		searchQueriesCount =  SearchQueries.find({
			$and :[
				{
					"searchDate" : { $gte : beginningOfPeriod }
				},
				{
					"numberOfSearchResults" :  0
				}
				]
			}).count();

		str = str.concat("<p>" + TAPi18n.__("Number of search since the beginning of the month returning 0 result") + " : "+searchQueriesCount + "</p>");


		return new Spacebars.SafeString(str);
		//return SearchQueries.find().fetch();
	},
	memberUsername: function (){
		return Members.collection.findOne({accountId:this.who}).username;
	},
	settingsSearchQueries: function () {
        return {
					rowsPerPage: 25,
          showFilter: true,
          class: 'table table-condensed col-sm-12',
					rowClass: function (item) {
					  switch (item.numberOfSearchResults) {
					    case 0:
					      return 'danger';
					    default:
					      return ''
					  }
					},
					fields: [
					    {
					        key: 'searchDate',
					        label: 'Search Date',
									sort: 'descending',
									sortByValue : true,
									fn: function (value, object) {
											return moment(value).format('DD.MM.YY HH:mm');
									}
					    },
					    {
					        key: 'who',
					        label: 'Username',
									fn: function (value, object) {
											return Members.collection.findOne({accountId:object.who}).profile.nickname;
						      }
					    },
					    {key: 'searchQuery',label: 'Query'},
							{key: 'searchType',label: 'Type'},
							{key: 'includeSynonymsInResults',label: 'Synonyms included ?'},
					    {key: 'numberOfSearchResults',label: 'Number Of results'}
					]
		}
    }
});


Template.stats.helpers({
	tags: function () {
    return Tags.find({},{sort: { count: -1}}).fetch();
	},
	settingsTags: function () {
    return {
        rowsPerPage: 100,
        showFilter: true,
        class: 'table table-condensed col-sm-12',
				showNavigation: 'auto',
				fields: [
          {
            key: 'value',
            label: TAPi18n.__("Tag"),
            sortByValue : true,
            fn: function (value){
              return value.toLowerCase();
            }
          },
          {
            key: 'count',
            label: TAPi18n.__("Count"),
            sort: 'descending'
          },
          {
            key: 'actions',
            label: TAPi18n.__("Actions"),
            fn: function (value, object) {
              //console.log(object.value);
              return new Spacebars.SafeString("<a href='#' class='searchThisTag' title='"+TAPi18n.__("Search this tag")+"'><span class='glyphicon glyphicon-search' aria-hidden='true' data-tag='"+object.value+"'></span></a>");
            }

          },
				]
    }
  },
	categorydistributionChart: function (){
		var topCategories = Categories.find();
		var mydata=[];
		topCategories.forEach(function (cat) {
			//console.log("Title of Categories : " + cat.name +" id : "+cat._id);
			var currentData=[];
			currentData=[cat.name,Docs.find({categoryId:cat._id}).count()]
			mydata.push(currentData)
	  	});
		//console.log(mydata);


	    return {
	        chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false
	        },
	        title: {
	            //text: this.username + "'s top genres"
	            text: "Category distribution"
	        },
	        tooltip: {
	            pointFormat: '<b>{point.percentage:.1f}%</b>'
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	                    style: {
	                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                    },
	                    connectorColor: 'silver'
	                }
	            }
	        },
	        series: [{
	            type: 'pie',
	            name: 'genre',
	            data: mydata
	        }]
	    };
    },
    logsChart: function (){
		var myYdata=[]; // should be number of docs inserted
		var myYdata_DocUpdated=[];
		var myXdata=[]; //should be weekst

		if (typeof Session.get("lastndays")!== 'undefined'){
			var lastndays = Session.get("lastndays");
		}else {
			var lastndays = 5;
		}

		for (i = lastndays; i >= 0; i--) {
			var d = new Date();
			//console.log(i);
			var daybefore = d.setDate(d.getDate()-i);
			//Serie 1 :
			var start = new Date(daybefore); //10 is november
			//console.log("Start : " + start.getFullYear()+"-"+start.getMonth()+"-"+start.getDate());
			start0=new Date(start.getFullYear(),start.getMonth(),start.getDate());

			var dayafter = start.setDate(start.getDate()+1);
			var end = new Date(dayafter); //le lendemain
			//console.log("End : " + end.getFullYear()+"-"+end.getMonth()+"-"+end.getDate());
			end0=new Date(end.getFullYear(),end.getMonth(),end.getDate());

			myXdata.push("- " + i + "day(s)");
			myYdata.push(Docs.find({createdAt: {$gte: start0, $lt: end0}}).count());
			myYdata_DocUpdated.push(Revisions.find({when: {$gte: start0, $lt: end0}}).count());

			//console.log('-----');
		}

		//Remove last 2 valueq and replace by the text : yesterday and today. It looks better
		myXdata.pop();
		myXdata.pop();
		myXdata.push("Yesterday");
		myXdata.push("Today");


	    return {
	        chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false
	        },
	        title: {
			    text: 'Doc added/updated per period',
			    x: -20 //center
		    },
		    xAxis: {        categories: myXdata    },
		    yAxis: {
		        title: {
		            text: '# of doc created or updated'
		        },
		        plotLines: [{
		            value: 0,
		            width: 1,
		            color: '#808080'
		        }]
		    },
		    tooltip: {        valueSuffix: ''     },
		    legend: {
		        layout: 'vertical',
		        align: 'center',
		        verticalAlign: 'middle',
		        borderWidth: 0
		    },
		    series: [{
		        name: 'All Categories - Docs Created',
		        data: myYdata
		    }, {
		        name: 'All Categories - Docs Updated',
		        data: myYdata_DocUpdated
		    }]
	    };
    }
});


Template.stats.events({
	"keyup input.lastndays": function (event, template) {
    	Session.set("lastndays",event.target.value);
  },
	"click a.analyseTags": function (e) {
		e.preventDefault();
		Meteor.call('analyseTags',function (error, result) {
      if (Meteor.settings.public.debug){
			     if (error){console.log(error);}
			     if (result){console.log(result);}
      }
		});
		return false;
	},
  "click a.searchThisTag": function (e, t) {
			e.preventDefault();
      if (Meteor.settings.public.debug){console.log(e.target.dataset.tag)}
			Session.set("searchQuery",e.target.dataset.tag);
			Session.set("searchType","regexpSearch");
      return Router.go("searchTpl");
  }
});

/*
 * Call the function to built the ch		//var myDocs = col.find({createdAt: {$gte: start, $lt: end}}); //#todo History instead of doc because I don't have createdAt for docs... alex ?

art when the template is rendered
 */
Template.stats.rendered = function () {
    this.autorun(function (c) {
        builtchart2Reactive();
    });
}


function builtchart2Reactive() {
	//#todo : make it dynamic...
	var myYdata=[]; // should be number of docs inserted
	var myYdata_DocUpdated=[];
	var myXdata=[]; //should be weekst

	if (typeof Session.get("lastndays")!== 'undefined'){
		var lastndays = Session.get("lastndays");
	}else {
		var lastndays = 5;
	}

	for (i = lastndays; i >= 0; i--) {
		var d = new Date();
		//console.log(i);
		var daybefore = d.setDate(d.getDate()-i);
		//Serie 1 :
		var start = new Date(daybefore); //10 is november
		//console.log("Start : " + start.getFullYear()+"-"+start.getMonth()+"-"+start.getDate());
		start0=new Date(start.getFullYear(),start.getMonth(),start.getDate());

		var dayafter = start.setDate(start.getDate()+1);
		var end = new Date(dayafter); //le lendemain
		//console.log("End : " + end.getFullYear()+"-"+end.getMonth()+"-"+end.getDate());
		end0=new Date(end.getFullYear(),end.getMonth(),end.getDate());

		myXdata.push("- " + i + "day(s)");
		myYdata.push(Docs.find({createdAt: {$gte: start0, $lt: end0}}).count());
		myYdata_DocUpdated.push(Revisions.find({when: {$gte: start0, $lt: end0}}).count());

		//console.log('-----');
	}

	//Remove last 2 valueq and replace by the text : yesterday and today. It looks better
	myXdata.pop();
	myXdata.pop();
	myXdata.push("Yesterday");
	myXdata.push("Today");


	$('#container-chart2-reactive').highcharts({
	    title: {
	    text: 'Doc added/updated per period',
	    x: -20 //center
	    },
	    subtitle: {        text: 'adjust the timescale above',        x: -20    },
	    xAxis: {        categories: myXdata    },
	    yAxis: {
	        title: {
	            text: '# of doc created or updated'
	        },
	        plotLines: [{
	            value: 0,
	            width: 1,
	            color: '#808080'
	        }]
	    },
	    tooltip: {        valueSuffix: ''     },
	    legend: {
	        layout: 'vertical',
	        align: 'right',
	        verticalAlign: 'middle',
	        borderWidth: 0
	    },
	    series: [{
	        name: 'All Categories - Docs Created',
	        data: myYdata
	    }, {
	        name: 'All Categories - Docs Updated',
	        data: myYdata_DocUpdated
	    }]
	});
} //end of function
