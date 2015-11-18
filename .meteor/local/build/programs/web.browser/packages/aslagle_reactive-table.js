//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Template = Package.templating.Template;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var _ = Package.underscore._;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var i18n = Package['anti:i18n'].i18n;
var Mongo = Package.mongo.Mongo;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var ReactiveTable, get, oldField, sortedRows, normalizeSort, getSortedFields, getSortQuery, sortWithFunctions, getPrimarySortField, changePrimarySort, getFilterQuery, dependOnFilters, getFilterStrings, getFilterFields;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/aslagle:reactive-table/lib/template.reactive_table.js                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.__checkName("reactiveTable");                                                                               // 2
Template["reactiveTable"] = new Template("Template.reactiveTable", (function() {                                     // 3
  var view = this;                                                                                                   // 4
  return Spacebars.With(function() {                                                                                 // 5
    return Spacebars.call(view.lookup("context"));                                                                   // 6
  }, function() {                                                                                                    // 7
    return [ "\n  ", Blaze.If(function() {                                                                           // 8
      return Spacebars.call(view.lookup("ready"));                                                                   // 9
    }, function() {                                                                                                  // 10
      return [ "\n    ", HTML.DIV({                                                                                  // 11
        "class": "clearfix"                                                                                          // 12
      }, "\n      ", HTML.DIV({                                                                                      // 13
        "class": "reactive-table-options col-sm-8 pull-right"                                                        // 14
      }, "\n        ", Blaze.If(function() {                                                                         // 15
        return Spacebars.call(view.lookup("showFilter"));                                                            // 16
      }, function() {                                                                                                // 17
        return [ "\n          ", HTML.DIV({                                                                          // 18
          "class": "reactive-table-filter form-group col-sm-8 pull-right"                                            // 19
        }, "\n            ", Blaze._TemplateWith(function() {                                                        // 20
          return {                                                                                                   // 21
            id: Spacebars.call(view.lookup("getFilterId")),                                                          // 22
            useFontAwesome: Spacebars.call(view.lookup("useFontAwesome"))                                            // 23
          };                                                                                                         // 24
        }, function() {                                                                                              // 25
          return Spacebars.include(view.lookupTemplate("reactiveTableFilter"));                                      // 26
        }), "\n          "), "\n        " ];                                                                         // 27
      }), "\n        ", Blaze.If(function() {                                                                        // 28
        return Spacebars.call(view.lookup("showColumnToggles"));                                                     // 29
      }, function() {                                                                                                // 30
        return [ "\n          ", HTML.DIV({                                                                          // 31
          "class": "reactive-table-columns-dropdown col-sm-4 pull-right"                                             // 32
        }, "\n            ", HTML.BUTTON({                                                                           // 33
          "class": "btn btn-default dropdown-toggle",                                                                // 34
          id: function() {                                                                                           // 35
            return [ "reactive-table-add-column-", Spacebars.mustache(view.lookup("id")) ];                          // 36
          },                                                                                                         // 37
          "data-toggle": "dropdown"                                                                                  // 38
        }, "\n              ", Blaze.View("lookup:i18n", function() {                                                // 39
          return Spacebars.mustache(view.lookup("i18n"), "reactiveTable.columns");                                   // 40
        }), "\n            "), "\n            ", HTML.UL({                                                           // 41
          "class": "dropdown-menu dropdown-menu-right",                                                              // 42
          role: "menu",                                                                                              // 43
          "aria-labelledby": function() {                                                                            // 44
            return [ "reactive-table-add-column-", Spacebars.mustache(view.lookup("id")) ];                          // 45
          }                                                                                                          // 46
        }, "\n              ", Blaze.Each(function() {                                                               // 47
          return Spacebars.call(view.lookup("fields"));                                                              // 48
        }, function() {                                                                                              // 49
          return [ "\n                ", Blaze.Unless(function() {                                                   // 50
            return Spacebars.call(view.lookup("hideToggle"));                                                        // 51
          }, function() {                                                                                            // 52
            return [ "\n                  ", HTML.LI({                                                               // 53
              role: "presentation"                                                                                   // 54
            }, HTML.A({                                                                                              // 55
              role: "menuitem",                                                                                      // 56
              tabindex: "-1",                                                                                        // 57
              "data-target": "#"                                                                                     // 58
            }, "\n                    ", Blaze.If(function() {                                                       // 59
              return Spacebars.call(view.lookup("isVisible"));                                                       // 60
            }, function() {                                                                                          // 61
              return [ "\n                      ", HTML.INPUT({                                                      // 62
                type: "checkbox",                                                                                    // 63
                checked: "",                                                                                         // 64
                "data-fieldid": function() {                                                                         // 65
                  return Spacebars.mustache(view.lookup("fieldId"));                                                 // 66
                }                                                                                                    // 67
              }), "\n                    " ];                                                                        // 68
            }, function() {                                                                                          // 69
              return [ "\n                      ", HTML.INPUT({                                                      // 70
                type: "checkbox",                                                                                    // 71
                "data-fieldid": function() {                                                                         // 72
                  return Spacebars.mustache(view.lookup("fieldId"));                                                 // 73
                }                                                                                                    // 74
              }), "\n                    " ];                                                                        // 75
            }), "\n                    ", HTML.LABEL("\n                      ", Blaze.If(function() {               // 76
              return Spacebars.call(view.lookup("labelIsTemplate"));                                                 // 77
            }, function() {                                                                                          // 78
              return Spacebars.With(function() {                                                                     // 79
                return Spacebars.call(view.lookup("labelData"));                                                     // 80
              }, function() {                                                                                        // 81
                return Spacebars.include(function() {                                                                // 82
                  return Spacebars.call(Spacebars.dot(view.lookup(".."), "label"));                                  // 83
                });                                                                                                  // 84
              });                                                                                                    // 85
            }, function() {                                                                                          // 86
              return Blaze.View("lookup:getLabel", function() {                                                      // 87
                return Spacebars.mustache(view.lookup("getLabel"));                                                  // 88
              });                                                                                                    // 89
            }), "\n                    "), "\n                  ")), "\n                " ];                         // 90
          }), "\n              " ];                                                                                  // 91
        }), "\n            "), "\n          "), "\n        " ];                                                      // 92
      }), "\n      "), "\n    "), "\n    ", Blaze.Unless(function() {                                                // 93
        return Spacebars.call(view.lookup("noData"));                                                                // 94
      }, function() {                                                                                                // 95
        return [ "\n      ", HTML.TABLE({                                                                            // 96
          id: function() {                                                                                           // 97
            return Spacebars.mustache(view.lookup("id"));                                                            // 98
          },                                                                                                         // 99
          "class": function() {                                                                                      // 100
            return [ Spacebars.mustache(view.lookup("class")), " reactive-table" ];                                  // 101
          }                                                                                                          // 102
        }, "\n        ", HTML.THEAD("\n          ", HTML.TR("\n            ", Blaze.Each(function() {                // 103
          return Spacebars.call(view.lookup("fields"));                                                              // 104
        }, function() {                                                                                              // 105
          return [ "\n              ", Blaze.If(function() {                                                         // 106
            return Spacebars.call(view.lookup("isVisible"));                                                         // 107
          }, function() {                                                                                            // 108
            return [ "\n                ", Blaze.If(function() {                                                     // 109
              return Spacebars.call(view.lookup("isPrimarySortField"));                                              // 110
            }, function() {                                                                                          // 111
              return [ "\n                  ", HTML.TH({                                                             // 112
                "class": function() {                                                                                // 113
                  return [ "sortable ", Spacebars.mustache(view.lookup("getHeaderClass")) ];                         // 114
                },                                                                                                   // 115
                fieldid: function() {                                                                                // 116
                  return Spacebars.mustache(view.lookup("getFieldFieldId"));                                         // 117
                }                                                                                                    // 118
              }, "\n                    ", Blaze.If(function() {                                                     // 119
                return Spacebars.call(view.lookup("labelIsTemplate"));                                               // 120
              }, function() {                                                                                        // 121
                return Spacebars.With(function() {                                                                   // 122
                  return Spacebars.call(view.lookup("labelData"));                                                   // 123
                }, function() {                                                                                      // 124
                  return Spacebars.include(function() {                                                              // 125
                    return Spacebars.call(Spacebars.dot(view.lookup(".."), "label"));                                // 126
                  });                                                                                                // 127
                });                                                                                                  // 128
              }, function() {                                                                                        // 129
                return Blaze.View("lookup:getLabel", function() {                                                    // 130
                  return Spacebars.mustache(view.lookup("getLabel"));                                                // 131
                });                                                                                                  // 132
              }), HTML.CharRef({                                                                                     // 133
                html: "&nbsp;",                                                                                      // 134
                str: " "                                                                                             // 135
              }), HTML.CharRef({                                                                                     // 136
                html: "&nbsp;",                                                                                      // 137
                str: " "                                                                                             // 138
              }), "\n                    ", Blaze.If(function() {                                                    // 139
                return Spacebars.call(view.lookup("isAscending"));                                                   // 140
              }, function() {                                                                                        // 141
                return [ "\n                      ", Blaze.If(function() {                                           // 142
                  return Spacebars.call(Spacebars.dot(view.lookup(".."), "useFontAwesome"));                         // 143
                }, function() {                                                                                      // 144
                  return [ "\n                        ", HTML.I({                                                    // 145
                    "class": "fa fa-sort-asc"                                                                        // 146
                  }), "\n                      " ];                                                                  // 147
                }, function() {                                                                                      // 148
                  return [ "\n                        ", HTML.CharRef({                                              // 149
                    html: "&#x25B2;",                                                                                // 150
                    str: "▲"                                                                                         // 151
                  }), "\n                      " ];                                                                  // 152
                }), "\n                    " ];                                                                      // 153
              }, function() {                                                                                        // 154
                return [ "\n                      ", Blaze.If(function() {                                           // 155
                  return Spacebars.call(Spacebars.dot(view.lookup(".."), "useFontAwesome"));                         // 156
                }, function() {                                                                                      // 157
                  return [ "\n                        ", HTML.I({                                                    // 158
                    "class": "fa fa-sort-desc"                                                                       // 159
                  }), "\n                      " ];                                                                  // 160
                }, function() {                                                                                      // 161
                  return [ "\n                        ", HTML.CharRef({                                              // 162
                    html: "&#x25BC;",                                                                                // 163
                    str: "▼"                                                                                         // 164
                  }), "\n                      " ];                                                                  // 165
                }), "\n                    " ];                                                                      // 166
              }), "\n                  "), "\n                " ];                                                   // 167
            }, function() {                                                                                          // 168
              return [ "\n                  ", Blaze.If(function() {                                                 // 169
                return Spacebars.call(view.lookup("isSortable"));                                                    // 170
              }, function() {                                                                                        // 171
                return [ "\n                    ", HTML.TH({                                                         // 172
                  "class": function() {                                                                              // 173
                    return [ Spacebars.mustache(view.lookup("getHeaderClass")), " sortable" ];                       // 174
                  },                                                                                                 // 175
                  fieldid: function() {                                                                              // 176
                    return Spacebars.mustache(view.lookup("getFieldFieldId"));                                       // 177
                  }                                                                                                  // 178
                }, Blaze.If(function() {                                                                             // 179
                  return Spacebars.call(view.lookup("labelIsTemplate"));                                             // 180
                }, function() {                                                                                      // 181
                  return Spacebars.With(function() {                                                                 // 182
                    return Spacebars.call(view.lookup("labelData"));                                                 // 183
                  }, function() {                                                                                    // 184
                    return Spacebars.include(function() {                                                            // 185
                      return Spacebars.call(Spacebars.dot(view.lookup(".."), "label"));                              // 186
                    });                                                                                              // 187
                  });                                                                                                // 188
                }, function() {                                                                                      // 189
                  return Blaze.View("lookup:getLabel", function() {                                                  // 190
                    return Spacebars.mustache(view.lookup("getLabel"));                                              // 191
                  });                                                                                                // 192
                })), "\n                  " ];                                                                       // 193
              }, function() {                                                                                        // 194
                return [ "\n                    ", HTML.TH({                                                         // 195
                  "class": function() {                                                                              // 196
                    return Spacebars.mustache(view.lookup("getHeaderClass"));                                        // 197
                  },                                                                                                 // 198
                  fieldid: function() {                                                                              // 199
                    return Spacebars.mustache(view.lookup("getFieldFieldId"));                                       // 200
                  }                                                                                                  // 201
                }, Blaze.If(function() {                                                                             // 202
                  return Spacebars.call(view.lookup("labelIsTemplate"));                                             // 203
                }, function() {                                                                                      // 204
                  return Spacebars.With(function() {                                                                 // 205
                    return Spacebars.call(view.lookup("labelData"));                                                 // 206
                  }, function() {                                                                                    // 207
                    return Spacebars.include(function() {                                                            // 208
                      return Spacebars.call(Spacebars.dot(view.lookup(".."), "label"));                              // 209
                    });                                                                                              // 210
                  });                                                                                                // 211
                }, function() {                                                                                      // 212
                  return Blaze.View("lookup:getLabel", function() {                                                  // 213
                    return Spacebars.mustache(view.lookup("getLabel"));                                              // 214
                  });                                                                                                // 215
                })), "\n                  " ];                                                                       // 216
              }), "\n                " ];                                                                            // 217
            }), "\n              " ];                                                                                // 218
          }), "\n            " ];                                                                                    // 219
        }), "\n          "), "\n        "), "\n        ", HTML.TBODY("\n          ", Blaze.Each(function() {         // 220
          return Spacebars.call(view.lookup("sortedRows"));                                                          // 221
        }, function() {                                                                                              // 222
          return [ "\n            ", HTML.TR({                                                                       // 223
            "class": function() {                                                                                    // 224
              return Spacebars.mustache(Spacebars.dot(view.lookup(".."), "rowClass"), view.lookup("."));             // 225
            }                                                                                                        // 226
          }, "\n              ", Blaze.Each(function() {                                                             // 227
            return Spacebars.call(Spacebars.dot(view.lookup(".."), "fields"));                                       // 228
          }, function() {                                                                                            // 229
            return [ "\n                ", Blaze.If(function() {                                                     // 230
              return Spacebars.call(view.lookup("isVisible"));                                                       // 231
            }, function() {                                                                                          // 232
              return [ "\n                  ", HTML.TD({                                                             // 233
                "class": function() {                                                                                // 234
                  return Spacebars.mustache(view.lookup("getCellClass"), view.lookup(".."));                         // 235
                }                                                                                                    // 236
              }, Blaze.If(function() {                                                                               // 237
                return Spacebars.call(view.lookup("tmpl"));                                                          // 238
              }, function() {                                                                                        // 239
                return Spacebars.With(function() {                                                                   // 240
                  return Spacebars.call(view.lookup(".."));                                                          // 241
                }, function() {                                                                                      // 242
                  return Spacebars.include(function() {                                                              // 243
                    return Spacebars.call(Spacebars.dot(view.lookup(".."), "tmpl"));                                 // 244
                  });                                                                                                // 245
                });                                                                                                  // 246
              }, function() {                                                                                        // 247
                return Blaze.View("lookup:getField", function() {                                                    // 248
                  return Spacebars.mustache(view.lookup("getField"), view.lookup(".."));                             // 249
                });                                                                                                  // 250
              })), "\n                " ];                                                                           // 251
            }), "\n              " ];                                                                                // 252
          }), "\n            "), "\n          " ];                                                                   // 253
        }), "\n        "), "\n      "), "\n      ", Blaze.If(function() {                                            // 254
          return Spacebars.call(view.lookup("showNavigation"));                                                      // 255
        }, function() {                                                                                              // 256
          return [ "\n        ", HTML.DIV({                                                                          // 257
            "class": "reactive-table-navigation"                                                                     // 258
          }, "\n          ", Blaze.If(function() {                                                                   // 259
            return Spacebars.call(view.lookup("showNavigationRowsPerPage"));                                         // 260
          }, function() {                                                                                            // 261
            return [ "\n            ", HTML.DIV({                                                                    // 262
              "class": "form-inline form-group rows-per-page"                                                        // 263
            }, "\n              ", HTML.LABEL("\n                ", HTML.SPAN(Blaze.View("lookup:i18n", function() { // 264
              return Spacebars.mustache(view.lookup("i18n"), "reactiveTable.show");                                  // 265
            })), "\n                ", HTML.INPUT({                                                                  // 266
              "class": "form-control",                                                                               // 267
              type: "text",                                                                                          // 268
              value: function() {                                                                                    // 269
                return Spacebars.mustache(view.lookup("getRowsPerPage"));                                            // 270
              }                                                                                                      // 271
            }), "\n                ", Blaze.If(function() {                                                          // 272
              return Spacebars.call(view.lookup("showRowCount"));                                                    // 273
            }, function() {                                                                                          // 274
              return [ "\n                  ", HTML.SPAN(Blaze.View("lookup:i18n", function() {                      // 275
                return Spacebars.mustache(view.lookup("i18n"), "reactiveTable.of");                                  // 276
              })), "\n                  ", HTML.SPAN({                                                               // 277
                "class": "rows-per-page-count"                                                                       // 278
              }, Blaze.View("lookup:getRowCount", function() {                                                       // 279
                return Spacebars.mustache(view.lookup("getRowCount"));                                               // 280
              })), "\n                " ];                                                                           // 281
            }), "\n                ", HTML.SPAN({                                                                    // 282
              "class": "rows-per-page-label"                                                                         // 283
            }, Blaze.View("lookup:i18n", function() {                                                                // 284
              return Spacebars.mustache(view.lookup("i18n"), "reactiveTable.rowsPerPage");                           // 285
            })), "\n              "), "\n            "), "\n          " ];                                           // 286
          }), "\n          ", HTML.DIV({                                                                             // 287
            "class": "form-inline form-group page-number"                                                            // 288
          }, "\n            ", Blaze.If(function() {                                                                 // 289
            return Spacebars.call(view.lookup("isntFirstPage"));                                                     // 290
          }, function() {                                                                                            // 291
            return [ "\n              ", Blaze.If(function() {                                                       // 292
              return Spacebars.call(view.lookup("useFontAwesome"));                                                  // 293
            }, function() {                                                                                          // 294
              return [ "\n                ", HTML.I({                                                                // 295
                "class": "previous-page fa fa-caret-left"                                                            // 296
              }), "\n              " ];                                                                              // 297
            }, function() {                                                                                          // 298
              return [ "\n                ", HTML.LABEL({                                                            // 299
                "class": "previous-page"                                                                             // 300
              }, HTML.CharRef({                                                                                      // 301
                html: "&lt;",                                                                                        // 302
                str: "<"                                                                                             // 303
              })), "\n              " ];                                                                             // 304
            }), "\n            " ];                                                                                  // 305
          }), "\n            ", HTML.LABEL("\n              ", HTML.SPAN(Blaze.View("lookup:i18n", function() {      // 306
            return Spacebars.mustache(view.lookup("i18n"), "reactiveTable.page");                                    // 307
          })), "\n              ", HTML.INPUT({                                                                      // 308
            "class": "form-control",                                                                                 // 309
            type: "text",                                                                                            // 310
            value: function() {                                                                                      // 311
              return Spacebars.mustache(view.lookup("getCurrentPage"));                                              // 312
            }                                                                                                        // 313
          }), "\n              ", HTML.SPAN(Blaze.View("lookup:i18n", function() {                                   // 314
            return Spacebars.mustache(view.lookup("i18n"), "reactiveTable.of");                                      // 315
          })), "\n              ", HTML.SPAN({                                                                       // 316
            "class": "page-number-count"                                                                             // 317
          }, Blaze.View("lookup:getPageCount", function() {                                                          // 318
            return Spacebars.mustache(view.lookup("getPageCount"));                                                  // 319
          })), "\n            "), "\n            ", Blaze.If(function() {                                            // 320
            return Spacebars.call(view.lookup("isntLastPage"));                                                      // 321
          }, function() {                                                                                            // 322
            return [ "\n              ", Blaze.If(function() {                                                       // 323
              return Spacebars.call(view.lookup("useFontAwesome"));                                                  // 324
            }, function() {                                                                                          // 325
              return [ "\n                ", HTML.I({                                                                // 326
                "class": "next-page fa fa-caret-right"                                                               // 327
              }), "\n              " ];                                                                              // 328
            }, function() {                                                                                          // 329
              return [ "\n                ", HTML.LABEL({                                                            // 330
                "class": "next-page"                                                                                 // 331
              }, HTML.CharRef({                                                                                      // 332
                html: "&gt;",                                                                                        // 333
                str: ">"                                                                                             // 334
              })), "\n              " ];                                                                             // 335
            }), "\n            " ];                                                                                  // 336
          }), "\n          "), "\n        "), "\n      " ];                                                          // 337
        }), "\n    " ];                                                                                              // 338
      }, function() {                                                                                                // 339
        return [ "\n      ", Spacebars.include(view.lookupTemplate("noDataTmpl")), "\n    " ];                       // 340
      }), "\n  " ];                                                                                                  // 341
    }), "\n  " ];                                                                                                    // 342
  });                                                                                                                // 343
}));                                                                                                                 // 344
                                                                                                                     // 345
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/aslagle:reactive-table/lib/template.filter.js                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
                                                                                                                     // 1
