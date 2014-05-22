window.Wtbw = (function(){
	var arr = [
		// human
		{
			regExp: new RegExp("(\\bhumans?\\b)", 'i'),
			replacementList: [
				{
					match: new RegExp("\\bHuman\\b"),
					replacements: ["Hewmon","Terran"]
				},
			    {
			    	match: new RegExp("\\bHumans\\b"),
			    	replacements: ["Hewmons","Terrans"]
		    	},
				{
					match: new RegExp("\\bhuman\\b","i"),
					replacements: ["hewmon",'terran']
				},
			    {
			    	match: new RegExp("\\bhumans\\b","i"),
			    	replacements: ["hewmons","terrans"]
		    	}
	    	]
		},
		// wine
		{
			regExp: new RegExp("(\\bwines?\\b)", 'i'),
			replacementList: [
				{
			    	match: new RegExp("\\bWines\\b"),
			    	replacements: "Barrels of bloodwine"
			    },
			    {
					match: new RegExp("\\bwines\\b","i"),
					replacements: "barrels of bloodwine"
				},
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
			regExp: new RegExp('(\\btea\\b|\\bearl grey tea\\b)', 'i'),
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
	];

	// more-local arrays for performance, with linked indexes
	// init() initializes/refreshes them
	var regExpArr = [],
		replacementListsArr = [];

	function init() {
		document.body.classList.add('wtbw');
		// local arrays for efficiency
		for (i = 0, len = arr.length; i < len; i++) {
			regExpArr.push( arr[i].regExp );
			replacementListsArr.push( arr[i].replacementList );
		}

		walk(document.body);
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

	// takes in a text node
	// if no replacements are made, returns false
	// if replacements are made, returns a document fragment to replace the original node
	function makeReplacements(node) {
		var	i, j, len, re, replacementList, replacementStr, replacementChoices, currStr,
			str = node.nodeValue,
			modified = false,
			fragment;

		// test the node's text against each regexp
		for (i = 0, len = regExpArr.length; i < len; i++) {
			re = regExpArr[i];

			// if we have something to replace for the current regexp
			if ( re.test(str) ) {

				// make a fragment if it doesn't exist
				if (!fragment) fragment = document.createDocumentFragment();

				// get the local list of replacements ready
				replacementListArr = replacementListsArr[i];

				// split it up, (including the matched strings), loop over them
				// will result in strArr being ['nonmatch ', 'match', ' nonmatch ', 'match', ' nonmatch.']
				strArr = str.split(re);

				// loop over each of the pieces of the string
				for (j = 0, jLen = strArr.length; j < jLen; j++) {
					currStr = strArr[j];
					// for the even strings (non-matched)
					if (j % 2 === 0) {
						// add text node to fragment, unchanged
						fragment.appendChild( document.createTextNode(currStr) );
					} else {
						// Do the replacement here!
						// Loop through the possible replacements for this string
						for (k=0, kLen = replacementListArr.length; k < kLen; k++) {

							// if the regexp matches the string
							if ( replacementListArr[k].match.test( currStr ) ) {

								// grab the replacement string or array of replacement options
								replacementChoices = replacementListArr[k].replacements;

								// if replacementChoices is a string, return the string.
								// if it's an array, return a random string from the array
								replacementStr = (typeof replacementChoices === 'string') ?
									replacementChoices :
									replacementChoices[ Math.floor(Math.random() * replacementChoices.length) ];

								// we've succeeded once for this string, so don't keep trying
								break;
							}
						}

						// make a replacement element, add it to the fragment
						fragment.appendChild( makeDOMElementForReplacement(currStr, replacementStr) );
					}
				}
				return fragment;
			}
		}

		return false;
	}

	// takes in two strings, returns a DOM element
	function makeDOMElementForReplacement(origStr, newStr) {
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
