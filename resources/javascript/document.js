if ( typeof (documents) == typeof (undefined)) {
	documents = {};
}

documents = {
	_cacheElement : {
		addCategoryBtn : '#add-category',
		addCategoryDoneBtn : '#add-categoty-btn-done',
        modalForAddCategory : '#modal-edit-category',
        titleOfModalForAddCategory : '#add-category-modal-title',
        sideMenu : '.document-sidebar-category'
	},
	
	init : function() {
		this.setEventListener();
	},
	
	setEventListener : function() {
		this.setClickedCategoryAddActiveClass();
		this.addCategory();
	},
	
	setClickedCategoryAddActiveClass : function() {
		$('.document-sidebar-category').on('click', 'a', function(e) {
			$('.document-sidebar-category').children().removeClass('active');
			$(this).addClass('active');
		});
	}, 
	
	addCategory : function() {
        var self = this;
		$(this._cacheElement.addCategoryBtn).on('click', function(e) {
			e.preventDefault();
			$(self._cacheElement.modalForAddCategory).modal('toggle');
			$(self._cacheElement.titleOfModalForAddCategory).val('');
		});
		
		$(this._cacheElement.addCategoryDoneBtn).on('click', function(e) {
            var categoryName = $(self._cacheElement.titleOfModalForAddCategory).val(),
                appendItem = '<a href="#" class="list-group-item">' + categoryName + '</a>';

			$(self._cacheElement.sideMenu).append(appendItem);
		});
	}
};
