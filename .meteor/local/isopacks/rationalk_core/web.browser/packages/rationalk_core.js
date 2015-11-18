(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:core/lib/methods.js                                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
RKCore = {};                                                                                                           // 1
RKCore.packageMenu = []; // Packages can hook there to add menu entries.                                               // 2
RKCore.packageDashboard = []; // Packages can hook there to add dashboard entries.                                     // 3
RKCore.packageSettings = []; // Packages can hook there to add settings entries.                                       // 4
RKCore.packageBackup = []; // Packages can hook there to add table for backup.                                         // 5
RKCore.searchResultsPackage = [];                                                                                      // 6
RKCore.externalSearchResultsPackage = [];                                                                              // 7
RKCore.customFieldsType = [];                                                                                          // 8
                                                                                                                       // 9
RKCore.log = function (data) {                                                                                         // 10
  if (Meteor.settings.public.debug) {                                                                                  // 11
    console.log(data);                                                                                                 // 12
  }                                                                                                                    // 13
};                                                                                                                     // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:core/lib/routes.js                                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
enforceLogin = function () {                                                                                           // 1
  var routeName = this.url;                                                                                            // 2
  if (routeName.match(/login/)) {                                                                                      // 3
    return;                                                                                                            // 4
  }                                                                                                                    // 5
  if (routeName.match(/invitation/)) {                                                                                 // 6
    this.next();                                                                                                       // 7
    return;                                                                                                            // 8
  }                                                                                                                    // 9
  if (routeName.match(/reset-password/)) {                                                                             // 10
    this.next();                                                                                                       // 11
    return;                                                                                                            // 12
  }                                                                                                                    // 13
  if (routeName.match(/external/)) {                                                                                   // 14
    this.next();                                                                                                       // 15
    return;                                                                                                            // 16
  }                                                                                                                    // 17
  if (routeName.match(/serverToken/)) {                                                                                // 18
    this.next();                                                                                                       // 19
    return;                                                                                                            // 20
  }                                                                                                                    // 21
  if (!Meteor.userId()) {                                                                                              // 22
    this.layout("loginLayout");                                                                                        // 23
    this.render();                                                                                                     // 24
    return;                                                                                                            // 25
  }                                                                                                                    // 26
  this.next();                                                                                                         // 27
};                                                                                                                     // 28
                                                                                                                       // 29
Router.onBeforeAction(function () {                                                                                    // 30
  this.next();                                                                                                         // 31
});                                                                                                                    // 32
                                                                                                                       // 33
Router.onBeforeAction(enforceLogin);                                                                                   // 34
                                                                                                                       // 35
Router.route("/", {                                                                                                    // 36
  name: "dashboard",                                                                                                   // 37
  waitOn: function () {                                                                                                // 38
    return [                                                                                                           // 39
      Meteor.subscribe("views"),                                                                                       // 40
      Meteor.subscribe("docs"),                                                                                        // 41
      Meteor.subscribe("members"), //needed to display the last activity owner                                         // 42
      Meteor.subscribe("history"),                                                                                     // 43
      Meteor.subscribe("revisions"),                                                                                   // 44
      Meteor.subscribe("categories"),                                                                                  // 45
      Meteor.subscribe("mySpace"),                                                                                     // 46
      ];                                                                                                               // 47
  },                                                                                                                   // 48
  progress: {                                                                                                          // 49
    enabled: false,                                                                                                    // 50
  },                                                                                                                   // 51
});                                                                                                                    // 52
                                                                                                                       // 53
Router.configure({                                                                                                     // 54
  layoutTemplate: "layout",                                                                                            // 55
  loadingTemplate: "loading",                                                                                          // 56
  waitOn: function () {                                                                                                // 57
    return [Meteor.subscribe("members")];                                                                              // 58
  },                                                                                                                   // 59
});                                                                                                                    // 60
                                                                                                                       // 61
Router.route("/login", {                                                                                               // 62
  layoutTemplate: 'loginLayout',                                                                                       // 63
  data: function () {                                                                                                  // 64
    templateData = { docs: Docs.find({}) };                                                                            // 65
    return templateData;                                                                                               // 66
  },                                                                                                                   // 67
  waitOn: function () {                                                                                                // 68
    return [                                                                                                           // 69
      Meteor.subscribe("naccounts"),                                                                                   // 70
      Meteor.subscribe("accounts"),                                                                                    // 71
      Meteor.subscribe("members"),                                                                                     // 72
    ];                                                                                                                 // 73
  },                                                                                                                   // 74
});                                                                                                                    // 75
                                                                                                                       // 76
Router.route("/access-denied", {                                                                                       // 77
  layoutTemplate: 'accessDenied',                                                                                      // 78
});                                                                                                                    // 79
                                                                                                                       // 80
                                                                                                                       // 81
Router.route("/reset-password/:token", {                                                                               // 82
  name: "resetPassword",                                                                                               // 83
  waitOn: function () {                                                                                                // 84
    return [                                                                                                           // 85
                                                                                                                       // 86
    ];                                                                                                                 // 87
  },                                                                                                                   // 88
});                                                                                                                    // 89
                                                                                                                       // 90
Router.route("/account/new", {                                                                                         // 91
  name: "accountNew",                                                                                                  // 92
  waitOn: function () {                                                                                                // 93
    return [Meteor.subscribe("accounts")];                                                                             // 94
  },                                                                                                                   // 95
});                                                                                                                    // 96
                                                                                                                       // 97
Router.route("/tags", {                                                                                                // 98
  waitOn: function () {                                                                                                // 99
    return [                                                                                                           // 100
      Meteor.subscribe("docs"),                                                                                        // 101
      Meteor.subscribe("tags"),                                                                                        // 102
    ];                                                                                                                 // 103
  },                                                                                                                   // 104
});                                                                                                                    // 105
                                                                                                                       // 106
Router.route("/account/:_id/edit", {                                                                                   // 107
  name: "accountEdit",                                                                                                 // 108
  data: function () {                                                                                                  // 109
    return Meteor.users.findOne(this.params._id);                                                                      // 110
  },                                                                                                                   // 111
  waitOn: function () {                                                                                                // 112
    return [Meteor.subscribe("accounts")];                                                                             // 113
  },                                                                                                                   // 114
});                                                                                                                    // 115
                                                                                                                       // 116
Router.route("/accounts", {                                                                                            // 117
  name: "accountList",                                                                                                 // 118
  waitOn: function () {                                                                                                // 119
    return [Meteor.subscribe("accounts")];                                                                             // 120
  },                                                                                                                   // 121
});                                                                                                                    // 122
                                                                                                                       // 123
Router.route("/axapta", {                                                                                              // 124
  name: "axapta",                                                                                                      // 125
  waitOn: function () {                                                                                                // 126
    return [                                                                                                           // 127
      Meteor.subscribe("axapta"),                                                                                      // 128
    ];                                                                                                                 // 129
  },                                                                                                                   // 130
});                                                                                                                    // 131
                                                                                                                       // 132
Router.route("/members", {                                                                                             // 133
  name: "members",                                                                                                     // 134
  waitOn: function () {                                                                                                // 135
    return [                                                                                                           // 136
      Meteor.subscribe("members"),                                                                                     // 137
      Meteor.subscribe("invitation"),                                                                                  // 138
    ];                                                                                                                 // 139
  },                                                                                                                   // 140
});                                                                                                                    // 141
                                                                                                                       // 142
                                                                                                                       // 143
                                                                                                                       // 144
Router.route("/member/new", {                                                                                          // 145
  name: "memberNew",                                                                                                   // 146
  waitOn: function () {                                                                                                // 147
    return [                                                                                                           // 148
      Meteor.subscribe("members"),                                                                                     // 149
    ];                                                                                                                 // 150
  },                                                                                                                   // 151
});                                                                                                                    // 152
                                                                                                                       // 153
Router.route("/member/:_id/edit", {                                                                                    // 154
  name: "memberEdit",                                                                                                  // 155
  data: function () {                                                                                                  // 156
    return Members.collection.findOne({                                                                                // 157
      _id: this.params._id,                                                                                            // 158
    });                                                                                                                // 159
  },                                                                                                                   // 160
  waitOn: function () {                                                                                                // 161
    return [                                                                                                           // 162
      Meteor.subscribe("member", this.params._id),                                                                     // 163
      Meteor.subscribe("rkSettings"),                                                                                  // 164
    ];                                                                                                                 // 165
  },                                                                                                                   // 166
});                                                                                                                    // 167
                                                                                                                       // 168
Router.route("/views/add", {                                                                                           // 169
  name: "viewNew",                                                                                                     // 170
  waitOn: function () {                                                                                                // 171
    return [Meteor.subscribe("views")];                                                                                // 172
  },                                                                                                                   // 173
});                                                                                                                    // 174
                                                                                                                       // 175
Router.route("/view/:_id/edit", {                                                                                      // 176
  name: "viewEdit",                                                                                                    // 177
  data: function () {                                                                                                  // 178
    return Views.findOne({}, {                                                                                         // 179
      reactive: true,                                                                                                  // 180
    });                                                                                                                // 181
  },                                                                                                                   // 182
  waitOn: function () {                                                                                                // 183
    var data = {};                                                                                                     // 184
    data.viewId = this.params._id;                                                                                     // 185
    return [Meteor.subscribe("views", data)];                                                                          // 186
  },                                                                                                                   // 187
});                                                                                                                    // 188
                                                                                                                       // 189
Router.route("/views", {                                                                                               // 190
  name: "viewList",                                                                                                    // 191
  waitOn: function () {                                                                                                // 192
    return [                                                                                                           // 193
      Meteor.subscribe("views"),                                                                                       // 194
    ];                                                                                                                 // 195
  },                                                                                                                   // 196
});                                                                                                                    // 197
                                                                                                                       // 198
Router.route("/filelinks", {                                                                                           // 199
  name: "filelinks",                                                                                                   // 200
  waitOn: function () {                                                                                                // 201
    return [Meteor.subscribe("filelinks")];                                                                            // 202
  },                                                                                                                   // 203
});                                                                                                                    // 204
                                                                                                                       // 205
Router.route("/xml", {                                                                                                 // 206
  name: "xml",                                                                                                         // 207
  waitOn: function () {                                                                                                // 208
    return [                                                                                                           // 209
      Meteor.subscribe("XMLFiles"),                                                                                    // 210
    ];                                                                                                                 // 211
  },                                                                                                                   // 212
});                                                                                                                    // 213
                                                                                                                       // 214
                                                                                                                       // 215
if (Meteor.settings.public.show.controlplan) {                                                                         // 216
  Router.route("/controlplan", {                                                                                       // 217
    name: "controlplan",                                                                                               // 218
    waitOn: function () {                                                                                              // 219
      return [Meteor.subscribe("controlplan")];                                                                        // 220
    },                                                                                                                 // 221
  });                                                                                                                  // 222
                                                                                                                       // 223
  Router.route("/controlplan/:_id/decCDMER", {                                                                         // 224
    name: "decCDMER",                                                                                                  // 225
    layoutTemplate: 'printLayout',                                                                                     // 226
    waitOn: function () {                                                                                              // 227
      return [Meteor.subscribe("controlplan")];                                                                        // 228
    },                                                                                                                 // 229
  });                                                                                                                  // 230
                                                                                                                       // 231
  Router.route("/controlplan/:_id/planageCDMER", {                                                                     // 232
    name: "planageCDMER",                                                                                              // 233
    layoutTemplate: 'printLayout',                                                                                     // 234
    waitOn: function () {                                                                                              // 235
      return [Meteor.subscribe("controlplan")];                                                                        // 236
    },                                                                                                                 // 237
  });                                                                                                                  // 238
}                                                                                                                      // 239
                                                                                                                       // 240
Router.route("/processes/:role/listDocs", {                                                                            // 241
  name: "listDocsForRoles",                                                                                            // 242
  waitOn: function () {                                                                                                // 243
    var data = {};                                                                                                     // 244
    data.role = this.params.role;                                                                                      // 245
    return [                                                                                                           // 246
      Meteor.subscribe("docs", data),                                                                                  // 247
      Meteor.subscribe("rkSettings"),                                                                                  // 248
    ];                                                                                                                 // 249
  },                                                                                                                   // 250
});                                                                                                                    // 251
                                                                                                                       // 252
if (Meteor.settings.public.show.processes) {                                                                           // 253
  Router.route("/processes", {                                                                                         // 254
    name: "processes",                                                                                                 // 255
    waitOn: function () {                                                                                              // 256
      return [                                                                                                         // 257
        Meteor.subscribe("processes"),                                                                                 // 258
        Meteor.subscribe("rkSettings"),                                                                                // 259
      ];                                                                                                               // 260
    },                                                                                                                 // 261
  });                                                                                                                  // 262
                                                                                                                       // 263
  Router.route("/processdocuments", {                                                                                  // 264
    name: "processdocuments",                                                                                          // 265
    waitOn: function () {                                                                                              // 266
      return [Meteor.subscribe("processdocuments")];                                                                   // 267
    },                                                                                                                 // 268
  });                                                                                                                  // 269
                                                                                                                       // 270
  Router.route("/process/:_id", {                                                                                      // 271
    name: "process",                                                                                                   // 272
    data: function () {                                                                                                // 273
      return Processes.findOne(this.params._id);                                                                       // 274
    },                                                                                                                 // 275
    waitOn: function () {                                                                                              // 276
      return [Meteor.subscribe("process", this.params._id), Meteor.subscribe("processdocuments")];                     // 277
    },                                                                                                                 // 278
  });                                                                                                                  // 279
                                                                                                                       // 280
  Router.route("/updateprocessdocuments/:processId/:elementId", {                                                      // 281
    name: "updateprocessdocuments",                                                                                    // 282
    data: function () {                                                                                                // 283
      return Processes.findOne(this.params.processId);                                                                 // 284
    },                                                                                                                 // 285
    waitOn: function () {                                                                                              // 286
      return [                                                                                                         // 287
        Meteor.subscribe("process", this.params.processId),                                                            // 288
        Meteor.subscribe("processdocuments"),                                                                          // 289
        Meteor.subscribe("docs"),                                                                                      // 290
        Meteor.subscribe("revisions"),                                                                                 // 291
        Meteor.subscribe("categories"),                                                                                // 292
        Meteor.subscribe("searchqueries"),                                                                             // 293
        Meteor.subscribe("views"),                                                                                     // 294
        Meteor.subscribe("discussions"),                                                                               // 295
        Meteor.subscribe("messages"),                                                                                  // 296
        Meteor.subscribe("members"),                                                                                   // 297
        Meteor.subscribe("walkedfiles"),                                                                               // 298
        Meteor.subscribe("myNotes"),                                                                                   // 299
      ];                                                                                                               // 300
    },                                                                                                                 // 301
  });                                                                                                                  // 302
}                                                                                                                      // 303
                                                                                                                       // 304
if (Meteor.settings.public.show.gantts) {                                                                              // 305
  Router.route("/gantts", {                                                                                            // 306
    name: "gantts",                                                                                                    // 307
    waitOn: function () {                                                                                              // 308
      return [                                                                                                         // 309
        Meteor.subscribe("gantts"),                                                                                    // 310
      ];                                                                                                               // 311
    },                                                                                                                 // 312
  });                                                                                                                  // 313
                                                                                                                       // 314
  Router.route("/gantt/:_id", {                                                                                        // 315
    name: "gantt",                                                                                                     // 316
    data: function () {                                                                                                // 317
      return Gantts.findOne(this.params._id);                                                                          // 318
    },                                                                                                                 // 319
    waitOn: function () {                                                                                              // 320
      return [                                                                                                         // 321
        Meteor.subscribe("gantts", this.params._id),                                                                   // 322
       ];                                                                                                              // 323
    },                                                                                                                 // 324
  });                                                                                                                  // 325
}                                                                                                                      // 326
                                                                                                                       // 327
Router.route("/docs/docImport", {                                                                                      // 328
  name: "docImport",                                                                                                   // 329
  waitOn: function () {                                                                                                // 330
    return [                                                                                                           // 331
      Meteor.subscribe("categories"),                                                                                  // 332
    ];                                                                                                                 // 333
  },                                                                                                                   // 334
});                                                                                                                    // 335
                                                                                                                       // 336
Router.route("/docs/docExport", {                                                                                      // 337
  name: "docExport",                                                                                                   // 338
  waitOn: function () {                                                                                                // 339
    return [                                                                                                           // 340
      Meteor.subscribe("categories"),                                                                                  // 341
      Meteor.subscribe('docs'),                                                                                        // 342
    ];                                                                                                                 // 343
  },                                                                                                                   // 344
});                                                                                                                    // 345
                                                                                                                       // 346
Router.route("/calculation", {                                                                                         // 347
  name: "calculation",                                                                                                 // 348
  waitOn: function () {                                                                                                // 349
    return [                                                                                                           // 350
                                                                                                                       // 351
    ];                                                                                                                 // 352
  },                                                                                                                   // 353
});                                                                                                                    // 354
                                                                                                                       // 355
Router.route("/doc/:_id/edit", {                                                                                       // 356
  name: "docEdit",                                                                                                     // 357
  onBeforeAction: function () {                                                                                        // 358
    if (Roles.userIsInRole(Meteor.user(), ['readonly'])) {                                                             // 359
      // render the accessDenied template but keep the url in the browser the same                                     // 360
      this.render('accessDenied');                                                                                     // 361
    }                                                                                                                  // 362
    else {                                                                                                             // 363
      this.next();                                                                                                     // 364
    }                                                                                                                  // 365
  },                                                                                                                   // 366
  data: function () {                                                                                                  // 367
    return Docs.findOne(this.params._id);                                                                              // 368
  },                                                                                                                   // 369
  waitOn: function () {                                                                                                // 370
    var data = {};                                                                                                     // 371
    data.docId = this.params._id;                                                                                      // 372
    return [                                                                                                           // 373
      Meteor.subscribe("docs", data),                                                                                  // 374
      Meteor.subscribe("views"), //need all                                                                            // 375
      Meteor.subscribe("members"), //need all                                                                          // 376
      Meteor.subscribe("categories"), //need all                                                                       // 377
      Meteor.subscribe("attachments", "doc-" + data.docId),                                                            // 378
      Meteor.subscribe("predefinedtags"),                                                                              // 379
      Meteor.subscribe("rkSettings"),                                                                                  // 380
      Meteor.subscribe("mySpace"),                                                                                     // 381
      Meteor.subscribe("docHistory", data.docId),                                                                      // 382
    ];                                                                                                                 // 383
  },                                                                                                                   // 384
});                                                                                                                    // 385
                                                                                                                       // 386
Router.route("/revision/:_id/view", {                                                                                  // 387
  name: "revisionView",                                                                                                // 388
  data: function () {                                                                                                  // 389
    return Revisions.findOne(this.params._id);                                                                         // 390
  },                                                                                                                   // 391
  waitOn: function () {                                                                                                // 392
    var data = {};                                                                                                     // 393
    data.revisionId = this.params._id;                                                                                 // 394
    return [                                                                                                           // 395
      Meteor.subscribe("docs", data),                                                                                  // 396
      Meteor.subscribe("views", data),                                                                                 // 397
      Meteor.subscribe("members"),                                                                                     // 398
      Meteor.subscribe("categories", data),                                                                            // 399
      Meteor.subscribe("revisions", data),                                                                             // 400
      Meteor.subscribe("predefinedtags"),                                                                              // 401
      Meteor.subscribe("mySpace"),                                                                                     // 402
    ];                                                                                                                 // 403
  },                                                                                                                   // 404
});                                                                                                                    // 405
                                                                                                                       // 406
Router.route("/doc/create", {                                                                                          // 407
  name: "docCreate",                                                                                                   // 408
  template: "docEdit",                                                                                                 // 409
  onBeforeAction: function () {                                                                                        // 410
    if (Roles.userIsInRole(Meteor.user(), ['readonly'])) {                                                             // 411
      // render the accessDenied template but keep the url in the browser the same                                     // 412
      this.render('accessDenied');                                                                                     // 413
    }                                                                                                                  // 414
    else {                                                                                                             // 415
      this.next();                                                                                                     // 416
    }                                                                                                                  // 417
  },                                                                                                                   // 418
  data: function () {                                                                                                  // 419
    return {                                                                                                           // 420
      categoryId: Session.get('selectedCategory'),                                                                     // 421
    };                                                                                                                 // 422
  },                                                                                                                   // 423
  waitOn: function () {                                                                                                // 424
    return [                                                                                                           // 425
      Meteor.subscribe("docs"),                                                                                        // 426
      Meteor.subscribe("views"),                                                                                       // 427
      Meteor.subscribe("members"),                                                                                     // 428
      Meteor.subscribe("categories"),                                                                                  // 429
      Meteor.subscribe("predefinedtags"),                                                                              // 430
      Meteor.subscribe("rkSettings"),                                                                                  // 431
    ];                                                                                                                 // 432
  },                                                                                                                   // 433
});                                                                                                                    // 434
                                                                                                                       // 435
Router.route("/categories/add", {                                                                                      // 436
  name: "categoryNew",                                                                                                 // 437
  waitOn: function () {                                                                                                // 438
    return [Meteor.subscribe("categories"), Meteor.subscribe("views")];                                                // 439
  },                                                                                                                   // 440
});                                                                                                                    // 441
                                                                                                                       // 442
Router.route("/category/:_id/edit", {                                                                                  // 443
  name: "categoryEdit",                                                                                                // 444
  data: function () {                                                                                                  // 445
    return Categories.findOne(this.params._id);                                                                        // 446
  },                                                                                                                   // 447
  waitOn: function () {                                                                                                // 448
    var data = {};                                                                                                     // 449
    data.categoryId = this.params._id;                                                                                 // 450
    return [                                                                                                           // 451
      Meteor.subscribe("categories", data),                                                                            // 452
      Meteor.subscribe("views", data),                                                                                 // 453
      Meteor.subscribe("rkSettings"),                                                                                  // 454
    ];                                                                                                                 // 455
  },                                                                                                                   // 456
});                                                                                                                    // 457
                                                                                                                       // 458
Router.route("/categories", {                                                                                          // 459
  name: "categoryList",                                                                                                // 460
  waitOn: function () {                                                                                                // 461
    return [                                                                                                           // 462
      Meteor.subscribe("categories"),                                                                                  // 463
      Meteor.subscribe("views"),                                                                                       // 464
    ];                                                                                                                 // 465
  },                                                                                                                   // 466
});                                                                                                                    // 467
                                                                                                                       // 468
Router.route("/invitation/:invitationId", {                                                                            // 469
  name: "invitation",                                                                                                  // 470
  template: "invitation",                                                                                              // 471
  data: function () {                                                                                                  // 472
    return Members.invitations.findOne(this.params.invitationId);                                                      // 473
  },                                                                                                                   // 474
  waitOn: function () {                                                                                                // 475
    return [Meteor.subscribe("members"), Meteor.subscribe("invitation", this.params.invitationId)];                    // 476
  },                                                                                                                   // 477
});                                                                                                                    // 478
                                                                                                                       // 479
Router.route("/revisions/:docId", {                                                                                    // 480
  name: "revisions",                                                                                                   // 481
  template: "revisions",                                                                                               // 482
  waitOn: function () {                                                                                                // 483
    return [Meteor.subscribe("doc-revisions", this.params.docId), Meteor.subscribe("categories"), Meteor.subscribe("views")];
  },                                                                                                                   // 485
});                                                                                                                    // 486
                                                                                                                       // 487
Router.route("/browse/:categorySlug?", {                                                                               // 488
  name: "browse",                                                                                                      // 489
  data: function () {                                                                                                  // 490
    return this.params.categorySlug;                                                                                   // 491
  },                                                                                                                   // 492
  waitOn: function () {                                                                                                // 493
    return [                                                                                                           // 494
      Meteor.subscribe("mySpace"),                                                                                     // 495
      Meteor.subscribe("categories"),                                                                                  // 496
      Meteor.subscribe("views"),                                                                                       // 497
      Meteor.subscribe("docs"),                                                                                        // 498
      Meteor.subscribe("members"),                                                                                     // 499
      Meteor.subscribe("revisions"),                                                                                   // 500
    ];                                                                                                                 // 501
  },                                                                                                                   // 502
});                                                                                                                    // 503
                                                                                                                       // 504
Router.route("/logs", {                                                                                                // 505
  name: "logs",                                                                                                        // 506
  waitOn: function () {                                                                                                // 507
    return [                                                                                                           // 508
      Meteor.subscribe("history"),                                                                                     // 509
    ];                                                                                                                 // 510
  },                                                                                                                   // 511
});                                                                                                                    // 512
                                                                                                                       // 513
if (Meteor.settings.public.show.about) {                                                                               // 514
  Router.route("/about");                                                                                              // 515
}                                                                                                                      // 516
                                                                                                                       // 517
Router.route("/walk", {                                                                                                // 518
  waitOn: function () {                                                                                                // 519
    return [                                                                                                           // 520
      Meteor.subscribe("folderstoscan"),                                                                               // 521
      Meteor.subscribe("rkSettings"),                                                                                  // 522
      Meteor.subscribe("rkStatus"),                                                                                    // 523
    ];                                                                                                                 // 524
  },                                                                                                                   // 525
});                                                                                                                    // 526
                                                                                                                       // 527
Router.route("/files", {                                                                                               // 528
  name: "files",                                                                                                       // 529
  waitOn: function () {                                                                                                // 530
    return [                                                                                                           // 531
      Meteor.subscribe("walkedfiles"),                                                                                 // 532
      Meteor.subscribe("rkStatus"),                                                                                    // 533
    ];                                                                                                                 // 534
  },                                                                                                                   // 535
});                                                                                                                    // 536
                                                                                                                       // 537
Router.route("/fileView", {                                                                                            // 538
  name: "fileView",                                                                                                    // 539
  waitOn: function () {                                                                                                // 540
    return [];                                                                                                         // 541
  },                                                                                                                   // 542
});                                                                                                                    // 543
                                                                                                                       // 544
Router.route("/backup", {                                                                                              // 545
  name: "backup",                                                                                                      // 546
  waitOn: function () {                                                                                                // 547
    return [                                                                                                           // 548
      Meteor.subscribe("members"),                                                                                     // 549
    ];                                                                                                                 // 550
  },                                                                                                                   // 551
});                                                                                                                    // 552
                                                                                                                       // 553
Router.route("/synonyms", {                                                                                            // 554
  name: "synonyms",                                                                                                    // 555
  waitOn: function () {                                                                                                // 556
    return [Meteor.subscribe("synonyms")];                                                                             // 557
  },                                                                                                                   // 558
});                                                                                                                    // 559
                                                                                                                       // 560
if (Meteor.settings.public.show.relationships) {                                                                       // 561
  Router.route("/relationships", {                                                                                     // 562
    name: "relationships",                                                                                             // 563
    waitOn: function () {                                                                                              // 564
      return [];                                                                                                       // 565
    },                                                                                                                 // 566
  });                                                                                                                  // 567
}                                                                                                                      // 568
                                                                                                                       // 569
Router.route("/search", {                                                                                              // 570
  name: "searchTpl",                                                                                                   // 571
  waitOn: function () {                                                                                                // 572
    var subscribtions =  [                                                                                             // 573
      Meteor.subscribe("revisions"),                                                                                   // 574
      Meteor.subscribe("categories"),                                                                                  // 575
      Meteor.subscribe("myCurrentSearchQuery"),                                                                        // 576
      Meteor.subscribe("views"),                                                                                       // 577
      Meteor.subscribe("tags"),                                                                                        // 578
      Meteor.subscribe("members"),                                                                                     // 579
      Meteor.subscribe("synonyms"),                                                                                    // 580
      Meteor.subscribe("mySpace"),                                                                                     // 581
      Meteor.subscribe("rkSettings"),                                                                                  // 582
    ];                                                                                                                 // 583
                                                                                                                       // 584
    searchQuerySentToServer = Session.get("searchQuerySentToServer");                                                  // 585
                                                                                                                       // 586
    if ((typeof searchQuerySentToServer !== 'undefined') && (searchQuerySentToServer !== '') ) {                       // 587
      searchType = Session.get("searchType");                                                                          // 588
      catFilter = Session.get("catFilter");                                                                            // 589
      includeWalkedFilesInResults = Session.get('includeWalkedFilesInResults');                                        // 590
      if (typeof RKCSE !== 'undefined') {                                                                              // 591
        includeWebInResults = Session.get('includeWebInResults');                                                      // 592
      }                                                                                                                // 593
                                                                                                                       // 594
                                                                                                                       // 595
      RKCore.log("searchQuerySentToServer : " + searchQuerySentToServer);                                              // 596
      RKCore.log("searchType : " + searchType);                                                                        // 597
      RKCore.log("catFilter : " + catFilter);                                                                          // 598
      RKCore.log("includeWalkedFilesInResults : " + includeWalkedFilesInResults);                                      // 599
      if (typeof RKCSE !== 'undefined') {                                                                              // 600
        RKCore.log("includeWebInResults : " + includeWebInResults);                                                    // 601
      }                                                                                                                // 602
                                                                                                                       // 603
      Meteor.subscribe("searchResults", searchQuerySentToServer, catFilter, searchType, includeWalkedFilesInResults);  // 604
                                                                                                                       // 605
      //todo transform like wiki :                                                                                     // 606
      if (typeof RKCSE !== 'undefined') {                                                                              // 607
        if (includeWebInResults) {                                                                                     // 608
          Meteor.subscribe("cse", searchQuerySentToServer);                                                            // 609
        }                                                                                                              // 610
      }                                                                                                                // 611
    }                                                                                                                  // 612
                                                                                                                       // 613
    return subscribtions;                                                                                              // 614
  },                                                                                                                   // 615
});                                                                                                                    // 616
                                                                                                                       // 617
                                                                                                                       // 618
Router.route("/stats", {                                                                                               // 619
  name: "stats",                                                                                                       // 620
  waitOn: function () {                                                                                                // 621
    return [                                                                                                           // 622
      Meteor.subscribe("categories"),                                                                                  // 623
      Meteor.subscribe("docs"),                                                                                        // 624
      Meteor.subscribe("history"),                                                                                     // 625
      Meteor.subscribe("revisions"),                                                                                   // 626
      Meteor.subscribe("searchqueries"),                                                                               // 627
      Meteor.subscribe("members"),                                                                                     // 628
      Meteor.subscribe("tags"),                                                                                        // 629
    ];                                                                                                                 // 630
  },                                                                                                                   // 631
});                                                                                                                    // 632
                                                                                                                       // 633
Router.route("/predefinedtags/edit", {                                                                                 // 634
  name: "predefinedtagsEdit",                                                                                          // 635
  waitOn: function () {                                                                                                // 636
    return [Meteor.subscribe("predefinedtags")];                                                                       // 637
  },                                                                                                                   // 638
});                                                                                                                    // 639
                                                                                                                       // 640
Router.route("/settings", {                                                                                            // 641
  name: "settingsTemplate",                                                                                            // 642
  waitOn: function () {                                                                                                // 643
    return [                                                                                                           // 644
      Meteor.subscribe("rkSettings"),                                                                                  // 645
      Meteor.subscribe("categories"), //for the nav, not good...#todo                                                  // 646
    ];                                                                                                                 // 647
  },                                                                                                                   // 648
});                                                                                                                    // 649
                                                                                                                       // 650
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:core/lib/client/templates/template.accessDenied.js                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("accessDenied");                                                                                  // 2
Template["accessDenied"] = new Template("Template.accessDenied", (function() {                                         // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "row"                                                                                                     // 6
  }, "\n		", HTML.DIV({                                                                                                // 7
    "class": "col-md-12"                                                                                               // 8
  }, "\n			 ", HTML.DIV({                                                                                              // 9
    "class": "panel panel-default"                                                                                     // 10
  }, "\n  			 	", HTML.DIV({                                                                                           // 11
    "class": "panel-heading",                                                                                          // 12
    style: "position:relative"                                                                                         // 13
  }, "\n  			 		", HTML.H3({                                                                                           // 14
    "class": "panel-title"                                                                                             // 15
  }, Blaze.View("lookup:_", function() {                                                                               // 16
    return Spacebars.mustache(view.lookup("_"), "Access denied");                                                      // 17
  })), "\n          "), "\n  				", HTML.DIV({                                                                         // 18
    "class": "panel-body"                                                                                              // 19
  }, "\n  				      ", HTML.P(Blaze.View("lookup:_", function() {                                                      // 20
    return Spacebars.mustache(view.lookup("_"), "access_denied");                                                      // 21
  })), "\n          "), "\n    		"), "\n		"), "\n	");                                                                  // 22
}));                                                                                                                   // 23
                                                                                                                       // 24
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:core/lib/client/templates/template.externalLayout.js                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("externalLayout");                                                                                // 2
Template["externalLayout"] = new Template("Template.externalLayout", (function() {                                     // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "container-fluid"                                                                                         // 6
  }, "\n        ", Spacebars.include(view.lookupTemplate("headerExternal")), "\n      ", HTML.DIV({                    // 7
    id: "main",                                                                                                        // 8
    "class": "row-fluid"                                                                                               // 9
  }, "\n        ", Spacebars.include(view.lookupTemplate("yield")), "\n      "), "\n  ");                              // 10
}));                                                                                                                   // 11
                                                                                                                       // 12
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:core/lib/client/templates/template.footer.js                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("footer");                                                                                        // 2
Template["footer"] = new Template("Template.footer", (function() {                                                     // 3
  var view = this;                                                                                                     // 4
  return HTML.Raw('<div id="footer" class="row-fluid">\n      <div class="panel panel-default">\n          <div class="panel-body">\n            <p>&copy; rationalK. Hotline : <a href="tel:+41768173346">+41768173346</a> | <a href="mailto:info@rationalk.ch">info@rationalk.ch</a> | <a href="http://rationalk.ch">http://rationalK.ch</a></p>\n          </div>\n      </div>\n  </div>');
}));                                                                                                                   // 6
                                                                                                                       // 7
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:core/lib/client/templates/template.header.js                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("header");                                                                                        // 2
Template["header"] = new Template("Template.header", (function() {                                                     // 3
  var view = this;                                                                                                     // 4
  return Spacebars.include(view.lookupTemplate("nav"));                                                                // 5
}));                                                                                                                   // 6
                                                                                                                       // 7
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:core/lib/client/templates/template.headerExternal.js                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("headerExternal");                                                                                // 2
Template["headerExternal"] = new Template("Template.headerExternal", (function() {                                     // 3
  var view = this;                                                                                                     // 4
  return Spacebars.include(view.lookupTemplate("navExternal"));                                                        // 5
}));                                                                                                                   // 6
                                                                                                                       // 7
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:core/lib/client/templates/template.layout.js                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("layout");                                                                                        // 2
Template["layout"] = new Template("Template.layout", (function() {                                                     // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "container-fluid"                                                                                         // 6
  }, "\n        ", Spacebars.include(view.lookupTemplate("header")), "\n        ", HTML.DIV({                          // 7
    id: "main",                                                                                                        // 8
    "class": "row-fluid"                                                                                               // 9
  }, "\n          ", Spacebars.include(view.lookupTemplate("yield")), "\n        "), "\n    		", Blaze.If(function() { // 10
    return Spacebars.dataMustache(view.lookup("show"), "footer");                                                      // 11
  }, function() {                                                                                                      // 12
    return [ "\n            ", Blaze.If(function() {                                                                   // 13
      return Spacebars.call(view.lookup("currentUser"));                                                               // 14
    }, function() {                                                                                                    // 15
      return [ "\n            ", Spacebars.include(view.lookupTemplate("footer")), "\n            " ];                 // 16
    }), "\n        " ];                                                                                                // 17
  }), "\n    ");                                                                                                       // 18
}));                                                                                                                   // 19
                                                                                                                       // 20
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:core/lib/client/templates/layout.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.layout.helpers({                                                                                              // 1
  validLicense: function () {                                                                                          // 2
	    return Session.get('validLicense');                                                                               // 3
	},                                                                                                                    // 4
  show: function (navItem) {                                                                                           // 5
		return Meteor.settings.public.show[navItem];                                                                         // 6
  },                                                                                                                   // 7
});                                                                                                                    // 8
                                                                                                                       // 9
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:core/lib/client/templates/template.loginLayout.js                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("loginLayout");                                                                                   // 2
Template["loginLayout"] = new Template("Template.loginLayout", (function() {                                           // 3
  var view = this;                                                                                                     // 4
  return HTML.DIV({                                                                                                    // 5
    "class": "container"                                                                                               // 6
  }, "\n        ", HTML.DIV({                                                                                          // 7
    "class": "row"                                                                                                     // 8
  }, "\n          ", HTML.DIV({                                                                                        // 9
    "class": "col-md-12"                                                                                               // 10
  }, "\n            ", HTML.DIV({                                                                                      // 11
    "class": "panel panel-default"                                                                                     // 12
  }, "\n				          ", HTML.DIV({                                                                                    // 13
    "class": "panel-body"                                                                                              // 14
  }, "\n					               ", HTML.H1("rationalK, ", Blaze.View("lookup:_", function() {                              // 15
    return Spacebars.mustache(view.lookup("_"), "the Knowledge Management Tool");                                      // 16
  })), "\n				           "), "\n            "), "\n          "), "\n        "), HTML.Raw('\n        <div class="row">\n          <div class="col-md-12">\n            <div class="panel panel-default">\n                  <div class="panel-body">\n                      <span class="pull-right"><a href="#" class="setLanguage" data-locale="en"><img src="/famfamfam/gb.png"></a> <a href="#" class="setLanguage" data-locale="fr"><img src="/famfamfam/fr.png"></a> <a href="#" class="setLanguage" data-locale="de"><img src="/famfamfam/de.png"></a></span>\n                   </div>\n            </div>\n          </div>\n        </div>\n        '), HTML.DIV({
    "class": "row"                                                                                                     // 18
  }, "\n	        ", HTML.DIV({                                                                                         // 19
    "class": "col-md-12"                                                                                               // 20
  }, "\n	            ", HTML.DIV({                                                                                     // 21
    "class": "panel panel-default"                                                                                     // 22
  }, "\n			        ", HTML.DIV({                                                                                       // 23
    "class": "panel-body"                                                                                              // 24
  }, "\n				        ", HTML.FORM({                                                                                     // 25
    id: "login-form-2"                                                                                                 // 26
  }, "\n                  ", Blaze.If(function() {                                                                     // 27
    return Spacebars.call(view.lookup("onDemo"));                                                                      // 28
  }, function() {                                                                                                      // 29
    return [ "\n                  ", HTML.DIV({                                                                        // 30
      "class": "form-group"                                                                                            // 31
    }, "\n      							", HTML.P("To login as admin : Email : demo-admin@rationalk.ch / Password : demo-admin"), "\n      							", HTML.P("To login as user : Email : demo-user@rationalk.ch / Password : demo-user"), "\n                  "), "\n      						" ];
  }), "\n						    ", HTML.DIV({                                                                                       // 33
    "class": "form-group"                                                                                              // 34
  }, "\n							    ", HTML.Raw('<label for="login-email-2">Email</label>'), "\n						    	", HTML.Raw('<input type="email" class="form-control" id="login-email-2">'), "\n                  ", HTML.P({
    "class": "help-block"                                                                                              // 36
  }, Blaze.View("lookup:_", function() {                                                                               // 37
    return Spacebars.mustache(view.lookup("_"), "helper_email_login");                                                 // 38
  })), "\n						    "), "\n						    ", HTML.DIV({                                                                     // 39
    "class": "form-group"                                                                                              // 40
  }, "\n							    ", HTML.LABEL({                                                                                     // 41
    "for": "login-password-2"                                                                                          // 42
  }, Blaze.View("lookup:_", function() {                                                                               // 43
    return Spacebars.mustache(view.lookup("_"), "Password");                                                           // 44
  })), "\n						      ", HTML.Raw('<input type="password" class="form-control" id="login-password-2">'), "\n                  ", HTML.P({
    "class": "help-block"                                                                                              // 46
  }, Blaze.View("lookup:_", function() {                                                                               // 47
    return Spacebars.mustache(view.lookup("_"), "helper_password_login");                                              // 48
  })), "\n						    "), "\n								", HTML.BUTTON({                                                                    // 49
    type: "submit",                                                                                                    // 50
    "class": "btn btn-primary",                                                                                        // 51
    id: "login-button-2"                                                                                               // 52
  }, Blaze.View("lookup:_", function() {                                                                               // 53
    return Spacebars.mustache(view.lookup("_"), "Sign in");                                                            // 54
  })), " ", HTML.SMALL(HTML.A({                                                                                        // 55
    href: "#",                                                                                                         // 56
    "class": "forgotPassword"                                                                                          // 57
  }, Blaze.View("lookup:_", function() {                                                                               // 58
    return Spacebars.mustache(view.lookup("_"), "I have forgotten my password");                                       // 59
  }))), "\n			   			"), "\n			        "), "\n		    	"), "\n	        "), "\n        "), "\n\n        ", Blaze.If(function() {
    return Spacebars.call(view.lookup("showFooter"));                                                                  // 61
  }, function() {                                                                                                      // 62
    return [ "\n      		", HTML.DIV({                                                                                  // 63
      id: "footer",                                                                                                    // 64
      "class": "row-fluid"                                                                                             // 65
    }, "\n            ", HTML.DIV({                                                                                    // 66
      "class": "panel panel-default"                                                                                   // 67
    }, "\n                ", HTML.DIV({                                                                                // 68
      "class": "panel-body"                                                                                            // 69
    }, "\n	                ", HTML.P(HTML.CharRef({                                                                    // 70
      html: "&copy;",                                                                                                  // 71
      str: "©"                                                                                                         // 72
    }), " rationalK. Hotline : +4176 817 33 46 / info@rationalk.ch"), "\n                "), "\n            "), "\n          "), "\n        " ];
  }), "\n    ");                                                                                                       // 74
}));                                                                                                                   // 75
                                                                                                                       // 76
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:core/lib/client/templates/loginLayout.js                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.loginLayout.events({                                                                                          // 1
    "click .setLanguage": function (e) {                                                                               // 2
  		e.preventDefault();                                                                                                // 3
      TAPi18n.setLanguage(e.currentTarget.dataset.locale);                                                             // 4
  		return true;                                                                                                       // 5
    },                                                                                                                 // 6
    "click a.forgotPassword": function (e,t) {                                                                         // 7
  		e.preventDefault();                                                                                                // 8
      var email = t.$('#login-email-2').val();                                                                         // 9
      if (email){                                                                                                      // 10
        console.log(email);                                                                                            // 11
        var option ={};                                                                                                // 12
        option.email = email;                                                                                          // 13
        Accounts.forgotPassword(option,function (err){                                                                 // 14
          if (typeof(err) !== 'undefined') {                                                                           // 15
            if (Meteor.settings.public.debug){console.log(err);}                                                       // 16
            if (err.reason="User not found"){                                                                          // 17
              if (typeof(toastr) !== 'undefined') {                                                                    // 18
                toastr.error("Sorry, this email has never been registred to rationalK.");                              // 19
              }                                                                                                        // 20
            }                                                                                                          // 21
          }                                                                                                            // 22
          else {                                                                                                       // 23
            if (typeof(toastr) !== 'undefined') {                                                                      // 24
              toastr.success("We send you an email to : "+ email);                                                     // 25
            }                                                                                                          // 26
          }                                                                                                            // 27
        });                                                                                                            // 28
      }                                                                                                                // 29
      else {                                                                                                           // 30
        if (typeof(toastr) !== 'undefined') {                                                                          // 31
          toastr.error("Type your email.");                                                                            // 32
        }                                                                                                              // 33
      }                                                                                                                // 34
  		return false;                                                                                                      // 35
    },                                                                                                                 // 36
    'submit #login-form-2' : function (e, t){                                                                          // 37
		e.preventDefault();                                                                                                  // 38
		// retrieve the input field values                                                                                   // 39
		//console.log(t.$('#login-email-2').val());                                                                          // 40
		var email = t.$('#login-email-2').val().toLowerCase();                                                               // 41
		var password = t.$('#login-password-2').val();                                                                       // 42
                                                                                                                       // 43
	    // Trim and validate your fields here....                                                                         // 44
		//console.log("email=" + email);                                                                                     // 45
		//console.log(password);                                                                                             // 46
	    // If validation passes, supply the appropriate fields to the                                                     // 47
	    // Meteor.loginWithPassword() function.                                                                           // 48
	    Meteor.loginWithPassword(email, password, function (err){                                                         // 49
	    if (err){                                                                                                         // 50
	      // The user might not have been found, or their passwword                                                       // 51
	      // could be incorrect. Inform the user that their                                                               // 52
	      // login attempt has failed.                                                                                    // 53
        if (typeof(toastr) !== 'undefined') {                                                                          // 54
    			toastr.error(err.reason+". Please try again.");                                                                 // 55
    		}                                                                                                                // 56
                                                                                                                       // 57
	      }                                                                                                               // 58
	    else                                                                                                              // 59
	    {                                                                                                                 // 60
	      // The user has been logged in.                                                                                 // 61
	    }                                                                                                                 // 62
                                                                                                                       // 63
                                                                                                                       // 64
      });                                                                                                              // 65
         return false;                                                                                                 // 66
      }                                                                                                                // 67
});                                                                                                                    // 68
                                                                                                                       // 69
                                                                                                                       // 70
