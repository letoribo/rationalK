(function(){var _ = Package.underscore._,
    package_name = "project",
    namespace = "project";

if (package_name != "project") {
    namespace = TAPi18n.packages[package_name].namespace;
}
TAPi18n._enable({"helper_name":"_","supported_languages":null,"i18n_files_route":"/tap-i18n","preloaded_langs":[],"cdn_path":null});
TAPi18n.languages_names["en"] = ["English","English"];
// integrate the fallback language translations 
translations = {};
translations[namespace] = {"helper_email_login":"This is the email on which you receive the invitation. Probably your company email.","helper_password_login":"You define it yourself when you receive the invitation.","invitation_to_join":"you have been invited to join rationalK. Please choose your password.","access_denied":"Sorry but it seems that you don't have access to this page.","open_file":"Open with your standard software","invitation_to_join_info_login":"Your username will be your company email."};
TAPi18n._loadLangFileObject("en", translations);

})();
