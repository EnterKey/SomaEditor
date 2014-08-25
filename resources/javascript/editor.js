/**
 * @author EnterKey
 */

if ( typeof (editor) == typeof (undefined)) {
	editor = {};
}

editor = {
	_cacheElement : {
		writingDocumentTitle : '#writing_title',
		titleOfToggleModal : '#modal-title',
        editorDiv : '#editor',
        prevviewDiv : '#preview',
        modalForChangeDocumentTitle : '#modal-edit-writing'
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
		var self = this;
		$(this._cacheElement.writingDocumentTitle).on('click', function() {
			var documentTitle = $(self._cacheElement.writingDocumentTitle).text();
			$(self._cacheElement.titleOfToggleModal).val(documentTitle);
			$(self._cacheElement.modalForChangeDocumentTitle).modal('toggle');
		});
	}, 
	
	changeDocumentTitle : function() {
		var self = this;
		$('#btn-done').on('click', function() {
			var title = $(self._cacheElement.titleOfToggleModal).val();
			$(self._cacheElement.writingDocumentTitle).html(title);
		});
	}, 
	
	
	toggleReviewDivision : function() {
        var self = this;
		$('#toggle_preview_btn').on('click', function() {
			var isReviewActive = $("input:checkbox[id='toggle_preview']").is(":checked");
			
			if(isReviewActive) {
				$(self._cacheElement.editorDiv).removeClass('col-sm-6').addClass('col-sm-12');
				$(self._cacheElement.prevviewDiv).removeClass('col-sm-6').addClass('col-sm-12');
			} else {
				$(self._cacheElement.editorDiv).removeClass('col-sm-12').addClass('col-sm-6');
				$(self._cacheElement.prevviewDiv).removeClass('col-sm-12').addClass('col-sm-6');
			}
		});
	}
};
