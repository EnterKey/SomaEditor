if ( typeof (documents) == typeof (undefined)) {
	documents = {};
}

documents = {
	_cacheElement : {
		addCategoryBtn : '#add-category',
		addCategoryDoneBtn : '#add-categoty-btn-done'
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
		$(this._cacheElement.addCategoryBtn).on('click', function(e) {
			e.preventDefault();
			$('#modal-edit-category').modal('toggle');
			$('#add-category-modal-title').val('');
		});
		
		$(this._cacheElement.addCategoryDoneBtn).on('click', function(e) {
			var categoryName = $('#add-category-modal-title').val();
			var appendItem = '<a href="#" class="list-group-item">' + categoryName + '</a>';
			$(".document-sidebar-category").append(appendItem);
		});
	}
};

$(document).ready(function() {
	documents.init();
});