Template.__checkName("reactiveTableFilter");                                                                         // 2
Template["reactiveTableFilter"] = new Template("Template.reactiveTableFilter", (function() {                         // 3
  var view = this;                                                                                                   // 4
  return HTML.DIV({                                                                                                  // 5
    id: function() {                                                                                                 // 6
      return Spacebars.mustache(view.lookup("id"));                                                                  // 7
    },                                                                                                               // 8
    "class": function() {                                                                                            // 9
      return Spacebars.mustache(view.lookup("class"));                                                               // 10
    }                                                                                                                // 11
  }, "\n    ", HTML.SPAN({                                                                                           // 12
    "class": "input-group-addon"                                                                                     // 13
  }, "\n      ", Blaze.If(function() {                                                                               // 14
    return Spacebars.call(view.lookup("useFontAwesome"));                                                            // 15
  }, function() {                                                                                                    // 16
    return [ "\n        ", HTML.I({                                                                                  // 17
      "class": "fa fa-filter"                                                                                        // 18
    }), "\n      " ];                                                                                                // 19
  }, function() {                                                                                                    // 20
    return [ "\n        ", Blaze.If(function() {                                                                     // 21
      return Spacebars.call(view.lookup("label"));                                                                   // 22
    }, function() {                                                                                                  // 23
      return [ "\n          ", HTML.SPAN(Blaze.View("lookup:label", function() {                                     // 24
        return Spacebars.mustache(view.lookup("label"));                                                             // 25
      })), "\n        " ];                                                                                           // 26
    }, function() {                                                                                                  // 27
      return [ "\n          ", Blaze.View("lookup:i18n", function() {                                                // 28
        return Spacebars.mustache(view.lookup("i18n"), "reactiveTable.filter");                                      // 29
      }), "\n        " ];                                                                                            // 30
    }), "\n      " ];                                                                                                // 31
  }), "\n    "), "\n    ", Blaze.If(function() {                                                                     // 32
    return Spacebars.call(view.lookup("useFontAwesome"));                                                            // 33
  }, function() {                                                                                                    // 34
    return [ "\n      ", Blaze.If(function() {                                                                       // 35
      return Spacebars.call(view.lookup("label"));                                                                   // 36
    }, function() {                                                                                                  // 37
      return [ "\n        ", HTML.INPUT({                                                                            // 38
        "class": "reactive-table-input form-control",                                                                // 39
        type: "text",                                                                                                // 40
        value: function() {                                                                                          // 41
          return Spacebars.mustache(view.lookup("filter"));                                                          // 42
        },                                                                                                           // 43
        placeholder: function() {                                                                                    // 44
          return Spacebars.mustache(view.lookup("label"));                                                           // 45
        }                                                                                                            // 46
      }), "\n      " ];                                                                                              // 47
    }, function() {                                                                                                  // 48
      return [ "\n        ", HTML.INPUT({                                                                            // 49
        "class": "reactive-table-input form-control",                                                                // 50
        type: "text",                                                                                                // 51
        value: function() {                                                                                          // 52
          return Spacebars.mustache(view.lookup("filter"));                                                          // 53
        },                                                                                                           // 54
        placeholder: function() {                                                                                    // 55
          return Spacebars.mustache(view.lookup("i18n"), "reactiveTable.filter");                                    // 56
        }                                                                                                            // 57
      }), "\n      " ];                                                                                              // 58
    }), "\n    " ];                                                                                                  // 59
  }, function() {                                                                                                    // 60
    return [ "\n      ", HTML.INPUT({                                                                                // 61
      "class": "reactive-table-input form-control",                                                                  // 62
      type: "text",                                                                                                  // 63
      value: function() {                                                                                            // 64
        return Spacebars.mustache(view.lookup("filter"));                                                            // 65
      }                                                                                                              // 66
    }), "\n    " ];                                                                                                  // 67
  }), "\n  ");                                                                                                       // 68
}));                                                                                                                 // 69
                                                                                                                     // 70
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/aslagle:reactive-table/lib/reactive_table_i18n.js                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
i18n.map('en', {                                                                                                     // 1
    reactiveTable: {                                                                                                 // 2
        filter: 'Filter',                                                                                            // 3
        columns: 'Columns',                                                                                          // 4
        show: 'Show',                                                                                                // 5
        rowsPerPage: 'rows per page',                                                                                // 6
        page: 'Page',                                                                                                // 7
        of: 'of'                                                                                                     // 8
    }                                                                                                                // 9
});                                                                                                                  // 10
                                                                                                                     // 11
