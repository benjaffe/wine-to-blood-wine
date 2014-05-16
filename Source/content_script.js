(function(){
	var arr = [
	    ["human"   , "hewmon"],
	    ["Human"   , "Hewmon"],
	    ["humans"  , "hewmons"],
	    ["Humans"  , "Hewmons"],
	    ["wine"    , "bloodwine"],
	    ["Wine"    , "Bloodwine"],
	    ["tea"     , "tarkalean tea"],
	    ["Tea"     , "Tarkalean Tea"],
	    ["coffee"  , "raktajino"],
	    ["Coffee"  , "Raktajino"],
	    ["beer"    , "Romulan ale"],
	    ["Beer"    , "Romulan Ale"],
	    ["Cisco"   , "Sisko"]
	];

	// make RegExps
	for (i = 0, len = arr.length; i < len; i++) {
		arr[i][0] = new RegExp( arr[i][0] );
	}

	function walk(node) { // Function taken from http://is.gd/mwZp7E
		var child, next;
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
				handleText(node);
				break;
		}
	}

	function handleText(textNode) {
		var v = textNode.nodeValue;
		var	i, len, re;

		for (i = 0, len = arr.length; i < len; i++) {
			re = arr[i][0];
			if ( re.test(v) ) {
				v = v.replace(re, arr[i][1]);
			}
		}

		textNode.nodeValue = v;
	}

	walk(document.body);

})();
