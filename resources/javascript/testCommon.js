/**
 * @author 엄두성
 */

/** @class Global variable & method Class
* @auther EnterKey
* @version 1
* @description 각 클래스에서 공통적으로 사용할 만한 메소드와 변수를 저장하는 클래스
*/
var Common = Class.extend({
	isUsableElement : function(element) {
		return typeof element != 'undefined' ? true : false;
	}, 
	
	initModule : function(listOfModule) {
		//listOfMoudle = JSON of module name;
		 var listOfMoudle = ['document', 'editor'];
		 var listOfMouldeControllerName = [];
		 
		 var postFixOfController = 'AppController';
		 
		 for (var i=0; i < listOfModule.length; i++) {
		 	if (listOfModule[i] == 'document') {
		 		 this.module["documentAppController"] = new DocumentAppController();
		 	}
		 	else if (listOfModule[i] == 'editor') {
		 		this.module["editorAppController"] = new EditorAppController();
		 	}
		 }
	},
	
	getModule : function (moduleName) {
		if (!moudleName {
			return null
		}) else (!this.module[moduleName]) {
			return null;
		} else {
			return this.module[moduleName];	
		}
	}
	
});

$(document).ready(function() {
    var documentAppController = new DocumentAppController();
    var editorAppController = new EditorAppController();
});
