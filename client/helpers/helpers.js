UI.registerHelper('formatTime', function (context, options) {
  if(context){
    return moment(context).format('MM/DD/YYYY, hh:mm');
  }
});



// see : https://www.discovermeteor.com/blog/spacebars-secrets-exploring-meteor-new-templating-engine/