Template.loginLayout.helpers({                                                                                         // 71
	onDemo: function () {                                                                                                 // 72
		if (document.URL.indexOf("demo.rationalk.ch") == -1){                                                                // 73
			return false;                                                                                                       // 74
		}                                                                                                                    // 75
		else {                                                                                                               // 76
			return true;                                                                                                        // 77
		}                                                                                                                    // 78
	},                                                                                                                    // 79
	showFooter: function () {                                                                                             // 80
	    return Meteor.settings.public.show.footer;                                                                        // 81
	},                                                                                                                    // 82
  isFreshInstall: function () {                                                                                        // 83
    //var nAccounts = Meteor.users.find().count();                                                                     // 84
    var nAccounts = Members.collection.find().count();                                                                 // 85
    console.log(nAccounts);                                                                                            // 86
    console.log(this);                                                                                                 // 87
    console.log(this.data);                                                                                            // 88
	},                                                                                                                    // 89
});                                                                                                                    // 90
                                                                                                                       // 91
                                                                                                                       // 92
Template.loginLayout.rendered = function () {                                                                          // 93
  return Meteor.setTimeout(function () {                                                                               // 94
    $("a.dropdown-toggle").trigger("click");                                                                           // 95
    return $("#iron-router-progress").width(0);                                                                        // 96
  }, 500);                                                                                                             // 97
};                                                                                                                     // 98
                                                                                                                       // 99
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:core/lib/client/templates/template.nav.js                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("nav");                                                                                           // 2
Template["nav"] = new Template("Template.nav", (function() {                                                           // 3
  var view = this;                                                                                                     // 4
  return [ Blaze.View("lookup:updateLocale", function() {                                                              // 5
    return Spacebars.mustache(view.lookup("updateLocale"));                                                            // 6
  }), "\n	", HTML.NAV({                                                                                                // 7
    "class": "navbar navbar-default"                                                                                   // 8
  }, "\n		", HTML.DIV({                                                                                                // 9
    "class": "container-fluid"                                                                                         // 10
  }, "\n			", HTML.DIV({                                                                                               // 11
    "class": "navbar-header"                                                                                           // 12
  }, "\n				", HTML.Raw('<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">\n              <span class="sr-only">Toggle navigation</span>\n              <span class="icon-bar"></span>\n              <span class="icon-bar"></span>\n              <span class="icon-bar"></span>\n            </button>'), "\n            ", HTML.A({
    "class": "navbar-brand",                                                                                           // 14
    href: function() {                                                                                                 // 15
      return Spacebars.mustache(view.lookup("pathFor"), "dashboard");                                                  // 16
    },                                                                                                                 // 17
    title: function() {                                                                                                // 18
      return Spacebars.mustache(view.lookup("_"), "Dashboard");                                                        // 19
    }                                                                                                                  // 20
  }, Blaze.View("lookup:headerText", function() {                                                                      // 21
    return Spacebars.mustache(view.lookup("headerText"));                                                              // 22
  }), " ", HTML.Raw('<strong><span class="glyphicon glyphicon-home" aria-hidden="true"></span></strong>')), "\n          	"), "\n\n		  	", HTML.DIV({
    id: "navbar",                                                                                                      // 24
    "class": "navbar-collapse collapse"                                                                                // 25
  }, "\n					", Blaze.If(function() {                                                                                  // 26
    return Spacebars.call(view.lookup("loggedIn"));                                                                    // 27
  }, function() {                                                                                                      // 28
    return [ "\n		  		", HTML.UL({                                                                                     // 29
      "class": "nav navbar-nav"                                                                                        // 30
    }, "\n		            ", HTML.LI(HTML.A({                                                                            // 31
      href: function() {                                                                                               // 32
        return Spacebars.mustache(view.lookup("pathFor"), "searchTpl");                                                // 33
      },                                                                                                               // 34
      title: function() {                                                                                              // 35
        return Spacebars.mustache(view.lookup("_"), "Search");                                                         // 36
      }                                                                                                                // 37
    }, HTML.SPAN(HTML.STRONG(HTML.SPAN({                                                                               // 38
      "class": "glyphicon glyphicon-search"                                                                            // 39
    })), " ", Blaze.View("lookup:_", function() {                                                                      // 40
      return Spacebars.mustache(view.lookup("_"), "Search");                                                           // 41
    })))), "\n		            ", HTML.LI({                                                                               // 42
      "class": "dropdown"                                                                                              // 43
    }, "\n	                    ", HTML.A({                                                                             // 44
      href: "#",                                                                                                       // 45
      "class": "dropdown-toggle",                                                                                      // 46
      "data-toggle": "dropdown",                                                                                       // 47
      role: "button",                                                                                                  // 48
      "aria-expanded": "true"                                                                                          // 49
    }, HTML.STRONG(HTML.SPAN({                                                                                         // 50
      "class": "glyphicon glyphicon-hdd"                                                                               // 51
    })), " ", Blaze.View("lookup:_", function() {                                                                      // 52
      return Spacebars.mustache(view.lookup("_"), "DB");                                                               // 53
    }), " ", HTML.SPAN({                                                                                               // 54
      "class": "caret"                                                                                                 // 55
    })), "\n	                    ", HTML.UL({                                                                          // 56
      "class": "dropdown-menu",                                                                                        // 57
      role: "menu"                                                                                                     // 58
    }, "\n		                    ", HTML.LI(HTML.A({                                                                    // 59
      "class": function() {                                                                                            // 60
        return Spacebars.mustache(view.lookup("dontDisplayIfUserIsReadOnly"));                                         // 61
      },                                                                                                               // 62
      href: function() {                                                                                               // 63
        return Spacebars.mustache(view.lookup("pathFor"), "docCreate");                                                // 64
      },                                                                                                               // 65
      title: function() {                                                                                              // 66
        return Spacebars.mustache(view.lookup("_"), "Create DB entry");                                                // 67
      }                                                                                                                // 68
    }, Blaze.View("lookup:_", function() {                                                                             // 69
      return Spacebars.mustache(view.lookup("_"), "Create DB entry");                                                  // 70
    }))), "\n		                    ", HTML.LI(HTML.A({                                                                 // 71
      href: function() {                                                                                               // 72
        return Spacebars.mustache(view.lookup("pathFor"), "browse");                                                   // 73
      },                                                                                                               // 74
      title: function() {                                                                                              // 75
        return Spacebars.mustache(view.lookup("_"), "Browse the DB");                                                  // 76
      }                                                                                                                // 77
    }, Blaze.View("lookup:_", function() {                                                                             // 78
      return Spacebars.mustache(view.lookup("_"), "Browse the DB");                                                    // 79
    }))), "\n												", Blaze.If(function() {                                                                      // 80
      return Spacebars.dataMustache(view.lookup("show"), "relationships");                                             // 81
    }, function() {                                                                                                    // 82
      return [ "\n														", HTML.LI(HTML.A({                                                                    // 83
        href: function() {                                                                                             // 84
          return Spacebars.mustache(view.lookup("pathFor"), "relationships");                                          // 85
        },                                                                                                             // 86
        title: "DB Relationships"                                                                                      // 87
      }, "DB Relationships")), "\n												" ];                                                                     // 88
    }), "\n												", Blaze.If(function() {                                                                        // 89
      return Spacebars.call(view.lookup("categories"));                                                                // 90
    }, function() {                                                                                                    // 91
      return [ "\n												", HTML.LI({                                                                             // 92
        "class": "divider"                                                                                             // 93
      }), "\n                				", HTML.LI({                                                                          // 94
        "class": "dropdown-header"                                                                                     // 95
      }, Blaze.View("lookup:_", function() {                                                                           // 96
        return Spacebars.mustache(view.lookup("_"), "Categories");                                                     // 97
      })), "\n												", Blaze.Each(function() {                                                                   // 98
        return Spacebars.call(view.lookup("categories"));                                                              // 99
      }, function() {                                                                                                  // 100
        return [ "\n                				", HTML.LI(HTML.A({                                                            // 101
          href: function() {                                                                                           // 102
            return Spacebars.mustache(view.lookup("pathFor"), "browse", Spacebars.kw({                                 // 103
              categorySlug: Spacebars.dot(view.lookup("."), "slug")                                                    // 104
            }));                                                                                                       // 105
          },                                                                                                           // 106
          "data-catid": function() {                                                                                   // 107
            return Spacebars.mustache(view.lookup("_id"));                                                             // 108
          },                                                                                                           // 109
          "data-slug": function() {                                                                                    // 110
            return Spacebars.mustache(view.lookup("slug"));                                                            // 111
          },                                                                                                           // 112
          "class": "selectCategory"                                                                                    // 113
        }, Blaze.View("lookup:name", function() {                                                                      // 114
          return Spacebars.mustache(view.lookup("name"));                                                              // 115
        }))), "\n												" ];                                                                                      // 116
      }), "\n												" ];                                                                                          // 117
    }), "\n	                    "), "\n	                "), "\n								", Blaze.If(function() {                        // 118
      return Spacebars.dataMustache(view.lookup("show"), "gantts");                                                    // 119
    }, function() {                                                                                                    // 120
      return [ "\n								", HTML.LI(HTML.A({                                                                          // 121
        href: function() {                                                                                             // 122
          return Spacebars.mustache(view.lookup("pathFor"), "gantts");                                                 // 123
        },                                                                                                             // 124
        title: "Gantts"                                                                                                // 125
      }, "Gantts")), "\n								" ];                                                                                   // 126
    }), "\n								", Blaze.If(function() {                                                                            // 127
      return Spacebars.dataMustache(view.lookup("show"), "followup");                                                  // 128
    }, function() {                                                                                                    // 129
      return [ "\n								", HTML.LI(HTML.A({                                                                          // 130
        href: function() {                                                                                             // 131
          return Spacebars.mustache(view.lookup("pathFor"), "followup");                                               // 132
        },                                                                                                             // 133
        title: "Follow Up"                                                                                             // 134
      }, "Follow Up")), "\n								" ];                                                                                // 135
    }), "\n								", HTML.LI({                                                                                        // 136
      "class": "dropdown"                                                                                              // 137
    }, "\n									", HTML.A({                                                                                         // 138
      href: "#",                                                                                                       // 139
      "class": "dropdown-toggle",                                                                                      // 140
      "data-toggle": "dropdown",                                                                                       // 141
      role: "button",                                                                                                  // 142
      "aria-expanded": "false"                                                                                         // 143
    }, "Packages ", HTML.SPAN({                                                                                        // 144
      "class": "caret"                                                                                                 // 145
    })), "\n									", HTML.UL({                                                                                      // 146
      "class": "dropdown-menu",                                                                                        // 147
      role: "menu"                                                                                                     // 148
    }, "\n										", Blaze.Each(function() {                                                                         // 149
      return Spacebars.call(view.lookup("packageMenu"));                                                               // 150
    }, function() {                                                                                                    // 151
      return [ "\n											", Blaze.View("lookup:menuHTML", function() {                                             // 152
        return Spacebars.mustache(view.lookup("menuHTML"));                                                            // 153
      }), "\n										" ];                                                                                            // 154
    }), "\n									"), "\n								"), "\n								", Blaze.If(function() {                                             // 155
      return Spacebars.dataMustache(view.lookup("show"), "processes");                                                 // 156
    }, function() {                                                                                                    // 157
      return [ "\n					        ", HTML.LI(HTML.A({                                                                     // 158
        href: function() {                                                                                             // 159
          return Spacebars.mustache(view.lookup("pathFor"), "processes");                                              // 160
        },                                                                                                             // 161
        title: "Processes"                                                                                             // 162
      }, HTML.IMG({                                                                                                    // 163
        height: "16px",                                                                                                // 164
        src: "/images/1422715147_tree_structure.png"                                                                   // 165
      }), " Processes")), "\n					      " ];                                                                           // 166
    }), "\n								", Blaze.If(function() {                                                                            // 167
      return Spacebars.dataMustache(view.lookup("show"), "controlplan");                                               // 168
    }, function() {                                                                                                    // 169
      return [ "\n								", HTML.LI(HTML.A({                                                                          // 170
        href: function() {                                                                                             // 171
          return Spacebars.mustache(view.lookup("pathFor"), "controlplan");                                            // 172
        },                                                                                                             // 173
        title: "Control Plan"                                                                                          // 174
      }, "Control Plan")), "\n								" ];                                                                             // 175
    }), "\n\n		            ", Blaze.If(function() {                                                                    // 176
      return Spacebars.call(view.lookup("isAdmin"));                                                                   // 177
    }, function() {                                                                                                    // 178
      return [ "\n	                ", HTML.LI({                                                                        // 179
        "class": "dropdown"                                                                                            // 180
      }, "\n	                    ", HTML.A({                                                                           // 181
        href: "#",                                                                                                     // 182
        "class": "dropdown-toggle",                                                                                    // 183
        "data-toggle": "dropdown",                                                                                     // 184
        role: "button",                                                                                                // 185
        "aria-expanded": "false"                                                                                       // 186
      }, Blaze.View("lookup:_", function() {                                                                           // 187
        return Spacebars.mustache(view.lookup("_"), "Config");                                                         // 188
      }), " ", HTML.SPAN({                                                                                             // 189
        "class": "caret"                                                                                               // 190
      })), "\n	                    ", HTML.UL({                                                                        // 191
        "class": "dropdown-menu",                                                                                      // 192
        role: "menu"                                                                                                   // 193
      }, "\n		                    ", HTML.LI(HTML.A({                                                                  // 194
        href: function() {                                                                                             // 195
          return Spacebars.mustache(view.lookup("pathFor"), "categoryList");                                           // 196
        },                                                                                                             // 197
        title: function() {                                                                                            // 198
          return Spacebars.mustache(view.lookup("_"), "Manage categories");                                            // 199
        }                                                                                                              // 200
      }, Blaze.View("lookup:_", function() {                                                                           // 201
        return Spacebars.mustache(view.lookup("_"), "Categories");                                                     // 202
      }))), "\n		                    ", HTML.LI(HTML.A({                                                               // 203
        href: function() {                                                                                             // 204
          return Spacebars.mustache(view.lookup("pathFor"), "members");                                                // 205
        },                                                                                                             // 206
        title: function() {                                                                                            // 207
          return Spacebars.mustache(view.lookup("_"), "Manage members");                                               // 208
        }                                                                                                              // 209
      }, Blaze.View("lookup:_", function() {                                                                           // 210
        return Spacebars.mustache(view.lookup("_"), "Members");                                                        // 211
      }))), "\n		                    ", HTML.LI(HTML.A({                                                               // 212
        href: function() {                                                                                             // 213
          return Spacebars.mustache(view.lookup("pathFor"), "predefinedtagsEdit");                                     // 214
        },                                                                                                             // 215
        title: function() {                                                                                            // 216
          return Spacebars.mustache(view.lookup("_"), "Manage predefined tags");                                       // 217
        }                                                                                                              // 218
      }, Blaze.View("lookup:_", function() {                                                                           // 219
        return Spacebars.mustache(view.lookup("_"), "Manage predefined tags");                                         // 220
      }))), "\n		                    ", HTML.LI(HTML.A({                                                               // 221
        href: function() {                                                                                             // 222
          return Spacebars.mustache(view.lookup("pathFor"), "synonyms");                                               // 223
        },                                                                                                             // 224
        title: "Manage search synonyms"                                                                                // 225
      }, Blaze.View("lookup:_", function() {                                                                           // 226
        return Spacebars.mustache(view.lookup("_"), "Manage search synonyms");                                         // 227
      }))), "\n		                    ", HTML.LI(HTML.A({                                                               // 228
        href: function() {                                                                                             // 229
          return Spacebars.mustache(view.lookup("pathFor"), "docImport");                                              // 230
        },                                                                                                             // 231
        title: function() {                                                                                            // 232
          return Spacebars.mustache(view.lookup("_"), "Import");                                                       // 233
        }                                                                                                              // 234
      }, Blaze.View("lookup:_", function() {                                                                           // 235
        return Spacebars.mustache(view.lookup("_"), "Import");                                                         // 236
      }))), "\n		                    ", HTML.LI(HTML.A({                                                               // 237
        href: function() {                                                                                             // 238
          return Spacebars.mustache(view.lookup("pathFor"), "docExport");                                              // 239
        },                                                                                                             // 240
        title: function() {                                                                                            // 241
          return Spacebars.mustache(view.lookup("_"), "Export");                                                       // 242
        }                                                                                                              // 243
      }, Blaze.View("lookup:_", function() {                                                                           // 244
        return Spacebars.mustache(view.lookup("_"), "Export");                                                         // 245
      }))), "\n		                    ", HTML.LI(HTML.A({                                                               // 246
        href: function() {                                                                                             // 247
          return Spacebars.mustache(view.lookup("pathFor"), "stats");                                                  // 248
        },                                                                                                             // 249
        title: function() {                                                                                            // 250
          return Spacebars.mustache(view.lookup("_"), "Statistics");                                                   // 251
        }                                                                                                              // 252
      }, Blaze.View("lookup:_", function() {                                                                           // 253
        return Spacebars.mustache(view.lookup("_"), "Statistics");                                                     // 254
      }))), "\n		                    ", HTML.LI(HTML.A({                                                               // 255
        href: function() {                                                                                             // 256
          return Spacebars.mustache(view.lookup("pathFor"), "settingsTemplate");                                       // 257
        },                                                                                                             // 258
        title: function() {                                                                                            // 259
          return Spacebars.mustache(view.lookup("_"), "Settings");                                                     // 260
        }                                                                                                              // 261
      }, Blaze.View("lookup:_", function() {                                                                           // 262
        return Spacebars.mustache(view.lookup("_"), "Settings");                                                       // 263
      }))), "\n												", HTML.Comment(' OPEN SOURCE NOW !!\n												<li><a href="{{pathFor \'update\'}}" title=\'{{_ "Update"}}\'>{{_ "Update"}}</a></li>\n												'), "\n		                    ", Blaze.If(function() {
        return Spacebars.dataMustache(view.lookup("show"), "about");                                                   // 265
      }, function() {                                                                                                  // 266
        return [ "\n		                    ", HTML.LI(HTML.A({                                                          // 267
          href: function() {                                                                                           // 268
            return Spacebars.mustache(view.lookup("pathFor"), "about");                                                // 269
          },                                                                                                           // 270
          title: function() {                                                                                          // 271
            return Spacebars.mustache(view.lookup("_"), "About");                                                      // 272
          }                                                                                                            // 273
        }, Blaze.View("lookup:_", function() {                                                                         // 274
          return Spacebars.mustache(view.lookup("_"), "About");                                                        // 275
        }))), "\n		                    " ];                                                                            // 276
      }), "\n	                    "), "\n	                "), "\n		            " ];                                    // 277
    }), "\n        		"), "\n						" ];                                                                                 // 278
  }), " ", HTML.Raw("<!-- end of if loggedIn -->"), "\n						", Blaze.If(function() {                                  // 279
    return Spacebars.call(view.lookup("onInvitationPage"));                                                            // 280
  }, function() {                                                                                                      // 281
    return [ "\n							", HTML.Comment(" Hide the sign-in button "), "\n						" ];                                     // 282
  }, function() {                                                                                                      // 283
    return [ "\n			        ", HTML.UL({                                                                                // 284
      "class": "nav navbar-nav navbar-right"                                                                           // 285
    }, "\n				        ", Blaze.If(function() {                                                                         // 286
      return Spacebars.call(view.lookup("onDemo"));                                                                    // 287
    }, function() {                                                                                                    // 288
      return [ "\n				        	", HTML.Comment("No Change password button "), "\n									", HTML.FORM({               // 289
        id: "logout-form",                                                                                             // 290
        "class": "form-inline"                                                                                         // 291
      }, Blaze.View("lookup:username", function() {                                                                    // 292
        return Spacebars.mustache(view.lookup("username"));                                                            // 293
      }), " ", HTML.BUTTON({                                                                                           // 294
        type: "submit",                                                                                                // 295
        "class": "btn btn-link",                                                                                       // 296
        id: "logout-button"                                                                                            // 297
      }, Blaze.View("lookup:_", function() {                                                                           // 298
        return Spacebars.mustache(view.lookup("_"), "Log out");                                                        // 299
      }))), "\n				        " ];                                                                                        // 300
    }, function() {                                                                                                    // 301
      return [ "\n			            	", HTML.Comment(" {{> loginButtons}} "), "\n										", HTML.LI(HTML.A({            // 302
        title: function() {                                                                                            // 303
          return Spacebars.mustache(view.lookup("_"), "Log out");                                                      // 304
        },                                                                                                             // 305
        "class": "logout",                                                                                             // 306
        href: "#"                                                                                                      // 307
      }, HTML.SPAN({                                                                                                   // 308
        "class": "glyphicon glyphicon-log-out",                                                                        // 309
        "aria-hidden": "true"                                                                                          // 310
      }))), "\n			            " ];                                                                                     // 311
    }), "\n			        "), "\n						" ];                                                                                // 312
  }), "\n			"), HTML.Raw("<!-- /.navbar-collapse -->"), "\n		"), HTML.Raw("<!--/.container-fluid -->"), "\n	") ];      // 313
}));                                                                                                                   // 314
                                                                                                                       // 315
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:core/lib/client/templates/nav.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.nav.rendered = function () {                                                                                  // 1
	document.title = (typeof(Meteor.settings.public.header_text) !== 'undefined') ? Meteor.settings.public.header_text : "rationalK";
                                                                                                                       // 3
	 Mousetrap.bind('c d', function () {                                                                                  // 4
		 Router.go("docCreate");                                                                                             // 5
	 });                                                                                                                  // 6
                                                                                                                       // 7
	 if (Meteor.settings.public.show.followup) {                                                                          // 8
		 	Mousetrap.bind('c t', function () {                                                                                // 9
				Meteor.call('createTask', function (error, result) {                                                               // 10
					if (!error) {                                                                                                     // 11
						taskId = result;                                                                                                 // 12
						Router.go("editTask", {_id: taskId});                                                                            // 13
					}                                                                                                                 // 14
				});                                                                                                                // 15
		 	});                                                                                                                // 16
		}                                                                                                                    // 17
                                                                                                                       // 18
	 if (Meteor.settings.public.show.followup) {                                                                          // 19
	 	Mousetrap.bind('f u', function () {                                                                                 // 20
		 bootbox.prompt("Type some tags separated with ,", function(result) {                                                // 21
			 var FollowUp = {};                                                                                                 // 22
			 if (result !== null) {                                                                                             // 23
				 FollowUp.tags = result;                                                                                           // 24
				 Session.set("FollowUp", FollowUp);                                                                                // 25
				 bootbox.prompt("Type some text", function (r) {                                                                   // 26
					 FollowUp = Session.get("FollowUp");                                                                              // 27
					 if (r !== null) {                                                                                                // 28
						 FollowUp.text = r;                                                                                              // 29
						 Session.set("FollowUp", FollowUp);                                                                              // 30
						 Meteor.call('createFollowUp', FollowUp, function (error) {                                                      // 31
				 			if (!error) {                                                                                                  // 32
								if (typeof(toastr) !== 'undefined') {                                                                          // 33
	                toastr.success("Follow Up succesfully saved");                                                        // 34
	              }                                                                                                       // 35
							}                                                                                                               // 36
						});                                                                                                              // 37
					 }                                                                                                                // 38
				 }); //end of second bootbox                                                                                       // 39
			 } //end of else                                                                                                    // 40
		 });                                                                                                                 // 41
	 });                                                                                                                  // 42
	} // end of if followup                                                                                               // 43
};                                                                                                                     // 44
                                                                                                                       // 45
