$().ready(function () {
	var $container = $('#container');
	var $title, $containerTitle, $articles;
		var _component = {
		Gallery: (function () {
			var _props = {
				data: []
			};
			var _refs = {
				isMounted: false
			};
			function _handleImage(src, extension) {
				var $image = $('<div></div>');
				$('<img>').attr('src', src).appendTo($image);
				if (extension === 'mp4') {
					$image.addClass('uploading')
					$('<p></p>').text('동영상이 업로드되고 있어요').appendTo($image);
				}
				return $image;
			}
			return {
				props: _props,
				destroy: function () {
					_refs.isMounted = false;
					$('#gallery').remove();
				},
				isMounted: function () {
					return _refs.isMounted;
				},
				mount: function (attachIndex) {
					var row = _props.data[attachIndex];
					if (!row) {
						return;
					}
					_refs.isMounted = true;
					var $gallery = $('<div></div>').attr('id', 'gallery');
					$('<div></div>')
						.addClass('backdrop')
						.on('click', function () {
							history.back();
						})
						.appendTo($gallery);
					var inner;
					if (row.hlsUrl) {
						inner = _handleHls(row.hlsUrl);
					} else {
						inner = _handleImage(row.imageUrl || row.fileurl, row.extension);
					}
					$(inner)
						.addClass('content')
						.appendTo($gallery);
					$gallery.appendTo($container);
				}
			};
		})()
	};
		var _set = {
		limitNum: 20,
		startNum: 0,
		isUser: false,
		boardId: undefined,
		boardPage: 1,
		bestarticleSeason: undefined,
		categoryId: undefined,
		categories: [],
		searchType: 0,
		keyword: '',
		moiminfo: true,
		type: 1,
		layout: 11,
		privAnonym: 0,
		privCommentAnonym: 0,
		isSearchable: 0,
		isWritable: 0,
		isCommentable: 0,
		isManageable: 0,
		isSecret: 0,
		isCommercial: 0,
		authToWrite: 0,
		authToComment: 0,
		placeholder: '공지 내용을 입력해주세요.',
		isNotSelectedHotArticle: -1,
		hashtags: [],
		attaches: [],
		removeAttachIds: [],
		attachDragHoverCount: 0,
		attachUploadingStatus: []
	};
		var _fn = {
		initiate: function () {
			$title = $container.find('aside > div.title');
			$containerTitle = $container.find('div.wrap.title');
			$articles = $container.find('div.articles');
			_set.isUser = ($container.find('#isUser').val() === '1') ? true : false;
			_set.boardId = $container.find('#boardId').val();
			
			_fn.initiateContent();
			
			$("#AuthButton.before").on('click', function(){
				console.log("test");
			});
			$(window).on('load', function () { // Fix popstate issue in Safari
				setTimeout(function () {
					$(window).on('popstate', function (event) {
						var params = _fn.parseParams(window.location.pathname);
						if (params.v) {
							var state = event.originalEvent.state;
							if (_component.Gallery.isMounted()) {
								_component.Gallery.destroy();
								return;
							} else if (state && state['gallery-attach-index'] !== undefined) {
								_component.Gallery.mount(state['gallery-attach-index']);
								return;
							}
						}
						_fn.initiateContent();
					});
				}, 0);
			});
			
		},
		initiateContent: function () {
			_fn.loadSchoolAuth();
		},
		loadSchoolAuth: function() {
			$.ajax({
				url: '/school/auth',
				type: 'post',
				data: { boardid: 9999 },
				success: function(data) {
					console.log(data);
					$("#schoolAuthList").empty();
					$(data.data).each(function(_, auth) {
						var type = auth.type == 'freshmen' ? '합격자 인증' : (auth.type == 'student' ? '재학생 인증' : '졸업생 인증');
						
						if (auth.is_checked){
							$article = $("<article></article>").addClass("complete").css("background-color", "#e9e9e9").appendTo($("#schoolAuthList"));
							
						} else {
							$article = $("<article></article>").addClass("before").appendTo($("#schoolAuthList"));
							
						}
						$("<div></div>").attr("id", "schoolAuthId").css("display", "none").text(auth.id).appendTo($article);
						$aArticle = $("<a></a>").addClass("article").attr("href", `/schoolAuthView?id=${auth.id}`).appendTo($article);
						$("<h2></h2>").addClass("medium").text(type).appendTo($aArticle);
						$("<h3></h3>").addClass("admin").addClass("small").text(`${auth.user_id}`).appendTo($aArticle);
						$("<hr>").appendTo($aArticle);
					});
				}
			});
		},

		
	};
	_fn.initiate();
});