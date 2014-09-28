/** @class editor.html Page의 Controller
* @auther EnterKey
* @version 1
* @constructor 뷰 import후 생성
* @description View를 import하고 init 하기 위한 클래스 
*/
var EditorAppController = Class.extend({
	init: function() {
		var editorAppMainContentView = new EditorAppMainContentView();
		var editorAppSideContentView = new EditorAppSideContentView();
	}
});

/** @class editor.html Page의 Editor와 Preview 관련 뷰 클래스 
* @auther EnterKey
* @version 1
* @description Page의 Editor와 Preview Division을 제어하기 위한 클래스 
*/
var EditorAppMainContentView = Class.extend({
    _self : this,

	_cacheElement : {
		writingDocumentTitle 		: '#writing_title',
		titleOfToggleModal 			: '#modal-title',
        editorDiv 					: '#editor',
        prevviewDiv 				: '#preview',
        modalForChangeDocumentTitle : '#modal-edit-writing',
        previewNewTab 				: 'div.previewTabs ul li', 
        addPreviewBtn 				: 'button#add-preview-btn', 
        previewTabHeight 			: '600px',
        selectedBookmarkTablName    : null
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
        this.translate.action();
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
		$("#tabs").tabs();
		$('#tabs').height(this._cacheElement.previewTabHeight);
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
	},

    translate : {
        data : {
            isCORSSupport : 'withCredentials' in new XMLHttpRequest(),
            isIE : typeof XDomainRequest !== "undefined",
            xdr : null,
            interBuffer : [],
            finalBuffer : [],
            bufCnt : 0,
            message : {
                text : null,
                originalLang : null,
                targetlang : null
            }
        },

        action : function() {
            var self = this;
            $('#translate-btn').on('click', function(e){
                e.preventDefault();
                var $activeTabName = $('.ui-state-active').find('a');
                var translateForContent = $($activeTabName[0].hash).text().trim();

                $('.ui-tabs-panel').css('height', '225');
                $('.translateResultWrapper').css('display', 'block');

                self.data.message = {
                    text: translateForContent,
                    originalLang: $("#originalLang").val(),
                    targetlang: $("#targetLang").val()
                };

                if($("#originalLang").val() == "") {
                    // 영어인 경우 : en --> ja --> ko
                    self.data.message.targetlang = 'ja';
                    self.data.interBuffer.length = 0;
                    $(".translateResult").text("");

                    self.getJSON(self.setQueryString(self.data.message), self.translateInterLang);

                } else {
                    // 영어가 아닌 경우 : etc --> target
                    // 혹은 중간 번역 없이 직접 번역할 경우
                    self.data.interBuffer.length = 0;
                    self.getJSON(self.setQueryString(self.data.message), self.translateDirectLang);
                }
            });
        },

        getJSON : function(query, callback) {
            if (this.data.isCORSSupport) {
                $.getJSON(query, callback);
            } else if (this.data.isIE) {
                this.data.xdr = new XDomainRequest();
                if (this.data.xdr) {
                    this.data.xdr.onload = callback;
                    this.data.xdr.open("get", query);
                    this.data.xdr.send();
                }
            } else {
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    jsonp: "callback",
                    url: query,
                    success: callback
                });
            }
        },

        setQueryString : function(message) {
            var result = "http://goxcors.appspot.com/cors?method=GET" +
                "&url=" + encodeURIComponent("http://translate.google.com/translate_a/t?client=x" +
                "&sl=" + message.originalLang + "&tl=" + message.targetlang+
                "&text=" + encodeURIComponent(message.text));
            return result;
        },

        extractResult : function(data) {
            if (!this.data.isCORSSupport && this.data.isIE) {
                data = $.parseJSON(data.responseText);
            }
            return data && data.sentences && $.map(data.sentences, (function(v) { return v.trans }));
        },

        translateLineByLine : function(i, buffer) {
            this.data.message.text = buffer + "|!";
            this.data.message.originalLang = 'ja';
            this.data.message.targetlang = $("#targetLang").val();

            var translateFinalLang = function(data) {
                var post = this.extractResult(data).join('');
                // prevent to trim new line
                this.data.bufCnt--;
                this.data.finalBuffer[i] = post.replace(/\|!/g, "");
                $(".translateResult").text(this.data.finalBuffer.finalBuffer.join(""));
            };

            this.getJSON(this.setQueryString(message), translateFinalLang);
        },

        translateInterLang : function(data) {
            var self = window.EditorAppMainContentView.translate;
            self.data.interBuffer = self.extractResult(data);

            $(".translateResult").text(self.data.interBuffer.join(""));

            self.data.bufCnt = self.data.finalBuffer.length = self.data.interBuffer.length;

            for (var i in self.data.interBuffer) {
                self.translateLineByLine(i, interBuffer[i]);
            }
        },

        translateDirectLang : function(data) {
            var self = EditorAppMainContentView.translate;
            var post = self.extractResult(data).join('');
            $('.translateResult').text("");
            $(".translateResult").text(post);
        }
    }
});

/** @class editor.html Page의 좌측 side menu 관련 뷰 클래스 
* @auther EnterKey
* @version 1
* @description Page의 side menu를 제어하기 위한 클래스 
*/
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

/** @class editor.html editor 클래스
* @auther EnterKey
* @version 1
* @description 글 쓰기 Editor 클래스
*/
var Editor = Class.extend({
	init : function() {
		CKEDITOR.replace('editor1', {
			height : '500px'
		}); 	
	}
});

/** @class editor.html Preview Division에 보여지는 Bookmark의 info 클래스 
* @auther EnterKey
* @version 1
* @description Preview Division에 보여지는 Bookmark의 info 클래스  
*/
var BookmarkInfo = Class.extend({
	init : function() { }
});


$().ready(function() {
    $("#targetLang").val(navigator.userLanguage || navigator.language || "ko");
});