Template.nav.helpers({                                                                                                 // 46
	onDemo: function () {                                                                                                 // 47
		return (document.URL.indexOf("demo.rationalk.ch") === -1) ? false : true;                                            // 48
	},                                                                                                                    // 49
	updateLocale: function () {                                                                                           // 50
		if ( (typeof(Meteor.user()) !== 'undefined') && (Meteor.user()) ) {                                                  // 51
	    if (typeof(Meteor.user().profile.locale) !== 'undefined') {                                                       // 52
	      TAPi18n.setLanguage(Meteor.user().profile.locale);                                                              // 53
				i18n.setLanguage(Meteor.user().profile.locale);                                                                    // 54
	    }                                                                                                                 // 55
	    else {                                                                                                            // 56
	      TAPi18n.setLanguage('en');                                                                                      // 57
				i18n.setLanguage('en');                                                                                            // 58
	    }                                                                                                                 // 59
	  }                                                                                                                   // 60
	  else {                                                                                                              // 61
	    TAPi18n.setLanguage('en');                                                                                        // 62
			i18n.setLanguage('en');                                                                                             // 63
	  }                                                                                                                   // 64
	},                                                                                                                    // 65
	onInvitationPage: function () {                                                                                       // 66
	  if (Router.current().url.indexOf("/invitation/") !== -1) {                                                          // 67
			RKCore.log('I am on the invitation page, I will hide the Sign-In button.');                                         // 68
	    return true;                                                                                                      // 69
	  }                                                                                                                   // 70
		return false;                                                                                                        // 71
	},                                                                                                                    // 72
	loggedIn: function () {                                                                                               // 73
    return Meteor.user();                                                                                              // 74
  },                                                                                                                   // 75
	packageMenu: function () {                                                                                            // 76
		return RKCore.packageMenu;                                                                                           // 77
	},                                                                                                                    // 78
	username: function () {                                                                                               // 79
		return Meteor.user().username;                                                                                       // 80
	},                                                                                                                    // 81
	show: function (navItem) {                                                                                            // 82
		return Meteor.settings.public.show[navItem];                                                                         // 83
  },                                                                                                                   // 84
	hasTemplate: function (templateName) {                                                                                // 85
    return Template[templateName];                                                                                     // 86
  },                                                                                                                   // 87
	headerText: function () {                                                                                             // 88
		return (typeof(Meteor.settings.public.header_text) !== 'undefined') ? Meteor.settings.public.header_text : "rationalK";
	},                                                                                                                    // 90
	categories: function () {                                                                                             // 91
		return Categories.find().fetch();                                                                                    // 92
	},                                                                                                                    // 93
});                                                                                                                    // 94
                                                                                                                       // 95
