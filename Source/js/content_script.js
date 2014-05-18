window.hi = 'hi there';
window.Wtbw = (function(){
	var arr = [
		// human
		{
			regExp: new RegExp("(\\bhumans?\\b)", 'i'),
			replacementList: [
				{
					match: new RegExp("\\bHuman\\b"),
					replacements: "Hewmon"
				},
			    {
			    	match: new RegExp("\\bHumans\\b"),
			    	replacements: "Hewmons"
		    	},
				{
					match: new RegExp("\\bhuman\\b","i"),
					replacements: ["hewmon",'hewmon']
				},
			    {
			    	match: new RegExp("\\bHumans\\b"),
			    	replacements: "Hewmons"
		    	},
			    {
			    	match: new RegExp("\\bhumans\\b","i"),
			    	replacements: "hewmons"
		    	}
	    	]
		},
		// wine
		{
			regExp: new RegExp("(\\bwine\\b)", 'i'),
			replacementList: [
				{
			    	match: new RegExp("\\bWine\\b"),
			    	replacements: "Bloodwine"
			    },
			    {
					match: new RegExp("\\bwine\\b","i"),
					replacements: "bloodwine"
				}
			]
		},
		// tea
		{
			regExp: new RegExp('(\\btea|earl grey tea\\b)', 'i'),
			replacementList: [
			    {
			    	match: new RegExp("\\bEarl Grey Tea\\b"),
			    	replacements: "Tea (Earl Grey, hot)"
			    },
			    {
			    	match: new RegExp("\\bEarl Grey tea\\b","i"),
			    	replacements: "tea (Earl Grey, hot)"
			    },
			    {
			    	match: new RegExp("\\bTea\\b"),
			    	replacements:  "Tarkalean Tea"
			    },
			    {
					match: new RegExp("\\btea\\b","i"),
					replacements:  "Tarkalean tea"
				}
			]
		},
		// coffee
		{
			regExp: new RegExp('(\\bcoffee\\b)', 'i'),
			replacementList: [
				{
			    	match: new RegExp("\\bCoffee\\b"),
			    	replacements: "Raktajino"
			    },
			    {
			    	match: new RegExp("\\bcoffee\\b","i"),
			    	replacements: "raktajino"
			    }
			]
		},
		// beer
		{
			regExp: new RegExp('(\\bbeer\\b)', 'i'),
			replacementList: [
				{
			    	match: new RegExp("\\bbeer\\b"),
			    	replacements: "Romulan ale"
			    },
			    {
			    	match: new RegExp("\\bBeer\\b","i"),
			    	replacements: "Romulan Ale"
			    }
			]
		},
		// brandy
		{
			regExp: new RegExp('(\\bbrandy\\b)', 'i'),
			replacementList: [
			    {
			    	match: new RegExp("\\bBrandy\\b"),
			    	replacements: "Saurian Brandy"
			    },
				{
			    	match: new RegExp("\\bbrandy\\b", "i"),
			    	replacements: "Saurian brandy"
			    }
			]
		},
		// Cisco
		{
			regExp: new RegExp('(\\bcisco\\b)', 'i'),
			replacementList: [
			    {
			    	match: new RegExp("\\bcisco\\b","i"),
			    	replacements: "Sisko"
			    }
			]
		}


		/*

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
					currStr = strArr[j];
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
									replacementChoices : // the string, or a random item from the array
									replacementChoices[ Math.floor(Math.random() * replacementChoices.length) ];

								break;
							}
						}

						fragment.appendChild( makeReplacementElement(currStr, replacementStr) );
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

		return wrapperElem;
	}

	init();

	return {
		makeReplacements: makeReplacements
	};
})();
