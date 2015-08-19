// Help
// Define in settings.json :
/*
"external":{
  "22IN06" :
  {
    "sourceFile" : "/Users/thomasdokithonon/rationalK/private/22IN06.xlsx",
    "sheet_name" : "Liste_graisses",
    "table_begin_address_row" : "3",
    "table_end_address_row" : "431",
    "filter_col" : "AZ",
    "filter_on" : "Yes",
    "cols_to_display" : ["AU","AV","AW","AX","AY"]
  }
}

or if you want to display all lines:

"external":{
  "22IN06" :
  {
    "sourceFile" : "/Users/thomasdokithonon/rationalK/private/22IN06.xlsx",
    "sheet_name" : "Liste_graisses",
    "table_begin_address_row" : "3",
    "table_end_address_row" : "431",
    "cols_to_display" : ["AU","AV","AW","AX","AY"]
  }
}

"external":{
  "22IN06" :
  {
    "sourceFile" : "/Users/thomasdokithonon/rationalK/private/22IN06.xlsx",
    "sheet_name" : "Liste_graisses",
    "table_begin_address_row" : "3",
    "table_end_address_row" : "431",
    "cols_to_display" : ["AU-AW","AX","AY"]
  }
}

*/


Meteor.methods({
  updateExcel : function (externalDocId) {
    check(externalDocId,String)
    External.remove({externalDocId:externalDocId});


    if (Meteor.settings.external[externalDocId]){

      //console.log(Meteor.settings.external[externalDocId])
      var fs = Npm.require('fs');
      var path = Npm.require('path');
      var basepath = path.resolve('.').split('.meteor')[0];
      var excel = new Excel('xlsx');

      // Do some conversion :
      function unfix_col(cstr) { return cstr.replace(/^\$([A-Z])/,"$1"); }
      function decode_col(colstr) { var c = unfix_col(colstr), d = 0, i = 0; for(; i !== c.length; ++i) d = 26*d + c.charCodeAt(i) - 64; return d - 1; }

      var sourceFileSettings = Meteor.settings.external[externalDocId];
      //sourceFileSettings = JSON.parse(Assets.getText(externalDocId+".json"));
      if (Meteor.settings.public.debug){
        console.log(sourceFileSettings);
      }

      var sourceFile = sourceFileSettings.sourceFile;
      //var sourceFile = basepath + '/private/'+externalDocId+'.xlsx';
      if (Meteor.settings.public.debug){
        console.log("Source Excel file : " + sourceFile);
      }
      workbook = excel.readFile(sourceFile);
      var sheet_name=sourceFileSettings.sheet_name;
      var table_begin_address_row=sourceFileSettings.table_begin_address_row;
      var table_end_address_row=sourceFileSettings.table_end_address_row;
      if (Meteor.settings.public.debug){
        console.log("sourceFileSettings.filter_on :");
        console.log(sourceFileSettings.filter_on);
      }
      if (typeof(sourceFileSettings.filter_on) !== 'undefined') {
        var filter_on = sourceFileSettings.filter_on;
        var filter_col = sourceFileSettings.filter_col;
        filter_col = decode_col(filter_col);
      }
      else {
        var filter_on ="display"
      }

      var cols_to_display_Letter = sourceFileSettings.cols_to_display;

      ws = workbook.Sheets[sheet_name];


      var cols_to_display = new Array();
      var arrayLength = cols_to_display_Letter.length;
      var l = 0;
      for (var i = 0; i < arrayLength; i++) {
        //exemple si col to display letter is "B-D" -> "B" "C" "D"
        if (cols_to_display_Letter[i].indexOf("-")>=0){
            cols_to_display_Letter_array_splitted = cols_to_display_Letter[i].split("-");
            var cols_to_display_letter_begin = cols_to_display_Letter_array_splitted[0];
            var cols_to_display_letter_end = cols_to_display_Letter_array_splitted[1];
            var cols_to_display_begin = decode_col(cols_to_display_letter_begin);
            var cols_to_display_end = decode_col(cols_to_display_letter_end);
            for (var j = cols_to_display_begin; j <= cols_to_display_end; j++) {
              cols_to_display[l] = j;
              l = l + 1;
            }
        }
        else {
          cols_to_display[l] = decode_col(cols_to_display_Letter[i]);
          l = l + 1;
        }
      }

      if (Meteor.settings.public.debug){
        console.log("cols_to_display : ");
        console.log(cols_to_display);
      }


      var table_begin_address_col = Math.min.apply(Math, cols_to_display);
      var table_end_address_col = Math.max.apply(Math, cols_to_display);

      var range = {s:{c:table_begin_address_col, r:table_begin_address_row-1}, e:{c:table_end_address_col, r:table_end_address_row-1}}
      //console.log("Your table is in the range (in the 0-index format): ")
      //console.log(range);

      var headers=[];

      for(var R = range.s.r+1; R <= range.e.r; ++R) {
        var obj = {};

        filter_cell_address = {c:filter_col, r:R};
        var filter = '';
        if (typeof(ws[excel.utils.encode_cell(filter_cell_address)]) !== 'undefined') {
          filter = ws[excel.utils.encode_cell(filter_cell_address)].v;
          //console.log("The value in the filter column :")
          //console.log(filter)
        }

        if (typeof(sourceFileSettings.filter_on) === 'undefined') {
            //the user has not set any filter
            filter="display";
            //by doing the next if will be always true because "display" do always contains the text "display"
        }


        //console.log(filter)

        if (filter.toString().indexOf(filter_on)>=0){
          //add to db
          //console.log("I will log this line");
          var full = "";
          for(var C = range.s.c; C <= range.e.c; ++C) {
            //console.log("cols_to_display :");
            //console.log(cols_to_display);
            if (cols_to_display.indexOf(C)>=0){
              header_cell_address = {c:C, r:table_begin_address_row-1}; // headers are in the first row of the table 0-index
              var header = new Spacebars.SafeString(ws[excel.utils.encode_cell(header_cell_address)].v.split('.').join(""));

              var cell_address = {c:C, r:R};
              //console.log(excel.utils.encode_cell(cell_address));
              if (typeof(ws[excel.utils.encode_cell(cell_address)]) !== 'undefined') {
                //console.log(ws[excel.utils.encode_cell(cell_address)].v);
                var v = ws[excel.utils.encode_cell(cell_address)].v;
                full = full.concat(v).concat(" ");
              }
              else {
                var v ='';
              }
              obj[header] = v;
            }
          } //end loop over col
          obj["externalDocId"] = externalDocId;
          obj["full"] = full;
          // insert the line
          External.insert(obj);
        }
        else {
          //skip this row
          //console.log('I will skip the row : ' + R + ' because it does not contains :'+filter_on);
        }
      }// end loop over rows
    } //end if settings
    else {
      if (Meteor.settings.public.debug){
        console.log("Please define file settings in settings.json")
      }
    }






}
})
