/**
 * @author EnterKey
 */

if ( typeof (common) == typeof (undefined)) {
	common = {};
}

common = {
	isUsableElement : function(element) {
		return typeof element != 'undefined' ? true : false;
	}
}; 

$(document).ready(function() {
	editor.init();
});