Template.nav.events({                                                                                                  // 96
	'submit #logout-form': function (e) {                                                                                 // 97
		e.preventDefault();                                                                                                  // 98
	  Meteor.logout();                                                                                                    // 99
	  return false;                                                                                                       // 100
	},                                                                                                                    // 101
	'click a.logout': function (e) {                                                                                      // 102
		e.preventDefault();                                                                                                  // 103
	  Meteor.logout();                                                                                                    // 104
	  return false;                                                                                                       // 105
	},                                                                                                                    // 106
	"click a.selectCategory": function (e) {                                                                              // 107
		e.preventDefault();                                                                                                  // 108
	  Session.set('selectedCategory', e.currentTarget.dataset.catid);                                                     // 109
	  return Router.go("browse", {categorySlug: e.currentTarget.dataset.slug});                                           // 110
	},                                                                                                                    // 111
});                                                                                                                    // 112
                                                                                                                       // 113
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:core/lib/client/templates/template.navExternal.js                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("navExternal");                                                                                   // 2
Template["navExternal"] = new Template("Template.navExternal", (function() {                                           // 3
  var view = this;                                                                                                     // 4
  return HTML.NAV({                                                                                                    // 5
    "class": "navbar navbar-default"                                                                                   // 6
  }, "\n		", HTML.DIV({                                                                                                // 7
    "class": "container-fluid"                                                                                         // 8
  }, "\n			", HTML.DIV({                                                                                               // 9
    "class": "navbar-header"                                                                                           // 10
  }, "\n				", HTML.Raw('<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">\n              <span class="sr-only">Toggle navigation</span>\n              <span class="icon-bar"></span>\n              <span class="icon-bar"></span>\n              <span class="icon-bar"></span>\n            </button>'), "\n            ", HTML.STRONG(Blaze.View("lookup:headerText", function() {
    return Spacebars.mustache(view.lookup("headerText"));                                                              // 12
  })), "\n      "), "\n		"), HTML.Raw("<!--/.container-fluid -->\n	"));                                                // 13
}));                                                                                                                   // 14
                                                                                                                       // 15
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:core/lib/client/templates/navExternal.js                                                         //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Template.navExternal.rendered = function () {                                                                          // 1
	document.title = (typeof(Meteor.settings.public.header_text) !== 'undefined')?Meteor.settings.public.header_text:"rationalK";
};                                                                                                                     // 3
                                                                                                                       // 4