i18n.map('fr', {                                                                                                     // 12
    reactiveTable: {                                                                                                 // 13
        filter: 'Filtre',                                                                                            // 14
        columns: 'Colonnes',                                                                                         // 15
        show: 'Voir',                                                                                                // 16
        rowsPerPage: 'lignes par page',                                                                              // 17
        page: 'page',                                                                                                // 18
        of: 'sur'                                                                                                    // 19
    }                                                                                                                // 20
});                                                                                                                  // 21
                                                                                                                     // 22
i18n.map('ru', {                                                                                                     // 23
    reactiveTable: {                                                                                                 // 24
        filter: 'Фильтр',                                                                                            // 25
        columns: 'Колонка',                                                                                          // 26
        show: 'Показать',                                                                                            // 27
        rowsPerPage: 'линий на странице',                                                                            // 28
        page: 'Страница',                                                                                            // 29
        of: 'из'                                                                                                     // 30
    }                                                                                                                // 31
});                                                                                                                  // 32
                                                                                                                     // 33
i18n.map('es', {                                                                                                     // 34
    reactiveTable: {                                                                                                 // 35
        filter: 'Filtro',                                                                                            // 36
        columns: 'Columnas',                                                                                         // 37
        show:   'Mostrar',                                                                                           // 38
        rowsPerPage: 'filas por página',                                                                             // 39
        page: 'Página',                                                                                              // 40
        of: 'de'                                                                                                     // 41
    }                                                                                                                // 42
});                                                                                                                  // 43
                                                                                                                     // 44
i18n.map('nl', {                                                                                                     // 45
    reactiveTable: {                                                                                                 // 46
        filter: 'Filter',                                                                                            // 47
        show:   'Toon',                                                                                              // 48
        rowsPerPage: 'regels per pagina',                                                                            // 49
        page: 'Pagina',                                                                                              // 50
        of: 'van'                                                                                                    // 51
    }                                                                                                                // 52
});                                                                                                                  // 53
                                                                                                                     // 54
i18n.map('pt-br', {                                                                                                  // 55
    reactiveTable: {                                                                                                 // 56
        filter: 'Filtro',                                                                                            // 57
        show: 'Mostrar',                                                                                             // 58
        rowsPerPage: 'linhas por página',                                                                            // 59
        page: 'Página',                                                                                              // 60
        of: 'de'                                                                                                     // 61
    }                                                                                                                // 62
});                                                                                                                  // 63
                                                                                                                     // 64
i18n.map('it', {                                                                                                     // 65
    reactiveTable: {                                                                                                 // 66
        filter: 'Filtra',                                                                                            // 67
        show: 'Mostra',                                                                                              // 68
        rowsPerPage: 'righe per pagina',                                                                             // 69
        page: 'Pagina',                                                                                              // 70
        of: 'di'                                                                                                     // 71
    }                                                                                                                // 72
});                                                                                                                  // 73
                                                                                                                     // 74
i18n.map('sv', {                                                                                                     // 75
    reactiveTable: {                                                                                                 // 76
        filter: 'Filter',                                                                                            // 77
        show: 'Visa',                                                                                                // 78
        rowsPerPage: 'rader per sida',                                                                               // 79
        page: 'Sida',                                                                                                // 80
        of: 'av'                                                                                                     // 81
    }                                                                                                                // 82
});                                                                                                                  // 83
                                                                                                                     // 84
i18n.map('ua', {                                                                                                     // 85
    reactiveTable: {                                                                                                 // 86
        filter: 'Фільтр',                                                                                            // 87
        show: 'Показати',                                                                                            // 88
        rowsPerPage: 'рядків на сторінці',                                                                           // 89
        page: 'Сторінка',                                                                                            // 90
        of: 'з'                                                                                                      // 91
    }                                                                                                                // 92
});                                                                                                                  // 93
                                                                                                                     // 94
i18n.map('tr', {                                                                                                     // 95
    reactiveTable: {                                                                                                 // 96
        filter: 'Süz',                                                                                               // 97
        columns: 'Sütunlar',                                                                                         // 98
        show: 'Sayfa başına',                                                                                        // 99
        rowsPerPage: 'satır göster',                                                                                 // 100
        page: 'Sayfa',                                                                                               // 101
        of: ' / '                                                                                                    // 102
    }                                                                                                                // 103
});                                                                                                                  // 104
                                                                                                                     // 105
i18n.map('sk', {                                                                                                     // 106
    reactiveTable: {                                                                                                 // 107
        filter: 'Filter',                                                                                            // 108
        show: 'Zobraz',                                                                                              // 109
        rowsPerPage: 'riadkov na stranu',                                                                            // 110
        page: 'Strana',                                                                                              // 111
        of: 'z'                                                                                                      // 112
    }                                                                                                                // 113
});                                                                                                                  // 114
                                                                                                                     // 115
i18n.map('cs', {                                                                                                     // 116
    reactiveTable: {                                                                                                 // 117
        filter: 'Filter',                                                                                            // 118
        show: 'Zobraz',                                                                                              // 119
        rowsPerPage: 'řádků na stranu',                                                                              // 120
        page: 'Strana',                                                                                              // 121
        of: 'z'                                                                                                      // 122
    }                                                                                                                // 123
});                                                                                                                  // 124
                                                                                                                     // 125
