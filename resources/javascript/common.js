/**
 * @author EnterKey
 */

if ( typeof (common) == typeof (undefined)) {
	common = {};
}

$(document).ready(function() {
	common.toggleSideMenu();
	common.test();
});

common.toggleSideMenu = function() {
	var $body = $('body')[0], 
		$menu_trigger = $('.menu-trigger');
	
	if ( typeof $menu_trigger != 'undefined' ) {
		$menu_trigger.on('click', function() {
			$body.className = ( $body.className == 'menu-active' )? '' : 'menu-active';
		});
	}
};

common.test = function() {
	$('#writing_title').on('click', function() {
		$('#modal-edit-writing').modal('toggle');
	});
};
