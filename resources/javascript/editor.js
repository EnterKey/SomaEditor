/**
 * @author EnterKey
 */

if ( typeof (editor) == typeof (undefined)) {
	editor = {};
}

editor = {
	_cacheElement : {
		writingDocumentTitle : '#writing_title',
		titleOfToggleModal : '#modal-title'
	},
	
	init : function() {
		this.setEventListener();
	}, 
	
	setEventListener : function() {
		this.toggleSideMenu();
		this.toggleModalForChangeDocumentTitle();
		this.changeDocumentTitle();
		this.toggleReviewDivision();
	}, 
	
	toggleSideMenu : function() {
		var $body = $('body')[0], 
			$menu_trigger = $('.menu-trigger');
		
		if (common.isUsableElement($menu_trigger)) {
			$menu_trigger.on('click', function() {
				$body.className = ( $body.className == 'menu-active' )? '' : 'menu-active';
			});
		}
	},
	
	toggleModalForChangeDocumentTitle : function() {
		$(this._cacheElement.writingDocumentTitle).on('click', function() {
			var documentTitle = $(this._cacheElement.writingDocumentTitle).text();
			$(this._cacheElement.titleOfToggleModal).val(documentTitle);
			$('#modal-edit-writing').modal('toggle');
		});
	},
	
	toggleModalForChangeDocumentTitle : function() {
		$(this._cacheElement.writingDocumentTitle).on('click', function() {
			var documentTitle = $(this._cacheElement.writingDocumentTitle).text();
			$(this._cacheElement.titleOfToggleModal).val(documentTitle);
			$('#modal-edit-writing').modal('toggle');
		});
	}, 
	
	changeDocumentTitle : function() {
		$('#btn-done').on('click', function() {
			var title = $(this._cacheElement.titleOfToggleModal).val();
			$(this._cacheElement.writingDocumentTitle).html(title);
		});
	}, 
	
	
	toggleReviewDivision : function() {
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
	}
};
