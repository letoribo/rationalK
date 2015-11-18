(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:core/lib/methods.js                                                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
RKCore = {};                                                                                                          // 1
RKCore.packageMenu = []; // Packages can hook there to add menu entries.                                              // 2
RKCore.packageDashboard = []; // Packages can hook there to add dashboard entries.                                    // 3
RKCore.packageSettings = []; // Packages can hook there to add settings entries.                                      // 4
RKCore.packageBackup = []; // Packages can hook there to add table for backup.                                        // 5
RKCore.searchResultsPackage = [];                                                                                     // 6
RKCore.externalSearchResultsPackage = [];                                                                             // 7
RKCore.customFieldsType = [];                                                                                         // 8
                                                                                                                      // 9
RKCore.log = function (data) {                                                                                        // 10
  if (Meteor.settings.public.debug) {                                                                                 // 11
    console.log(data);                                                                                                // 12
  }                                                                                                                   // 13
};                                                                                                                    // 14
                                                                                                                      // 15
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:core/lib/routes.js                                                                              //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
enforceLogin = function () {                                                                                          // 1
  var routeName = this.url;                                                                                           // 2
  if (routeName.match(/login/)) {                                                                                     // 3
    return;                                                                                                           // 4
  }                                                                                                                   // 5
  if (routeName.match(/invitation/)) {                                                                                // 6
    this.next();                                                                                                      // 7
    return;                                                                                                           // 8
  }                                                                                                                   // 9
  if (routeName.match(/reset-password/)) {                                                                            // 10
    this.next();                                                                                                      // 11
    return;                                                                                                           // 12
  }                                                                                                                   // 13
  if (routeName.match(/external/)) {                                                                                  // 14
    this.next();                                                                                                      // 15
    return;                                                                                                           // 16
  }                                                                                                                   // 17
  if (routeName.match(/serverToken/)) {                                                                               // 18
    this.next();                                                                                                      // 19
    return;                                                                                                           // 20
  }                                                                                                                   // 21
  if (!Meteor.userId()) {                                                                                             // 22
    this.layout("loginLayout");                                                                                       // 23
    this.render();                                                                                                    // 24
    return;                                                                                                           // 25
  }                                                                                                                   // 26
  this.next();                                                                                                        // 27
};                                                                                                                    // 28
                                                                                                                      // 29
Router.onBeforeAction(function () {                                                                                   // 30
  this.next();                                                                                                        // 31
});                                                                                                                   // 32
                                                                                                                      // 33
Router.onBeforeAction(enforceLogin);                                                                                  // 34
                                                                                                                      // 35
Router.route("/", {                                                                                                   // 36
  name: "dashboard",                                                                                                  // 37
  waitOn: function () {                                                                                               // 38
    return [                                                                                                          // 39
      Meteor.subscribe("views"),                                                                                      // 40
      Meteor.subscribe("docs"),                                                                                       // 41
      Meteor.subscribe("members"), //needed to display the last activity owner                                        // 42
      Meteor.subscribe("history"),                                                                                    // 43
      Meteor.subscribe("revisions"),                                                                                  // 44
      Meteor.subscribe("categories"),                                                                                 // 45
      Meteor.subscribe("mySpace"),                                                                                    // 46
      ];                                                                                                              // 47
  },                                                                                                                  // 48
  progress: {                                                                                                         // 49
    enabled: false,                                                                                                   // 50
  },                                                                                                                  // 51
});                                                                                                                   // 52
                                                                                                                      // 53
Router.configure({                                                                                                    // 54
  layoutTemplate: "layout",                                                                                           // 55
  loadingTemplate: "loading",                                                                                         // 56
  waitOn: function () {                                                                                               // 57
    return [Meteor.subscribe("members")];                                                                             // 58
  },                                                                                                                  // 59
});                                                                                                                   // 60
                                                                                                                      // 61
Router.route("/login", {                                                                                              // 62
  layoutTemplate: 'loginLayout',                                                                                      // 63
  data: function () {                                                                                                 // 64
    templateData = { docs: Docs.find({}) };                                                                           // 65
    return templateData;                                                                                              // 66
  },                                                                                                                  // 67
  waitOn: function () {                                                                                               // 68
    return [                                                                                                          // 69
      Meteor.subscribe("naccounts"),                                                                                  // 70
      Meteor.subscribe("accounts"),                                                                                   // 71
      Meteor.subscribe("members"),                                                                                    // 72
    ];                                                                                                                // 73
  },                                                                                                                  // 74
});                                                                                                                   // 75
                                                                                                                      // 76
Router.route("/access-denied", {                                                                                      // 77
  layoutTemplate: 'accessDenied',                                                                                     // 78
});                                                                                                                   // 79
                                                                                                                      // 80
                                                                                                                      // 81
Router.route("/reset-password/:token", {                                                                              // 82
  name: "resetPassword",                                                                                              // 83
  waitOn: function () {                                                                                               // 84
    return [                                                                                                          // 85
                                                                                                                      // 86
    ];                                                                                                                // 87
  },                                                                                                                  // 88
});                                                                                                                   // 89
                                                                                                                      // 90
Router.route("/account/new", {                                                                                        // 91
  name: "accountNew",                                                                                                 // 92
  waitOn: function () {                                                                                               // 93
    return [Meteor.subscribe("accounts")];                                                                            // 94
  },                                                                                                                  // 95
});                                                                                                                   // 96
                                                                                                                      // 97
Router.route("/tags", {                                                                                               // 98
  waitOn: function () {                                                                                               // 99
    return [                                                                                                          // 100
      Meteor.subscribe("docs"),                                                                                       // 101
      Meteor.subscribe("tags"),                                                                                       // 102
    ];                                                                                                                // 103
  },                                                                                                                  // 104
});                                                                                                                   // 105
                                                                                                                      // 106
Router.route("/account/:_id/edit", {                                                                                  // 107
  name: "accountEdit",                                                                                                // 108
  data: function () {                                                                                                 // 109
    return Meteor.users.findOne(this.params._id);                                                                     // 110
  },                                                                                                                  // 111
  waitOn: function () {                                                                                               // 112
    return [Meteor.subscribe("accounts")];                                                                            // 113
  },                                                                                                                  // 114
});                                                                                                                   // 115
                                                                                                                      // 116
Router.route("/accounts", {                                                                                           // 117
  name: "accountList",                                                                                                // 118
  waitOn: function () {                                                                                               // 119
    return [Meteor.subscribe("accounts")];                                                                            // 120
  },                                                                                                                  // 121
});                                                                                                                   // 122
                                                                                                                      // 123
Router.route("/axapta", {                                                                                             // 124
  name: "axapta",                                                                                                     // 125
  waitOn: function () {                                                                                               // 126
    return [                                                                                                          // 127
      Meteor.subscribe("axapta"),                                                                                     // 128
    ];                                                                                                                // 129
  },                                                                                                                  // 130
});                                                                                                                   // 131
                                                                                                                      // 132
Router.route("/members", {                                                                                            // 133
  name: "members",                                                                                                    // 134
  waitOn: function () {                                                                                               // 135
    return [                                                                                                          // 136
      Meteor.subscribe("members"),                                                                                    // 137
      Meteor.subscribe("invitation"),                                                                                 // 138
    ];                                                                                                                // 139
  },                                                                                                                  // 140
});                                                                                                                   // 141
                                                                                                                      // 142
                                                                                                                      // 143
                                                                                                                      // 144
Router.route("/member/new", {                                                                                         // 145
  name: "memberNew",                                                                                                  // 146
  waitOn: function () {                                                                                               // 147
    return [                                                                                                          // 148
      Meteor.subscribe("members"),                                                                                    // 149
    ];                                                                                                                // 150
  },                                                                                                                  // 151
});                                                                                                                   // 152
                                                                                                                      // 153
Router.route("/member/:_id/edit", {                                                                                   // 154
  name: "memberEdit",                                                                                                 // 155
  data: function () {                                                                                                 // 156
    return Members.collection.findOne({                                                                               // 157
      _id: this.params._id,                                                                                           // 158
    });                                                                                                               // 159
  },                                                                                                                  // 160
  waitOn: function () {                                                                                               // 161
    return [                                                                                                          // 162
      Meteor.subscribe("member", this.params._id),                                                                    // 163
      Meteor.subscribe("rkSettings"),                                                                                 // 164
    ];                                                                                                                // 165
  },                                                                                                                  // 166
});                                                                                                                   // 167
                                                                                                                      // 168
Router.route("/views/add", {                                                                                          // 169
  name: "viewNew",                                                                                                    // 170
  waitOn: function () {                                                                                               // 171
    return [Meteor.subscribe("views")];                                                                               // 172
  },                                                                                                                  // 173
});                                                                                                                   // 174
                                                                                                                      // 175
Router.route("/view/:_id/edit", {                                                                                     // 176
  name: "viewEdit",                                                                                                   // 177
  data: function () {                                                                                                 // 178
    return Views.findOne({}, {                                                                                        // 179
      reactive: true,                                                                                                 // 180
    });                                                                                                               // 181
  },                                                                                                                  // 182
  waitOn: function () {                                                                                               // 183
    var data = {};                                                                                                    // 184
    data.viewId = this.params._id;                                                                                    // 185
    return [Meteor.subscribe("views", data)];                                                                         // 186
  },                                                                                                                  // 187
});                                                                                                                   // 188
                                                                                                                      // 189
Router.route("/views", {                                                                                              // 190
  name: "viewList",                                                                                                   // 191
  waitOn: function () {                                                                                               // 192
    return [                                                                                                          // 193
      Meteor.subscribe("views"),                                                                                      // 194
    ];                                                                                                                // 195
  },                                                                                                                  // 196
});                                                                                                                   // 197
                                                                                                                      // 198
Router.route("/filelinks", {                                                                                          // 199
  name: "filelinks",                                                                                                  // 200
  waitOn: function () {                                                                                               // 201
    return [Meteor.subscribe("filelinks")];                                                                           // 202
  },                                                                                                                  // 203
});                                                                                                                   // 204
                                                                                                                      // 205
Router.route("/xml", {                                                                                                // 206
  name: "xml",                                                                                                        // 207
  waitOn: function () {                                                                                               // 208
    return [                                                                                                          // 209
      Meteor.subscribe("XMLFiles"),                                                                                   // 210
    ];                                                                                                                // 211
  },                                                                                                                  // 212
});                                                                                                                   // 213
                                                                                                                      // 214
                                                                                                                      // 215
if (Meteor.settings.public.show.controlplan) {                                                                        // 216
  Router.route("/controlplan", {                                                                                      // 217
    name: "controlplan",                                                                                              // 218
    waitOn: function () {                                                                                             // 219
      return [Meteor.subscribe("controlplan")];                                                                       // 220
    },                                                                                                                // 221
  });                                                                                                                 // 222
                                                                                                                      // 223
  Router.route("/controlplan/:_id/decCDMER", {                                                                        // 224
    name: "decCDMER",                                                                                                 // 225
    layoutTemplate: 'printLayout',                                                                                    // 226
    waitOn: function () {                                                                                             // 227
      return [Meteor.subscribe("controlplan")];                                                                       // 228
    },                                                                                                                // 229
  });                                                                                                                 // 230
                                                                                                                      // 231
  Router.route("/controlplan/:_id/planageCDMER", {                                                                    // 232
    name: "planageCDMER",                                                                                             // 233
    layoutTemplate: 'printLayout',                                                                                    // 234
    waitOn: function () {                                                                                             // 235
      return [Meteor.subscribe("controlplan")];                                                                       // 236
    },                                                                                                                // 237
  });                                                                                                                 // 238
}                                                                                                                     // 239
                                                                                                                      // 240
Router.route("/processes/:role/listDocs", {                                                                           // 241
  name: "listDocsForRoles",                                                                                           // 242
  waitOn: function () {                                                                                               // 243
    var data = {};                                                                                                    // 244
    data.role = this.params.role;                                                                                     // 245
    return [                                                                                                          // 246
      Meteor.subscribe("docs", data),                                                                                 // 247
      Meteor.subscribe("rkSettings"),                                                                                 // 248
    ];                                                                                                                // 249
  },                                                                                                                  // 250
});                                                                                                                   // 251
                                                                                                                      // 252
if (Meteor.settings.public.show.processes) {                                                                          // 253
  Router.route("/processes", {                                                                                        // 254
    name: "processes",                                                                                                // 255
    waitOn: function () {                                                                                             // 256
      return [                                                                                                        // 257
        Meteor.subscribe("processes"),                                                                                // 258
        Meteor.subscribe("rkSettings"),                                                                               // 259
      ];                                                                                                              // 260
    },                                                                                                                // 261
  });                                                                                                                 // 262
                                                                                                                      // 263
  Router.route("/processdocuments", {                                                                                 // 264
    name: "processdocuments",                                                                                         // 265
    waitOn: function () {                                                                                             // 266
      return [Meteor.subscribe("processdocuments")];                                                                  // 267
    },                                                                                                                // 268
  });                                                                                                                 // 269
                                                                                                                      // 270
  Router.route("/process/:_id", {                                                                                     // 271
    name: "process",                                                                                                  // 272
    data: function () {                                                                                               // 273
      return Processes.findOne(this.params._id);                                                                      // 274
    },                                                                                                                // 275
    waitOn: function () {                                                                                             // 276
      return [Meteor.subscribe("process", this.params._id), Meteor.subscribe("processdocuments")];                    // 277
    },                                                                                                                // 278
  });                                                                                                                 // 279
                                                                                                                      // 280
  Router.route("/updateprocessdocuments/:processId/:elementId", {                                                     // 281
    name: "updateprocessdocuments",                                                                                   // 282
    data: function () {                                                                                               // 283
      return Processes.findOne(this.params.processId);                                                                // 284
    },                                                                                                                // 285
    waitOn: function () {                                                                                             // 286
      return [                                                                                                        // 287
        Meteor.subscribe("process", this.params.processId),                                                           // 288
        Meteor.subscribe("processdocuments"),                                                                         // 289
        Meteor.subscribe("docs"),                                                                                     // 290
        Meteor.subscribe("revisions"),                                                                                // 291
        Meteor.subscribe("categories"),                                                                               // 292
        Meteor.subscribe("searchqueries"),                                                                            // 293
        Meteor.subscribe("views"),                                                                                    // 294
        Meteor.subscribe("discussions"),                                                                              // 295
        Meteor.subscribe("messages"),                                                                                 // 296
        Meteor.subscribe("members"),                                                                                  // 297
        Meteor.subscribe("walkedfiles"),                                                                              // 298
        Meteor.subscribe("myNotes"),                                                                                  // 299
      ];                                                                                                              // 300
    },                                                                                                                // 301
  });                                                                                                                 // 302
}                                                                                                                     // 303
                                                                                                                      // 304
if (Meteor.settings.public.show.gantts) {                                                                             // 305
  Router.route("/gantts", {                                                                                           // 306
    name: "gantts",                                                                                                   // 307
    waitOn: function () {                                                                                             // 308
      return [                                                                                                        // 309
        Meteor.subscribe("gantts"),                                                                                   // 310
      ];                                                                                                              // 311
    },                                                                                                                // 312
  });                                                                                                                 // 313
                                                                                                                      // 314
  Router.route("/gantt/:_id", {                                                                                       // 315
    name: "gantt",                                                                                                    // 316
    data: function () {                                                                                               // 317
      return Gantts.findOne(this.params._id);                                                                         // 318
    },                                                                                                                // 319
    waitOn: function () {                                                                                             // 320
      return [                                                                                                        // 321
        Meteor.subscribe("gantts", this.params._id),                                                                  // 322
       ];                                                                                                             // 323
    },                                                                                                                // 324
  });                                                                                                                 // 325
}                                                                                                                     // 326
                                                                                                                      // 327
Router.route("/docs/docImport", {                                                                                     // 328
  name: "docImport",                                                                                                  // 329
  waitOn: function () {                                                                                               // 330
    return [                                                                                                          // 331
      Meteor.subscribe("categories"),                                                                                 // 332
    ];                                                                                                                // 333
  },                                                                                                                  // 334
});                                                                                                                   // 335
                                                                                                                      // 336
Router.route("/docs/docExport", {                                                                                     // 337
  name: "docExport",                                                                                                  // 338
  waitOn: function () {                                                                                               // 339
    return [                                                                                                          // 340
      Meteor.subscribe("categories"),                                                                                 // 341
      Meteor.subscribe('docs'),                                                                                       // 342
    ];                                                                                                                // 343
  },                                                                                                                  // 344
});                                                                                                                   // 345
                                                                                                                      // 346
Router.route("/calculation", {                                                                                        // 347
  name: "calculation",                                                                                                // 348
  waitOn: function () {                                                                                               // 349
    return [                                                                                                          // 350
                                                                                                                      // 351
    ];                                                                                                                // 352
  },                                                                                                                  // 353
});                                                                                                                   // 354
                                                                                                                      // 355
Router.route("/doc/:_id/edit", {                                                                                      // 356
  name: "docEdit",                                                                                                    // 357
  onBeforeAction: function () {                                                                                       // 358
    if (Roles.userIsInRole(Meteor.user(), ['readonly'])) {                                                            // 359
      // render the accessDenied template but keep the url in the browser the same                                    // 360
      this.render('accessDenied');                                                                                    // 361
    }                                                                                                                 // 362
    else {                                                                                                            // 363
      this.next();                                                                                                    // 364
    }                                                                                                                 // 365
  },                                                                                                                  // 366
  data: function () {                                                                                                 // 367
    return Docs.findOne(this.params._id);                                                                             // 368
  },                                                                                                                  // 369
  waitOn: function () {                                                                                               // 370
    var data = {};                                                                                                    // 371
    data.docId = this.params._id;                                                                                     // 372
    return [                                                                                                          // 373
      Meteor.subscribe("docs", data),                                                                                 // 374
      Meteor.subscribe("views"), //need all                                                                           // 375
      Meteor.subscribe("members"), //need all                                                                         // 376
      Meteor.subscribe("categories"), //need all                                                                      // 377
      Meteor.subscribe("attachments", "doc-" + data.docId),                                                           // 378
      Meteor.subscribe("predefinedtags"),                                                                             // 379
      Meteor.subscribe("rkSettings"),                                                                                 // 380
      Meteor.subscribe("mySpace"),                                                                                    // 381
      Meteor.subscribe("docHistory", data.docId),                                                                     // 382
    ];                                                                                                                // 383
  },                                                                                                                  // 384
});                                                                                                                   // 385
                                                                                                                      // 386
Router.route("/revision/:_id/view", {                                                                                 // 387
  name: "revisionView",                                                                                               // 388
  data: function () {                                                                                                 // 389
    return Revisions.findOne(this.params._id);                                                                        // 390
  },                                                                                                                  // 391
  waitOn: function () {                                                                                               // 392
    var data = {};                                                                                                    // 393
    data.revisionId = this.params._id;                                                                                // 394
    return [                                                                                                          // 395
      Meteor.subscribe("docs", data),                                                                                 // 396
      Meteor.subscribe("views", data),                                                                                // 397
      Meteor.subscribe("members"),                                                                                    // 398
      Meteor.subscribe("categories", data),                                                                           // 399
      Meteor.subscribe("revisions", data),                                                                            // 400
      Meteor.subscribe("predefinedtags"),                                                                             // 401
      Meteor.subscribe("mySpace"),                                                                                    // 402
    ];                                                                                                                // 403
  },                                                                                                                  // 404
});                                                                                                                   // 405
                                                                                                                      // 406
Router.route("/doc/create", {                                                                                         // 407
  name: "docCreate",                                                                                                  // 408
  template: "docEdit",                                                                                                // 409
  onBeforeAction: function () {                                                                                       // 410
    if (Roles.userIsInRole(Meteor.user(), ['readonly'])) {                                                            // 411
      // render the accessDenied template but keep the url in the browser the same                                    // 412
      this.render('accessDenied');                                                                                    // 413
    }                                                                                                                 // 414
    else {                                                                                                            // 415
      this.next();                                                                                                    // 416
    }                                                                                                                 // 417
  },                                                                                                                  // 418
  data: function () {                                                                                                 // 419
    return {                                                                                                          // 420
      categoryId: Session.get('selectedCategory'),                                                                    // 421
    };                                                                                                                // 422
  },                                                                                                                  // 423
  waitOn: function () {                                                                                               // 424
    return [                                                                                                          // 425
      Meteor.subscribe("docs"),                                                                                       // 426
      Meteor.subscribe("views"),                                                                                      // 427
      Meteor.subscribe("members"),                                                                                    // 428
      Meteor.subscribe("categories"),                                                                                 // 429
      Meteor.subscribe("predefinedtags"),                                                                             // 430
      Meteor.subscribe("rkSettings"),                                                                                 // 431
    ];                                                                                                                // 432
  },                                                                                                                  // 433
});                                                                                                                   // 434
                                                                                                                      // 435
Router.route("/categories/add", {                                                                                     // 436
  name: "categoryNew",                                                                                                // 437
  waitOn: function () {                                                                                               // 438
    return [Meteor.subscribe("categories"), Meteor.subscribe("views")];                                               // 439
  },                                                                                                                  // 440
});                                                                                                                   // 441
                                                                                                                      // 442
Router.route("/category/:_id/edit", {                                                                                 // 443
  name: "categoryEdit",                                                                                               // 444
  data: function () {                                                                                                 // 445
    return Categories.findOne(this.params._id);                                                                       // 446
  },                                                                                                                  // 447
  waitOn: function () {                                                                                               // 448
    var data = {};                                                                                                    // 449
    data.categoryId = this.params._id;                                                                                // 450
    return [                                                                                                          // 451
      Meteor.subscribe("categories", data),                                                                           // 452
      Meteor.subscribe("views", data),                                                                                // 453
      Meteor.subscribe("rkSettings"),                                                                                 // 454
    ];                                                                                                                // 455
  },                                                                                                                  // 456
});                                                                                                                   // 457
                                                                                                                      // 458
Router.route("/categories", {                                                                                         // 459
  name: "categoryList",                                                                                               // 460
  waitOn: function () {                                                                                               // 461
    return [                                                                                                          // 462
      Meteor.subscribe("categories"),                                                                                 // 463
      Meteor.subscribe("views"),                                                                                      // 464
    ];                                                                                                                // 465
  },                                                                                                                  // 466
});                                                                                                                   // 467
                                                                                                                      // 468
Router.route("/invitation/:invitationId", {                                                                           // 469
  name: "invitation",                                                                                                 // 470
  template: "invitation",                                                                                             // 471
  data: function () {                                                                                                 // 472
    return Members.invitations.findOne(this.params.invitationId);                                                     // 473
  },                                                                                                                  // 474
  waitOn: function () {                                                                                               // 475
    return [Meteor.subscribe("members"), Meteor.subscribe("invitation", this.params.invitationId)];                   // 476
  },                                                                                                                  // 477
});                                                                                                                   // 478
                                                                                                                      // 479
Router.route("/revisions/:docId", {                                                                                   // 480
  name: "revisions",                                                                                                  // 481
  template: "revisions",                                                                                              // 482
  waitOn: function () {                                                                                               // 483
    return [Meteor.subscribe("doc-revisions", this.params.docId), Meteor.subscribe("categories"), Meteor.subscribe("views")];
  },                                                                                                                  // 485
});                                                                                                                   // 486
                                                                                                                      // 487
Router.route("/browse/:categorySlug?", {                                                                              // 488
  name: "browse",                                                                                                     // 489
  data: function () {                                                                                                 // 490
    return this.params.categorySlug;                                                                                  // 491
  },                                                                                                                  // 492
  waitOn: function () {                                                                                               // 493
    return [                                                                                                          // 494
      Meteor.subscribe("mySpace"),                                                                                    // 495
      Meteor.subscribe("categories"),                                                                                 // 496
      Meteor.subscribe("views"),                                                                                      // 497
      Meteor.subscribe("docs"),                                                                                       // 498
      Meteor.subscribe("members"),                                                                                    // 499
      Meteor.subscribe("revisions"),                                                                                  // 500
    ];                                                                                                                // 501
  },                                                                                                                  // 502
});                                                                                                                   // 503
                                                                                                                      // 504
Router.route("/logs", {                                                                                               // 505
  name: "logs",                                                                                                       // 506
  waitOn: function () {                                                                                               // 507
    return [                                                                                                          // 508
      Meteor.subscribe("history"),                                                                                    // 509
    ];                                                                                                                // 510
  },                                                                                                                  // 511
});                                                                                                                   // 512
                                                                                                                      // 513
if (Meteor.settings.public.show.about) {                                                                              // 514
  Router.route("/about");                                                                                             // 515
}                                                                                                                     // 516
                                                                                                                      // 517
Router.route("/walk", {                                                                                               // 518
  waitOn: function () {                                                                                               // 519
    return [                                                                                                          // 520
      Meteor.subscribe("folderstoscan"),                                                                              // 521
      Meteor.subscribe("rkSettings"),                                                                                 // 522
      Meteor.subscribe("rkStatus"),                                                                                   // 523
    ];                                                                                                                // 524
  },                                                                                                                  // 525
});                                                                                                                   // 526
                                                                                                                      // 527
Router.route("/files", {                                                                                              // 528
  name: "files",                                                                                                      // 529
  waitOn: function () {                                                                                               // 530
    return [                                                                                                          // 531
      Meteor.subscribe("walkedfiles"),                                                                                // 532
      Meteor.subscribe("rkStatus"),                                                                                   // 533
    ];                                                                                                                // 534
  },                                                                                                                  // 535
});                                                                                                                   // 536
                                                                                                                      // 537
Router.route("/fileView", {                                                                                           // 538
  name: "fileView",                                                                                                   // 539
  waitOn: function () {                                                                                               // 540
    return [];                                                                                                        // 541
  },                                                                                                                  // 542
});                                                                                                                   // 543
                                                                                                                      // 544
Router.route("/backup", {                                                                                             // 545
  name: "backup",                                                                                                     // 546
  waitOn: function () {                                                                                               // 547
    return [                                                                                                          // 548
      Meteor.subscribe("members"),                                                                                    // 549
    ];                                                                                                                // 550
  },                                                                                                                  // 551
});                                                                                                                   // 552
                                                                                                                      // 553
Router.route("/synonyms", {                                                                                           // 554
  name: "synonyms",                                                                                                   // 555
  waitOn: function () {                                                                                               // 556
    return [Meteor.subscribe("synonyms")];                                                                            // 557
  },                                                                                                                  // 558
});                                                                                                                   // 559
                                                                                                                      // 560
if (Meteor.settings.public.show.relationships) {                                                                      // 561
  Router.route("/relationships", {                                                                                    // 562
    name: "relationships",                                                                                            // 563
    waitOn: function () {                                                                                             // 564
      return [];                                                                                                      // 565
    },                                                                                                                // 566
  });                                                                                                                 // 567
}                                                                                                                     // 568
                                                                                                                      // 569
Router.route("/search", {                                                                                             // 570
  name: "searchTpl",                                                                                                  // 571
  waitOn: function () {                                                                                               // 572
    var subscribtions =  [                                                                                            // 573
      Meteor.subscribe("revisions"),                                                                                  // 574
      Meteor.subscribe("categories"),                                                                                 // 575
      Meteor.subscribe("myCurrentSearchQuery"),                                                                       // 576
      Meteor.subscribe("views"),                                                                                      // 577
      Meteor.subscribe("tags"),                                                                                       // 578
      Meteor.subscribe("members"),                                                                                    // 579
      Meteor.subscribe("synonyms"),                                                                                   // 580
      Meteor.subscribe("mySpace"),                                                                                    // 581
      Meteor.subscribe("rkSettings"),                                                                                 // 582
    ];                                                                                                                // 583
                                                                                                                      // 584
    searchQuerySentToServer = Session.get("searchQuerySentToServer");                                                 // 585
                                                                                                                      // 586
    if ((typeof searchQuerySentToServer !== 'undefined') && (searchQuerySentToServer !== '') ) {                      // 587
      searchType = Session.get("searchType");                                                                         // 588
      catFilter = Session.get("catFilter");                                                                           // 589
      includeWalkedFilesInResults = Session.get('includeWalkedFilesInResults');                                       // 590
      if (typeof RKCSE !== 'undefined') {                                                                             // 591
        includeWebInResults = Session.get('includeWebInResults');                                                     // 592
      }                                                                                                               // 593
                                                                                                                      // 594
                                                                                                                      // 595
      RKCore.log("searchQuerySentToServer : " + searchQuerySentToServer);                                             // 596
      RKCore.log("searchType : " + searchType);                                                                       // 597
      RKCore.log("catFilter : " + catFilter);                                                                         // 598
      RKCore.log("includeWalkedFilesInResults : " + includeWalkedFilesInResults);                                     // 599
      if (typeof RKCSE !== 'undefined') {                                                                             // 600
        RKCore.log("includeWebInResults : " + includeWebInResults);                                                   // 601
      }                                                                                                               // 602
                                                                                                                      // 603
      Meteor.subscribe("searchResults", searchQuerySentToServer, catFilter, searchType, includeWalkedFilesInResults); // 604
                                                                                                                      // 605
      //todo transform like wiki :                                                                                    // 606
      if (typeof RKCSE !== 'undefined') {                                                                             // 607
        if (includeWebInResults) {                                                                                    // 608
          Meteor.subscribe("cse", searchQuerySentToServer);                                                           // 609
        }                                                                                                             // 610
      }                                                                                                               // 611
    }                                                                                                                 // 612
                                                                                                                      // 613
    return subscribtions;                                                                                             // 614
  },                                                                                                                  // 615
});                                                                                                                   // 616
                                                                                                                      // 617
                                                                                                                      // 618
Router.route("/stats", {                                                                                              // 619
  name: "stats",                                                                                                      // 620
  waitOn: function () {                                                                                               // 621
    return [                                                                                                          // 622
      Meteor.subscribe("categories"),                                                                                 // 623
      Meteor.subscribe("docs"),                                                                                       // 624
      Meteor.subscribe("history"),                                                                                    // 625
      Meteor.subscribe("revisions"),                                                                                  // 626
      Meteor.subscribe("searchqueries"),                                                                              // 627
      Meteor.subscribe("members"),                                                                                    // 628
      Meteor.subscribe("tags"),                                                                                       // 629
    ];                                                                                                                // 630
  },                                                                                                                  // 631
});                                                                                                                   // 632
                                                                                                                      // 633
Router.route("/predefinedtags/edit", {                                                                                // 634
  name: "predefinedtagsEdit",                                                                                         // 635
  waitOn: function () {                                                                                               // 636
    return [Meteor.subscribe("predefinedtags")];                                                                      // 637
  },                                                                                                                  // 638
});                                                                                                                   // 639
                                                                                                                      // 640
Router.route("/settings", {                                                                                           // 641
  name: "settingsTemplate",                                                                                           // 642
  waitOn: function () {                                                                                               // 643
    return [                                                                                                          // 644
      Meteor.subscribe("rkSettings"),                                                                                 // 645
      Meteor.subscribe("categories"), //for the nav, not good...#todo                                                 // 646
    ];                                                                                                                // 647
  },                                                                                                                  // 648
});                                                                                                                   // 649
                                                                                                                      // 650
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/rationalk:core/lib/server/methods.js                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Meteor.methods({                                                                                                      // 1
	checkInternetConnection: function () {                                                                               // 2
		this.unblock();                                                                                                     // 3
		console.log("Checking Internet Connection...");                                                                     // 4
		result = Meteor.http.get("http://google.ch");                                                                       // 5
		if (result.statusCode==200){                                                                                        // 6
			console.log('Internet connection alive');                                                                          // 7
			return true;                                                                                                       // 8
		}                                                                                                                   // 9
		return false;                                                                                                       // 10
	},                                                                                                                   // 11
	whatIsLastVersion: function () {                                                                                     // 12
		this.unblock();                                                                                                     // 13
		console.log("Checking last version...");                                                                            // 14
		result = Meteor.http.get("http://rationalk.ch/api/?action=whatIsLastVersion&key"+"="+Meteor.settings.rationalK_license_key);
		if (result.statusCode==200){                                                                                        // 16
			content = JSON.parse(result.content);                                                                              // 17
			return content;                                                                                                    // 18
		}                                                                                                                   // 19
		else {                                                                                                              // 20
			return false;                                                                                                      // 21
		}                                                                                                                   // 22
	},                                                                                                                   // 23
	dowloadFile :function () {                                                                                           // 24
		this.unblock();                                                                                                     // 25
		console.log("Dowloading file...");                                                                                  // 26
		result = Meteor.http.get("http://rationalk.ch");                                                                    // 27
		if (result.statusCode==200){                                                                                        // 28
			console.log('Internet connection alive');                                                                          // 29
			return true;                                                                                                       // 30
		}                                                                                                                   // 31
		else {                                                                                                              // 32
			return false;                                                                                                      // 33
		}                                                                                                                   // 34
	},                                                                                                                   // 35
	eventGetDate: function (id) {                                                                                        // 36
    return Dates.findOne({                                                                                            // 37
      _id: id                                                                                                         // 38
    }).startTime;                                                                                                     // 39
  },                                                                                                                  // 40
  docClearAll: function (categoryId) {                                                                                // 41
    var user;                                                                                                         // 42
    user = Meteor.user();                                                                                             // 43
    if (!user) {                                                                                                      // 44
      throw new Meteor.Error(401, "You need to login to delete this doc");                                            // 45
    }                                                                                                                 // 46
    if (!categoryId) {                                                                                                // 47
      throw new Meteor.Error(422, "Please select a category");                                                        // 48
    }                                                                                                                 // 49
    return Docs.remove({                                                                                              // 50
      categoryId: categoryId                                                                                          // 51
    });                                                                                                               // 52
  },                                                                                                                  // 53
  docImport: function (categoryId, row) {                                                                             // 54
		check(categoryId,String)                                                                                            // 55
		check(row, Match.Any )                                                                                              // 56
    var doc, docId, full, key, obj, user, value;                                                                      // 57
    user = Meteor.user();                                                                                             // 58
    if (!user) {                                                                                                      // 59
      throw new Meteor.Error(401, "You need to login to update a doc");                                               // 60
    }                                                                                                                 // 61
    obj = {                                                                                                           // 62
      categoryId: categoryId,                                                                                         // 63
      fields: {}                                                                                                      // 64
    };                                                                                                                // 65
    full = "";                                                                                                        // 66
    console.log(row);                                                                                                 // 67
    for (key in row) {                                                                                                // 68
      value = row[key];                                                                                               // 69
      key = key.replace(/\./g, ' ');                                                                                  // 70
      obj.fields["" + key] = {};                                                                                      // 71
      obj.fields["" + key].value = value;                                                                             // 72
      full = full.concat(value);                                                                                      // 73
    }                                                                                                                 // 74
    obj.full = full;                                                                                                  // 75
    obj.orgId = user.profile.orgId;                                                                                   // 76
    if (full && Docs.find({                                                                                           // 77
      full: obj.full                                                                                                  // 78
    }, {                                                                                                              // 79
      limit: 1                                                                                                        // 80
    }).count() === 0) {                                                                                               // 81
      docId = Docs.insert(obj);                                                                                       // 82
      console.log("Document " + docId + " inserted");                                                                 // 83
      return docId;                                                                                                   // 84
    } else {                                                                                                          // 85
      if (full) {                                                                                                     // 86
        doc = Docs.findOne({                                                                                          // 87
          full: obj.full                                                                                              // 88
        });                                                                                                           // 89
        console.log('Document already exists');                                                                       // 90
        console.log(obj);                                                                                             // 91
        return doc._id;                                                                                               // 92
      } else {                                                                                                        // 93
        console.log('Object is EMPTY, ignoring it (This is normal for the last element)');                            // 94
        return false;                                                                                                 // 95
      }                                                                                                               // 96
    }                                                                                                                 // 97
		// reindex the mongo (i dont know if this is useful...):                                                            // 98
                                                                                                                      // 99
		if (typeof Docs.reIndex === 'function'){                                                                            // 100
			console.log("Rebuilding the mongo index after batch import.")                                                      // 101
			Docs.reIndex();                                                                                                    // 102
		}                                                                                                                   // 103
                                                                                                                      // 104
  },                                                                                                                  // 105
  "docImport-autoCreateFields": function (categoryId, row) {                                                          // 106
		check(categoryId,String)                                                                                            // 107
		check(row, Match.Any )                                                                                              // 108
    var key, value;                                                                                                   // 109
    var user = Meteor.user();                                                                                         // 110
    if (!user) {                                                                                                      // 111
      throw new Meteor.Error(401, "You need to login to call this method");                                           // 112
    }                                                                                                                 // 113
    var category = Categories.findOne({                                                                               // 114
      _id: categoryId                                                                                                 // 115
    });                                                                                                               // 116
    var viewId = category.viewId;                                                                                     // 117
    var view = Views.findOne({                                                                                        // 118
      _id: viewId                                                                                                     // 119
    });                                                                                                               // 120
    for (key in row) {                                                                                                // 121
      value = row[key];                                                                                               // 122
      key = key.replace(/\./g, ' ');                                                                                  // 123
      Meteor.call('viewAddField', {                                                                                   // 124
        viewId: viewId,                                                                                               // 125
        newField: key,                                                                                                // 126
        newFieldType: 'text',                                                                                         // 127
        mandatory: false,                                                                                             // 128
        unique: false                                                                                                 // 129
      });                                                                                                             // 130
    }                                                                                                                 // 131
    return true;                                                                                                      // 132
  },                                                                                                                  // 133
	listCategoriesWithSlug: function () {                                                                                // 134
    if (!Meteor.user()) {throw new Meteor.Error(401, "You need to login to call this method");}                       // 135
    var cat = Categories.find({ slug: { $exists: true } }).fetch();                                                   // 136
    return cat;                                                                                                       // 137
  }                                                                                                                   // 138
});                                                                                                                   // 139
                                                                                                                      // 140
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