i18n.map('he', {                                                                                                     // 126
    reactiveTable: {                                                                                                 // 127
        filter: 'פילטר',                                                                                             // 128
        show: 'הצג',                                                                                                 // 129
        rowsPerPage: 'שורות לעמוד',                                                                                  // 130
        page: 'עמוד',                                                                                                // 131
        of: 'מתוך'                                                                                                   // 132
    }                                                                                                                // 133
});                                                                                                                  // 134
                                                                                                                     // 135
i18n.map('da', {                                                                                                     // 136
    reactiveTable: {                                                                                                 // 137
        filter: 'Filter',                                                                                            // 138
        columns: 'Kolonner',                                                                                         // 139
        show: 'Vis',                                                                                                 // 140
        rowsPerPage: 'rækker per side',                                                                              // 141
        page: 'Side',                                                                                                // 142
        of: 'af'                                                                                                     // 143
    }                                                                                                                // 144
});                                                                                                                  // 145
                                                                                                                     // 146
i18n.map('de', {                                                                                                     // 147
    reactiveTable: {                                                                                                 // 148
        filter: 'Filter',                                                                                            // 149
        columns: 'Spalten',                                                                                          // 150
        show: 'Zeige',                                                                                               // 151
        rowsPerPage: 'Zeilen pro Seite',                                                                             // 152
        page: 'Seite',                                                                                               // 153
        of: 'von'                                                                                                    // 154
    }                                                                                                                // 155
});                                                                                                                  // 156
                                                                                                                     // 157
i18n.map('fi', {                                                                                                     // 158
    reactiveTable: {                                                                                                 // 159
        filter: 'Suodata',                                                                                           // 160
        show: 'Näytä',                                                                                               // 161
        rowsPerPage: 'riviä sivulla',                                                                                // 162
        page: 'Sivu',                                                                                                // 163
        of: ' / '                                                                                                    // 164
    }                                                                                                                // 165
});                                                                                                                  // 166
                                                                                                                     // 167
i18n.map('no', {                                                                                                     // 168
    reactiveTable: {                                                                                                 // 169
        filter: 'Filter',                                                                                            // 170
        show: 'Vis',                                                                                                 // 171
        rowsPerPage: 'rader per side',                                                                               // 172
        page: 'Side',                                                                                                // 173
        of: 'av'                                                                                                     // 174
    }                                                                                                                // 175
});                                                                                                                  // 176
                                                                                                                     // 177
i18n.map('pl', {                                                                                                     // 178
    reactiveTable: {                                                                                                 // 179
        filter: 'Szukaj',                                                                                            // 180
        columns: 'Kolumny',                                                                                          // 181
        show: 'Pokaż',                                                                                               // 182
        rowsPerPage: 'pozycji na stronie',                                                                           // 183
        page: 'Strona',                                                                                              // 184
        of: 'z'                                                                                                      // 185
    }                                                                                                                // 186
});                                                                                                                  // 187
                                                                                                                     // 188
i18n.map('hr', {                                                                                                     // 189
    reactiveTable: {                                                                                                 // 190
        filter: 'Filter',                                                                                            // 191
        columns: 'Stupci',                                                                                           // 192
        show: 'Prikaži',                                                                                             // 193
        rowsPerPage: 'redova po stranici',                                                                           // 194
        page: 'Stranica',                                                                                            // 195
        of: 'od'                                                                                                     // 196
    }                                                                                                                // 197
});                                                                                                                  // 198
                                                                                                                     // 199
i18n.map('is', {                                                                                                     // 200
    reactiveTable: {                                                                                                 // 201
        filter: 'Sía',                                                                                               // 202
        columns: 'Dálkar',                                                                                           // 203
        show: 'Sýna',                                                                                                // 204
        rowsPerPage: 'raðir á síðu',                                                                                 // 205
        page: 'Síða',                                                                                                // 206
        of: 'af'                                                                                                     // 207
    }                                                                                                                // 208
});                                                                                                                  // 209
                                                                                                                     // 210
i18n.map('zh', {                                                                                                     // 211
    reactiveTable: {                                                                                                 // 212
        filter: '过滤',                                                                                                // 213
        columns: '列',                                                                                                // 214
        show: '显示',                                                                                                  // 215
        rowsPerPage: '每页行数',                                                                                         // 216
        page: '页数',                                                                                                  // 217
        of: '之'                                                                                                      // 218
    }                                                                                                                // 219
});                                                                                                                  // 220
                                                                                                                     // 221
i18n.map('fa', {                                                                                                     // 222
    reactiveTable: {                                                                                                 // 223
        filter: 'تزکیه',                                                                                             // 224
        columns: 'ستون',                                                                                             // 225
        show: 'ارائه',                                                                                               // 226
        rowsPerPage: 'ردیف در هر صفحه',                                                                              // 227
        page: 'صفحه',                                                                                                // 228
        of: 'از'                                                                                                     // 229
    }                                                                                                                // 230
});                                                                                                                  // 231
                                                                                                                     // 232
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/aslagle:reactive-table/lib/reactive_table.js                                                             //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var ReactiveTableCounts = new Mongo.Collection("reactive-table-counts");                                             // 1
                                                                                                                     // 2
get = function(obj, field) {                                                                                         // 3
  var keys = field.split('.');                                                                                       // 4
  var value = obj;                                                                                                   // 5
                                                                                                                     // 6
  _.each(keys, function (key) {                                                                                      // 7
      if (_.isObject(value) && _.isFunction(value[key])) {                                                           // 8
          value = value[key]();                                                                                      // 9
      } else if (_.isObject(value) && !_.isUndefined(value[key])) {                                                  // 10
          value = value[key];                                                                                        // 11
      } else {                                                                                                       // 12
          value = null;                                                                                              // 13
      }                                                                                                              // 14
  });                                                                                                                // 15
                                                                                                                     // 16
  return value;                                                                                                      // 17
};                                                                                                                   // 18
                                                                                                                     // 19
var updateHandle = function (set_context) {                                                                          // 20
    var context = set_context;                                                                                       // 21
    if (context.server) {                                                                                            // 22
        var newHandle;                                                                                               // 23
                                                                                                                     // 24
        // Could use the table id, but this way we can wait to change the                                            // 25
        // page until the new data is ready, so it doesn't move around                                               // 26
        // while rows are added and removed                                                                          // 27
        var publicationId = _.uniqueId();                                                                            // 28
        var newPublishedRows = new Mongo.Collection('reactive-table-rows-' + publicationId);                         // 29
        context.nextPublicationId.set(publicationId);                                                                // 30
                                                                                                                     // 31
        var rowsPerPage = context.rowsPerPage.get();                                                                 // 32
        var currentPage = context.currentPage.get();                                                                 // 33
        var currentIndex = currentPage * rowsPerPage;                                                                // 34
                                                                                                                     // 35
        var options = {                                                                                              // 36
            skip: currentIndex,                                                                                      // 37
            limit: rowsPerPage,                                                                                      // 38
            sort: getSortQuery(context.fields, context.multiColumnSort)                                              // 39
        };                                                                                                           // 40
                                                                                                                     // 41
        var filters = context.filters.get();                                                                         // 42
                                                                                                                     // 43
        var onReady = function () {                                                                                  // 44
            if (publicationId === context.nextPublicationId.get()) {                                                 // 45
                context.ready.set(true);                                                                             // 46
                context.publicationId.set(publicationId);                                                            // 47
                context.publishedRows = newPublishedRows;                                                            // 48
                var oldHandle = context.handle;                                                                      // 49
                context.handle = newHandle;                                                                          // 50
                                                                                                                     // 51
                if (oldHandle) {                                                                                     // 52
                    oldHandle.stop();                                                                                // 53
                }                                                                                                    // 54
            } else {                                                                                                 // 55
                // another handle was created after this one                                                         // 56
                newHandle.stop();                                                                                    // 57
            }                                                                                                        // 58
        };                                                                                                           // 59
        var onError = function (error) {                                                                             // 60
            console.log("ReactiveTable subscription error: " + error);                                               // 61
        };                                                                                                           // 62
        newHandle = Meteor.subscribe(                                                                                // 63
            "reactive-table-" + context.collection,                                                                  // 64
            publicationId,                                                                                           // 65
            getFilterStrings(filters),                                                                               // 66
            getFilterFields(filters, context.fields),                                                                // 67
            options,                                                                                                 // 68
            context.rowsPerPage.get(),                                                                               // 69
            {onReady: onReady, onError: onError}                                                                     // 70
        );                                                                                                           // 71
    }                                                                                                                // 72
};                                                                                                                   // 73
                                                                                                                     // 74
                                                                                                                     // 75
var getDefaultFalseSetting = function (key, templateData) {                                                          // 76
    if (!_.isUndefined(templateData[key]) &&                                                                         // 77
        templateData[key]) {                                                                                         // 78
        return true;                                                                                                 // 79
    }                                                                                                                // 80
    if (!_.isUndefined(templateData.settings) &&                                                                     // 81
        !_.isUndefined(templateData.settings[key]) &&                                                                // 82
        templateData.settings[key]) {                                                                                // 83
        return true;                                                                                                 // 84
    }                                                                                                                // 85
    return false;                                                                                                    // 86
};                                                                                                                   // 87
                                                                                                                     // 88
var getDefaultTrueSetting = function (key, templateData) {                                                           // 89
    if (!_.isUndefined(templateData[key]) &&                                                                         // 90
        !templateData[key]) {                                                                                        // 91
        return false;                                                                                                // 92
    }                                                                                                                // 93
    if (!_.isUndefined(templateData.settings) &&                                                                     // 94
        !_.isUndefined(templateData.settings[key]) &&                                                                // 95
        !templateData.settings[key]) {                                                                               // 96
        return false;                                                                                                // 97
    }                                                                                                                // 98
    return true;                                                                                                     // 99
};                                                                                                                   // 100
                                                                                                                     // 101
                                                                                                                     // 102
                                                                                                                     // 103
