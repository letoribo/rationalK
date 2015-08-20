if (Meteor.settings.public.custom_function_file === "companyA.js") {
	Meteor.methods({
		listAvailableFunctions: function () {
			listAvailableFunctions = [ //the value should match a function name also define in this file
				{
					value: "generateId",
					text: "generateId",
				},
				{
					value: "ChooseFromList",
					text: "ChooseFromList",
				},
			];
			return listAvailableFunctions;
		},
		generateId: function () {
			var idFieldName;
			var lastCharactersOfDocId = [];
			var arrayLength;
			var docId;
			var IdSubstring;
			if (Meteor.settings.public.debug) {
				console.log("Running custom function generateId for a company");
			}
			if ((document.getElementById("docEdit")) && (typeof(document.getElementById("docEdit")) !== 'undefined')) {
				idFieldName = "Report ID";
				currentDocId = document.getElementById("docEdit").elements.namedItem(idFieldName).value;
				if (!currentDocId) {
					docType = document.getElementById("docEdit").elements.namedItem("Type").value;
					if (docType === "") {
						if (typeof(toastr) !== 'undefined') {
							toastr.error('I will not generate anything because you have not chosen yet the doc type');
						}
						throw new Meteor.Error( 112, 'I will not generate anything because you have not chosen yet the doc type' );
					}

					Year = document.getElementById("docEdit").elements.namedItem("Year").value;
					categoryId = Categories.findOne({name: "ENG"})._id;
					DocInThisCategory = Docs.find({categoryId: categoryId}).fetch();


					arrayLength = DocInThisCategory.length;
					if (Meteor.settings.public.debug) {
						console.log("You have " + arrayLength + " documents in the ENG category");
					}
					for (i = 0; i < arrayLength; i++) {
						if (Meteor.settings.public.debug) {
							console.log(DocInThisCategory[i].fields[idFieldName]);
						}
						if (typeof(DocInThisCategory[i].fields[idFieldName]) !== 'undefined') {
							docId = DocInThisCategory[i].fields[idFieldName].value;
							//Remove the first 2 caracteres that are doc type :
							IdSubstring = docId.substring(2);
						}
						else {
							IdSubstring = Year + "000";
						}
						lastCharactersOfDocId.push(IdSubstring);
					}
					max = Math.max.apply(null, lastCharactersOfDocId);
					newNumber = max + 1;
					document.getElementById("docEdit").elements.namedItem([idFieldName]).value = docType + newNumber;
				}
				else {
					if (typeof(toastr) !== 'undefined') {
						toastr.error('I will not generate anything because you have something in this field, please erase before.');
					}
				}
			}
			return true;
		},
		ChooseFromList: function () {
			var docTypeFieldName = "Type";
			var divHelperForType;
			var a;
			var linkText;
			//remove the class so it is not clickable anymore :
			document.getElementById("ChooseFromList").className = "";
			divHelperForType = document.getElementById("helperForType");
			a = document.createElement('a');
			linkText = document.createTextNode(" Instruction (IN) ");
			a.appendChild(linkText);
			a.title = "Click me";
			a.class = "addAType";
			a.href = "#";
			//a.dataset.whattoadd = "IN";
			a.onclick = function (e) {
				e.preventDefault();
				document.getElementById("docEdit").elements.namedItem([docTypeFieldName]).value = "IN";
			};

			divHelperForType.appendChild(a);
			a = document.createElement('a');
			linkText = document.createTextNode(" Test Report (TR) ");
			a.appendChild(linkText);
			a.title = "Click me";
			a.class = "addAType";
			a.href = "#";
			a.onclick = function (e) {
				e.preventDefault();
				document.getElementById("docEdit").elements.namedItem([docTypeFieldName]).value = "TR";
			};
			divHelperForType.appendChild(a);

			divHelperForType.appendChild(a);
			a = document.createElement('a');
			linkText = document.createTextNode(" Base de donnée (DB) ");
			a.appendChild(linkText);
			a.title = "Click me";
			a.class = "addAType";
			a.href = "#";
			a.onclick = function (e) {
				e.preventDefault();
				document.getElementById("docEdit").elements.namedItem([docTypeFieldName]).value = "DB";
			};
			divHelperForType.appendChild(a);

			divHelperForType.appendChild(a);
			a = document.createElement('a');
			linkText = document.createTextNode(" Calculation Report (CR) ");
			a.appendChild(linkText);
			a.title = "Click me";
			a.class = "addAType";
			a.href = "#";
			a.onclick = function (e) {
				e.preventDefault();
				document.getElementById("docEdit").elements.namedItem([docTypeFieldName]).value = "CR";
			};
			divHelperForType.appendChild(a);

			divHelperForType.appendChild(a);
			a = document.createElement('a');
			linkText = document.createTextNode(" Analysis Report (AR) ");
			a.appendChild(linkText);
			a.title = "Click me";
			a.class = "addAType";
			a.href = "#";
			a.onclick = function (e) {
				e.preventDefault();
				document.getElementById("docEdit").elements.namedItem([docTypeFieldName]).value = "AR";
			};
			divHelperForType.appendChild(a);

			divHelperForType.appendChild(a);
			a = document.createElement('a');
			linkText = document.createTextNode(" Qualification Report (QR) ");
			a.appendChild(linkText);
			a.title = "Click me";
			a.class = "addAType";
			a.href = "#";
			a.onclick = function (e) {
				e.preventDefault();
				document.getElementById("docEdit").elements.namedItem([docTypeFieldName]).value = "QR";
			};
			divHelperForType.appendChild(a);

			divHelperForType.appendChild(a);
			a = document.createElement('a');
			linkText = document.createTextNode(" Notes Report (NR) ");
			a.appendChild(linkText);
			a.title = "Click me";
			a.class = "addAType";
			a.href = "#";
			a.onclick = function(e) {
				e.preventDefault();
				document.getElementById("docEdit").elements.namedItem([docTypeFieldName]).value = "NR";
			};
			divHelperForType.appendChild(a);

			divHelperForType.appendChild(a);
			a = document.createElement('a');
			linkText = document.createTextNode(" Other Report (OR) ");
			a.appendChild(linkText);
			a.title = "Click me";
			a.class = "addAType";
			a.href = "#";
			a.onclick = function (e) {
				e.preventDefault();
				document.getElementById("docEdit").elements.namedItem([docTypeFieldName]).value = "OR";
			};
			divHelperForType.appendChild(a);

			return false;
		},
	});
}
