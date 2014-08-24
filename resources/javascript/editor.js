/**
 * @author EnterKey
 */

if ( typeof (editor) == typeof (undefined)) {
	editor = {};
}

editor.init = function() {
	editor.writingDocumentTitle = '#writing_title';
	editor.titleOfToggleModal = '#modal-title';
	
	editor.setEventListener();
};


editor.setEventListener = function() {
	this.toggleSideMenu();
	this.toggleModalForChangeDocumentTitle();
	this.changeDocumentTitle();
	this.toggleReviewDivision();
};

editor.toggleSideMenu = function() {
	var $body = $('body')[0], 
		$menu_trigger = $('.menu-trigger');
	
	if (common.isUsableElement($menu_trigger)) {
		$menu_trigger.on('click', function() {
			$body.className = ( $body.className == 'menu-active' )? '' : 'menu-active';
		});
	}
};

editor.toggleModalForChangeDocumentTitle = function() {
	$(editor.writingDocumentTitle).on('click', function() {
		var documentTitle = $(editor.writingDocumentTitle).text();
		$(editor.titleOfToggleModal).val(documentTitle);
		$('#modal-edit-writing').modal('toggle');
	});
};

editor.changeDocumentTitle = function() {
	$('#btn-done').on('click', function() {
		var title = $(editor.titleOfToggleModal).val();
		$(editor.writingDocumentTitle).html(title);
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