var setup = function () {                                                                                            // 104
    var context = {};                                                                                                // 105
    var oldContext = this.context || {};                                                                             // 106
    context.templateData = this.data;                                                                                // 107
    this.data.settings = this.data.settings || {};                                                                   // 108
    var collection = this.data.collection || this.data.settings.collection || this.data;                             // 109
                                                                                                                     // 110
    if (!(collection instanceof Mongo.Collection)) {                                                                 // 111
        if (_.isArray(collection)) {                                                                                 // 112
            // collection is an array                                                                                // 113
            // create a new collection from the data                                                                 // 114
            var data = collection;                                                                                   // 115
            collection = new Mongo.Collection(null);                                                                 // 116
            _.each(data, function (doc) {                                                                            // 117
                collection.insert(doc);                                                                              // 118
            });                                                                                                      // 119
        } else if (_.isFunction(collection.fetch)) {                                                                 // 120
            // collection is a cursor                                                                                // 121
            // create a new collection that will reactively update                                                   // 122
            var cursor = collection;                                                                                 // 123
            collection = new Mongo.Collection(null);                                                                 // 124
                                                                                                                     // 125
            // copy over transforms from collection-helper package                                                   // 126
            collection._transform = cursor._transform;                                                               // 127
            collection._name = cursor.collection._name;                                                              // 128
                                                                                                                     // 129
            var addedCallback = function (doc) {                                                                     // 130
                collection.insert(doc);                                                                              // 131
            };                                                                                                       // 132
            var changedCallback = function (doc, oldDoc) {                                                           // 133
                collection.update(oldDoc._id, doc);                                                                  // 134
            };                                                                                                       // 135
            var removedCallback = function (oldDoc) {                                                                // 136
                collection.remove(oldDoc._id);                                                                       // 137
            };                                                                                                       // 138
            cursor.observe({added: addedCallback, changed: changedCallback, removed: removedCallback});              // 139
        } else if (_.isString(collection)) {                                                                         // 140
            // server side publication                                                                               // 141
            context.server = true;                                                                                   // 142
            context.publicationId = new ReactiveVar();                                                               // 143
            context.nextPublicationId = new ReactiveVar();                                                           // 144
            context.publishedRows = new Mongo.Collection(null);                                                      // 145
        } else {                                                                                                     // 146
            console.error("reactiveTable error: argument is not an instance of Mongo.Collection, a cursor, or an array");
            collection = new Mongo.Collection(null);                                                                 // 148
        }                                                                                                            // 149
    }                                                                                                                // 150
    context.collection = collection;                                                                                 // 151
                                                                                                                     // 152
    context.multiColumnSort = getDefaultTrueSetting('multiColumnSort', this.data);                                   // 153
                                                                                                                     // 154
    var fields = this.data.fields || this.data.settings.fields || {};                                                // 155
    if (_.keys(fields).length < 1 ||                                                                                 // 156
        (_.keys(fields).length === 1 &&                                                                              // 157
         _.keys(fields)[0] === 'hash')) {                                                                            // 158
        fields = _.without(_.keys(collection.findOne() || {}), '_id');                                               // 159
    }                                                                                                                // 160
                                                                                                                     // 161
    var fieldIdsArePresentAndUnique = function (fields) {                                                            // 162
        var uniqueFieldIds = _.chain(fields)                                                                         // 163
            .filter(function (field) {                                                                               // 164
                return !_.isUndefined(field.fieldId)                                                                 // 165
            })                                                                                                       // 166
            .map(function (field) {                                                                                  // 167
                return field.fieldId;                                                                                // 168
            })                                                                                                       // 169
            .uniq()                                                                                                  // 170
            .value();                                                                                                // 171
        return uniqueFieldIds.length === fields.length;                                                              // 172
    };                                                                                                               // 173
                                                                                                                     // 174
    // If at least one field specifies a fieldId, all fields must specify a                                          // 175
    // fieldId with a unique value                                                                                   // 176
    if (_.find(fields, function (field) {                                                                            // 177
        return !_.isUndefined(field.fieldId)                                                                         // 178
        }) && !fieldIdsArePresentAndUnique(fields)) {                                                                // 179
        console.error("reactiveTable error: all fields must have a unique-valued fieldId if at least one has a fieldId attribute");
        fields = [];                                                                                                 // 181
    }                                                                                                                // 182
                                                                                                                     // 183
    var normalizeField = function (field, i) {                                                                       // 184
        if (typeof field === 'string') {                                                                             // 185
            field = {key: field, label: field};                                                                      // 186
        }                                                                                                            // 187
        if (!_.has(field, 'fieldId')) {                                                                              // 188
            // Default fieldId to index in fields array if not present                                               // 189
            field.fieldId = i.toString();                                                                            // 190
        }                                                                                                            // 191
        if (!_.has(field, 'key')) {                                                                                  // 192
            field.key = '';                                                                                          // 193
        }                                                                                                            // 194
        oldField = _.find(oldContext.fields, function (oldField) {                                                   // 195
            return oldField.fieldId === field.fieldId;                                                               // 196
        });                                                                                                          // 197
        normalizeSort(field, oldField);                                                                              // 198
        return field;                                                                                                // 199
    };                                                                                                               // 200
                                                                                                                     // 201
    fields = _.map(fields, normalizeField);                                                                          // 202
                                                                                                                     // 203
    context.fields = fields;                                                                                         // 204
                                                                                                                     // 205
    var visibleFields = [];                                                                                          // 206
    _.each(fields, function (field, i) {                                                                             // 207
        visibleFields.push({fieldId:field.fieldId, isVisible: getDefaultFieldVisibility(field)});                    // 208
    });                                                                                                              // 209
    context.visibleFields = (!_.isUndefined(oldContext.visibleFields) && !_.isEmpty(oldContext.visibleFields)) ? oldContext.visibleFields : new ReactiveVar(visibleFields);
                                                                                                                     // 211
                                                                                                                     // 212
    var rowClass = this.data.rowClass || this.data.settings.rowClass || function() {return '';};                     // 213
    if (typeof rowClass === 'string') {                                                                              // 214
        var tmp = rowClass;                                                                                          // 215
        rowClass = function(obj) { return tmp; };                                                                    // 216
    }                                                                                                                // 217
    context.rowClass = rowClass;                                                                                     // 218
                                                                                                                     // 219
    context.class = this.data.class || this.data.settings.class || 'table table-striped table-hover col-sm-12';      // 220
    context.id = this.data.id || this.data.settings.id || _.uniqueId('reactive-table-');                             // 221
                                                                                                                     // 222
    context.showNavigation = this.data.showNavigation || this.data.settings.showNavigation || 'always';              // 223
    context.showNavigationRowsPerPage = getDefaultTrueSetting('showNavigationRowsPerPage', this.data);               // 224
    context.showRowCount = getDefaultFalseSetting('showRowCount', this.data)                                         // 225
                                                                                                                     // 226
    var rowsPerPage;                                                                                                 // 227
    if (!_.isUndefined(oldContext.rowsPerPage)) {                                                                    // 228
        rowsPerPage = oldContext.rowsPerPage;                                                                        // 229
    } else if (this.data.rowsPerPage && this.data.rowsPerPage instanceof ReactiveVar) {                              // 230
        rowsPerPage = this.data.rowsPerPage;                                                                         // 231
    } else if (this.data.settings.rowsPerPage && this.data.settings.rowsPerPage instanceof ReactiveVar) {            // 232
        rowsPerPage = this.data.settings.rowsPerPage;                                                                // 233
    } else {                                                                                                         // 234
        rowsPerPage = new ReactiveVar(this.data.rowsPerPage || this.data.settings.rowsPerPage || 10);                // 235
    }                                                                                                                // 236
    context.rowsPerPage = rowsPerPage;                                                                               // 237
                                                                                                                     // 238
    var currentPage;                                                                                                 // 239
    if (!_.isUndefined(oldContext.currentPage)) {                                                                    // 240
        currentPage = oldContext.currentPage;                                                                        // 241
    } else if (this.data.currentPage && this.data.currentPage instanceof ReactiveVar) {                              // 242
        currentPage = this.data.currentPage;                                                                         // 243
    } else if (this.data.settings.currentPage && this.data.settings.currentPage instanceof ReactiveVar) {            // 244
        currentPage = this.data.settings.currentPage;                                                                // 245
    } else {                                                                                                         // 246
        currentPage = new ReactiveVar(0);                                                                            // 247
    }                                                                                                                // 248
    context.currentPage = currentPage;                                                                               // 249
                                                                                                                     // 250
    var filters = this.data.filters || this.data.settings.filters || [];                                             // 251
    if (_.isEmpty(filters)) {                                                                                        // 252
      context.showFilter = getDefaultTrueSetting('showFilter', this.data);                                           // 253
    } else {                                                                                                         // 254
      context.showFilter = getDefaultFalseSetting('showFilter', this.data);                                          // 255
    }                                                                                                                // 256
    if (context.showFilter) {                                                                                        // 257
      filters.push(context.id + '-filter');                                                                          // 258
    }                                                                                                                // 259
    context.filters = new ReactiveVar(filters);                                                                      // 260
                                                                                                                     // 261
    dependOnFilters(context.filters.get(), function () {                                                             // 262
      if (context.reactiveTableSetup) {                                                                              // 263
        context.currentPage.set(0);                                                                                  // 264
        updateHandle(context);                                                                                       // 265
      }                                                                                                              // 266
    });                                                                                                              // 267
                                                                                                                     // 268
    context.showColumnToggles = getDefaultFalseSetting('showColumnToggles', this.data);                              // 269
                                                                                                                     // 270
    if (_.isUndefined(this.data.useFontAwesome)) {                                                                   // 271
        if (!_.isUndefined(this.data.settings.useFontAwesome)) {                                                     // 272
            context.useFontAwesome = this.data.settings.useFontAwesome;                                              // 273
        } else if (!_.isUndefined(Package['fortawesome:fontawesome'])) {                                             // 274
            context.useFontAwesome = true;                                                                           // 275
        } else {                                                                                                     // 276
            context.useFontAwesome = false;                                                                          // 277
        }                                                                                                            // 278
    } else {                                                                                                         // 279
        context.useFontAwesome = this.data.useFontAwesome;                                                           // 280
    }                                                                                                                // 281
    context.noDataTmpl = this.data.noDataTmpl || this.data.settings.noDataTmpl;                                      // 282
    context.enableRegex = getDefaultFalseSetting('enableRegex', this.data);                                          // 283
                                                                                                                     // 284
    context.ready = new ReactiveVar(true);                                                                           // 285
                                                                                                                     // 286
    if (context.server) {                                                                                            // 287
        context.ready.set(false);                                                                                    // 288
        updateHandle(context);                                                                                       // 289
    }                                                                                                                // 290
                                                                                                                     // 291
    context.reactiveTableSetup = true;                                                                               // 292
                                                                                                                     // 293
    this.context = context;                                                                                          // 294
};                                                                                                                   // 295
                                                                                                                     // 296
