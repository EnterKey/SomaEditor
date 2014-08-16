/**
 * @author EnterKey
 */

if ( typeof (common) == typeof (undefined)) {
	editor = {};
}

$(document).ready(function() {
	editor.setEventListener();
});

editor.setEventListener = function() {
	this.toggleTitleModal();
	this.changeDocumentTitle();
};

editor.toggleTitleModal = function() {
	$('#writing_title').on('click', function() {
		$('#modal-edit-writing').modal('toggle');
	});
};

editor.changeDocumentTitle = function() {
	$('#btn-done').on('click', function() {
		var title = $('#title').val();
		$('#writing_title').html(title);
	});
};
