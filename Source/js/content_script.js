window.hi = 'hi there';
window.Wtbw = (function(){
	var arr = [
		// human
		{
			regExp: new RegExp("(\\bhumans?\\b)", 'i'),
			replacementList: [
				{
					match: new RegExp("\\bhuman\\b"),
					replacements: ["hewmon1",'hewmon111'],
					keepCase: true
				},
				{
					match: new RegExp("\\bHuman\\b"),
					replacements: ["Hewmon2","Hewmon23","Hewmon234","Hewmon2345"],
					keepCase: true
				},
			    {
			    	match: new RegExp("\\bhumans\\b"),
			    	replacements: "hewmons3",
			    	keepCase: true
		    	},
			    {
			    	match: new RegExp("\\bHumans\\b"),
			    	replacements: "Hewmons4",
			    	keepCase: true
		    	}
	    	]
		},
		// wine
		{
			regExp: new RegExp("(\\bwine?\\b)", 'i'),
			replacementList: [
				{
					match: new RegExp("\\bwine\\b"),
					replacement: "bloodwine",
					keepCase: true
				},
			    {
			    	match: new RegExp("\\bWine\\b"),
			    	replacement: "Bloodwine",
			    	keepCase: true
			    },
			]
		}/*
		// tea
		[
			{
				match: "\\btea\\b",
				replacement:  "tarkalean tea",
				keepCase: true
			},
		    {
		    	match: "\\bTea\\b",
		    	replacement:  "Tarkalean Tea",
		    	keepCase: true
		    },
		    {
		    	match: "\\bEarl Grey Tea\\b",
		    	replacement: "Tea (Earl Grey, hot)",
		    	keepCase: true
		    },
		    {
		    	match: "\\bEarl Grey\\b",
		    	replacement: "Tea (Earl Grey, hot)",
		    	keepCase: true
		    },
		]


	    // ["coffee"  , "raktajino"],
	    // ["Coffee"  , "Raktajino"],
	    // ["beer"    , "Romulan ale"],
	    // ["Beer"    , "Romulan Ale"],
	    // ["brandy"    , "Saurian brandy"],
	    // ["Brandy"    , "Saurian Brandy"],
	    // ["Cisco"   , "Sisko"]
	    */
	];

	// more-local arrays for performance, with linked indexes
	// init() initializes/refreshes them
	var regExpArr = [];
	var replacementListsArr = [];

	function init() {
		document.body.classList.add('wtbw');
		for (i = 0, len = arr.length; i < len; i++) {
			regExpArr.push( arr[i].regExp );
			replacementListsArr.push ( arr[i].replacementList );
		}

		// walk will fail while running unit tests
		// try {
			walk(document.body);
		// } catch (e) {
			// console.error('Skipping walking the document, probably due to unit tests', e);
		// }

	}

	function walk(node) { // Function taken from http://is.gd/mwZp7E
		var child, next, replacementResult;
		switch ( node.nodeType ) {
			case 1:  // Element
			case 9:  // Document
			case 11: // Document fragment
				child = node.firstChild;
				while ( child ) {
					next = child.nextSibling;
					walk(child);
					child = next;
				}
				break;

			case 3: // Text node
				replacementResult = makeReplacements(node);
				if (replacementResult) {
					node.parentNode.replaceChild(replacementResult, node);
				}
				break;
		}
	}

	// takes in a text node, returns false, or a document fragment to replace the original
	function makeReplacements(node) {
		var	i, j, len, re, replacementList, replacementStr, replacementChoices, currStr;
		var str = node.nodeValue;
		var modified = false;
		var fragment;

		// test for each regexp
		for (i = 0, len = regExpArr.length; i < len; i++) {

			// do we have something to replace for the current regexp?
			re = regExpArr[i];

			if ( re.test(str) ) {
				// console.log('replacement going on',str,re);

				// make a fragment if it doesn't exist
				if (!fragment) fragment = document.createDocumentFragment();

				// get the local list of replacements ready
				replacementListArr = replacementListsArr[i];


				// split it up, including the matched strings, loop over them
				strArr = str.split(re);
				for (j = 0, jLen = strArr.length; j < jLen; j++) {
					currStr = strArr[j]
					// for the even strings (non-matched)
					if (j % 2 === 0) {
						// add text node to fragment
						fragment.appendChild( document.createTextNode(currStr) );
					} else {
						// do the replacement here!
						for (k=0, kLen = replacementListArr.length; k < kLen; k++) {
							// if the regexp matches the string
							if ( replacementListArr[k].match.test( currStr ) ) {
								// choose a random replacement
								replacementChoices = replacementListArr[k].replacements;

								replacementStr = (typeof replacementChoices === 'string') ?
									replacementChoices :
									replacementChoices[ Math.floor(Math.random() * replacementChoices.length) ];

							}
						}

						fragment.appendChild( makeReplacementElement(str, replacementStr) );
					}
				}
				return fragment;
			}
		}

		return false;
	}

	function makeReplacementElement(origStr, newStr) {
		var wrapperElem = document.createElement('span');
		wrapperElem.className = 'wtbw-elem';

		var origElem = document.createElement('span');
		origElem.className = 'wtbw-original';
		origElem.textContent = origStr;

		var newElem = document.createElement('span');
		newElem.className = 'wtbw-new';
		newElem.textContent = newStr;

		wrapperElem.appendChild(newElem);
		wrapperElem.appendChild(origElem);

		// console.log(wrapperElem);
		return wrapperElem;
	}

	init();

	return {
		makeReplacements: makeReplacements
	};
})();
