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
			_set.categoryId = _set.categoryId || 0;
			var url = window.location.pathname;
			var params = _fn.parseParams(url);
			_fn.loadContent(params);
		},
		loadContent: function (params) {
			if (params.v) {
				$container.find('div.seasons, div.categories').addClass('none');
				_fn.loadComments(params.v);
			} else {
				_set.boardPage = 1;
				_set.searchType = 0;
				_set.keyword = '';
				if (params.p) {
					_set.boardPage = Number(params.p);
				}
				if (params.hashtag) {
					_set.searchType = 3;
					_set.keyword = params.hashtag;
				} else if (params.title) {
					_set.searchType = 2;
					_set.keyword = params.title;
				} else if (params.text) {
					_set.searchType = 1;
					_set.keyword = params.text;
				} else if (params.all) {
					_set.searchType = 4;
					_set.keyword = params.all;
				}
				$container.find('div.seasons, div.categories').removeClass('none');
				_fn.loadArticles();
			}
		},
		parseParams: function (url) {
			var params = {};
			var paths = url.split('/').slice(2);
			for (var i = 0; i < paths.length; i += 2) {
				var key = paths[i];
				var value = paths[i + 1];
				if (/^\d+$/.test(value)) {
					value = Number(value);
				} else {
					value = decodeURI(value);
				}
				params[key] = value;
			}
			return params;
		},
		
			};
	_fn.initiate();
});