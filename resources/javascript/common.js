var Common = Class.extend({
	isUsableElement : function(element) {
		return typeof element != 'undefined' ? true : false;
	}
});

$(document).ready(function() {
    var documentAppController = new DocumentAppController();
    var editorAppController = new EditorAppController();
});
