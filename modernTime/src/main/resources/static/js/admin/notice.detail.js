$().ready(function() {
	var $container = $('#container');
	var $title, $containerTitle, $articles;
	var _component = {
		Gallery: (function() {
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
				var errorHandler = function() {
					if ([MediaError.MEDIA_ERR_DECODE, MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED].indexOf(video.error.code) !== -1) {
						_getHls(function(err, Hls) {
							var hls = new Hls({
								xhrSetup: function(xhr) {
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
				destroy: function() {
					_refs.isMounted = false;
					$('#gallery').remove();
				},
				isMounted: function() {
					return _refs.isMounted;
				},
				mount: function(attachIndex) {
					var row = _props.data[attachIndex];
					if (!row) {
						return;
					}
					_refs.isMounted = true;
					var $gallery = $('<div></div>').attr('id', 'gallery');
					$('<div></div>')
						.addClass('backdrop')
						.on('click', function() {
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
		initiate: function() {
			$title = $container.find('aside > div.title');
			$containerTitle = $container.find('div.wrap.title');
			$articles = $container.find('div.articles');
			
			_set.isUser = ($container.find('#isUser').val() === '1') ? true : false;
			_set.boardId = $container.find('#boardId').val();

			_fn.initiateContent();
			$(window).on('load', function() { // Fix popstate issue in Safari
				setTimeout(function() {
					$(window).on('popstate', function(event) {
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
			$containerTitle.on('click', '#manageMoim', function() {
				_fn.manageMoim();
			});
			$container.on('click', '#writeArticleButton', function() {
				_fn.showWriteArticleForm();
			});
			$container.on('change', '#searchArticleForm > select[name="search_type"]', function() {
				var $form = $container.find('#searchArticleForm');
				var $keyword = $form.find('input[name="keyword"]');
				if ($(this).val() === '3') {
					$keyword.attr('placeholder', '#에브리타임');
				} else {
					$keyword.attr('placeholder', '검색어를 입력하세요.');
				}
				$keyword.val('');
			});
			$container.on('submit', '#searchArticleForm', function() {
				_fn.searchArticle();
				return false;
			});
			$container.on('click', '#goListButton', function() {
				if (_set.boardPage > 1) {
					history.go(-1);
				} else {
					var url = _fn.encodeUrl({ page: 1 });
					_fn.goRedirectContent(url);
				}
			});
			$articles.on('click', 'a[href]', function(event) {
				_fn.goLinkContent(this, event);
			});
			$articles.on('click', '> article > a.article > ul.status > li.update', function() {
				var $article = $(this).parents('article');
				_fn.showWriteArticleForm($article);
				return false;
			});
			$articles.on('click', '> article > a.article > ul.status > li.del', function() {
				var $article = $(this).parents('article');
				if (confirm('이 글을 삭제하시겠습니까?')) {
					_fn.removeArticle();
				}
				return false;
			});
			$articles.on('click', '> article > a.article > ul.status > li.abuse', function() {
				var $article = $(this).parents('article');
				_fn.showAbuseForm($article, 'article');
			});
			$articles.on('click', '> article > a.article > ul.status > li.removescrap', function() {
				var $article = $(this).parents('article');
				_fn.removeScrap($article);
				return false;
			});
			$articles.on('click', '> article > a.article > ul.status > li.setnotice', function() {
				var $article = $(this).parents('article');
				_fn.setNoticeArticle($article);
				return false;
			});
			$articles.on('click', '> article > a.article > ul.status > li.managedel', function() {
				var $article = $(this).parents('article');
				if (confirm('[삭제]는 관리하시는 게시판의 주제 및 규칙에 맞지 않는 게시물을 삭제하기 위한 기능입니다.\n\n확인을 누를 경우 게시물이 즉시 삭제됩니다.\n\n욕설, 음란물 등 에브리타임 커뮤니티 이용규칙에 어긋나는 게시물은 [삭제 및 이용 제한]을 해주시기 바랍니다.')) {
					_fn.removeArticle($article);
				}
				return false;
			});
			$articles.on('click', '> article > a.article > ul.status > li.manageabuse', function() {
				var $article = $(this).parents('article');
				if (confirm('[삭제 및 이용 제한]은 욕설, 음란물 등 에브리타임 커뮤니티 이용규칙에 어긋나는 게시물을 삭제하고, 이용 제한을 하기 위한 기능입니다.\n\n확인을 누를 경우 게시물이 즉시 삭제되며, 작성자는 일정 기한 동안 이 게시판을 이용할 수 없습니다.\n\n단순히 주제 및 규칙에 맞지 않는 게시물의 경우 [삭제]를 해주시기 바랍니다.')) {
					_fn.abuseArticle($article, 0);
				}
				return false;
			});
			$articles.on('click', '> article > a.article > div.buttons > span.posvote', function() {
				var $article = $(this).parents('article');
				_fn.voteArticle($article);
			});
			$articles.on('click', '> article > a.article > div.buttons > span.scrap', function() {
				var $article = $(this).parents('article');
				_fn.scrapArticle($article);
			});
			$articles.on('submit', '> form.write', function() {
				_fn.writeArticle();
				return false;
			});
			$articles.on('drag dragstart dragend dragover dragenter dragleave drop', '> form.write', function(event) {
				event.preventDefault();
				event.stopPropagation();
			}).on('dragenter', '> form.write', function(event) {
				_fn.dragstartOnWriteArticleForm(event);
			}).on('dragleave drop', '> form.write', function(event) {
				_fn.dragendOnWriteArticleForm(event);
			}).on('drop', '> form.write', function(event) {
				_fn.dropOnWriteArticleForm(event);
			});
			$articles.on('click', '> form.write > ul.hashtags > li', function() {
				_fn.addHashtagOnWriteArticleForm($(this).text());
			});
			$articles.on('change', '> form.write > input[name="file"]', function() {
				_fn.changeAttachOnWriteArticleForm(this.files);
			});
			$articles.on('click', '> form.write > ol.thumbnails > li.new', function() {
				_fn.addAttachOnWriteArticleForm();
			});
			$articles.on('click', '> form.write > ol.thumbnails > li.thumbnail.attached', function() {
				_fn.showAttachThumbnailForm($(this));
			});
			$articles.on('click', '> form.write > ul.option > li.anonym', function() {
				if ($(this).hasClass('active')) {
					$(this).removeClass('active');
				} else {
					$(this).addClass('active');
				}
			});
			$articles.on('click', '> form.write > ul.option > li.question', function() {
				var $question = $articles.find('form.write p.question');
				if ($(this).hasClass('active')) {
					$question.hide();
					$(this).removeClass('active');
				} else {
					$question.show();
					$(this).addClass('active');
				}
			});
			$articles.on('click', '> form.write > ul.option > li.hashtag', function() {
				_fn.addHashtagOnWriteArticleForm();
			});
			$articles.on('click', '> form.write > ul.option > li.attach', function() {
				_fn.addAttachOnWriteArticleForm();
			});
			$articles.on('click', '> form.write > ul.option > li.submit', function() {
				$articles.find('form.write').submit();
			});
			$articles.on('submit', '> article > div.comments > form.writecomment', function() {
				_fn.writeComment($(this));
				return false;
			});
			$articles.on('focus', '> article > div.comments > form.writecomment > input[name="text"]', function() {
				if (_set.authToComment) {
					if (confirm('학교인증 회원만 댓글을 작성할 수 있습니다. 학교인증을 하시겠습니까?')) {
						location.href = '/auth';
					}
					$(this).blur();
				}
			});
			$articles.on('click', '> article > div.comments > form.writecomment > ul.option > li.anonym', function() {
				var $this = $(this);
				if ($this.hasClass('active')) {
					$this.removeClass('active');
				} else {
					$this.addClass('active');
				}
			});
			$articles.on('click', '> article > div.comments > form.writecomment > ul.option > li.submit', function() {
				$(this).parents('form.writecomment').submit();
			});
			$articles.on('click', '> article > div.comments > article > ul.status > li.childcomment', function() {
				var $comment = $(this).parent().parent();
				_fn.createChildCommentForm($comment);
			});
			$articles.on('click', '> article > div.comments > article > ul.status > li.commentvote', function() {
				var $comment = $(this).parent().parent();
				_fn.voteComment($comment);
			});
			$articles.on('click', '> article > div.comments > article > ul.status > li.del', function() {
				var $comment = $(this).parent().parent();
				if (confirm('이 댓글을 삭제하시겠습니까?')) {
					_fn.removeComment($comment);
				}
			});
			$articles.on('click', '> article > div.comments > article > ul.status > li.abuse', function() {
				var $comment = $(this).parent().parent();
				_fn.showAbuseForm($comment, 'comment');
			});
			$articles.on('click', '> article > div.comments > article > ul.status > li.managedel', function() {
				var $comment = $(this).parent().parent();
				if (confirm('[삭제]는 관리하시는 게시판의 주제 및 규칙에 맞지 않는 게시물을 삭제하기 위한 기능입니다.\n\n확인을 누를 경우 게시물이 즉시 삭제됩니다.\n\n욕설, 음란물 등 에브리타임 커뮤니티 이용규칙에 어긋나는 게시물은 [삭제 및 이용 제한]을 해주시기 바랍니다.')) {
					_fn.removeComment($comment);
				}
			});
			$articles.on('click', '> article > div.comments > article > ul.status > li.manageabuse', function() {
				var $comment = $(this).parent().parent();
				if (confirm('[삭제 및 이용 제한]은 욕설, 음란물 등 에브리타임 커뮤니티 이용규칙에 어긋나는 게시물을 삭제하고, 이용 제한을 하기 위한 기능입니다.\n\n확인을 누를 경우 게시물이 즉시 삭제되며, 작성자는 일정 기한 동안 이 게시판을 이용할 수 없습니다.\n\n단순히 주제 및 규칙에 맞지 않는 게시물의 경우 [삭제]를 해주시기 바랍니다.')) {
					_fn.abuseComment($comment, 0);
				}
			});
		},
		initiateContent: function() {
			_set.categoryId = _set.categoryId || 0;
			var url = window.location.pathname;
			var params = _fn.parseParams(url);
		},
		goLinkContent: function(that, event) {
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
			_fn.loadContent(params);
			history.pushState(null, null, url);
		},
		goRedirectContent: function(url) {
			if (typeof history.pushState === 'undefined') {
				location.href = url;
				return false;
			}
			var params = _fn.parseParams(url);
			_fn.loadContent(params);
			history.pushState(null, null, url);
		},
		loadContent: function(params) {
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
		parseParams: function(url) {
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
		encodeUrl: function(params) {
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
				} else {
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
		createDialog: function(message) {
			$articles.find('div.loading').remove();
			$('<article></article>').addClass('dialog').html(message).appendTo($articles);
		},
		createMoimInfo: function(data) {
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
				$('#submenu').find('a').filter(function() {
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
				$hashtagsData.find('item').each(function() {
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
				$(document).on('contextmenu', function(e) {
					if (!e.target || (e.target.tagName.toUpperCase() !== 'TEXTAREA' && e.target.tagName.toUpperCase() !== 'INPUT')) {
						alert('이 게시판의 내용을 커뮤니티 외부로 유출하는 것은 금지되어 있습니다. 게시물을 복사·스크린샷·촬영하여 외부 사이트·대화방에 게시하거나 타인에게 공유하는 등 유출이 적발될 경우, 서비스 이용 제한 등의 조치가 취해집니다.');
						return false;
					}
				});
			}
		},
		createBestarticleSeasons: function() {

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

			_.each(seasons, function(season, idx) {
				$('<div></div>')
					.addClass('season')
					.data({ value: season })
					.html('<span>' + String(season).slice(-3, -1) + '년 ' + (String(season).slice(-1) === '2' ? '하반기' : '상반기') + '</span>')
					.on('click', function() {
						_fn.setSeason(this);
					})
					.appendTo($seasons);
			});

		},
		createCategories: function($categoriesXml) {

			var $categories = $('<div></div>')
				.addClass('wrap categories')
				.insertAfter($containerTitle);

			$('<div></div>').addClass('category selected').data({
				id: '0',
				name: ''
			}).html('<span>전체</span>').on('click', function() {
				_fn.setCategory(this);
			}).appendTo($categories);

			$categoriesXml.find('category').each(function() {
				var data = {
					id: $(this).attr('id'),
					name: $(this).attr('name')
				};
				_set.categories.push(data);
				$('<div></div>')
					.addClass('category')
					.data(data)
					.html('<span>' + data.name + '</span>')
					.on('click', function() {
						_fn.setCategory(this);
					})
					.appendTo($categories);
			});

		},
		parseArticleText: function(text) {
			if (!_set.isSearchable) {
				return text;
			}
			var searchUrl = _fn.encodeUrl({ hashtag: '' });
			var $temp = $('<div></div>').html(text.replace(/&lt/gi, '&amp;lt'));
			$temp.contents().filter(function() {
				return this.nodeType === 3;
			}).each(function() {
				$(this).replaceWith($(this).text().replace(/#([a-z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]+)/gi, '<a href="' + searchUrl + '$1" class="hashtag">#$1</a>'));
			});
			return $temp.html();
		},
		loadComments: function(articleId) {
			$(window).scrollTop(0);
			$articles.empty();
			$('<div></div>').text('불러오는 중입니다...').addClass('loading').appendTo($articles);
			_fn.ajaxComments(articleId, function(data) {
				if (_set.moiminfo) {
					_fn.createMoimInfo(data);
				}
				_fn.createComments(data);
			});
		},
		ajaxComments: function(articleId, callback) {
			var conditions = {
				id: articleId,
				limit_num: -1,
				articleInfo: 'true'
			};
			if (_set.moiminfo) {
				conditions.moiminfo = 'true';
			}
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
		createComments: function(data) {
			$articles.empty();
			_fn.createArticles(data, false);
			_fn.hideWriteArticleButton();
			$articles.find('ul.hashtags').remove();
			var $article = $articles.find('> article').first();
			var $comments = $article.find('div.comments');
			$(data).find('comment').each(function() {
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
				var $status = $('<ul></ul>').addClass('status').appendTo($comment);
				if (_set.isUser && $this.attr('id') !== '0') {
					if ($this.attr('parent_id') === '0' && (_set.isCommentable === 1 || _set.authToComment === 1)) {
						$('<li></li>').text('대댓글').addClass('childcomment').appendTo($status);
					}
					$('<li></li>').text('공감').addClass('commentvote').appendTo($status);
					if ($this.attr('is_mine') === '1') {
						$('<li></li>').text('삭제').addClass('del').appendTo($status);
					} else {
						$('<li></li>').text('쪽지').addClass('messagesend').attr({ 'data-modal': 'messageSend', 'data-comment-id': $this.attr('id'), 'data-is-anonym': Number($this.attr('user_id') === '0') }).appendTo($status);
						if (_set.isManageable) {
							$('<li></li>').text('삭제').addClass('managedel').appendTo($status);
							$('<li></li>').text('삭제 및 이용 제한').addClass('manageabuse').appendTo($status);
						} else {
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
			$('<a></a>').attr('id', 'goListButton').text('글 목록').addClass('list').appendTo($pagination);
		},
		manageMoim: function() {
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
			$form.on('submit', function() {
				var params = {
					id: _set.boardId,
					info: $info.val()
				};
				if (_set.isNotSelectedHotArticle > -1) {
					params.is_not_selected_hot_article = $isNotSelectedHotArticle.is(':checked') ? '1' : '0';
				}
				//				$.ajax({
				//					url: '/update/board',
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
			$form.find('a.close').on('click', function() {
				$form.hide();
			});
		},
		setSeason: function(that) {
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
		},
		setCategory: function(that) {
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
		},
		hideWriteArticleButton: function() {
			$('#writeArticleButton').hide();
		},
		showWriteArticleForm: function($article) {

			_set.attaches = [];
			_set.removeAttachIds = [];
			_set.attachDragHoverCount = 0;
			_set.attachUploadingStatus = [];

			_fn.hideWriteArticleButton();
			var $form = $('<form></form>').addClass('write').prependTo($articles);
			var $title = $('<input>').attr({
				name: 'title',
				autocomplete: 'off',
				placeholder: '글 제목'
			}).addClass('title').appendTo($('<p></p>').appendTo($form));

			var $text = $('<textarea></textarea>').attr({
				name: 'text',
				placeholder: _set.placeholder
			}).appendTo($('<p></p>').appendTo($form));
			if (_set.placeholder.length >= 50) {
				$text.addClass('smallplaceholder');
			}

			$title.focus();

			$text.focus();

			if (_set.hashtags.length > 0) {
				var $hashtags = $('<ul></ul>').addClass('hashtags').appendTo($form);
				for (var i in _set.hashtags) {
					var hashtag = _set.hashtags[i];
					$('<li></li>').text('#' + hashtag).appendTo($hashtags);
				}
				$('<div></div>').addClass('clearBothOnly').appendTo($hashtags);
			}
			var $file = $('<input>').addClass('file').attr({ type: 'file', name: 'file', multiple: true }).appendTo($form);
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
			//			if (_set.isSearchable) {
			$('<li></li>').attr('title', '해시태그').addClass('hashtag').appendTo($option);
			//			}
			$('<li></li>').attr('title', '첨부').addClass('attach').appendTo($option);
			$('<li></li>').attr('title', '완료').addClass('submit').appendTo($option);
			//			if (_set.privAnonym !== 1) {
			//				$('<li></li>').attr('title', '익명').addClass('anonym').appendTo($option);
			//			}
			if (_set.isQuestionable === 1) {
				$('<li></li>').attr('title', '질문').addClass('question').appendTo($option);
			}
			$('<div></div>').addClass('clearBothOnly').appendTo($form);
			
			// 글 수정 파트
			console.log($article)
			if ($article) {
				let url = new URL(location.href)
				let article_id = url.searchParams.get("id");
				let title = $article.find('h2.large').text()
				let content = $article.find('p.large').text()
				console.log(article_id, title, content)
				
				$article.hide();
				var $pagination = $articles.find('div.pagination');
				$pagination.find('a.list').hide();
				
				// 글 수정 버튼
				$('<a></a>').text('글 수정 취소').addClass('cancel').on('click', function() {
					$pagination.find('a.list').show();
					$article.show();
					$(this).remove();
					$articles.find('form.write').remove();
				}).appendTo($pagination);
				
				// article data를 수정 폼에 추가
				var $articleData = $article.data('article');
				$title.val(title);
				$text.val(content);
				$('<input>').attr({
					type: 'hidden',
					name: 'article_id'
				}).val($article.data('id')).appendTo($form);
				
				
//				if ($articleData.find('attach').length > 0) {
//					$thumbnails.show();
//					$articleData.find('attach').each(function() {
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
				if (Number($articleData.attr('user_id')) === 0) {
					$option.find('li.anonym').addClass('active');
				}
				if (Number($articleData.attr('is_question')) === 1) {
					$question.show();
					$option.find('li.question').addClass('active');
				}
			}
			if (!$article) {
				if (_set.categories.length > 0) {
					var $categoriesContainer = $('<p></p>').addClass('categories').prependTo($form);
					_.each(_set.categories, function(category) {
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
						$categoriesContainer.find('[name="category_id"]').filter(function(idx, elem) {
							return Number($(elem).val()) === _set.categoryId;
						}).prop({ checked: true });
					} else {
						$categoriesContainer.find('[name="category_id"]').eq(0).prop({ checked: true });
					}
				}
			}
		},
		removeArticle: function() {
			var url = new URL(location.href);
			notice_id =url.searchParams.get("id");
			console.log(notice_id)
			location.href = `/noticeDelete?id=${notice_id}`
		},
		addHashtagOnWriteArticleForm: function(hashtag) {
			var $writeForm = $articles.find('form.write');
			var $textarea = $writeForm.find('textarea[name="text"]');
			var text = (typeof hashtag !== 'undefined') ? (hashtag + ' ') : '#';
			$textarea.val($textarea.val() + text);
			$textarea.focus();
		},
		dragstartOnWriteArticleForm: function(event) {
			if (typeof window.FileReader === 'undefined' || !document.createElement('canvas').getContext) {
				return;
			}
			if (_.indexOf(event.originalEvent.dataTransfer.types, 'Files') === -1) {
				return;
			}
			_set.attachDragHoverCount++;
			$articles.find('form.write').addClass('dragover');
		},
		dragendOnWriteArticleForm: function(event) {
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
		dropOnWriteArticleForm: function(event) {
			if (typeof window.FileReader === 'undefined' || !document.createElement('canvas').getContext) {
				return;
			}
			if (_.indexOf(event.originalEvent.dataTransfer.types, 'Files') === -1) {
				return;
			}
			_fn.changeAttachOnWriteArticleForm(event.originalEvent.dataTransfer.files);
		},
		addAttachOnWriteArticleForm: function() {
			if (typeof window.FileReader === 'undefined' || !document.createElement('canvas').getContext) {
				alert('이미지 첨부를 위해 최신 브라우저를 이용해주세요.');
				return;
			}
			var $writeForm = $articles.find('form.write');
			$writeForm.find('input[name="file"]').click();
		},
		changeAttachOnWriteArticleForm: function(files) {
			if (files.length === 0) {
				return;
			}
			if ((_set.attaches.length + files.length) > 20) {
				alert('이미지는 20장까지 첨부할 수 있습니다.');
				return;
			}
			var hasNotImage = false;
			_.each(files, function(file) {
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
			_.each(files, function(file, index) {
				_set.attachUploadingStatus.push(0);
				var $thumbnail = $('<li></li>').addClass('thumbnail loading').insertBefore($thumbnailsNewButton);
				var fileName = 'everytime-web-' + new Date().getTime().toString() + '.jpg';
				var loadImageOptions = {
					canvas: true,
					maxWidth: 1280
				};
				loadImage.parseMetaData(file, function(data) {
					if (data.exif) {
						loadImageOptions.orientation = data.exif.get('Orientation');
					}
					loadImage(file, function(canvas) {
						if (!canvas.toDataURL || !canvas.toBlob) {
							_set.attachUploadingStatus[index] = -1;
							$thumbnail.remove();
							return;
						}
						canvas.toBlob(function(blob) {
							_fn.uploadAttachOnWriteArticleForm(index, blob, fileName, $thumbnail, canvas.toDataURL());
						}, 'image/jpeg', 0.8);
					}, loadImageOptions);
				});

			});
		},
		uploadAttachOnWriteArticleForm: function(index, file, filename, $thumbnail, thumbnail) {
			var $writeForm = $articles.find('form.write');
			if (_.indexOf(_set.attachUploadingStatus.slice(0, index), 0) !== -1) {
				setTimeout(function() {
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
				$writeForm.fnd('input[name="file"]').val('');
			}
			//			  $.ajax({
			//			    type:"POST",
			//			    url: "/admin/upload",
			//			    enctype: 'multipart/form-data',
			//			    processData: false,
			//			    contentType: false,
			//			    data: {
			//					board_id: _set.boardId,
			//					file_name: filename,
			//					file_size: file.size
			//				},
			//			    cache: false,
			//        		timeout: 600000,
			//			    success: function(rtn){
			//			      const message = rtn.data.values[0];
			//			      console.log("message: ", message)
			//			      $("#resultUploadPath").text(message.uploadFilePath)
			//			    },
			//			    err: function(err){
			//			      console.log("err:", err)
			//			    }
			//			  })
		},
		//			$.ajax({
		//				url: '/save/board/article/attach',
		//				xhrFields: {withCredentials: true},
		//				type: 'POST',
		//				data: {
		//					board_id: _set.boardId,
		//					file_name: filename,
		//					file_size: file.size
		//				},
		//				success: function (data) {
		//					var responseCode = $(data).find('response').text();
		//					if (responseCode === '0' || responseCode === '-21' || responseCode === '-22') {
		//						uploadFail();
		//						return;
		//					}
		//					var $attach = $(data).find('attach');
		//					var $s3Provider = $(data).find('s3Provider');
		//					var attachId = Number($attach.attr('id'));
		//					var s3Path = $attach.attr('s3_path');
		//					var s3ThumbnailPath = $attach.attr('s3_thumbnail_path');
		//					var s3Provider = JSON.parse($s3Provider.attr('s3'));
		//					var formData = new FormData();
		//					formData.append('Content-Type', file.type);
		//					formData.append('acl', s3Provider['acl']);
		//					formData.append('success_action_status', s3Provider['success_action_status']);
		//					formData.append('policy', s3Provider['policy']);
		//					formData.append('X-amz-algorithm', s3Provider['X-amz-algorithm']);
		//					formData.append('X-amz-credential', s3Provider['X-amz-credential']);
		//					formData.append('X-amz-date', s3Provider['X-amz-date']);
		//					formData.append('X-amz-expires', s3Provider['X-amz-expires']);
		//					formData.append('X-amz-signature', s3Provider['X-amz-signature']);
		//					formData.append('key', s3Path);
		//					formData.append('file', file);
		//					$.ajax({
		//						url: 'https://' + s3Provider.bucket + '.s3.' + s3Provider.region + '.amazonaws.com/',
		//						type: 'POST',
		//						data: formData,
		//						contentType: false,
		//						processData: false,
		//						success: function () {
		//							$.ajax({
		//								url: 'https://apigateway.everytime.kr/createThumbnail',
		//								data: JSON.stringify({
		//									's3': {
		//										'srcKey': s3Path,
		//										'bucket': s3Provider.bucket,
		//										'dstKey': s3ThumbnailPath
		//									}
		//								}),
		//								method: 'post',
		//								dataType: 'json',
		//								success: function (createThumbnailResponse) {
		//									if (createThumbnailResponse === 'success') {
		//										uploadSuccess(attachId);
		//									} else {
		//										uploadFail();
		//									}
		//								},
		//								error: function () {
		//									uploadFail();
		//								}
		//							});
		//						},
		//						error: function () {
		//							uploadFail();
		//						}
		//					});
		//				}
		//			});
		//		)},
		showAttachThumbnailForm: function($thumbnail) {
			var attach = _.find(_set.attaches, function(attach) {
				return attach.id === $thumbnail.data('id');
			});
			var $form = $container.find('#attachThumbnailForm');
			var $caption = $form.find('textarea[name="caption"]');
			$caption.val(attach.caption);
			$form.show();
			$form.off('submit');
			$form.on('submit', function() {
				attach.caption = $caption.val();
				$form.find('a.close').click();
				return false;
			});
			$form.find('.button[value="첨부 삭제"]').off('click');
			$form.find('.button[value="첨부 삭제"]').on('click', function() {
				if (!confirm('첨부된 이미지를 삭제하시겠습니까?')) {
					return;
				}
				_set.removeAttachIds.push(attach.id);
				_set.attaches = _.reject(_set.attaches, function(i) {
					return i.id === attach.id;
				});
				$thumbnail.remove();
				$form.find('a.close').click();
			});
			$form.find('a.close').off('click');
			$form.find('a.close').on('click', function() {
				$form.hide();
			});
		},
		writeArticle: function() {
			var url = new URL(location.href)
			var article_id = url.searchParams.get("id");
			var $form = $articles.find('form.write');
			var $text = $form.find('textarea[name="text"]');
			var $option = $form.find('ul.option');
			var $title = $form.find('input[name="title"]');
			var isAnonym = ($option.is(':has(li.anonym)') && $option.find('li.anonym').hasClass('active')) ? 1 : 0;
			var isQuestion = ($option.is(':has(li.question)') && $option.find('li.question').hasClass('active')) ? 1 : 0;
			if ($text.val().replace(/ /gi, '') === '') {
				alert('내용을 입력해 주세요.');
				$text.focus();
				return false;
			}
			var parameters = {
				id: article_id,
				content: $text.val(),
				title: $title.val()
				//				is_anonym: isAnonym,
				//				is_question: isQuestion
			};
			if (_set.attaches.length > 0) {
				parameters.attaches = JSON.stringify(_set.attaches);
			}
			//			if (_set.type === 2) {
			//				var $title = $form.find('input[name="title"]');
			//				if ($title.val().replace(/ /gi, '') === '') {
			//					alert('제목을 입력해 주세요.');
			//					$title.focus();
			//					return false;
			//				}
			//				parameters.title = $title.val();
			//			}
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
			//			$.ajax({
			//				url: 보낼 url 주소(Spring GetMapping("url"), PostMappping("url")),
			//				type: 'GET', 'POST', 'PUT', 'DELETE',
			//				data: {"key": "value"},
			//				success: fucntion(data){
			//					console.log(data) -> controller에서 오는 return값
			//				}
			//			});

			console.log("parameter: ", parameters);
			//게시글 수정
			$.ajax({
				url: '/notice/update',
				type: 'POST',
				data: JSON.stringify(parameters),
				//            	dataType: 'json',
				contentType: 'application/json; charset=UTF-8',
				success: function(data) {
					alert(data);
					location.reload();
				}
			});
		},
		voteArticle: function($article) {
			var $vote = $article.find('a.article > ul.status > li.vote');
			if ($article.data('is_mine') === '1') {
				alert('자신의 글을 공감할 수 없습니다.');
				return false;
			}
			if (!confirm('이 글에 공감하십니까?')) {
				return false;
			}
			if (!_set.isUser) {
				alert('로그인 후 가능합니다.');
				return false;
			}
			//			$.ajax({
			//				url: '/save/board/article/vote',
			//				xhrFields: {withCredentials: true},
			//				type: 'POST',
			//				data: {
			//					id: $article.data('id'),
			//					vote: '1'
			//				},
			//				success: function (data) {
			//					var response = Number($('response', data).text());
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
		},
		scrapArticle: function($article) {
			var $scrap = $article.find('ul.status > li.scrap');
			if (!confirm('이 글을 스크랩하시겠습니까?')) {
				return false;
			}
			if (!_set.isUser) {
				alert('로그인 후 가능합니다.');
				return false;
			}
			//			$.ajax({
			//				url: '/save/board/article/scrap',
			//				xhrFields: {withCredentials: true},
			//				type: 'POST',
			//				data: {
			//					article_id: $article.data('id')
			//				},
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
		},
		removeScrap: function($article) {
			if (!confirm('스크랩을 취소하시겠습니까?')) {
				return false;
			}
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
		writeComment: function($form) {
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
				text: $text.val(),
				is_anonym: isAnonym
			};
			if ($form.data('parentId')) {
				params.comment_id = $form.data('parentId');
			} else {
				params.id = $article.data('id');
			}
			//			$.ajax({
			//				url: '/save/board/comment',
			//				xhrFields: {withCredentials: true},
			//				type: 'POST',
			//				data: params,
			//				success: function (data) {
			//					var responseCode = $(data).find('response').text();
			//					if (responseCode === '0' || responseCode === '-3') {
			//						alert('댓글을 작성할 수 없습니다.');
			//					} else if (responseCode == '-1') {
			//						alert('너무 자주 댓글을 작성할 수 없습니다.');
			//					} else if (responseCode === '-2') {
			//						alert('내용을 입력해 주세요.');
			//					} else {
			//						location.reload();
			//					}
			//				}
			//			});
		},
		createChildCommentForm: function($comment) {
			var $commentForm = $articles.find('> article > div.comments > form.writecomment').filter(function() {
				return $(this).data('parentId') === $comment.data('id');
			});
			if ($commentForm.length === 0) {
				$commentForm = $articles.find('> article > div.comments > form.writecomment:not(.child)').clone().addClass('child').data('parentId', $comment.data('id'));
				$commentForm.find('input[name="text"]').attr('placeholder', '대댓글을 입력하세요.');
				var $beforeComment = $articles.find('> article > div.comments > article.child').filter(function() {
					return $(this).data('parentId') === $comment.data('id');
				}).last();
				if ($beforeComment.length === 0) {
					$beforeComment = $articles.find('> article > div.comments > article.parent').filter(function() {
						return $(this).data('id') === $comment.data('id');
					});
				}
				$commentForm.insertAfter($beforeComment);
			}
			$commentForm.find('input[name="text"]').focus();
		},
		voteComment: function($comment) {
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
		removeComment: function($comment) {
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
		abuseComment: function($comment, reason) {
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
		},
	};
	_fn.initiate();
});