var getDefaultFieldVisibility = function (field) {                                                                   // 297
    if (field.isVisible && field.isVisible instanceof ReactiveVar) {                                                 // 298
        return field.isVisible;                                                                                      // 299
    }                                                                                                                // 300
    return new ReactiveVar(!field.hidden || (_.isFunction(field.hidden) && !field.hidden()));                        // 301
}                                                                                                                    // 302
                                                                                                                     // 303
var getRowCount = function () {                                                                                      // 304
    if (this.server) {                                                                                               // 305
        var count = ReactiveTableCounts.findOne(this.publicationId.get());                                           // 306
        return (count ? count.count : 0);                                                                            // 307
    } else {                                                                                                         // 308
        var filterQuery = getFilterQuery(getFilterStrings(this.filters.get()), getFilterFields(this.filters.get(), this.fields), {enableRegex: this.enableRegex});
        return this.collection.find(filterQuery).count();                                                            // 310
    }                                                                                                                // 311
};                                                                                                                   // 312
                                                                                                                     // 313
var getPageCount = function () {                                                                                     // 314
    var count = getRowCount.call(this);                                                                              // 315
    var rowsPerPage = this.rowsPerPage.get();                                                                        // 316
    return Math.ceil(count / rowsPerPage);                                                                           // 317
};                                                                                                                   // 318
                                                                                                                     // 319
var getUpdateHandleForTemplate = function (template_instance) {                                                      // 320
    if (!template_instance.updateHandle) {                                                                           // 321
        template_instance.updateHandle = _.debounce(updateHandle, 200);                                              // 322
    }                                                                                                                // 323
    return template_instance.updateHandle;                                                                           // 324
};                                                                                                                   // 325
                                                                                                                     // 326
Template.reactiveTable.helpers({                                                                                     // 327
    'context': function () {                                                                                         // 328
        if (!Template.instance().context ||                                                                          // 329
            !_.isEqual(this, Template.instance().context.templateData)) {                                            // 330
            setup.call(Template.instance());                                                                         // 331
        }                                                                                                            // 332
        return Template.instance().context;                                                                          // 333
    },                                                                                                               // 334
                                                                                                                     // 335
    'ready' : function () {                                                                                          // 336
        return this.ready.get();                                                                                     // 337
    },                                                                                                               // 338
                                                                                                                     // 339
    'getFilterId': function () {                                                                                     // 340
        return this.id + '-filter';                                                                                  // 341
    },                                                                                                               // 342
                                                                                                                     // 343
    'getField': function (object) {                                                                                  // 344
        var fn = this.fn || function (value) { return value; };                                                      // 345
        var key = this.key;                                                                                          // 346
        var value = get(object, key);                                                                                // 347
        return fn(value, object);                                                                                    // 348
    },                                                                                                               // 349
                                                                                                                     // 350
    'getFieldIndex': function () {                                                                                   // 351
        return _.indexOf(Template.parentData(1).fields, this);                                                       // 352
    },                                                                                                               // 353
                                                                                                                     // 354
    'getFieldFieldId': function () {                                                                                 // 355
        return this.fieldId;                                                                                         // 356
    },                                                                                                               // 357
                                                                                                                     // 358
    'getKey': function () {                                                                                          // 359
        return this.key;                                                                                             // 360
    },                                                                                                               // 361
                                                                                                                     // 362
    'getHeaderClass': function () {                                                                                  // 363
        if (_.isUndefined(this.headerClass)) {                                                                       // 364
            return this.key;                                                                                         // 365
        }                                                                                                            // 366
        var css;                                                                                                     // 367
        if (_.isFunction(this.headerClass)) {                                                                        // 368
            css = this.headerClass();                                                                                // 369
        } else {                                                                                                     // 370
            css = this.headerClass;                                                                                  // 371
        }                                                                                                            // 372
        return css;                                                                                                  // 373
    },                                                                                                               // 374
                                                                                                                     // 375
    'getCellClass': function (object) {                                                                              // 376
        if (_.isUndefined(this.cellClass)) {                                                                         // 377
            return this.key;                                                                                         // 378
        }                                                                                                            // 379
        var css;                                                                                                     // 380
        if (_.isFunction(this.cellClass)) {                                                                          // 381
            var value = get(object, this.key);                                                                       // 382
            css = this.cellClass(value, object);                                                                     // 383
        } else {                                                                                                     // 384
            css = this.cellClass;                                                                                    // 385
        }                                                                                                            // 386
        return css;                                                                                                  // 387
    },                                                                                                               // 388
                                                                                                                     // 389
    'labelIsTemplate': function () {                                                                                 // 390
        return this.label && _.isObject(this.label) && this.label instanceof Blaze.Template;                         // 391
    },                                                                                                               // 392
                                                                                                                     // 393
    'getLabel': function () {                                                                                        // 394
        return _.isString(this.label) ? this.label : this.label();                                                   // 395
    },                                                                                                               // 396
                                                                                                                     // 397
    'isPrimarySortField': function () {                                                                              // 398
        var parentData = Template.parentData(1);                                                                     // 399
        var primarySortField = getPrimarySortField(parentData.fields, parentData.multiColumnSort);                   // 400
        return primarySortField && primarySortField.fieldId === this.fieldId;                                        // 401
    },                                                                                                               // 402
                                                                                                                     // 403
    'isSortable': function () {                                                                                      // 404
        return (this.sortable === undefined) ? true : this.sortable;                                                 // 405
    },                                                                                                               // 406
                                                                                                                     // 407
    'isVisible': function () {                                                                                       // 408
        var self = this; // is a field object                                                                        // 409
        var topLevelData;                                                                                            // 410
        if (Template.parentData(2) && Template.parentData(2).reactiveTableSetup) {                                   // 411
          topLevelData = Template.parentData(2);                                                                     // 412
        } else {                                                                                                     // 413
          topLevelData = Template.parentData(1);                                                                     // 414
        }                                                                                                            // 415
        var visibleFields = topLevelData.visibleFields.get();                                                        // 416
        var fields = topLevelData.fields;                                                                            // 417
                                                                                                                     // 418
        var visibleField = _.findWhere(visibleFields, {fieldId: self.fieldId});                                      // 419
        if (visibleField) {                                                                                          // 420
            return visibleField.isVisible.get();                                                                     // 421
        } else {                                                                                                     // 422
            // Add field to visibleFields list                                                                       // 423
            var _isVisible = getDefaultFieldVisibility(self);                                                        // 424
            visibleFields.push({fieldId:self.fieldId, isVisible:_isVisible});                                        // 425
            topLevelData.visibleFields.set(visibleFields);                                                           // 426
            return _isVisible.get();                                                                                 // 427
        }                                                                                                            // 428
    },                                                                                                               // 429
                                                                                                                     // 430
    'isAscending' : function () {                                                                                    // 431
        var sortDirection = this.sortDirection.get();                                                                // 432
        return (sortDirection === 1);                                                                                // 433
    },                                                                                                               // 434
                                                                                                                     // 435
    'sortedRows': function () {                                                                                      // 436
        if (this.server) {                                                                                           // 437
            return this.publishedRows.find({                                                                         // 438
              "reactive-table-id": this.publicationId.get()                                                          // 439
            }, {                                                                                                     // 440
              sort: {                                                                                                // 441
                "reactive-table-sort": 1                                                                             // 442
              }                                                                                                      // 443
            });                                                                                                      // 444
        } else  {                                                                                                    // 445
            var sortByValue = _.all(getSortedFields(this.fields, this.multiColumnSort), function (field) {           // 446
                return field.sortByValue || !field.fn;                                                               // 447
            });                                                                                                      // 448
            var filterQuery = getFilterQuery(getFilterStrings(this.filters.get()), getFilterFields(this.filters.get(), this.fields), {enableRegex: this.enableRegex});
                                                                                                                     // 450
            var limit = this.rowsPerPage.get();                                                                      // 451
            var currentPage = this.currentPage.get();                                                                // 452
            var skip = currentPage * limit;                                                                          // 453
                                                                                                                     // 454
            if (sortByValue) {                                                                                       // 455
                                                                                                                     // 456
                var sortQuery = getSortQuery(this.fields, this.multiColumnSort);                                     // 457
                return this.collection.find(filterQuery, {                                                           // 458
                    sort: sortQuery,                                                                                 // 459
                    skip: skip,                                                                                      // 460
                    limit: limit                                                                                     // 461
                });                                                                                                  // 462
                                                                                                                     // 463
            } else {                                                                                                 // 464
                                                                                                                     // 465
                var rows = this.collection.find(filterQuery).fetch();                                                // 466
                sortedRows = sortWithFunctions(rows, this.fields, this.multiColumnSort);                             // 467
                return sortedRows.slice(skip, skip + limit);                                                         // 468
                                                                                                                     // 469
            }                                                                                                        // 470
        }                                                                                                            // 471
    },                                                                                                               // 472
                                                                                                                     // 473
    'noData': function () {                                                                                          // 474
        var pageCount = getPageCount.call(this);                                                                     // 475
        return (pageCount === 0) && this.noDataTmpl;                                                                 // 476
    },                                                                                                               // 477
                                                                                                                     // 478
    'getPageCount' : getPageCount,                                                                                   // 479
                                                                                                                     // 480
    'getRowsPerPage' : function () {                                                                                 // 481
        return this.rowsPerPage.get();                                                                               // 482
    },                                                                                                               // 483
                                                                                                                     // 484
    'getCurrentPage' : function () {                                                                                 // 485
        return 1 + this.currentPage.get();                                                                           // 486
    },                                                                                                               // 487
                                                                                                                     // 488
    'isntFirstPage' : function () {                                                                                  // 489
        return this.currentPage.get() > 0;                                                                           // 490
    },                                                                                                               // 491
                                                                                                                     // 492
    'isntLastPage' : function () {                                                                                   // 493
        var currentPage = 1 + this.currentPage.get();                                                                // 494
        var pageCount = getPageCount.call(this);                                                                     // 495
        return currentPage < pageCount;                                                                              // 496
    },                                                                                                               // 497
                                                                                                                     // 498
    'showNavigation' : function () {                                                                                 // 499
        if (this.showNavigation === 'always') return true;                                                           // 500
        if (this.showNavigation === 'never') return false;                                                           // 501
        return getPageCount.call(this) > 1;                                                                          // 502
    },                                                                                                               // 503
    'getRowCount': getRowCount                                                                                       // 504
});                                                                                                                  // 505
                                                                                                                     // 506
