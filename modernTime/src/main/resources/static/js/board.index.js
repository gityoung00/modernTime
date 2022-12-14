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
			function _getHls(callback) {
				if (window.Hls === undefined) {
					var script = document.createElement('script');
					script.src = '/js/extensions.hls.light.min.js';
					script.addEventListener('load', function() {
						callback(null, window.Hls);
					});
					document.head.appendChild(script);
				} else {
					callback(null, window.Hls);
				}
			}
			function _handleHls(url) {
				var video = document.createElement('video');
				var errorHandler = function () {
					if ([MediaError.MEDIA_ERR_DECODE, MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED].indexOf(video.error.code) !== -1) {
						_getHls(function (err, Hls) {
							var hls = new Hls({
								xhrSetup: function (xhr) {
									xhr.withCredentials = true;
								}
							});
							hls.loadSource(url);
							hls.attachMedia(video);
						});
					}
				};
				video.addEventListener('error', errorHandler);
				video.autoplay = true;
				video.controls = true;
				video.crossOrigin = 'use-credentials';
				video.muted = true;
				video.src = url;
				return video;
			}
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
		limitNum: 10,
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
		placeholder: '글 내용을 입력하세요.',
		isNotSelectedHotArticle: -1,
		hashtags: [],
		attaches: [],
		removeAttachIds: [],
		attachDragHoverCount: 0,
		attachUploadingStatus: [],
		
	};
	var _fn = {
		initiate: function () {
			urlPath = location.href.split("/");
			_set.boardName = urlPath[urlPath.length - 1];
			
			//주석
//			if (!$container.is(':has(#boardId)')) {
//				location.href = '/';
//				return false;
//			}
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
			$containerTitle.on('click', '#manageMoim', function () {
				_fn.manageMoim();
			});
			//새 글을 작성해주세요!
			$container.on('click', '#writeArticleButton', function () {
				_fn.showWriteArticleForm();
			});
			//placeholder 변경
			$container.on('change', '#searchArticleForm > select[name="search_type"]', function () {
				var $form = $container.find('#searchArticleForm');
				var $keyword = $form.find('input[name="keyword"]');
				//placeholder 변경 기능
				if ($(this).val() === '3') {
					$keyword.attr('placeholder', '#에브리타임');
				} else {
					$keyword.attr('placeholder', '검색어를 입력하세요.');
				}
				$keyword.val('');
			});
			//검색 부분(확인 눌렀을 때)
			$container.on('submit', '#searchArticleForm', function () {
				_fn.searchArticle();
				return false;
			});
			//글 목록 버튼
			$container.on('click', '#goListButton', function () {
				if (_set.boardPage > 1) {
					history.go(-1);
				} else {
					var url = _fn.encodeUrl({ page: 1 });
					_fn.goRedirectContent(url);
				}
			});
			$articles.on('click', 'a[href]', function (event) {
				_fn.goLinkContent(this, event);
			});
			//게시글 수정버튼
			$articles.on('click', '> article > a.article > ul.status > li.update', function () {
				var $article = $(this).parents('article');
				_fn.showModifyArticleForm($article);
//				_fn.showWriteArticleForm($article);
				return false;
			});
			//게시글 삭제버튼
			$articles.on('click', '> article > a.article > ul.status > li.del', function () {
				var $article = $(this).parents('article');
				if (confirm('이 글을 삭제하시겠습니까?')) {
					_fn.removeArticle($article);
				}
				return false;
			});
			$articles.on('click', '> article > a.article > ul.status > li.abuse', function () {
				var $article = $(this).parents('article');
				_fn.showAbuseForm($article, 'article');
			});
			$articles.on('click', '> article > a.article > ul.status > li.removescrap', function () {
				var $article = $(this).parents('article');
				_fn.removeScrap($article);
				return false;
			});
			$articles.on('click', '> article > a.article > ul.status > li.setnotice', function () {
				var $article = $(this).parents('article');
				_fn.setNoticeArticle($article);
				return false;
			});
			$articles.on('click', '> article > a.article > ul.status > li.managedel', function () {
				var $article = $(this).parents('article');
				if (confirm('[삭제]는 관리하시는 게시판의 주제 및 규칙에 맞지 않는 게시물을 삭제하기 위한 기능입니다.\n\n확인을 누를 경우 게시물이 즉시 삭제됩니다.\n\n욕설, 음란물 등 에브리타임 커뮤니티 이용규칙에 어긋나는 게시물은 [삭제 및 이용 제한]을 해주시기 바랍니다.')) {
					_fn.removeArticle($article);
				}
				return false;
			});
			$articles.on('click', '> article > a.article > ul.status > li.manageabuse', function () {
				var $article = $(this).parents('article');
				if (confirm('[삭제 및 이용 제한]은 욕설, 음란물 등 에브리타임 커뮤니티 이용규칙에 어긋나는 게시물을 삭제하고, 이용 제한을 하기 위한 기능입니다.\n\n확인을 누를 경우 게시물이 즉시 삭제되며, 작성자는 일정 기한 동안 이 게시판을 이용할 수 없습니다.\n\n단순히 주제 및 규칙에 맞지 않는 게시물의 경우 [삭제]를 해주시기 바랍니다.')) {
					_fn.abuseArticle($article, 0);
				}
				return false;
			});
			//공감 버튼
			$articles.on('click', '> article > a.article > div.buttons > span.posvote', function () {
				var $article = $(this).parents('article');
				_fn.voteArticle($article);
			});
			//스크랩 버튼
			$articles.on('click', '> article > a.article > div.buttons > span.scrap', function () {
				var $article = $(this).parents('article');
				_fn.scrapArticle($article);
			});
			$articles.on('submit', '> form.write', function (e) {
				e.preventDefault();
				_fn.writeArticle();
				console.log("test")
				return false;
			});
			$articles.on('drag dragstart dragend dragover dragenter dragleave drop', '> form.write', function (event) {
				event.preventDefault();
				event.stopPropagation();
			}).on('dragenter', '> form.write', function (event) {
				_fn.dragstartOnWriteArticleForm(event);
			}).on('dragleave drop', '> form.write', function (event) {
				_fn.dragendOnWriteArticleForm(event);
			}).on('drop', '> form.write', function (event) {
				_fn.dropOnWriteArticleForm(event);
			});
			$articles.on('click', '> form.write > ul.hashtags > li', function () {
				_fn.addHashtagOnWriteArticleForm($(this).text());
			});
			$articles.on('change', '> form.write > input[name="file"]', function () {
				_fn.changeAttachOnWriteArticleForm(this.files);
			});
			$articles.on('click', '> form.write > ol.thumbnails > li.new', function () {
				_fn.addAttachOnWriteArticleForm();
			});
			$articles.on('click', '> form.write > ol.thumbnails > li.thumbnail.attached', function () {
				_fn.showAttachThumbnailForm($(this));
			});
			//익명 버튼
			$articles.on('click', '> form.write > ul.option > li.anonym', function () {
				if ($(this).hasClass('active')) {
					$(this).removeClass('active');
				} else {
					$(this).addClass('active');
				}
			});
			$articles.on('click', '> form.write > ul.option > li.question', function () {
				var $question = $articles.find('form.write p.question');
				if ($(this).hasClass('active')) {
					$question.hide();
					$(this).removeClass('active');
				} else {
					$question.show();
					$(this).addClass('active');
				}
			});
			$articles.on('click', '> form.write > ul.option > li.hashtag', function () {
				_fn.addHashtagOnWriteArticleForm();
			});
			$articles.on('click', '> form.write > ul.option > li.attach', function () {
				_fn.addAttachOnWriteArticleForm();
			});
			//게시글 작성과 수정 기능
			$articles.on('click', '> form.write > ul.option > li.submit', function () {
				$articles.find('form.write').submit();
				
				var $form = $articles.find('form.write');
				var $option = $form.find('ul.option');
				var isAnonym = ($option.is(':has(li.anonym)') && $option.find('li.anonym').hasClass('active')) ? 1 : 0;
				var url = new URL(location.href)
				
				if(url.pathname != '/freedomContent') {
					//freedom
					var $freedomTitle = $container.find('input[name="title"]');
					var $freedomContent = $container.find('textarea[name="text"]');
					parameters = {
						board_name: _set.boardName,
						title: $freedomTitle.val(),
						content: $freedomContent.val(),
						is_anonym: isAnonym,
					}
					if (_set.attaches.length > 0) {
						parameters.pictures = _set.attaches;
					}
					console.log(parameters);
					//게시글 작성
					$.ajax({
						url: '/freedom',
						xhrFields: {withCredentials: true},
						type: 'POST',
						contentType: "application/json; charset=UTF-8",
						data: JSON.stringify(parameters), 
						success: function (data) {
							console.log(data)
							alert('작성이 완료되었습니다.');
							location.reload();
						}
					});
				}else{
					//freedomContent
					var $freedomModifyTitle = $container.find('input[name="modifyTitle"]');
					var $freedomModifyContent = $container.find('textarea[name="modifyText"]');
					
	//					//게시글 수정
						$.ajax({
							url: 'freedomContent',
							xhrFields: {withCredentials: true},
							type: 'POST',
							contentType: "application/json; charset=UTF-8",
							data: JSON.stringify({
								title: $freedomModifyTitle.val(),
								content: $freedomModifyContent.val()
							}), 
							success: function (data) {
								console.log(data)
								alert('수정이 완료되었습니다.');
								location.reload();
							}
						});
				}
				
				
				
				
			});
			$articles.on('submit', '> article > div.comments > form.writecomment', function () {
				_fn.writeComment($(this));
				return false;
			});
			$articles.on('focus', '> article > div.comments > form.writecomment > input[name="text"]', function () {
				if (_set.authToComment) {
					if (confirm('학교인증 회원만 댓글을 작성할 수 있습니다. 학교인증을 하시겠습니까?')) {
						location.href = '/auth';
					}
					$(this).blur();
				}
			});
			//댓글 익명버튼
			$articles.on('click', '> article > div.comments > form.writecomment > ul.option > li.anonym', function () {
				var $this = $(this);
				if ($this.hasClass('active')) {
					$this.removeClass('active');
				} else {
					$this.addClass('active');
				}
			});
			//댓글 완료버튼
			$articles.on('click', '> article > div.comments > form.writecomment > ul.option > li.submit', function () {
				$(this).parents('form.writecomment').submit();
				var $form = $container.find('form.writecomment');
				var $text = $form.find('input[name="text"]');
				
				
			});
			//대댓글 버튼
			$articles.on('click', '> article > div.comments > article > ul.status > li.childcomment', function () {
				var $comment = $(this).parent().parent();
				_fn.createChildCommentForm($comment);
			});
			//댓글 공감
			$articles.on('click', '> article > div.comments > article > ul.status > li.commentvote', function () {
				var $comment = $(this).parent().parent();
				_fn.voteComment($comment);
			});
			//댓글 삭제
			$articles.on('click', '> article > div.comments > article > ul.status > li.del', function () {
				var $comment = $(this).parent().parent();
				if (confirm('이 댓글을 삭제하시겠습니까?')) {
					_fn.removeComment($comment);
				}
			});
			//댓글 신고
			$articles.on('click', '> article > div.comments > article > ul.status > li.abuse', function () {
				var $comment = $(this).parent().parent();
				_fn.showAbuseForm($comment, 'comment');
			});
			$articles.on('click', '> article > div.comments > article > ul.status > li.managedel', function () {
				var $comment = $(this).parent().parent();
				if (confirm('[삭제]는 관리하시는 게시판의 주제 및 규칙에 맞지 않는 게시물을 삭제하기 위한 기능입니다.\n\n확인을 누를 경우 게시물이 즉시 삭제됩니다.\n\n욕설, 음란물 등 에브리타임 커뮤니티 이용규칙에 어긋나는 게시물은 [삭제 및 이용 제한]을 해주시기 바랍니다.')) {
					_fn.removeComment($comment);
				}
			});
			$articles.on('click', '> article > div.comments > article > ul.status > li.manageabuse', function () {
				var $comment = $(this).parent().parent();
				if (confirm('[삭제 및 이용 제한]은 욕설, 음란물 등 에브리타임 커뮤니티 이용규칙에 어긋나는 게시물을 삭제하고, 이용 제한을 하기 위한 기능입니다.\n\n확인을 누를 경우 게시물이 즉시 삭제되며, 작성자는 일정 기한 동안 이 게시판을 이용할 수 없습니다.\n\n단순히 주제 및 규칙에 맞지 않는 게시물의 경우 [삭제]를 해주시기 바랍니다.')) {
					_fn.abuseComment($comment, 0);
				}
			});
		},
		initiateContent: function () {
			_set.categoryId = _set.categoryId || 0;
			var url = window.location.pathname;
			var params = _fn.parseParams(url);
			console.log("params: ", params)
			_fn.loadContent(params);
		},
		goLinkContent: function (that, event) {
			event.stopPropagation();
			if (typeof history.pushState === 'undefined') {
				return false;
			}
			var url = $(that).attr('href');
			if (url.charAt(0) !== '/') { // 외부 URL
				return false;
			} else if (_set.boardId !== url.split('/')[1]) { // 현재 게시판 외 페이지
				return false;
			}
			event.preventDefault();
			var params = _fn.parseParams(url);
			_fn.loadContent(params); //(페이징)
			history.pushState(null, null, url);
		},
		//검색 부분(url로 보내줌)
		goRedirectContent: function (url) {
			if (typeof history.pushState === 'undefined') {
				location.href = url;
				return false;
			}
			var params = _fn.parseParams(url);
			_fn.loadContent(params); //(검색)
			history.pushState(null, null, url);
		},
		//검색 부분?
		loadContent: function (params) {
			console.log("loadContent params: ", params)
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
		//검색 부분
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
		//페이징, 검색 url
		encodeUrl: function (params) {
			var url;
			if (typeof params.boardId !== 'undefined') {
				url = '/' + params.boardId;
				if (typeof params.articleId !== 'undefined') {
					url += '/v/' + params.articleId;
				} else {
					if (typeof params.hashtag !== 'undefined') {
						url += '/hashtag/' + params.hashtag;
					} else if (typeof params.title !== 'undefined') {
						url += '/title/' + params.title;
					} else if (typeof params.text !== 'undefined') {
						url += '/text/' + params.text;
					} else if (typeof params.all !== 'undefined') {
						url += '/all/' + params.all;
					}
					if (typeof params.page !== 'undefined') {
						url += '/p/' + params.page;
					}
				}
			} else {
				url = '/' + _set.boardId;
				if (typeof params.articleId !== 'undefined') {
					url += '/v/' + params.articleId;
				} else if (typeof params.hashtag !== 'undefined' || typeof params.title !== 'undefined' || typeof params.text !== 'undefined' || typeof params.all !== 'undefined') {
					if (typeof params.hashtag !== 'undefined') {
						url += '/hashtag/' + params.hashtag;
					} else if (typeof params.title !== 'undefined') {
						url += '/title/' + params.title;
					} else if (typeof params.text !== 'undefined') {
						url += '/text/' + params.text;
					} else if (typeof params.all !== 'undefined') {
						url += '/all/' + params.all;
					}
					if (typeof params.page !== 'undefined') {
						url += '/p/' + params.page;
					}
				} else { //해시태그
					if (_set.searchType === 3) {
						url += '/hashtag/' + _set.keyword;
					} else if (_set.searchType === 2) {
						url += '/title/' + _set.keyword;
					} else if (_set.searchType === 1) {
						url += '/text/' + _set.keyword;
					} else if (_set.searchType === 4) {
						url += '/all/' + _set.keyword;
					}
					if (typeof params.page !== 'undefined') {
						url += '/p/' + params.page;
					} else {
						url += '/p/' + _set.boardPage;
					}
				}
			}
			return url;
			
		
		},
		createDialog: function (message) {
			$articles.find('div.loading').remove();
			$('<article></article>').addClass('dialog').html(message).appendTo($articles);
		},
		createMoimInfo: function (data) {
			var $moimData;
			if ($(data).find('response').is(':has(moim)')) {
				var $moimData = $(data).find('moim');
				_set.type = Number($moimData.attr('type'));
				_set.layout = Number($moimData.attr('layout'));
				_set.privAnonym = Number($moimData.attr('priv_anonym'));
				_set.privCommentAnonym = Number($moimData.attr('priv_comment_anonym'));
				_set.info = $moimData.attr('info');
				_set.isQuestionable = Number($moimData.attr('is_questionable'));
				_set.isSearchable = Number($moimData.attr('is_searchable'));
				_set.isWritable = Number($moimData.attr('is_writable'));
				_set.isCommentable = Number($moimData.attr('is_commentable'));
				_set.isManageable = Number($moimData.attr('is_manageable'));
				_set.isSecret = Number($moimData.attr('is_secret'));
				_set.isCommercial = Number($moimData.attr('is_commercial'));
				_set.authToWrite = Number($moimData.attr('auth_to_write'));
				_set.authToComment = Number($moimData.attr('auth_to_comment'));
				if ($moimData.attr('placeholder')) {
					_set.placeholder = $moimData.attr('placeholder').replace(/<br \/>/gi, '\n');
				}
				if ($moimData.attr('is_not_selected_hot_article')) {
					_set.isNotSelectedHotArticle = Number($moimData.attr('is_not_selected_hot_article'));
				}
				var boardName;
				boardName = $moimData.attr('name');
				var boardInfo = $moimData.attr('info');
				$('#submenu').find('a').filter(function () {
					return $(this).data('id') === Number(_set.boardId);
				}).addClass('active');
			} else if (_set.boardId === 'search') {
				var boardName = '\'' + _.escape(_set.keyword) + '\' 검색 결과';
			} else if (_set.boardId === 'myarticle') {
				var boardName = '내가 쓴 글';
			} else if (_set.boardId === 'mycommentarticle') {
				var boardName = '댓글 단 글';
			} else if (_set.boardId === 'myscrap') {
				var boardName = '내 스크랩';
			} else if (_set.boardId === 'hotarticle') {
				var boardName = 'HOT 게시판';
				var boardInfo = '공감 10개를 받으면 HOT 게시물로 자동 선정됩니다.';
			} else if (_set.boardId === 'bestarticle') {
				var boardName = 'BEST 게시판';
				var boardInfo = '공감을 100개 이상 받은 게시물 랭킹입니다.';
			} else {
				return false;
			}
			$title.find('h1').remove();
			$containerTitle.empty();
			var $h1 = $('<h1></h1>').appendTo($title);
			var $titleA = $('<a></a>').html(boardName);
			if (_set.boardId !== 'search') {
				$titleA.attr('href', '/' + _set.boardId);
			}
			$titleA.appendTo($h1);
			if (_set.isSearchable && $(data).find('response').is(':has(hashtags > recommendation)')) {
				var $hashtagsData = $(data).find('hashtags > recommendation');
				$hashtagsData.find('item').each(function () {
					_set.hashtags.push($(this).text());
				});
			}
			if ($moimData && $moimData.attr('is_primary') === '0') {
				var $buttons = $('<ol></ol>').addClass('buttons');
				var $li = $('<li></li>').appendTo($buttons);
				if (_set.isUser) {
					if (_set.isManageable) {
						$('<a></a>').attr('id', 'manageMoim').text('관리하기').appendTo($li);
					}
				}
				if ($li.is(':has(a)')) {
					$buttons.appendTo($containerTitle);
				}
			}
			var $containerH1 = $('<h1></h1>').appendTo($containerTitle);
			var $containerTitleA = $('<a></a>').html(boardName);
			if (_set.boardId !== 'search') {
				$containerTitleA.attr('href', '/' + _set.boardId);
			}
			$containerTitleA.appendTo($containerH1);
			if (boardInfo) {
				$('<p></p>').html(boardInfo).appendTo($containerTitle);
			}
			$('<hr>').appendTo($containerTitle);
			if (_set.isSecret) {
				$('body').addClass('selectDisabled');
				$(document).on('contextmenu', function (e) {
					if (!e.target || (e.target.tagName.toUpperCase() !== 'TEXTAREA' && e.target.tagName.toUpperCase() !== 'INPUT')) {
						alert('이 게시판의 내용을 커뮤니티 외부로 유출하는 것은 금지되어 있습니다. 게시물을 복사·스크린샷·촬영하여 외부 사이트·대화방에 게시하거나 타인에게 공유하는 등 유출이 적발될 경우, 서비스 이용 제한 등의 조치가 취해집니다.');
						return false;
					}
				});
			}
		},
		createBestarticleSeasons: function () {

			var seasons = [];

			var minYear = 2018;
			var cal = new Date();
			var year = cal.getFullYear();
			var month = cal.getMonth() + 1;
			var half = month <= 6 ? 1 : 2;
			while (year !== minYear - 1) {
				seasons.push(year * 10 + half);
				if (half === 2) {
					half--;
				} else {
					half = 2;
					year--;
				}
			}
			_set.bestarticleSeason = seasons[0];

			var $seasons = $('<div></div>')
			.addClass('wrap seasons')
			.insertAfter($containerTitle);

			_.each(seasons, function (season, idx) {
				$('<div></div>')
				.addClass('season')
				.data({ value: season })
				.html('<span>' + String(season).slice(-3, -1) + '년 ' + (String(season).slice(-1) === '2' ? '하반기' : '상반기') + '</span>')
				.on('click', function () {
					_fn.setSeason(this);
				})
				.appendTo($seasons);
			});

		},
		createCategories: function ($categoriesXml) {

			var $categories = $('<div></div>')
			.addClass('wrap categories')
			.insertAfter($containerTitle);

			$('<div></div>').addClass('category selected').data({
				id: '0',
				name: ''
			}).html('<span>전체</span>').on('click', function () {
				_fn.setCategory(this);
			}).appendTo($categories);

			$categoriesXml.find('category').each(function () {
				var data = {
					id: $(this).attr('id'),
					name: $(this).attr('name')
				};
				_set.categories.push(data);
				$('<div></div>')
				.addClass('category')
				.data(data)
				.html('<span>' + data.name + '</span>')
				.on('click', function () {
					_fn.setCategory(this);
				})
				.appendTo($categories);
				

			});

		},
		//다음 버튼 누른 후 로드
		loadArticles: function () {
			$(window).scrollTop(0);
			$articles.empty();
			$('<div></div>').text('불러오는 중입니다...').addClass('loading').appendTo($articles);
			//1부터 10까지고 2페이지이면 1부터 10, 3페이지면 20부터 -> 다음버튼 눌렀을 때 게시글 id수 같음(블럭느낌)
			_set.startNum = _set.limitNum * (_set.boardPage - 1);
			if (_set.moiminfo && _set.boardId === 'bestarticle') {
				_fn.createBestarticleSeasons();
			}
			_fn.ajaxArticles();
		},
		ajaxArticles: function (callback) {
			var urls = location.href.split("/")
			var conditions = {
				name: urls[urls.length -1],
				limit_num: _set.limitNum,
				start_num: _set.startNum,
				search_type: _set.searchType,
				keyword: _set.keyword,
				board_id: 'freedom'
			};
			console.log(_set.startNum)
			if (_set.moiminfo) {
				conditions.moiminfo = 'true';
			}
			if (_set.searchType > 0 && _set.keyword !== '') {
				conditions.search_type = _set.searchType;
				conditions.keyword = _set.keyword;
			}
			if (_set.bestarticleSeason !== undefined) {
				conditions.season = _set.bestarticleSeason;
			}
			if (_set.categoryId > 0) {
				conditions.category_id = _set.categoryId;
			}
			
			//게시글 보이기
			console.log("ajax, listProc conditions: ", conditions)
			$.ajax({
				url: '/listProc',
				xhrFields: {withCredentials: true},
				type: 'POST',
				data: conditions,
				success: function (data) {
					
					
//					var jsonDatas = JSON.parse(data);
//					console.log(jsonDatas);
					if (_set.boardName != 'hotarticle'){
						$('<a></a>').attr('id', 'writeArticleButton').text('새 글을 작성해주세요!').appendTo($articles);
					}
					$(data.data).each((_, post) => {
						
						var str = post.content.trim().replaceAll("<br>","\n");
						
						$article = $("<article></article>")
						
						$aTitle = $("<a></a>").addClass("article").attr("href", `/freedomContent?id=${post.id}`)
						
						$("<h2></h2>").addClass("medium").text(post.title).appendTo($aTitle);
						$("<p></p>").addClass("small").text(str).appendTo($aTitle);
						$("<time></time>").addClass("small").text(post.create_date).appendTo($aTitle);
						if(post.is_anonym == 1) {
							$("<h3></h3>").addClass("small").text('익명').appendTo($aTitle);
						}else{
							$("<h3></h3>").addClass("small").text(post.user_id).appendTo($aTitle);
						}
						$ul = $("<ul></ul>").addClass("status")
						if (post.picture_count > 0){
							$("<li></li>").addClass("attach").text(post.picture_count).appendTo($ul)
						}
						$("<li></li>").attr("title", "공감").addClass("vote").text(post.like_count).appendTo($ul)
						$("<li></li>").attr("title", "댓글").addClass("comment").text(post.comment_count).appendTo($ul)
						$ul.appendTo($aTitle);
						$("<hr>").appendTo($aTitle);
						
						$aTitle.appendTo($article);
						$article.appendTo($articles);
//						console.log($articles.html())
						
					});
					$articles.find('div.loading').hide();
					
					_fn.makePagination();
					
//					var data = "";
//					
//					for(i = 0; i < jsonDatas.cd.length; i++) {
//						
//						data += "<article>";
//						data = data + "<a class='artice' href='/freedomContent?id=" + jsonDatas.cd[i].id+ "'><h2 class='medium'>" + jsonDatas.cd[i].title+"</h2>";
//						data = data + "<p class='small'>" + jsonDatas.cd[i].content+ "</p>";
//						data = data + "<time class='small'>" + jsonDatas.cd[i].createDate+ "</time>";
//						data = data + "<h3 class='small'>" + '익명'+ "</h3>";
//						data = data + "<ul class='status'><li title = '공감' class='vote'>" + jsonDatas.cd[i].likeCount + "</li>";
//						data = data + "<li title = '댓글' class='comment'>" + 0 + "</li></ul>";
//						data = data + "<hr>";
//						data = data + "<input type='hidden' name='262053749_comment_anonym' value='0'>";
//						data = data + "</a>";
//						data = data + "<div class='comments'></div>";
//						data += "</article>";
//					}
//					$("#noticeList").html(list);
					
//					var responseCode;
//					if (!$(data).find('response').children().length) {
//						responseCode = $(data).find('response').text();
//					}
//					if (responseCode === '0') {
//						if (_set.isUser) {
//							_fn.createDialog('게시판이 존재하지 않습니다.');
//						} else {
//							location.href = '/login?redirect=' + location.pathname;
//						}
//					} else if (responseCode === '-100') {
//						if (confirm('학교인증 회원만 접근할 수 있습니다. 학교인증을 하시겠습니까?')) {
//							location.href = '/auth';
//						} else {
//							history.go(-1);
//						}
//					} else if (responseCode === '-300' || responseCode === '-400') {
//						_fn.createDialog('접근 권한이 없습니다.');
//					} else {
//						callback(data);
//					}
				}
			});
			
//			$.ajax({
//				url: '/myScrap',
//				xhrFields: {withCredentials: true},
//				type: 'POST',
//				data: conditions,
//				success: function (data) {
//					console.log(data);
//					console.log(conditions);
//					console.log(_set.boardPage);
//					
//					$(data.data).each((_, post) => {
//						$article = $("<article></article>");
//						
//						$aTag = $("<a></a>").addClass("article").attr("href", `/freedomContent?id=${post.id}`);
//						$("<img>").attr("src", "https://cf-fpi.everytime.kr/0.png").addClass("picture medium").appendTo($aTag);
//						if(post.is_anonym == 1) {
//							$("<h3></h3>").addClass("medium").text('익명').appendTo($aTag);
//						}else{
//							$("<h3></h3>").addClass("medium").text(post.user_id).appendTo($aTag);
//						}
//						$("<time></time>").addClass("medium").text(post.create_date).appendTo($aTag);
//						$("<hr>").appendTo($aTag);
//						$("<h2></h2>").addClass("medium bold").text(post.title).appendTo($aTag);
//						$("<p></p>").addClass("medium").text(post.content).appendTo($aTag);
//						$("<span></span>").addClass("more").text('...더 보기').appendTo($aTag);
//						$ul = $("<ul></ul>").addClass("status")
//						$("<li></li>").addClass("removescrap").text("스크랩 취소").appendTo($ul);
//						$("<li></li>").attr("title", "공감").addClass("vote").text(post.like_count).appendTo($ul);
//						$("<li></li>").attr("title", "댓글").addClass("comment").text('댓글 수').appendTo($ul);
//						$("<hr>").appendTo($ul);
//						
//						$ul.appendTo($aTag);
//						
//						$aTag.appendTo($article);
//						$article.appendTo($articles);
//						
//					});
//					$articles.find('div.loading').hide();
//					
//					_fn.makePagination();
//				
//				}
//			});
			return function(){
				console.log("tst");
			};
			
			
			
		},
		//글 작성부분?
		createArticles: function (data, isListItem) {
			//주석
			$articles.empty();
			if (_set.isWritable || _set.authToWrite) {
				$('<a></a>').attr('id', 'writeArticleButton').text('새 글을 작성해주세요!').appendTo($articles);
			}
			if (_set.hashtags.length > 0) {
				var $hashtags = $('<ul></ul>').addClass('hashtags').appendTo($articles);
				for (var i in _set.hashtags) {
					var hashtag = _set.hashtags[i];
					var $li = $('<li></li>').appendTo($hashtags);
					var hashtagUrl = _fn.encodeUrl({ hashtag: hashtag });
					$('<a></a>').attr('href', hashtagUrl).text('#' + hashtag).appendTo($li);
				}
				$('<div></div>').addClass('clearBothOnly').appendTo($hashtags);
			}
			if ($(data).find('response').is(':has(notice_article)')) {
				var $noticeData = $(data).find('notice_article');
				var $notice = $('<div></div>').addClass('notice').appendTo($articles);
				var articleUrl = _fn.encodeUrl({ articleId: $noticeData.attr('id') });
				var $a = $('<a></a>').attr('href', articleUrl).html($noticeData.attr('text')).appendTo($notice);
			}
			$(data).find('article').each(function () {
				var $this = $(this);
				var isMine = Number($this.attr('is_mine'));
				var isNotice = ($this.prop('tagName') === 'notice_article') ? 1 : 0;
				var isQuestion = Number($this.attr('is_question'));
				var text = _fn.parseArticleText($this.attr('text'));
				var $article = $('<article></article>').data({
					id: $this.attr('id'),
					'is_mine': $this.attr('is_mine')
				});
				if ($this.attr('board_id')) {
					$article.data('board_id', $this.attr('board_id'));
				}
				var $a = $('<a></a>').addClass('article').appendTo($article);
				var $picture = $('<img>').attr('src', $this.attr('user_picture')).addClass('picture');
				var $nickname = $('<h3></h3>').html($this.attr('user_nickname')).addClass($this.attr('user_type'));
				var $title = $('<h2></h2>').html($this.attr('title'));
				var $text = $('<p></p>').html(text);
				var $time = $('<time></time>').text(_gfn.formatRelativeDate($this.attr('created_at')));
				var $category = $('<span></span>').addClass('category').text($this.attr('category'));
				var $status = $('<ul></ul>').addClass('status');
			
				
				if (_set.boardId === 'myscrap') {
					$('<li></li>').addClass('removescrap').text('스크랩 취소').appendTo($status);
				}
				var $attachesData = $this.find('attach');
				if ($attachesData.length > 0) {
					$('<li></li>').addClass('attach').text($attachesData.length).appendTo($status);
				}
				var $vote = $('<li></li>').attr('title', '공감').addClass('vote').text($this.attr('posvote')).appendTo($status);
				var $comment = $('<li></li>').attr('title', '댓글').addClass('comment').text($this.attr('comment')).appendTo($status);
				if (isListItem) {
					var articleUrl;
					if (_.contains(['search', 'myarticle', 'mycommentarticle', 'myscrap', 'hotarticle', 'bestarticle'], _set.boardId)) {
						articleUrl = _fn.encodeUrl({ boardId: $this.attr('board_id'), articleId: $this.attr('id') });
					} else {
						articleUrl = _fn.encodeUrl({ articleId: $this.attr('id') });
					}
					$a.attr('href', articleUrl);
					if (_set.layout === 11 || _set.layout === 12) {
						$picture.addClass('medium').appendTo($a);
						$nickname.addClass('medium').appendTo($a);
						$category.addClass('medium');
						$time.addClass('medium').appendTo($a);
						$('<hr>').appendTo($a);
						if ($this.attr('title')) {
							$title.addClass('medium bold').appendTo($a);
						}
						$text.addClass('medium').appendTo($a);
						if ($this.attr('text').split('<br />').length > 5) {
							$('<span></span>').text('... 더 보기').addClass('more').appendTo($a);
						}
						if ($this.attr('board_id')) {
							var boardUrl = _fn.encodeUrl({ boardId: $this.attr('board_id') });
							$('<a></a>').attr('href', boardUrl).html($this.attr('board_name')).addClass('boardname').appendTo($a);
						}
					} else if (_set.layout === 21 || _set.layout === 22) {
						if (_set.layout === 21 && $attachesData.length > 0) {
							var $attachData = $attachesData.eq(0);
							var filepath;
							if (Number($attachData.attr('id')) === -1) {
								filepath = '/images/attach.unauthorized.png';
							} else {
								filepath = $attachData.attr('fileurl');
							}
							$('<div></div>').addClass('attachthumbnail').css('background-image', 'url("' + filepath + '")').appendTo($a);
						}
						$title.addClass('medium').appendTo($a);
						if (_set.layout === 21) {
							$text.addClass('small').appendTo($a);
						}
						$category.addClass('small');
						$time.addClass('small').appendTo($a);
						$nickname.addClass('small').appendTo($a);
					}
					$status.appendTo($a);
					$('<hr>').appendTo($a);
					if ($this.attr('category')) {
						$category.insertBefore($time);
					}
				} else {
					$article.data('article', $this);
					$picture.addClass('large').appendTo($a);
					var $profile = $('<div></div>').addClass('profile').appendTo($a);
					$nickname.addClass('large').appendTo($profile);
					$time.addClass('large').appendTo($profile);
					var $status2 = $('<ul></ul>').addClass('status').appendTo($a);

					if (_set.isUser) {
						if (_set.isManageable && !isNotice) {
							$('<li></li>').text('공지로 설정').addClass('setnotice').appendTo($status2);
						}
						if (isMine) {
							if (_set.type === 2) {
								$('<li></li>').text('수정').addClass('update').appendTo($status2);
							}
							$('<li></li>').text('삭제').addClass('del').appendTo($status2);
						} else {
							$('<li></li>').text('쪽지').addClass('messagesend').attr({'data-modal': 'messageSend', 'data-article-id': $this.attr('id'), 'data-is-anonym': Number($this.attr('user_id') === '0')}).appendTo($status2);
							if (_set.isManageable) {
								$('<li></li>').text('삭제').addClass('managedel').appendTo($status2);
								$('<li></li>').text('삭제 및 이용 제한').addClass('manageabuse').appendTo($status2);
							} else {
								$('<li></li>').text('신고').addClass('abuse').appendTo($status2);
							}
						}
					}
					$('<hr>').appendTo($a);
					//제목 넣는 부분
					if (_set.type === 2) {
						$title.addClass('large').appendTo($a);
					}
					$text.addClass('large').appendTo($a);
					if (isQuestion === 1) {
						$('<div></div>')
							.addClass('question')
							.html('이 글은 댓글이 달린 이후에는 수정 및 삭제가 불가능하므로, <b>작성하신 댓글이 삭제될 우려가 없어요.</b><br>보다 많은 학우들에게 도움이 될 수 있도록 정성이 담긴 답변을 부탁드려요.')
							.appendTo($a);
					}
					if ($attachesData.length > 0) {
						var $attaches = $('<div></div>').addClass('attaches').appendTo($a);
						var attachCountWithCaption = $attachesData.filter(function () {
							return $(this).attr('caption') !== '';
						}).length;
						if (attachCountWithCaption > 0 || $attachesData.length === 1) {
							$attaches.addClass('full');
						} else {
							$attaches.addClass('multiple');
						}
						_component.Gallery.props.data = Array.prototype.slice.call($attachesData).map(function (attachData) {
							return {
								extension: $(attachData).attr("filename").split('.').pop().toLowerCase(),
								hlsUrl: $(attachData).attr("hlsUrl"),
								imageUrl: $(attachData).attr("imageUrl"),
								fileurl: $(attachData).attr("fileurl")
							};
						});
						$attachesData.each(function (attachDataIndex) {
							var $attachData = $(this);
							var $figure = $('<figure></figure>').addClass('attach').appendTo($attaches);
							var attachFileExtension = $attachData.attr('filename').split('.').pop().toLowerCase();
							if (attachFileExtension === 'gif') {
								var attachFileSize = Number($attachData.attr('filesize'));
								if (attachFileSize / (1024 * 1024) >= 1) {
									attachFileSize = (Math.round(attachFileSize / (1024 * 1024) * 10) / 10) + 'MB';
								} else if (attachFileSize / 1024 >= 1) {
									attachFileSize = (Math.round(attachFileSize / 1024 * 10) / 10) + 'KB';
								} else {
									attachFileSize += 'B';
								}
								var $gif = $('<p></p>').addClass('gif').appendTo($figure);
								$('<strong></strong>').text('GIF').appendTo($gif);
								$('<span></span>').text(attachFileSize).appendTo($gif);
							} else if (attachFileExtension === 'mp4') {
								var attachVideoDuration = Number($attachData.attr('videoDuration'));
								var numberFormatter = new Intl.NumberFormat('ko-KR', {minimumIntegerDigits: 2, useGrouping: false});
								var videoDuration = '';
								videoDuration += Math.floor(attachVideoDuration / 60);
								videoDuration += ':';
								videoDuration += numberFormatter.format(attachVideoDuration % 60);
								var $mp4 = $('<p></p>').addClass('mp4').appendTo($figure);
								$('<span></span>').text(videoDuration).appendTo($mp4);
							}
							$('<img>').attr('src', $attachData.attr('fileurl')).on('click', function () {
								history.pushState({'gallery-attach-index': attachDataIndex}, null, window.location.pathname);
								_component.Gallery.mount(attachDataIndex);
							}).appendTo($figure);
							if ($attachData.attr('caption') !== '') {
								$('<figcaption></figcaption>').html($attachData.attr('caption')).appendTo($figure);
							}
						});
						$('<hr>').appendTo($a);
					}
					var $scrap = $('<li></li>').attr('title', '스크랩').addClass('scrap').text($this.attr('scrap_count')).appendTo($status);
					$status.addClass('left').appendTo($a);
					$('<hr>').appendTo($a);
					var $buttons = $('<div></div>').addClass('buttons');
					$('<span></span>').addClass('posvote').text('공감').appendTo($buttons);
					$('<span></span>').addClass('scrap').text('스크랩').appendTo($buttons);
					$buttons.appendTo($a);
				}
				$('<input></input>').attr({
					type: 'hidden',
					name: $this.attr('id') + '_comment_anonym',
					value: $this.attr('comment_anonym')
				}).appendTo($a);
				var $comments = $('<div></div>').addClass('comments').appendTo($article);
				$article.appendTo($articles);
			});
//			if (!$articles.is(':has(article)')) {
//				var message;
//				if (_set.boardId === 'myarticle') {
//					message = '아직 글을 한번도 쓰지 않으셨군요.<br>원하는 게시판에 들어가서 설레는 첫 글을 작성해 보세요!';
//				} else if (_set.boardId === 'mycommentarticle') {
//					message = '아직 댓글을 한번도 쓰지 않으셨군요.<br>원하는 글에 하고싶은 말을 댓글로 남겨보세요!';
//				} else if (_set.boardId === 'myscrap') {
//					message = '아직 스크랩한 글이 없습니다.';
//				} else if (_set.boardId === 'hotarticle') {
//					message = '아직 HOT 게시물이 없습니다.';
//				} else if (_set.boardPage > 1) {
//					message = '더 이상 글이 없습니다.';
//				} else if (_set.searchType > 0 && _set.keyword !== '') {
//					message = '검색 결과가 없습니다.';
//				} else {
//					message = '아직 글이 하나도 없군요.<br>첫 글의 주인공이 되어보세요!';
//				}
//				_fn.createDialog(message);
//			}
			$('<div></div>').addClass('clearBothOnly').appendTo($articles);
			
			
			
			
		},
		makePagination: function(){
			//페이지 이동 버튼
			var $pagination = $('<div></div>').addClass('pagination').appendTo($articles);
//			_set.boardPage = 1;
			//처음버튼
			if (_set.boardPage > 2) {
				var firstPageUrl = _fn.encodeUrl({ page: 1 });
				$('<a></a>').attr('href', firstPageUrl).text('처음').addClass('first').appendTo($pagination);
			}
			//이전버튼
			if (_set.boardPage > 1) {
				var prevPageUrl = _fn.encodeUrl({ page: (_set.boardPage - 1) });
				$('<a></a>').attr('href', prevPageUrl).text('이전').addClass('prev').appendTo($pagination);
			}
//			if (_set.boardPage === 1 && _set.isSearchable && !_set.categoryId) {
			if (_set.boardPage === 1) {
				var $searchForm = $('<form></form>').attr('id', 'searchArticleForm').addClass('search').appendTo($pagination);
				var $searchType = $('<select></select>').attr({
					name: 'search_type'
				}).appendTo($searchForm);
				
				//검색 옵션
				$('<option></option>').val('4').text('전체').appendTo($searchType);
//				$('<option></option>').val('3').text('해시태그').appendTo($searchType);
//				if (_set.type === 2) {
					$('<option></option>').val('2').text('글 제목').appendTo($searchType);
//				}
				$('<option></option>').val('1').text('글 내용').appendTo($searchType);
				//검색 입력부분
				var $keyword = $('<input>').attr({
					name: 'keyword',
					placeholder: '검색어를 입력하세요.'
				}).addClass('text').appendTo($searchForm);
				if (_set.searchType > 0) {
					var defaultKeyword = _set.keyword;
					if (_set.searchType === 3) {
						defaultKeyword = '#' + defaultKeyword;
					}
					$searchType.val(_set.searchType);
					$keyword.val(defaultKeyword);
				}
			}
			//다음 버튼
			if (!$articles.is(':has(article.dialog)')) {
				var nextPageUrl = _fn.encodeUrl({ page: (_set.boardPage + 1)});
				$('<a></a>').attr('href', nextPageUrl).text('다음').addClass('next').appendTo($pagination);
			}
		},
		parseArticleText: function (text) {
			if (!_set.isSearchable) {
				return text;
			}
			var searchUrl = _fn.encodeUrl({ hashtag: '' });
			var $temp = $('<div></div>').html(text.replace(/&lt/gi, '&amp;lt'));
			$temp.contents().filter(function () {
				return this.nodeType === 3;
			}).each(function () {
				$(this).replaceWith($(this).text().replace(/#([a-z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]+)/gi, '<a href="' + searchUrl + '$1" class="hashtag">#$1</a>'));
			});
			return $temp.html();
		},
		loadComments: function (articleId) {
			$(window).scrollTop(0);
			$articles.empty();
			$('<div></div>').text('불러오는 중입니다...').addClass('loading').appendTo($articles);
			_fn.ajaxComments(articleId, function (data) {
				if (_set.moiminfo) {
					_fn.createMoimInfo(data);
				}
				_fn.createComments(data);
			});
		},
		ajaxComments: function (articleId, callback) {
			var conditions = {
				id: articleId,
				limit_num: -1,
				articleInfo: 'true'
			};
			if (_set.moiminfo) {
				conditions.moiminfo = 'true';
			}
			//댓글 검색
//			$.ajax({
//				url: '/find/board/comment/list',
//				xhrFields: {withCredentials: true},
//				type: 'POST',
//				data: conditions,
//				success: function (data) {
//					var responseCode;
//					if (!$(data).find('response').children().length) {
//						responseCode = $(data).find('response').text();
//					}
//					if (responseCode === '0') {
//						location.href = '/login?redirect=' + location.pathname;
//					} else if (responseCode === '-1') {
//						if (_set.isUser) {
//							_fn.createDialog('글이 존재하지 않습니다.');
//						} else {
//							location.href = '/login?redirect=' + location.pathname;
//						}
//					} else if (responseCode === '-100') {
//						if (confirm('학교인증 회원만 볼 수 있습니다. 학교인증을 하시겠습니까?')) {
//							location.href = '/auth';
//						} else {
//							history.go(-1);
//						}
//					} else if (responseCode === '-200') {
//						alert('비밀번호 필요');
//					} else if (responseCode === '-300' || responseCode === '-400') {
//						_fn.createDialog('접근 권한이 없습니다.');
//					} else {
//						callback(data);
//					}
//				}
//			});
		},
		createComments: function (data) {
			$articles.empty();
			_fn.createArticles(data, false);
			_fn.hideWriteArticleButton();
			$articles.find('ul.hashtags').remove();
			var $article = $articles.find('> article').first();
			var $comments = $article.find('div.comments');
			$(data).find('comment').each(function () {
				var $this = $(this);
				var $comment = $('<article></article>').data({
					id: $this.attr('id'),
					parentId: $this.attr('parent_id'),
					'is_mine': $this.attr('is_mine')
				}).appendTo($comments);
				if ($this.attr('parent_id') !== '0') {
					$comment.addClass('child');
				} else {
					$comment.addClass('parent');
				}
				
				
			
				$('<img>').attr('src', $this.attr('user_picture')).addClass('picture medium').appendTo($comment);
				$('<h3></h3>').html($this.attr('user_nickname')).addClass('medium').addClass($this.attr('user_type')).appendTo($comment);
				//댓글 버튼 부분
				var $status = $('<ul></ul>').addClass('status').appendTo($comment);
				if (_set.isUser && $this.attr('id') !== '0') {
					//대댓글
					if ($this.attr('parent_id') === '0' && (_set.isCommentable === 1 || _set.authToComment === 1)) {
						$('<li></li>').text('대댓글').addClass('childcomment').appendTo($status);
					}
					//공감
					$('<li></li>').text('공감').addClass('commentvote').appendTo($status);
					//삭제
					if ($this.attr('is_mine') === '1') {
						$('<li></li>').text('삭제').addClass('del').appendTo($status);
					} else {
						//쪽지
						$('<li></li>').text('쪽지').addClass('messagesend').attr({'data-modal': 'messageSend', 'data-comment-id': $this.attr('id'), 'data-is-anonym': Number($this.attr('user_id') === '0')}).appendTo($status);
						if (_set.isManageable) {
							$('<li></li>').text('삭제').addClass('managedel').appendTo($status);
							$('<li></li>').text('삭제 및 이용 제한').addClass('manageabuse').appendTo($status);
						} else {
							//신고
							$('<li></li>').text('신고').addClass('abuse').appendTo($status);
						}
					}
				}
				$('<hr>').appendTo($comment);
				$('<p></p>').html($this.attr('text')).addClass('large').appendTo($comment)
				.after(
					$('<time></time>').text(_gfn.formatRelativeDate($this.attr('created_at'))).addClass('medium').appendTo($comment),
					$('<ul></ul>').addClass('status commentvotestatus').append(
						$('<li></li>')
						.addClass('vote commentvote')
						.text($this.attr('posvote'))
						[$this.attr('posvote') === '0' ? 'hide' : 'show']()
					)
				);
				//댓글 리스트
//				$.ajax({
//					url: 'freedomContent/commentList',
//					xhrFields: {withCredentials: true},
//					type: 'POST',
//					contentType: "application/json; charset=UTF-8",
//					data: JSON.stringify({
//						postId: _set.boardId
//					}),
//					success: function (data) {
//						console.log(data);
//					}
//				});
			});
			if (_set.isCommentable || _set.authToComment) {
				var $writecomment = $('<form></form>').addClass('writecomment').appendTo($comments);
				$('<input>').attr({
					type: 'text',
					name: 'text',
					maxlength: '300',
					autocomplete: 'off',
					placeholder: '댓글을 입력하세요.'
				}).addClass('text').appendTo($writecomment);
				var $option = $('<ul></ul>').addClass('option').appendTo($writecomment);
				if ($('input[name=' + $article.data('id') + '_comment_anonym]').val() === '0' && _set.privCommentAnonym !== 1) {
					$('<li></li>').attr('title', '익명').addClass('anonym').appendTo($option);
				}
				$('<li></li>').attr('title', '완료').addClass('submit').appendTo($option);
				$('<div></div>').addClass('clearBothOnly').appendTo($writecomment);
			}
			$comments.show();
			var $pagination = $articles.find('> div.pagination');
			$pagination.empty();
			//addClass : 페이지 로드 된 상태에서 클래스 값 추가
			//appendTo : 앞 요소를 뒤 요소로 이동
			//결과 : http://localhost/389161/p/1
			//$('<a></a>').attr('id', 'goListButton').text('글 목록').addClass('list').appendTo($pagination);
			//글 목록 버튼
			$('<a></a>').attr('id', 'goListButton').text('글 목록').addClass('freedom');
			
			

		},
		manageMoim: function () {
			var $form = $container.find('#manageMoimForm');
			var $info = $form.find('input[name="info"]');
			var $isNotSelectedHotArticle = $form.find('input[name="is_not_selected_hot_article"]');
			$info.val(_set.info);
			if (_set.isNotSelectedHotArticle > -1) {
				$isNotSelectedHotArticle.parent('p').removeClass('hide');
				if (_set.isNotSelectedHotArticle === 1) {
					$isNotSelectedHotArticle.prop('checked', true);
				}
			}
			$form.show();
			$form.on('submit', function () {
				var params = {
					id: _set.boardId,
					info: $info.val()
				};
				if (_set.isNotSelectedHotArticle > -1) {
					params.is_not_selected_hot_article = $isNotSelectedHotArticle.is(':checked') ? '1' : '0';
				}
				
				//수정
//				$.ajax({
//					url: 'freedomContent',
//					xhrFields: {withCredentials: true},
//					type: 'POST',
//					data: params,
//					success: function (data) {
//						var responseCode = $(data).find('response').text();
//						if (responseCode === '0') {
//							alert('수정할 수 없습니다.');
//						} else {
//							alert('변경된 설정을 저장하였습니다.');
//							location.reload();
//						}
//					}
//				});
				return false;
			});
			$form.find('a.close').on('click', function () {
				$form.hide();
			});
			//게시판 양도
			$form.find('.button[value="게시판 양도"]').on('click', function () {
				if (confirm('게시판을 다른 이용자에게 양도하시겠습니까?')) {
					$form.hide();
					_fn.transferMoim();
				}
			});
			//게시판 삭제
			$form.find('.button[value="게시판 삭제"]').on('click', function () {
				if (!confirm('게시판을 삭제하면 모든 글이 삭제되며 다시 복구할 수 없습니다.')) {
					return false;
				}
				//삭제
//				$.ajax({
//					url: '/remove/board',
//					xhrFields: {withCredentials: true},
//					type: 'POST',
//					data: {
//						id: _set.boardId
//					},
//					success: function (data) {
//						var responseCode = $(data).find('response').text();
//						if (responseCode === '-1') {
//							alert('삭제할 수 없습니다.');
//						} else if (responseCode === '-2') {
//							alert('게시판 개설 혹은 마지막 게시물 게시 이후, 14일 동안 활동이 없는 게시판만 삭제할 수 있습니다.');
//						} else {
//							alert('게시판을 삭제하였습니다.');
//							location.href = '/';
//						}
//					}
//				});
			});
		},
		//게시판 양도
		transferMoim: function () {
			var $form = $container.find('#transferMoimForm');
			var $transfererPassword = $form.find('input[name="transferer_password"]');
			var $transfereeUserid = $form.find('input[name="transferee_userid"]');
			$form.show();
			$form.on('submit', function () {
				if (!$transfererPassword.val()) {
					alert('양도인의 비밀번호를 입력하세요.');
					$transfererPassword.focus();
					return false;
				} else if (!$transfereeUserid.val()) {
					alert('피양도인의 아이디를 입력하세요.');
					$transfereeUserid.focus();
					return false;
				}
				//게시판 양도
//				$.ajax({
//					url: '/save/board/transferRequest',
//					xhrFields: {withCredentials: true},
//					type: 'POST',
//					data: {
//						board_id: _set.boardId,
//						transferer_password: $transfererPassword.val(),
//						transferee_userid: $transfereeUserid.val()
//					},
//					success: function (data) {
//						var responseCode = $(data).find('response').text();
//						if (responseCode === '0' || responseCode === '-1' || responseCode === '-2') {
//							alert('게시판을 양도할 수 없습니다.');
//						} else if (responseCode === '-3') {
//							alert('양도인(본인)의 비밀번호를 바르게 입력하세요.');
//						} else if (responseCode === '-4') {
//							alert('존재하지 않는 피양도인 아이디입니다.');
//						} else {
//							alert('게시판 양도를 요청하였습니다.\n요청 수락 후 게시판이 자동으로 양도됩니다.');
//							$form.hide();
//						}
//					}
//				});
				return false;
			});
			$form.find('a.close').on('click', function () {
				$form.hide();
			});
		},
		setSeason: function (that) {
			var season = $(that).data('value');
			var boardUrl = _fn.encodeUrl({ boardId: _set.boardId });
			if (location.pathname !== boardUrl) {
				if (typeof history.pushState !== 'undefined') {
					_set.boardPage = 1;
					history.pushState(null, null, boardUrl);
				}
			}
			_set.searchType = 0;
			_set.keyword = '';
			_set.bestarticleSeason = season;
			_fn.loadArticles();
		},
		setCategory: function (that) {
			var categoryId = Number($(that).data('id'));
			var boardUrl = _fn.encodeUrl({ boardId: _set.boardId });
			if (location.pathname !== boardUrl) {
				if (typeof history.pushState !== 'undefined') {
					_set.boardPage = 1;
					history.pushState(null, null, boardUrl);
				}
			}
			_set.searchType = 0;
			_set.keyword = '';
			_set.categoryId = categoryId;
			_fn.loadArticles();
		},
		hideWriteArticleButton: function () {
			$('#writeArticleButton').hide();
		},
		showAbuseForm: function ($item, mode) {
			var $form = $container.find('#abuseForm');
			$form.show();
			$form.find('a.close').off('click').on('click', function () {
				$form.hide();
			});
			$form.find('ul > li > a').off('click').on('click', function () {
				var $this = $(this);
				var reason = Number($this.data('reason')) || 0;
				var message = '[' + $this.text() + ']\n';
				if (reason === 1) {
					message += '게시물의 주제가 게시판의 성격에 크게 벗어나, 다른 이용자에게 불편을 끼칠 수 있는 게시물';
				} else if (reason === 2) {
					message += '비아냥, 비속어 등 예의범절에 벗어나거나, 특정인이나 단체, 지역을 비방하는 등 논란 및 분란을 일으킬 수 있는 게시물';
				} else if (reason === 3) {
					message += '청소년유해매체물, 외설, 음란물, 음담패설, 신체사진을 포함하거나, 불건전한 만남, 채팅, 대화, 통화를 위한 게시물';
				} else if (reason === 4) {
					message += '타 서비스, 앱, 사이트 등 게시판 외부로 회원을 유도하거나 공동구매, 할인 쿠폰, 홍보성 이벤트 등 허가되지 않은 광고/홍보 게시물';
				} else if (reason === 5) {
					message += '게시물 무단 유출, 타인의 개인정보 유출, 관리자 사칭 등 타인의 권리를 침해하거나 관련법에 위배되는 게시물';
				} else if (reason === 6) {
					message += '중복글, 도배글, 낚시글, 내용 없는 게시물';
				} else if (reason === 7) {
					message += '특정 정당이나 정치인에 대한 비난/비하/모욕 또는 지지/홍보/선거운동 및 선거 관련법에 위배되는 게시물';
				}
				message += '\n\n신고는 반대 의견을 나타내는 기능이 아닙니다. 신고 사유에 맞지 않는 신고를 했을 경우, 해당 신고는 처리되지 않습니다.';
				if (confirm(message)) {
					if (mode === 'article') {
						_fn.abuseArticle($item, reason);
					} else if (mode === 'comment') {
						_fn.abuseComment($item, reason);
					}
				}
			});
		},
		//새 글 작성
		showWriteArticleForm: function ($article) {
			if (_set.authToWrite) {
				if (confirm('학교인증 회원만 글을 작성할 수 있습니다. 학교인증을 하시겠습니까?')) {
					location.href = '/auth';
				}
				return false;
			}

			_set.attaches = [];
			_set.removeAttachIds = [];
			_set.attachDragHoverCount = 0;
			_set.attachUploadingStatus = [];

			_fn.hideWriteArticleButton();
			var $form = $('<form></form>').addClass('write').prependTo($articles);

//			if (_set.type === 2) {
				var $title = $('<input>').attr({
					name: 'title',
					autocomplete: 'off',
					placeholder: '글 제목을 입력해주세요!'
				}).addClass('title').appendTo($('<p></p>').appendTo($form));
//			}
			var $text = $('<textarea></textarea>').attr({
				name: 'text',
				placeholder: _set.placeholder
			}).appendTo($('<p></p>').appendTo($form));
			if (_set.placeholder.length >= 50) {
				$text.addClass('smallplaceholder');
			}
			if (_set.type === 2) {
				$title.focus();
			} else {
				$text.focus();
			}
			if (_set.hashtags.length > 0) {
				var $hashtags = $('<ul></ul>').addClass('hashtags').appendTo($form);
				for (var i in _set.hashtags) {
					var hashtag = _set.hashtags[i];
					$('<li></li>').text('#' + hashtag).appendTo($hashtags);
				}
				$('<div></div>').addClass('clearBothOnly').appendTo($hashtags);
			}
			var $file = $('<input>').addClass('file').attr({type: 'file', name: 'file', multiple: true}).appendTo($form);
			var $thumbnails = $('<ol></ol>').addClass('thumbnails').appendTo($form);
			var $thumbnailsNewButton = $('<li></li>').addClass('new').appendTo($thumbnails);
			$('<div></div>').addClass('clearBothOnly').appendTo($form);
			var $question = $('<p></p>')
				.addClass('question')
				.appendTo($form);
			$('<div></div>')
				.html('질문 글을 작성하면 게시판 상단에 일정 기간 동안 노출되어, 더욱 빠르게 답변을 얻을 수 있게 됩니다.<br>또한, 다른 학우들이 정성껏 작성한 답변을 유지하기 위해, 댓글이 달린 이후에는 <b>글을 수정 및 삭제할 수 없습니다.</b>')
				.appendTo($question);
			var $option = $('<ul></ul>').addClass('option').appendTo($form);
			if (_set.isSearchable) {
				$('<li></li>').attr('title', '해시태그').addClass('hashtag').appendTo($option);
			}
			$('<li></li>').attr('title', '첨부').addClass('attach').appendTo($option);
			$('<li></li>').attr('title', '완료').addClass('submit').appendTo($option);
			if (_set.privAnonym !== 1) {
				$('<li></li>').attr('title', '익명').addClass('anonym').appendTo($option);
			}
			if (_set.isQuestionable === 1) {
				$('<li></li>').attr('title', '질문').addClass('question').appendTo($option);
			}
			$('<div></div>').addClass('clearBothOnly').appendTo($form);
//			if ($article && $article.data('article')) {
//				$article.hide();
				var $pagination = $articles.find('div.pagination');
				$pagination.find('a.list').hide();
//				$('<a></a>').text('글 수정 취소').addClass('cancel').on('click', function () {
//					$pagination.find('a.list').show();
//					$article.show();
//					$(this).remove();
//					$articles.find('form.write').remove();
//				}).appendTo($pagination);
//				var $articleData = $article.data('article');
//				$title.val($articleData.attr('raw_title'));
//				$text.val($articleData.attr('raw_text'));
				$('<input>').attr({
					type: 'hidden',
					name: 'article_id'
				}).val(_set.boardId).appendTo($form);
//				if ($articleData.find('attach').length > 0) {
//					$thumbnails.show();
//					$articleData.find('attach').each(function () {
//						var $attach = $(this);
//						var attachId = Number($attach.attr('id'));
//						var thumbnail = $attach.attr('fileurl');
//						var caption = $attach.attr('raw_caption');
//						$('<li></li>').addClass('thumbnail attached').data('id', attachId).css('background-image', 'url("' + thumbnail + '")').insertBefore($thumbnailsNewButton);
//						_set.attaches.push({
//							id: attachId,
//							caption: caption
//						});
//					});
//				}
//				if (Number($articleData.attr('user_id')) === 0) {
//					$option.find('li.anonym').addClass('active');
//				}
//				if (Number($articleData.attr('is_question')) === 1) {
//					$question.show();
//					$option.find('li.question').addClass('active');
//				}
//			}
			if (!$article) {
				if (_set.categories.length > 0) {
					var $categoriesContainer = $('<p></p>').addClass('categories').prependTo($form);
					_.each(_set.categories, function (category) {
						var $categoryRadio = $('<input>').attr({
							type: 'radio',
							name: 'category_id',
							id: 'category_' + category.id,
							value: category.id
						});
						var $categoryLabel = $('<label></label>').attr({
							for: 'category_' + category.id
						}).text(category.name);
						$categoriesContainer.append([
							$categoryRadio,
							$categoryLabel
						]);
					});
					if (_set.categoryId > 0) {
						$categoriesContainer.find('[name="category_id"]').filter(function (idx, elem) {
							return Number($(elem).val()) === _set.categoryId;
						}).prop({ checked: true });
					} else {
						$categoriesContainer.find('[name="category_id"]').eq(0).prop({ checked: true });
					}
				}
			}
		},
		//게시글 수정(만들었음)
		showModifyArticleForm: function ($article) {
			if (_set.authToWrite) {
				if (confirm('학교인증 회원만 글을 작성할 수 있습니다. 학교인증을 하시겠습니까?')) {
					location.href = '/auth';
				}
				return false;
			}

			_set.attaches = [];
			_set.removeAttachIds = [];
			_set.attachDragHoverCount = 0;
			_set.attachUploadingStatus = [];

			_fn.hideWriteArticleButton();
			
			var $form = $('<form></form>').addClass('write').prependTo($articles);

			//제목 작성
//			if (_set.type === 2) {
				var $title = $('<input>').attr({
					name: 'modifyTitle',
					autocomplete: 'off',
					placeholder: '수정할 글 제목을 입력해주세요!'
				}).addClass('modifyTitle').appendTo($('<p></p>').appendTo($form));
//			}
			//내용 작성
			var $text = $('<textarea></textarea>').attr({
				name: 'modifyText',
				placeholder: _set.placeholder
			}).appendTo($('<p></p>').appendTo($form));
			
			if (_set.placeholder.length >= 50) {
				$text.addClass('smallplaceholder');
			}
			if (_set.type === 2) {
				$title.focus();
			} else {
				$text.focus();
			}
			if (_set.hashtags.length > 0) {
				var $hashtags = $('<ul></ul>').addClass('hashtags').appendTo($form);
				for (var i in _set.hashtags) {
					var hashtag = _set.hashtags[i];
					$('<li></li>').text('#' + hashtag).appendTo($hashtags);
				}
				$('<div></div>').addClass('clearBothOnly').appendTo($hashtags);
			}
			
			var $file = $('<input>').addClass('file').attr({type: 'file', name: 'file', multiple: true}).appendTo($form);
			var $thumbnails = $('<ol></ol>').addClass('thumbnails').appendTo($form);
			var $thumbnailsNewButton = $('<li></li>').addClass('new').appendTo($thumbnails);
			$('<div></div>').addClass('clearBothOnly').appendTo($form);
			//질문
			var $question = $('<p></p>')
				.addClass('question')
				.appendTo($form);
			$('<div></div>')
				.html('질문 글을 작성하면 게시판 상단에 일정 기간 동안 노출되어, 더욱 빠르게 답변을 얻을 수 있게 됩니다.<br>또한, 다른 학우들이 정성껏 작성한 답변을 유지하기 위해, 댓글이 달린 이후에는 <b>글을 수정 및 삭제할 수 없습니다.</b>')
				.appendTo($question);
			//선택
			var $option = $('<ul></ul>').addClass('option').appendTo($form);
			if (_set.isSearchable) {
				$('<li></li>').attr('title', '해시태그').addClass('hashtag').appendTo($option);
			}
			$('<li></li>').attr('title', '첨부').addClass('attach').appendTo($option);
			$('<li></li>').attr('title', '완료').addClass('submit').appendTo($option);
			if (_set.privAnonym !== 1) {
				$('<li></li>').attr('title', '익명').addClass('anonym').appendTo($option);
			}
			if (_set.isQuestionable === 1) {
				$('<li></li>').attr('title', '질문').addClass('question').appendTo($option);
			}
			$('<div></div>').addClass('clearBothOnly').appendTo($form);
//			if ($article && $article.data('article')) {
				$article.hide();
				var $pagination = $articles.find('div.pagination');
				$pagination.find('a.list').hide();
				$('<a></a>').text('글 수정 취소').addClass('cancel').on('click', function () {
					$pagination.find('a.list').show();
					$article.show();
					$(this).remove();
					$articles.find('form.write').remove();
				}).appendTo($pagination);
				var $articleData = $article.data('article');
//				$title.val($articleData.attr('raw_title'));
//				$text.val($articleData.attr('raw_text'));
				$('<input>').attr({
					type: 'hidden',
					name: 'article_id'
				}).val(_set.boardId).appendTo($form);
//				if ($articleData.find('attach').length > 0) {
//					$thumbnails.show();
//					$articleData.find('attach').each(function () {
//						var $attach = $(this);
//						var attachId = Number($attach.attr('id'));
//						var thumbnail = $attach.attr('fileurl');
//						var caption = $attach.attr('raw_caption');
//						$('<li></li>').addClass('thumbnail attached').data('id', attachId).css('background-image', 'url("' + thumbnail + '")').insertBefore($thumbnailsNewButton);
//						_set.attaches.push({
//							id: attachId,
//							caption: caption
//						});
//					});
//				}
//				if (Number($articleData.attr('user_id')) === 0) {
//					$option.find('li.anonym').addClass('active');
//				}
//				if (Number($articleData.attr('is_question')) === 1) {
//					$question.show();
//					$option.find('li.question').addClass('active');
//				}
//			}
			if (!$article) {
				if (_set.categories.length > 0) {
					var $categoriesContainer = $('<p></p>').addClass('categories').prependTo($form);
					_.each(_set.categories, function (category) {
						var $categoryRadio = $('<input>').attr({
							type: 'radio',
							name: 'category_id',
							id: 'category_' + category.id,
							value: category.id
						});
						var $categoryLabel = $('<label></label>').attr({
							for: 'category_' + category.id
						}).text(category.name);
						$categoriesContainer.append([
							$categoryRadio,
							$categoryLabel
						]);
					});
					if (_set.categoryId > 0) {
						$categoriesContainer.find('[name="category_id"]').filter(function (idx, elem) {
							return Number($(elem).val()) === _set.categoryId;
						}).prop({ checked: true });
					} else {
						$categoriesContainer.find('[name="category_id"]').eq(0).prop({ checked: true });
					}
				}
			}
			
			
			
		},
		addHashtagOnWriteArticleForm: function (hashtag) {
			var $writeForm = $articles.find('form.write');
			var $textarea = $writeForm.find('textarea[name="text"]');
			var text = (typeof hashtag !== 'undefined') ? (hashtag + ' ') : '#';
			$textarea.val($textarea.val() + text);
			$textarea.focus();
		},
		dragstartOnWriteArticleForm: function (event) {
			if (typeof window.FileReader === 'undefined' || !document.createElement('canvas').getContext) {
				return;
			}
			if (_.indexOf(event.originalEvent.dataTransfer.types, 'Files') === -1) {
				return;
			}
			_set.attachDragHoverCount++;
			$articles.find('form.write').addClass('dragover');
		},
		dragendOnWriteArticleForm: function (event) {
			if (typeof window.FileReader === 'undefined' || !document.createElement('canvas').getContext) {
				return;
			}
			if (_.indexOf(event.originalEvent.dataTransfer.types, 'Files') === -1) {
				return;
			}
			_set.attachDragHoverCount--;
			if (_set.attachDragHoverCount === 0) {
				$articles.find('form.write').removeClass('dragover');
			}
		},
		dropOnWriteArticleForm: function (event) {
			if (typeof window.FileReader === 'undefined' || !document.createElement('canvas').getContext) {
				return;
			}
			if (_.indexOf(event.originalEvent.dataTransfer.types, 'Files') === -1) {
				return;
			}
			_fn.changeAttachOnWriteArticleForm(event.originalEvent.dataTransfer.files);
		},
		addAttachOnWriteArticleForm: function () {
			if (typeof window.FileReader === 'undefined' || !document.createElement('canvas').getContext) {
				alert('이미지 첨부를 위해 최신 브라우저를 이용해주세요.');
				return;
			}
			var $writeForm = $articles.find('form.write');
			$writeForm.find('input[name="file"]').click();
		},
		changeAttachOnWriteArticleForm: function (files) {
			if (files.length === 0) {
				return;
			}
			if ((_set.attaches.length + files.length) > 20) {
				alert('이미지는 20장까지 첨부할 수 있습니다.');
				return;
			}
			var hasNotImage = false;
			_.each(files, function (file) {
				if (!file.type.match('image')) {
					hasNotImage = true;
				}
			});
			if (hasNotImage) {
				alert('이미지만 첨부할 수 있습니다.');
				return;
			}
			if (_.indexOf(_set.attachUploadingStatus, 0) !== -1) {
				alert('이미지 첨부가 진행중입니다.');
				return;
			}
			_set.attachUploadingStatus = [];
			var $writeForm = $articles.find('form.write');
			var $thumbnails = $writeForm.find('> ol.thumbnails').show();
			var $thumbnailsNewButton = $thumbnails.find('> li.new');
			_.each(files, function (file, index) {
				_set.attachUploadingStatus.push(0);
				var $thumbnail = $('<li></li>').addClass('thumbnail loading').insertBefore($thumbnailsNewButton);
				var fileName = 'everytime-web-' + new Date().getTime().toString() + '.jpg';
				var loadImageOptions = {
					canvas: true,
					maxWidth: 1280
				};
				loadImage.parseMetaData(file, function (data) {
					if (data.exif) {
						loadImageOptions.orientation = data.exif.get('Orientation');
					}
					loadImage(file, function (canvas) {
						if (!canvas.toDataURL || !canvas.toBlob) {
							_set.attachUploadingStatus[index] = -1;
							$thumbnail.remove();
							return;
						}
						canvas.toBlob(function (blob) {
							_fn.uploadAttachOnWriteArticleForm(index, blob, fileName, $thumbnail, canvas.toDataURL());
						}, 'image/jpeg', 0.8);
					}, loadImageOptions);
				});

			});
		},
		//업로드?
		uploadAttachOnWriteArticleForm: function (index, file, filename, $thumbnail, thumbnail) {
			var $writeForm = $articles.find('form.write');
			
			if (_.indexOf(_set.attachUploadingStatus.slice(0, index), 0) !== -1) {
				setTimeout(function () {
					_fn.uploadAttachOnWriteArticleForm(index, file, filename, $thumbnail, thumbnail);
				}, 100);
				return;
			}
			function uploadFail() {
				_set.attachUploadingStatus[index] = -1;
				$thumbnail.remove();
			}
			function uploadSuccess(attachId) {
				_set.attaches.push({
					id: attachId,
					caption: ''
				});
				_set.attachUploadingStatus[index] = 1;
				$thumbnail.removeClass('loading').addClass('attached').data('id', attachId).css('background-image', 'url("' + thumbnail + '")');
				$writeForm.find('input[name="file"]').val('');
			}
			// 사진폼 보내기...
			var formData = new FormData($writeForm[0]);
			
			$.ajax({
				type: "POST",
				url: "/admin/save/picture",
				enctype: 'multipart/form-data',
				processData: false,
				contentType: false,
				data: formData,
				cache: false,
				timeout: 600000,
				success: function(picture_id) {
					console.log("picture_id: ", picture_id)
					if (picture_id == -1) {
						uploadFail();
						return;
					}
					uploadSuccess(picture_id);
				},
			})
			
		},
		showAttachThumbnailForm: function ($thumbnail) {
			var attach = _.find(_set.attaches, function (attach) {
				return attach.id === $thumbnail.data('id');
			});
			var $form = $container.find('#attachThumbnailForm');
			var $caption = $form.find('textarea[name="caption"]');
			$caption.val(attach.caption);
			$form.show();
			$form.off('submit');
			$form.on('submit', function () {
				attach.caption = $caption.val();
				$form.find('a.close').click();
				return false;
			});
			$form.find('.button[value="첨부 삭제"]').off('click');
			$form.find('.button[value="첨부 삭제"]').on('click', function () {
				if (!confirm('첨부된 이미지를 삭제하시겠습니까?')) {
					return;
				}
				_set.removeAttachIds.push(attach.id);
				_set.attaches = _.reject(_set.attaches, function (i) {
					return i.id === attach.id;
				});
				$thumbnail.remove();
				$form.find('a.close').click();
			});
			$form.find('a.close').off('click');
			$form.find('a.close').on('click', function () {
				$form.hide();
			});
		},
		//글 작성
		writeArticle: function () {
			var $form = $articles.find('form.write');
			var $text = $form.find('textarea[name="text"], textarea[name="modifyText"]');
			var $option = $form.find('ul.option');
			var isAnonym = ($option.is(':has(li.anonym)') && $option.find('li.anonym').hasClass('active')) ? 1 : 0;
			var isQuestion = ($option.is(':has(li.question)') && $option.find('li.question').hasClass('active')) ? 1 : 0;
			var $freedomTitle = $container.find('input[name="title"]');
			var $freedomContent = $container.find('textarea[name="text"]');
//			
			if ($text.val().replace(/ /gi, '') === '') {
				alert('내용을 입력해 주세요.');
				$text.focus();
				return false;
			}
			
			var parameters = {
				board_name: _set.boardName,
				title: $freedomTitle.val(),
				content: $text.val(),
				is_anonym: isAnonym,
				is_question: isQuestion
			};
			
			if ($form.is(':has(input[name="article_id"])')) {
				parameters.article_id = $form.find('input[name="article_id"]').val();
				if (_set.removeAttachIds.length > 0) {
					parameters.remove_attach_ids = JSON.stringify(_set.removeAttachIds);
				}
			}
			if ($form.is(':has(p.categories)')) {
				parameters.category_id = ($form[0].category_id || {}).value || 0;
			}
			if (isQuestion === 1 && !confirm('댓글이 달린 이후에는 글을 수정 및 삭제할 수 없습니다. 그래도 작성하시겠습니까?')) {
				return;
			}
			if (_set.isCommercial && !confirm(_set.placeholder)) {
				return;
			}
			
			//게시글 작성
//			console.log(parameters)
//			$.ajax({
//				url: '/freedom',
//				xhrFields: {withCredentials: true},
//				type: 'POST',
//				contentType: "application/json; charset=UTF-8",
//				data: JSON.stringify(parameters), 
//				success: function (data) {
//					console.log(data)
//					alert(data);
//					location.reload();
//				}
//			});
		},
		//검색 부분(정보 담아서 url로)
		searchArticle: function () {
			var $form = $container.find('#searchArticleForm');
			var $searchType = $form.find('select[name="search_type"]');
			var $keyword = $form.find('input[name="keyword"]');
			if ($keyword.val().replace(/ /gi, '').length < 2) {
				alert('검색어는 두 글자 이상 입력하세요.');
				$keyword.focus();
				return false;
			}
			var searchType = Number($searchType.val());
			var keyword = $keyword.val().replace(/[#?=&<>]/gi, '');
			var searchUrl;
			if (searchType === 3) {
				keyword = keyword.replace(/([^a-z0-9ㄱ-ㅎㅏ-ㅣ가-힣_])/gi, '');
				searchUrl = _fn.encodeUrl({ hashtag: keyword });
			} else if (searchType === 2) {
				searchUrl = _fn.encodeUrl({ title: keyword });
			} else if (searchType === 1) {
				searchUrl = _fn.encodeUrl({ text: keyword });
			} else {
				searchUrl = _fn.encodeUrl({ all: keyword });
			}
			
			//게시글 검색
//			$.ajax({
//				url: 'freedom/searchProc',
//				xhrFields: {withCredentials: true},
//				type: 'POST',
//				contentType: "application/json; charset=UTF-8",
//				data: JSON.stringify({
//					search: $keyword.val()
//				}), 
//				success: function (data) {
//					console.log(data)
//					alert(data);
//					location.reload();
//				}
//			});
			
			
			_fn.goRedirectContent(searchUrl);
			
			
		},
		removeArticle: function ($article) {
			//게시글 삭제
//			$.ajax({
//				url: 'freedomContent/deleteProc',
//				xhrFields: {withCredentials: true},
//				type: 'POST',
//				contentType: "application/json; charset=UTF-8",
//				data: JSON.stringify({
//					id: _set.boardId
//				}),
//				success: function (data) {
//					console.log(data)
//					var responseCode = $(data).find('response').text();
//					if (responseCode === '-1') {
//						alert('삭제할 수 없습니다.');
//					} else if (responseCode === '-2') {
//						alert('게시판 개설 혹은 마지막 게시물 게시 이후, 14일 동안 활동이 없는 게시판만 삭제할 수 있습니다.');
//					} else {
//						alert('게시판을 삭제하였습니다.');
//					}
//				}
//			});
		},
		//공감 버튼
//		voteArticle: function ($article) {
//			var $vote = $article.find('a.article > ul.status > li.vote');
//			if ($article.data('is_mine') === '1') {
//				alert('자신의 글을 공감할 수 없습니다.');
//				return false;
//			}
//			if (!confirm('이 글에 공감하십니까?')) {
//				return false;
//			}
//			if (!_set.isUser) {
//				alert('로그인 후 가능합니다.');
//				return false;
//			}
//			
//			
//			//글 공감
//			$.ajax({
//				url: 'freedomContent/likeProc',
//				xhrFields: {withCredentials: true},
//				type: 'POST',
//				contentType: "application/json; charset=UTF-8",
//				data: JSON.stringify({
//					likeCount: '1',
//					userId: _set.isUser,
//					postId: _set.boardId
//				}),
//				success: function (data) {
////					var response = Number($('response', data).text());
//					var response = $(data).find('response').text();
//					console.log(response)
//					
//					if (response === 0) {
//						alert('공감할 수 없습니다.');
//					} else if (response === -1) {
//						alert('이미 공감하였습니다.');
//					} else if (response === -2) {
//						alert('오래된 글은 공감할 수 없습니다.');
//					} else {
//						$vote.text(response);
//					}
//				}
//			});
//			//테이블에 들어가는
//			$.ajax({
//				url: 'freedomContent/insertLike',
//				xhrFields: {withCredentials: true},
//				type: 'POST',
//				contentType: "application/json; charset=UTF-8",
//				data: JSON.stringify({
//					userId: 'test1234',
//					postId: _set.boardId
//				}),
//				success: function (data) {
//					console.log(data)
//					if(data === '실패')
//						alert('이미 공감하였습니다.')
//				},
//			});
//		},
//		scrapArticle: function ($article) {
//			var $scrap = $article.find('ul.status > li.scrap');
//			if (!confirm('이 글을 스크랩하시겠습니까?')) {
//				return false;
//			}
//			if (!_set.isUser) {
//				alert('로그인 후 가능합니다.');
//				return false;
//			}
//			
//			//스크랩
//			$.ajax({
//				url: 'freedomContent/scrapProc',
//				xhrFields: {withCredentials: true},
//				type: 'POST',
//				contentType: "application/json; charset=UTF-8",
//				data: JSON.stringify({
//					scrap: '1',
//					userId: _set.isUser,
//					postId: _set.boardId
//				}),
//				success: function (data) {
//					var response = Number($('response', data).text());
//					if (response === 0) {
//						alert('스크랩할 수 없습니다.');
//					} else if (response === -1) {
//						alert('존재하지 않는 글입니다.');
//					} else if (response === -2) {
//						alert('이미 스크랩하였습니다.');
//					} else if (response === -3) {
//						alert('내가 쓴 글은 스크랩할 수 없습니다.');
//					} else {
//						$scrap.text(response);
//					}
//				}
//			});
//			//테이블에 들어가는
//			$.ajax({
//				url: 'freedomContent/insertScrap',
//				xhrFields: {withCredentials: true},
//				type: 'POST',
//				contentType: "application/json; charset=UTF-8",
//				data: JSON.stringify({
//					userId: 'test1234',
//					postId: _set.boardId
//				}),
//				success: function (data) {
//					console.log(data)
//					if(data === '실패')
//						alert('이미 스크랩하였습니다.')
//				},
//			});
//		},
		removeScrap: function ($article) {
			if (!confirm('스크랩을 취소하시겠습니까?')) {
				return false;
			}
			
			//스크랩 취소
//			$.ajax({
//				url: '/remove/board/article/scrap',
//				xhrFields: {withCredentials: true},
//				type: 'POST',
//				data: {
//					article_id: $article.data('id')
//				},
//				success: function (data) {
//					var response = Number($('response', data).text());
//					if (response === 0) {
//						alert('취소할 수 없습니다.');
//					} else if (response === -1) {
//						alert('존재하지 않는 글입니다.');
//					} else {
//						$article.remove();
//					}
//				}
//			});
		},
		setNoticeArticle: function ($article) {
			if (!confirm('이 글을 공지로 설정하시겠습니까?')) {
				return false;
			}
			
			//공지 설정
//			$.ajax({
//				url: '/update/board/notice',
//				xhrFields: {withCredentials: true},
//				type: 'POST',
//				data: {
//					id: $article.data('id')
//				},
//				success: function (data) {
//					var response = Number($('response', data).text());
//					if (response === 1) {
//						alert('공지로 설정하였습니다.');
//					} else {
//						alert('설정에 실패하였습니다.');
//					}
//				}
//			});
		},
		//댓글 부분
		writeComment: function ($form) {
			var $article = $form.parents('article');
			var $text = $form.find('input[name="text"]');
			var $option = $form.find('ul.option');
			var isAnonym = ($option.is(':has(li.anonym)') && $option.find('li.anonym').hasClass('active')) ? 1 : 0;
			if ($text.val().replace(/ /gi, '') === '') {
				alert('내용을 입력해 주세요.');
				$text.focus();
				return false;
			}
			var params = {
				post: _set.boardId,
				text: $text.val(),
				is_anonym: isAnonym
			};
			if ($form.data('parentId')) {
				params.comment_id = $form.data('parentId');
			} else {
				params.id = $article.data('id');
			}
			
//			//댓글 리스트
//			$.ajax({
//				url: 'freedomContent/commentList',
//				xhrFields: {withCredentials: true},
//				type: 'POST',
//				contentType: "application/json; charset=UTF-8",
//				data: JSON.stringify({
//					postId: _set.boardId
//				}),
//				success: function (data) {
//					console.log(data);
//				}
//			});
			
		},
		//대댓글 버튼 누르면 나오는 부분
		createChildCommentForm: function ($comment) {
			var $commentForm = $articles.find('> article > div.comments > form.writecomment').filter(function () {
				return $(this).data('parentId') === $comment.data('id');
			});
			if ($commentForm.length === 0) {
				$commentForm = $articles.find('> article > div.comments > form.\
				comment:not(.child)').clone().addClass('child').data('parentId', $comment.data('id'));
				$commentForm.find('input[name="text"]').attr('placeholder', '대댓글을 입력하세요.');
				
				var $beforeComment = $articles.find('> article > div.comments > article.child').filter(function () {
					return $(this).data('parentId') === $comment.data('id');
				}).last();
				if ($beforeComment.length === 0) {
					$beforeComment = $articles.find('> article > div.comments > article.parent').filter(function () {
						return $(this).data('id') === $comment.data('id');
					});
				}
				$commentForm.insertAfter($beforeComment);
			}
			$commentForm.find('input[name="text"]').focus();
		},
		//공감 처리부분
		voteComment: function ($comment) {
			var $vote = $comment.find('ul.status > li.vote');
			if ($comment.data('is_mine') === '1') {
				alert('내가 쓴 댓글은 공감할 수 없습니다.');
				return false;
			}
			if (!confirm('이 댓글에 공감하십니까?')) {
				return false;
			}
			if (!_set.isUser) {
				alert('로그인 후 가능합니다.');
				return false;
			}
			
			//댓글 공감
//			$.ajax({
//				url: '/save/board/comment/vote',
//				xhrFields: {withCredentials: true},
//				type: 'POST',
//				data: {
//					id: $comment.data('id'),
//					vote: '1'
//				},
//				success: function (data) {
//					var response = Number($('response', data).text());
//					if (response === -1) {
//						alert('이미 공감한 댓글입니다.');
//					} else if (response === -2) {
//						alert('오래된 댓글은 공감할 수 없습니다.');
//					} else if (response <= 0) {
//						alert('공감할 수 없습니다.');
//					} else {
//						$vote.text(response).show();
//					}
//				}
//			});
		},
		removeComment: function ($comment) {
			//댓글 삭제
//			$.ajax({
//				url: '/remove/board/comment',
//				xhrFields: {withCredentials: true},
//				type: 'POST',
//				data: {
//					id: $comment.data('id')
//				},
//				success: function (data) {
//					response = Number($('response', data).text());
//					if (Number($('response', data).text())) {
//						$comment.remove();
//					} else {
//						alert('삭제할 수 없습니다.');
//					}
//				}
//			});
		},
		//신고
		abuseArticle: function ($article, reason) {
			//글 신고
//			$.ajax({
//				url: '/save/board/article/abuse',
//				xhrFields: {withCredentials: true},
//				type: 'POST',
//				data: {
//					id: $article.data('id'),
//					reason: reason
//				},
//				success: function (data) {
//					var responseCode = $(data).find('response').text();
//					if (responseCode === '0') {
//						alert('신고할 수 없습니다.');
//					} else if (responseCode === '-1') {
//						alert('이미 신고한 글입니다.');
//					} else {
//						alert('신고하였습니다.');
//						location.reload();
//					}
//				}
//			});
		},
		abuseComment: function ($comment, reason) {
			//댓글 신고
//			$.ajax({
//				url: '/save/board/comment/abuse',
//				xhrFields: {withCredentials: true},
//				type: 'POST',
//				data: {
//					id: $comment.data('id'),
//					reason: reason
//				},
//				success: function (data) {
//					var responseCode = $(data).find('response').text();
//					if (responseCode === '0') {
//						alert('신고할 수 없습니다.');
//					} else if (responseCode === '-1') {
//						alert('이미 신고한 댓글입니다.');
//					} else {
//						alert('신고하였습니다.');
//						location.reload();
//					}
//				}
//			});
		}
	};
	_fn.initiate();
});