Template.navExternal.helpers({                                                                                         // 5
	onDemo: function () {                                                                                                 // 6
		if (document.URL.indexOf("demo.rationalk.ch") == -1){                                                                // 7
			return false;                                                                                                       // 8
		}                                                                                                                    // 9
		else {                                                                                                               // 10
			return true;                                                                                                        // 11
		}                                                                                                                    // 12
	},                                                                                                                    // 13
	updateLocale: function () {                                                                                           // 14
		if ( (typeof(Meteor.user()) !== 'undefined') && (Meteor.user()) ) {                                                  // 15
	    if (typeof(Meteor.user().profile.locale) !== 'undefined') {                                                       // 16
	      TAPi18n.setLanguage(Meteor.user().profile.locale);                                                              // 17
				i18n.setLanguage(Meteor.user().profile.locale);                                                                    // 18
	    }                                                                                                                 // 19
	    else {                                                                                                            // 20
	      TAPi18n.setLanguage('en');                                                                                      // 21
				i18n.setLanguage('en');                                                                                            // 22
	    }                                                                                                                 // 23
	  }                                                                                                                   // 24
	  else {                                                                                                              // 25
	    TAPi18n.setLanguage('en');                                                                                        // 26
			i18n.setLanguage('en');                                                                                             // 27
	  }                                                                                                                   // 28
	},                                                                                                                    // 29
	onInvitationPage : function () {                                                                                      // 30
	  if (Router.current().url.indexOf("/invitation/") == -1){                                                            // 31
	    // I am not on the invitation page                                                                                // 32
	    return false                                                                                                      // 33
	  }                                                                                                                   // 34
	  else {                                                                                                              // 35
			console.log('I am on the invitation page, I will hide the Sign-In button.')                                         // 36
	    return true                                                                                                       // 37
	  }                                                                                                                   // 38
	},                                                                                                                    // 39
	loggedIn: function () {                                                                                               // 40
    return Meteor.user();                                                                                              // 41
  },                                                                                                                   // 42
	username: function (){                                                                                                // 43
		return Meteor.user().username;                                                                                       // 44
	},                                                                                                                    // 45
	headerText: function (){                                                                                              // 46
		return (typeof(Meteor.settings.public.header_text) !== 'undefined')?Meteor.settings.public.header_text:"rationalK";  // 47
	},                                                                                                                    // 48
	categoriesWithSlug : function (){                                                                                     // 49
		return Session.get("categoriesWithSlug");                                                                            // 50
	}                                                                                                                     // 51
});                                                                                                                    // 52
                                                                                                                       // 53