Template.reactiveTable.events({                                                                                      // 507
    'click .reactive-table .sortable': function (event) {                                                            // 508
        var template = Template.instance();                                                                          // 509
        var target = $(event.target).is('i') ? $(event.target).parent() : $(event.target);                           // 510
        var sortFieldId = target.attr('fieldid');                                                                    // 511
        changePrimarySort(sortFieldId, template.context.fields, template.multiColumnSort);                           // 512
        getUpdateHandleForTemplate(template)(template.context);                                                      // 513
    },                                                                                                               // 514
                                                                                                                     // 515
    'click .reactive-table-columns-dropdown li': function (event) {                                                  // 516
        var template = Template.instance();                                                                          // 517
        var target = $(event.currentTarget);                                                                         // 518
        var fieldId = target.find('input').attr('data-fieldid');                                                     // 519
        var visibleFields = template.context.visibleFields.get();                                                    // 520
        var visibleField = _.findWhere(visibleFields, {fieldId: fieldId});                                           // 521
        if (visibleField) {                                                                                          // 522
            // Toggle visibility                                                                                     // 523
            visibleField.isVisible.set(!visibleField.isVisible.get());                                               // 524
            template.context.visibleFields.set(visibleFields);                                                       // 525
        }                                                                                                            // 526
    },                                                                                                               // 527
                                                                                                                     // 528
    'change .reactive-table-navigation .rows-per-page input': function (event) {                                     // 529
        var rowsPerPage = Math.max(~~$(event.target).val(), 1);                                                      // 530
        var template = Template.instance();                                                                          // 531
        template.context.rowsPerPage.set(rowsPerPage);                                                               // 532
        $(event.target).val(rowsPerPage);                                                                            // 533
                                                                                                                     // 534
        var currentPage = template.context.currentPage.get() + 1;                                                    // 535
        var pageCount = getPageCount.call(this);                                                                     // 536
        if (currentPage > pageCount) {                                                                               // 537
          template.context.currentPage.set(pageCount - 1);                                                           // 538
        }                                                                                                            // 539
        getUpdateHandleForTemplate(template)(template.context);                                                      // 540
    },                                                                                                               // 541
                                                                                                                     // 542
    'change .reactive-table-navigation .page-number input': function (event) {                                       // 543
        var currentPage = Math.max(~~$(event.target).val(), 1);                                                      // 544
        var pageCount = getPageCount.call(this);                                                                     // 545
        if (currentPage > pageCount) {                                                                               // 546
          currentPage = pageCount;                                                                                   // 547
        }                                                                                                            // 548
        if (currentPage < 0) {                                                                                       // 549
          currentPage = 1;                                                                                           // 550
        }                                                                                                            // 551
        var template = Template.instance();                                                                          // 552
        template.context.currentPage.set(currentPage - 1);                                                           // 553
        $(event.target).val(currentPage);                                                                            // 554
        getUpdateHandleForTemplate(template)(template.context);                                                      // 555
    },                                                                                                               // 556
                                                                                                                     // 557
    'click .reactive-table-navigation .previous-page': function (event) {                                            // 558
        var template = Template.instance();                                                                          // 559
        var currentPage = template.context.currentPage.get();                                                        // 560
        template.context.currentPage.set(currentPage - 1);                                                           // 561
        getUpdateHandleForTemplate(template)(template.context);                                                      // 562
    },                                                                                                               // 563
                                                                                                                     // 564
    'click .reactive-table-navigation .next-page': function (event) {                                                // 565
        var template = Template.instance();                                                                          // 566
        var currentPage = template.context.currentPage.get();                                                        // 567
        template.context.currentPage.set(currentPage + 1);                                                           // 568
        getUpdateHandleForTemplate(template)(template.context);                                                      // 569
    }                                                                                                                // 570
});                                                                                                                  // 571
                                                                                                                     // 572
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/aslagle:reactive-table/lib/sort.js                                                                       //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
normalizeSort = function (field, oldField) {                                                                         // 1
  // preserve user sort settings                                                                                     // 2
  if (oldField && _.has(oldField, 'sortOrder')) {                                                                    // 3
    field.sortOrder = oldField.sortOrder;                                                                            // 4
  }                                                                                                                  // 5
  if (oldField && _.has(oldField, 'sortDirection')) {                                                                // 6
    field.sortDirection = oldField.sortDirection;                                                                    // 7
  }                                                                                                                  // 8
                                                                                                                     // 9
  // backwards-compatibility                                                                                         // 10
  if (!_.has(field, 'sortOrder') && _.has(field, 'sort')) {                                                          // 11
    console.warn('reactiveTable warning: The "sort" option for fields is deprecated');                               // 12
    field.sortOrder = 0;                                                                                             // 13
    field.sortDirection = field.sort;                                                                                // 14
  }                                                                                                                  // 15
                                                                                                                     // 16
                                                                                                                     // 17
  var sortOrder;                                                                                                     // 18
                                                                                                                     // 19
  if (!_.has(field, 'sortOrder')) {                                                                                  // 20
    sortOrder = Infinity;                                                                                            // 21
    field.sortOrder = new ReactiveVar();                                                                             // 22
  } else if (field.sortOrder instanceof ReactiveVar) {                                                               // 23
    sortOrder = field.sortOrder.get()                                                                                // 24
  } else {                                                                                                           // 25
    sortOrder = field.sortOrder;                                                                                     // 26
    field.sortOrder = new ReactiveVar();                                                                             // 27
  }                                                                                                                  // 28
                                                                                                                     // 29
  if (!_.isNumber(sortOrder) || sortOrder < 0) {                                                                     // 30
    console.error('reactiveTable error - sortOrder must be a postive number: ' + sortOrder);                         // 31
    sortOrder = Infinity;                                                                                            // 32
  }                                                                                                                  // 33
  field.sortOrder.set(sortOrder);                                                                                    // 34
                                                                                                                     // 35
  var sortDirection;                                                                                                 // 36
                                                                                                                     // 37
  if (!_.has(field, 'sortDirection')) {                                                                              // 38
    sortDirection = 1;                                                                                               // 39
    field.sortDirection = new ReactiveVar()                                                                          // 40
  } else if (field.sortDirection instanceof ReactiveVar) {                                                           // 41
    sortDirection = field.sortDirection.get();                                                                       // 42
  } else {                                                                                                           // 43
    sortDirection = field.sortDirection;                                                                             // 44
    field.sortDirection = new ReactiveVar();                                                                         // 45
  }                                                                                                                  // 46
                                                                                                                     // 47
  if (sortDirection === 'desc' || sortDirection === 'descending' || sortDirection === -1) {                          // 48
    sortDirection = -1;                                                                                              // 49
  } else if (sortDirection) {                                                                                        // 50
    sortDirection = 1;                                                                                               // 51
  }                                                                                                                  // 52
  field.sortDirection.set(sortDirection);                                                                            // 53
};                                                                                                                   // 54
                                                                                                                     // 55
getSortedFields = function (fields, multiColumnSort) {                                                               // 56
  var filteredFields = _.filter(fields, function (field) {                                                           // 57
    return field.sortOrder.get() < Infinity;                                                                         // 58
  });                                                                                                                // 59
  if (!filteredFields.length) {                                                                                      // 60
    var firstSortableField = _.find(fields, function (field) {                                                       // 61
      return _.isUndefined(field.sortable) || field.sortable !== false;                                              // 62
    });                                                                                                              // 63
    if (firstSortableField) {                                                                                        // 64
      filteredFields = [firstSortableField];                                                                         // 65
    }                                                                                                                // 66
  }                                                                                                                  // 67
  var sortedFields = _.sortBy(filteredFields, function (field) {                                                     // 68
    return field.sortOrder.get();                                                                                    // 69
  });                                                                                                                // 70
  return multiColumnSort ? sortedFields : sortedFields.slice(0, 1);                                                  // 71
}                                                                                                                    // 72
                                                                                                                     // 73
getSortQuery = function (fields, multiColumnSort) {                                                                  // 74
  var sortedFields = getSortedFields(fields, multiColumnSort);                                                       // 75
  var sortQuery = {};                                                                                                // 76
  _.each(sortedFields, function (field) {                                                                            // 77
    sortQuery[field.key] = field.sortDirection.get();                                                                // 78
  });                                                                                                                // 79
  return sortQuery;                                                                                                  // 80
};                                                                                                                   // 81
                                                                                                                     // 82
sortWithFunctions = function (rows, fields, multiColumnSort) {                                                       // 83
  var sortedFields = getSortedFields(fields, multiColumnSort);                                                       // 84
  var sortedRows = rows;                                                                                             // 85
                                                                                                                     // 86
  _.each(sortedFields.reverse(), function (field) {                                                                  // 87
    if (field.sortByValue || !field.fn) {                                                                            // 88
      sortedRows = _.sortBy(sortedRows, field.key);                                                                  // 89
    } else {                                                                                                         // 90
      sortedRows = _.sortBy(sortedRows, function (row) {                                                             // 91
        return field.fn( get( row, field.key ), row );                                                               // 92
      });                                                                                                            // 93
    }                                                                                                                // 94
    if (field.sortDirection.get() === -1) {                                                                          // 95
      sortedRows.reverse();                                                                                          // 96
    }                                                                                                                // 97
  });                                                                                                                // 98
  return sortedRows;                                                                                                 // 99
};                                                                                                                   // 100
                                                                                                                     // 101
getPrimarySortField = function (fields, multiColumnSort) {                                                           // 102
  return getSortedFields(fields, multiColumnSort)[0];                                                                // 103
};                                                                                                                   // 104
                                                                                                                     // 105
