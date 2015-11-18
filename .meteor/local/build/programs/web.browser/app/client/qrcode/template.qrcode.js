(function(){
Template.__checkName("qrcode");
Template["qrcode"] = new Template("Template.qrcode", (function() {
  var view = this;
  return HTML.Raw('<div class="panel panel-default">\n      <div class="panel-heading" style="position:relative">\n          <h3 class="panel-title">Qrcode</h3>\n      </div>\n      <div class="panel-body">\n        <div class="row">\n          <div class="col-md-6">\n            <div id="qrcode"></div>\n          </div>\n          <div class="col-md-6">\n            <p>You can copy paste it on your printed document. This will give you direct access to the doc edit page.</p>\n          </div>\n        </div>\n      </div>\n  </div>');
}));

})();