Template.navExternal.events({                                                                                          // 54
	'submit #logout-form' : function (e, t){                                                                              // 55
		e.preventDefault();                                                                                                  // 56
	  Meteor.logout();                                                                                                    // 57
	  return false;                                                                                                       // 58
	},                                                                                                                    // 59
	'click a.logout' : function (e, t){                                                                                   // 60
		e.preventDefault();                                                                                                  // 61
	  Meteor.logout();                                                                                                    // 62
	  return false;                                                                                                       // 63
	},                                                                                                                    // 64
	"click a.selectCategory": function (e) {                                                                              // 65
		e.preventDefault();                                                                                                  // 66
	  Session.set('selectedCategory', e.currentTarget.dataset.catid);                                                     // 67
	  return Router.go("browse",{categorySlug : e.currentTarget.dataset.slug});                                           // 68
	 }                                                                                                                    // 69
});                                                                                                                    // 70
                                                                                                                       // 71
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rationalk:core/lib/client/templates/template.printLayout.js                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
                                                                                                                       // 1
Template.__checkName("printLayout");                                                                                   // 2
Template["printLayout"] = new Template("Template.printLayout", (function() {                                           // 3
  var view = this;                                                                                                     // 4
  return [ HTML.Raw("<!-- needed for the special css print -->\n    <!-- yield should contain a subpage div (needed for the special css print) -->\n    "), Spacebars.include(view.lookupTemplate("yield")) ];
}));                                                                                                                   // 6
                                                                                                                       // 7
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
