var DocumentAppController = Class.extend({
	init: function() {
		var documentAppMainContentView = new DocumentAppMainContentView();
		var documentAppCategoryView = new DocumentAppCategoryView();
	}
});

var DocumentAppMainContentView = Class.extend({
	init : function() { }
});

var DocumentAppCategoryView = Class.extend({
	_cacheElement : {
		addCategoryBtn 				: '#add-category',
		addCategoryDoneBtn 			: '#add-categoty-btn-done',
        modalForAddCategory 		: '#modal-edit-category',
        titleOfModalForAddCategory 	: '#add-category-modal-title',
        sideMenu 					: '.document-sidebar-category'
	},
	
	init : function() {
		this.setEventListener();
	},
	
	setEventListener : function() {
		this.setClickedCategoryAddActiveClass();
		this.addCategory();
	},
	
	setClickedCategoryAddActiveClass : function() {
		var self = this;
		$(self._cacheElement.sideMenu).on('click', 'a', function(e) {
			$(self._cacheElement.sideMenu).children().removeClass('active');
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
});

var Document = Class.extend({
	init : function(id, title, date) {
		this.id = id,
		this.title = title,
		this.date = date;
	},
	
	setDocumentInfo : function(id, title, date) {
		this.id = id,
		this.title = title,
		this.date = date;
	}, 
	
	getDocumentInfo : function() {
		var result = {
			id : this.id,
			title : this.title,
			date : this.date 
		};
		
		return result;
	}
});

var category = Class.extend({
	init : function(name) {
		this.name = name;
	},
	
	setCategoryName : function(name) {
		this.name = name;
	}, 
	
	getCategoryName : function() {
		return this.name;
	}
});