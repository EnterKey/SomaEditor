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
	this.toggleReviewDivision();
};

editor.toggleTitleModal = function() {
	$('#writing_title').on('click', function() {
		var title = $('#writing_title').text();
		$('#title').val(title);
		$('#modal-edit-writing').modal('toggle');
	});
};

editor.changeDocumentTitle = function() {
	$('#btn-done').on('click', function() {
		var title = $('#title').val();
		$('#writing_title').html(title);
	});
};

editor.toggleReviewDivision = function() {
	$('#toggle_preview_btn').on('click', function() {
		var isReviewActive = $("input:checkbox[id='toggle_preview']").is(":checked");
		
		if(isReviewActive) {
			$('#editor').removeClass('col-sm-6').addClass('col-sm-12');
			$('#preview').removeClass('col-sm-6').addClass('col-sm-12');
		} else {
			$('#editor').removeClass('col-sm-12').addClass('col-sm-6');
			$('#preview').removeClass('col-sm-12').addClass('col-sm-6');
		}
	});
};