changePrimarySort = function(fieldId, fields, multiColumnSort) {                                                     // 106
  var primarySortField = getPrimarySortField(fields, multiColumnSort);                                               // 107
  if (primarySortField && primarySortField.fieldId === fieldId) {                                                    // 108
    var sortDirection = -1 * primarySortField.sortDirection.get();                                                   // 109
    primarySortField.sortDirection.set(sortDirection);                                                               // 110
    primarySortField.sortOrder.set(0);                                                                               // 111
  } else {                                                                                                           // 112
    _.each(fields, function (field) {                                                                                // 113
      if (field.fieldId === fieldId) {                                                                               // 114
        field.sortOrder.set(0);                                                                                      // 115
        if (primarySortField) {                                                                                      // 116
          field.sortDirection.set(primarySortField.sortDirection.get());                                             // 117
        }                                                                                                            // 118
      } else {                                                                                                       // 119
        var sortOrder = 1 + field.sortOrder.get();                                                                   // 120
        field.sortOrder.set(sortOrder);                                                                              // 121
      }                                                                                                              // 122
    });                                                                                                              // 123
  }                                                                                                                  // 124
};                                                                                                                   // 125
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/aslagle:reactive-table/lib/filter.js                                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
var parseFilterString = function (filterString) {                                                                    // 1
  var startQuoteRegExp = /^[\'\"]/;                                                                                  // 2
  var endQuoteRegExp = /[\'\"]$/;                                                                                    // 3
  var filters = [];                                                                                                  // 4
  var words = filterString.split(' ');                                                                               // 5
                                                                                                                     // 6
  var inQuote = false;                                                                                               // 7
  var quotedWord = '';                                                                                               // 8
  _.each(words, function (word) {                                                                                    // 9
    if (inQuote) {                                                                                                   // 10
      if (endQuoteRegExp.test(word)) {                                                                               // 11
        filters.push(quotedWord + ' ' + word.slice(0, word.length - 1));                                             // 12
        inQuote = false;                                                                                             // 13
        quotedWord = '';                                                                                             // 14
      } else {                                                                                                       // 15
        quotedWord = quotedWord + ' ' + word;                                                                        // 16
      }                                                                                                              // 17
    } else if (startQuoteRegExp.test(word)) {                                                                        // 18
      if (endQuoteRegExp.test(word)) {                                                                               // 19
        filters.push(word.slice(1, word.length - 1));                                                                // 20
      } else {                                                                                                       // 21
        inQuote = true;                                                                                              // 22
        quotedWord = word.slice(1, word.length);                                                                     // 23
      }                                                                                                              // 24
    } else {                                                                                                         // 25
      filters.push(word);                                                                                            // 26
    }                                                                                                                // 27
  });                                                                                                                // 28
  return filters;                                                                                                    // 29
};                                                                                                                   // 30
                                                                                                                     // 31
var escapeRegex = function(text) {                                                                                   // 32
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");                                                           // 33
};                                                                                                                   // 34
                                                                                                                     // 35
getFilterQuery = function (filterInputs, filterFields, settings) {                                                   // 36
  settings = settings || {};                                                                                         // 37
  if (settings.enableRegex === undefined) {                                                                          // 38
    settings.enableRegex = false;                                                                                    // 39
  }                                                                                                                  // 40
  if (settings.fields) {                                                                                             // 41
    _.each(filterInputs, function (filter, index) {                                                                  // 42
      if (_.any(settings.fields, function (include) { return include; })) {                                          // 43
        filterFields[index] = _.filter(filterFields[index], function (field) {                                       // 44
          return settings.fields[field];                                                                             // 45
        });                                                                                                          // 46
      } else {                                                                                                       // 47
        filterFields[index] = _.filter(filterFields[index], function (field) {                                       // 48
          return _.isUndefined(settings.fields[field]) || settings.fields[field];                                    // 49
        });                                                                                                          // 50
      }                                                                                                              // 51
    });                                                                                                              // 52
  }                                                                                                                  // 53
  var numberRegExp = /^\d+$/;                                                                                        // 54
  var queryList = [];                                                                                                // 55
  _.each(filterInputs, function (filter, index) {                                                                    // 56
    if (filter) {                                                                                                    // 57
      if (_.isObject(filter)) {                                                                                      // 58
        var fieldQueries = _.map(filterFields[index], function (field) {                                             // 59
          var query = {};                                                                                            // 60
          query[field] = filter;                                                                                     // 61
          return query;                                                                                              // 62
        });                                                                                                          // 63
        if (fieldQueries.length) {                                                                                   // 64
            queryList.push({'$or': fieldQueries});                                                                   // 65
          }                                                                                                          // 66
      } else {                                                                                                       // 67
        var filters = parseFilterString(filter);                                                                     // 68
        _.each(filters, function (filterWord) {                                                                      // 69
          if (settings.enableRegex === false) {                                                                      // 70
            filterWord = escapeRegex(filterWord);                                                                    // 71
          }                                                                                                          // 72
          var filterQueryList = [];                                                                                  // 73
          _.each(filterFields[index], function (field) {                                                             // 74
            var filterRegExp = new RegExp(filterWord, 'i');                                                          // 75
            var query = {};                                                                                          // 76
            query[field] = filterRegExp;                                                                             // 77
            filterQueryList.push(query);                                                                             // 78
                                                                                                                     // 79
            if (numberRegExp.test(filterWord)) {                                                                     // 80
              var numberQuery = {};                                                                                  // 81
              numberQuery[field] = parseInt(filterWord, 10);                                                         // 82
              filterQueryList.push(numberQuery);                                                                     // 83
            }                                                                                                        // 84
                                                                                                                     // 85
            if (filterWord === "true") {                                                                             // 86
              var boolQuery = {};                                                                                    // 87
              boolQuery[field] = true;                                                                               // 88
              filterQueryList.push(boolQuery);                                                                       // 89
            } else if (filterWord === "false") {                                                                     // 90
              var boolQuery = {};                                                                                    // 91
              boolQuery[field] = false;                                                                              // 92
              filterQueryList.push(boolQuery);                                                                       // 93
            }                                                                                                        // 94
          });                                                                                                        // 95
                                                                                                                     // 96
          if (filterQueryList.length) {                                                                              // 97
            var filterQuery = {'$or': filterQueryList};                                                              // 98
            queryList.push(filterQuery);                                                                             // 99
          }                                                                                                          // 100
        });                                                                                                          // 101
      }                                                                                                              // 102
    }                                                                                                                // 103
  });                                                                                                                // 104
  return queryList.length ? {'$and': queryList} : {};                                                                // 105
};                                                                                                                   // 106
                                                                                                                     // 107
if (Meteor.isClient) {                                                                                               // 108
  ReactiveTable = ReactiveTable || {};                                                                               // 109
                                                                                                                     // 110
  var reactiveTableFilters = {};                                                                                     // 111
  var callbacks = {};                                                                                                // 112
                                                                                                                     // 113
  ReactiveTable.Filter = function (id, fields) {                                                                     // 114
    if (reactiveTableFilters[id]) {                                                                                  // 115
        return reactiveTableFilters[id];                                                                             // 116
    }                                                                                                                // 117
                                                                                                                     // 118
    var filter = new ReactiveVar();                                                                                  // 119
                                                                                                                     // 120
    this.fields = fields;                                                                                            // 121
                                                                                                                     // 122
    this.get = function () {                                                                                         // 123
      return filter.get() || '';                                                                                     // 124
    };                                                                                                               // 125
                                                                                                                     // 126
    this.set = function (filterString) {                                                                             // 127
      filter.set(filterString);                                                                                      // 128
      _.each(callbacks[id], function (callback) {                                                                    // 129
        callback();                                                                                                  // 130
      });                                                                                                            // 131
    };                                                                                                               // 132
                                                                                                                     // 133
    reactiveTableFilters[id] = this;                                                                                 // 134
  };                                                                                                                 // 135
                                                                                                                     // 136
  ReactiveTable.clearFilters = function (filterIds) {                                                                // 137
    _.each(filterIds, function (filterId) {                                                                          // 138
      if (reactiveTableFilters[filterId]) {                                                                          // 139
        reactiveTableFilters[filterId].set('');                                                                      // 140
      }                                                                                                              // 141
    });                                                                                                              // 142
  };                                                                                                                 // 143
                                                                                                                     // 144
  dependOnFilters = function (filterIds, callback) {                                                                 // 145
    _.each(filterIds, function (filterId) {                                                                          // 146
      if (_.isUndefined(callbacks[filterId])) {                                                                      // 147
        callbacks[filterId] = [];                                                                                    // 148
      }                                                                                                              // 149
      callbacks[filterId].push(callback);                                                                            // 150
    });                                                                                                              // 151
  };                                                                                                                 // 152
                                                                                                                     // 153
  getFilterStrings = function (filterIds) {                                                                          // 154
    return _.map(filterIds, function (filterId) {                                                                    // 155
      if (_.isUndefined(reactiveTableFilters[filterId])) {                                                           // 156
        return '';                                                                                                   // 157
      }                                                                                                              // 158
      return reactiveTableFilters[filterId].get();                                                                   // 159
    });                                                                                                              // 160
  };                                                                                                                 // 161
                                                                                                                     // 162
  getFilterFields = function (filterIds, allFields) {                                                                // 163
    return _.map(filterIds, function (filterId) {                                                                    // 164
      if (_.isUndefined(reactiveTableFilters[filterId])) {                                                           // 165
        return _.map(allFields, function (field) { return field.key; });                                             // 166
      } else if (_.isEmpty(reactiveTableFilters[filterId].fields)) {                                                 // 167
        return _.map(allFields, function (field) { return field.key; });                                             // 168
      } else {                                                                                                       // 169
        return reactiveTableFilters[filterId].fields;                                                                // 170
      }                                                                                                              // 171
    });                                                                                                              // 172
  };                                                                                                                 // 173
                                                                                                                     // 174
  Template.reactiveTableFilter.helpers({                                                                             // 175
    'class': function () {                                                                                           // 176
      return this.class || 'input-group';                                                                            // 177
    },                                                                                                               // 178
                                                                                                                     // 179
    'filter': function () {                                                                                          // 180
      if (_.isUndefined(reactiveTableFilters[this.id])) {                                                            // 181
        new ReactiveTable.Filter(this.id, this.fields);                                                              // 182
      }                                                                                                              // 183
      return reactiveTableFilters[this.id].get();                                                                    // 184
    }                                                                                                                // 185
  });                                                                                                                // 186
                                                                                                                     // 187
  var updateFilter = _.debounce(function (template, filterText) {                                                    // 188
    reactiveTableFilters[template.data.id].set(filterText);                                                          // 189
  }, 200);                                                                                                           // 190
                                                                                                                     // 191
  Template.reactiveTableFilter.events({                                                                              // 192
    'keyup .reactive-table-input, input .reactive-table-input': function (event) {                                   // 193
      var template = Template.instance();                                                                            // 194
      var filterText = $(event.target).val();                                                                        // 195
      updateFilter(template, filterText);                                                                            // 196
    },                                                                                                               // 197
  });                                                                                                                // 198
}                                                                                                                    // 199
                                                                                                                     // 200
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['aslagle:reactive-table'] = {
  ReactiveTable: ReactiveTable
};

})();
