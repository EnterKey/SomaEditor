var EditorAppController = Class.extend({
	init: function() {
		var editorAppMainContentView = new EditorAppMainContentView();
		var editorAppSideContentView = new EditorAppSideContentView();
	}
});

var EditorAppMainContentView = Class.extend({
	_cacheElement : {
		writingDocumentTitle : '#writing_title',
		titleOfToggleModal : '#modal-title',
        editorDiv : '#editor',
        prevviewDiv : '#preview',
        modalForChangeDocumentTitle : '#modal-edit-writing',
        previewNewTab : 'div.previewTabs ul li', 
        addPreviewBtn : 'button#add-preview-btn'
	},
	
	init : function() {
		this.setEventListener();
		this.setEditor();
		this.initReviewTab();
	}, 
	
	setEditor : function() {
		var editor = new Editor();
	},
	
	setEventListener : function() {
		this.toggleModalForChangeDocumentTitle();
		this.changeDocumentTitle();
		this.toggleReviewDivision();
		this.addNewPreviewTab();
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
				$(self._cacheElement.prevviewDiv).hide();
			} else {
				$(self._cacheElement.editorDiv).removeClass('col-sm-12').addClass('col-sm-6');
				$(self._cacheElement.prevviewDiv).removeClass('col-sm-12').addClass('col-sm-6');
				$(self._cacheElement.prevviewDiv).show();
			}
		});
	}, 
	
	initReviewTab : function() {
		$( "#tabs" ).tabs();
	}, 
	
	addNewPreviewTab : function() {
		var self = this;
		$(self._cacheElement.addPreviewBtn).click(function() {
		    var tabsCnt = $(self._cacheElement.previewNewTab).length + 1;
		
		    $("div.previewTabs ul").append(
		        "<li><a href='#tab" + tabsCnt + "'>#" + tabsCnt + "</a></li>"
		    );
			$("div.previewTabs").append(
		        "<div id='tab" + tabsCnt + "'>#" + tabsCnt + "</div>"
		    );
		    $("div.previewTabs").tabs("refresh");
		});   
	}
});

var EditorAppSideContentView = Class.extend({
	init : function() {
		this.setEventListener();
	}, 
	
	setEventListener : function() {
		this.toggleSideMenu();
	}, 
	
	toggleSideMenu : function() {
		var $body = $('body')[0], 
			$menu_trigger = $('.menu-trigger'), 
			common = new Common();
		
		if (common.isUsableElement($menu_trigger)) {
			$menu_trigger.on('click', function() {
				$body.className = ( $body.className == 'menu-active' )? '' : 'menu-active';
			});
		}
	}
});

var Editor = Class.extend({
	init : function() {
		CKEDITOR.replace('editor1', {
			height : '500px'
		}); 	
	}
});

var BookmarkInfo = Class.extend({
	init : function() { }
});