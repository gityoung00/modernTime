$().ready(function () {
	var $container = $('#container');
	var $menu;
	var _set = {
		user: false,
		requiredCredit: 0,
		gradeType: '',
		roundingType: 'round',
		grades: [],
		gradeSelectTemplete: $('<select></select>'),
		reports: [],
		optionsForSemesterPlot: {
			yaxis: {
				min: 1.5,
				max: 4.5,
				tickColor: '#e3e3e3',
				tickSize: 1,
				tickFormatter: function (i) {
					return i.toFixed(1);
				},
				font: {
					color: '#a6a6a6',
					size: 12
				}
			},
			xaxis: {
				tickColor: 'transparent',
				font: {
					color: '#a6a6a6',
					size: 10
				}
			},
			legend: {
				labelBoxBorderColor: 'transparent',
				noColumns: 2,
				labelFormatter: function (label, series) {
					return '<span style="color: ' + series.color + '">' + label + '</span>';
				},
				container: $('article.semester div.series div.legend'),
				sorted: 'reverse'
			},
			series: {
				lines: {
					show: true,
					lineWidth: 1
				},
				points: {
					show: true,
					lineWidth: 2,
					radius: 4
				},
				shadowSize: 0
			},
			grid: {
				labelMargin: 15,
				borderWidth: 0,
				hoverable: true,
				clickable: true
			},
			colors: ['#a6a6a6', '#c62917']
		},
		optionsForRatio: {
			colors: ['#f28572', '#ecc55c', '#a0c661', '#82d1c2', '#7a9ee0']
		}
	};

	var _fn = {
		initiate: function () {
			$menu = $container.find('div.section > div.menu');
			_set.user = Number($('#userId').val()) ? true : false;
			_set.requiredCredit = Number($('#userRequiredCredit').val());
			_set.gradeType = $('#userGradeType').val();
			_fn.loadReports();
			//시간표 학기 선택
			$menu.on('click', 'ol > li', function () {
				var $li = $(this);
				if ($li.data('id')) {
					//선택한 li에 active를 넣고 원래 있었던 것엔 active 지움
					$li.addClass('active').siblings().removeClass('active');
					_fn.showSubjects($li.data('id'));
				}
				_fn.scrollToActiveMenu();
			});
			//시간표 불러오기 버튼 
			$container.find('table.subjects > caption > a.import').on('click', function () {
				_fn.loadPrimaryTableList();
			});
			$container.find('table.subjects > tbody').on('change', 'input, select', function () {
				_fn.updateReports();
				_fn.createSubjectsInformation();
			});
			$container.find('table.subjects > tfoot a.new').on('click', function () {
				_fn.insertSubject();
			});
			$container.find('table.subjects > tfoot a.reset').on('click', function () {
				_fn.resetSubjects();
			});
			$('#importForm').on('submit', function () {
				var $importForm = $(this);
				var id = $importForm.find('select[name="semester"]').val();
				_fn.loadTableLoad(id);
				$importForm.hide();
				return false;
			});
			$container.find('article.overview > div.gpa p.total').on('click', function () {
				_fn.changeGradeType();
			});
			$container.find('article.overview > div.acquisition p.total').on('click', function () {
				_fn.showRequiredCreditForm();
			});
			$('#requiredCreditForm').on('submit', function () {
				_fn.saveRequiredCredit();
				return false;
			});
		},
		roundDown: function (number) {
			// return Math.floor(number * 100) / 100; -> 4.35 to 4.34
			return Math.floor(Math.floor(number * 1000) / 10) / 100;
		},
		roundOff: function (number) {
			// return Math.round(number * 100) / 100; -> 4.475 to 4.47
			return Math.round(Math.floor(number * 1000) / 10) / 100;
		},
		loadReports: function () {
			_fn.ajaxReports(function (data) {
				if (data) _fn.createReports(data);
			});
		},
		ajaxReports: function (callback) {
			var parameters = {};
			if (_set.gradeType !== '') {
				parameters.grade_type = _set.gradeType;
			}
//			$.ajax({
//				url: _apiServerUrl + '/find/calculator/report/list',
//				xhrFields: {withCredentials: true},
//				type: 'POST',
//				data: parameters,
//				success: function (data) {
//					callback(data);
//				}
//			});
		},
		createReports: function (data) {
			var $school_id = $(data).find('school').attr('id');
			var $rounding_type = $(data).find('school').attr('roundingType');
			var $grades = $(data).find('grades');
			var $reports = $(data).find('reports');
			_set.roundingType = $rounding_type;
			$grades.find('grade').each(function () {
				var $grade = $(this);
				var value = $grade.attr('value');
				_set.grades.push({
					name: $grade.attr('name'),
					value: (isNaN(Number(value)) ? value : Number(value) / 10)
				});
			});
			$reports.find('report').each(function () {
				var $report = $(this);
				var subjects = [];
				$report.find('subject').each(function () {
					var $subject = $(this);
					subjects.push({
						name: $subject.attr('name'),
						credit: Number($subject.attr('credit')),
						grade: $subject.attr('grade'),
						isMajor: $subject.attr('is_major') === 'true'
					});
				});
				_set.reports.push({
					id: $report.attr('id'),
					semester: $report.attr('semester'),
					credit_calc: Number($report.attr('credit_calc')), // 수강 학점 (평균 계산용, P/NP 제외)
					credit: Number($report.attr('credit')), // 취득 학점 (F, NP 제외)
					sum: Number($report.attr('sum')) / 10, // 취득 성적 합계
					credit_major_calc: Number($report.attr('credit_major_calc')),
					credit_major: Number($report.attr('credit_major')),
					sum_major: Number($report.attr('sum_major')) / 10,
					subjects: subjects,
					school_id: Number($school_id)
				});
			});
			_fn.setGradeSelectTemplete();
			_fn.createSemesterList();
			setTimeout(function () {
				_fn.createOverview();
				_fn.createSemester();
			}, 100);
		},
		updateReports: function () {
			var $subjects = $container.find('table.subjects');
			var $tbody = $subjects.find('tbody');
			var report = _.findWhere(_set.reports, { id: $tbody.data('id') });
			report.subjects = [];
			$tbody.find('tr').each(function () {
				var $tr = $(this);
				report.subjects.push({
					grade: $tr.find('select[name="grade"]').val(),
					credit: Number($tr.find('input[name="credit"]').val()),
					name: $tr.find('input[name="name"]').val(),
					isMajor: $tr.find('input[name="major"]').prop('checked')
				});
			});
			var majorSubjects = _.where(report.subjects, {isMajor: true});
			var filterPassSubjects = function (subjects) {
				return _.reject(subjects, function (subject) {
					return _.contains(['F', 'NP'], subject.grade);
				});
			};
			var filterCalcSubjects = function (subjects) {
				return _.reject(subjects, function (subject) {
					return _.contains(['P', 'NP'], subject.grade);
				});
			};
			var sumCredits = function (subjects) {
				return _.reduce(subjects, function (mem, subject) {
					return mem + subject.credit;
				}, 0);
			};
			var sumGrades = function (subjects) {
				return _.reduce(subjects, function (mem, subject) {
					return mem + subject.credit * _.findWhere(_set.grades, { name: subject.grade }).value;
				}, 0);
			};
			report.credit = sumCredits(filterPassSubjects(report.subjects));
			report.credit_calc = sumCredits(filterCalcSubjects(report.subjects));
			report.sum = sumGrades(filterCalcSubjects(report.subjects));
			report.credit_major = sumCredits(filterPassSubjects(majorSubjects));
			report.credit_major_calc = sumCredits(filterCalcSubjects(majorSubjects));
			report.sum_major = sumGrades(filterCalcSubjects(majorSubjects));
			_fn.saveReports();
			_fn.createOverview();
			_fn.createSemester();
		},
		saveReports: function () {
			if (!_set.user) {
				return false;
			}
			var $subjects = $container.find('table.subjects');
			var $tbody = $subjects.find('tbody');
			var report = _.findWhere(_set.reports, { id: $tbody.data('id') });
			//카톡 사진 참고
			var data = {
				id: report.id,
				sum: report.sum * 10,
				credit: report.credit,
				credit_calc: report.credit_calc,
				sum_major: report.sum_major * 10,
				credit_major: report.credit_major,
				credit_major_calc: report.credit_major_calc,
				names: _.pluck(report.subjects, 'name'),
				grades: _.pluck(report.subjects, 'grade'),
				credits: _.pluck(report.subjects, 'credit'),
				is_majors: _.pluck(report.subjects, 'isMajor'),
			};
			$.ajax({
				url: _apiServerUrl + '/save/calculator/report/list',
				xhrFields: {withCredentials: true},
				type: 'POST',
				data: data
			});
		},
		setGradeSelectTemplete: function () {
			_.each(_set.grades, function (grade) {
				$('<option></option>').val(grade.name).text(grade.name).appendTo(_set.gradeSelectTemplete);
			});
		},
		createSemesterList: function () {
			var $ol = $('<ol></ol>');
			_.each(_set.reports, function (report) {
				$li = $('<li></li>').data('id', report.id).appendTo($ol);
				$('<a></a>').text(report.semester).appendTo($li);
			});
			$ol.appendTo($menu);
			var lastReport = _.chain(_set.reports).sortBy(function (report) {
				return -report.id;
			}).find(function (report) {
				return report.credit_calc > 0;
			}).value();
			if (typeof lastReport !== 'undefined') {
				$ol.find('li').filter(function () {
					return $(this).data('id') === lastReport.id;
				}).click();
			} else {
				$ol.find('li').filter(function () {
					return $(this).data('id');
				}).first().click();
			}
		},
		createOverview: function () {
			var $gpa = $container.find('article.overview div.gpa');
			var $major = $container.find('article.overview div.major');
			var $acquisition = $container.find('article.overview div.acquisition');
			var $ratioplot = $container.find('article.semester ul.ratioplot');
			var data = _fn.calculateOverview();
			$gpa.find('p.value').text(data.gpa);
			$gpa.find('p.total').text('/ ' + data.perfectGrade);
			if (_set.gradeType !== '') {
				$('<span></span>').text('변경').addClass('button').appendTo($gpa.find('p.total'));
			}
			$major.find('p.value').text(data.gpaMajor);
			$major.find('p.total').text('/ ' + data.perfectGrade);
			$acquisition.find('p.value').text(data.acquiredCredit);
			$acquisition.find('p.total').text('/ ' + data.requiredCredit);
			$ratioplot.empty();
			if (data.ratio.length) {
				var firstRatio = _.first(data.ratio).ratio;
				var adjustmentRatio = 1 / ((Math.round(firstRatio * 10) / 10) + .2);
				_.each(data.ratio.slice(0, 5), function (row, index) {
					var grade = row.grade;
					var ratio = row.ratio;
					var color = _set.optionsForRatio.colors[index];
					var width = 'calc(' + (row.ratio * adjustmentRatio * 100) + '%)';
					$ratioplot.append(
						$('<li>').append(
							$('<span>').text(grade).addClass('grade'),
							$('<div>').addClass('ratiowrapper').append(
								$('<div>').addClass('ratiobar').css({ width: width, height: '4px', backgroundColor: color }),
								$('<span>').text(Math.round(ratio * 100) + '%').addClass('ratiotext').css({ left: width, color: color })
							)
						)
					);
				});
			}
		},
		calculateOverview: function () {
			var acquiredCredit = _.reduce(_set.reports, function (memory, report) { // 취득 학점
				return memory + report.credit;
			}, 0);
			var takenCredit = _.reduce(_set.reports, function (memory, report) { // 수강 학점
				return memory + report.credit_calc;
			}, 0);
			var takenCreditMajor = _.reduce(_set.reports, function (memory, report) { // 전공 수강 학점
				return memory + report.credit_major_calc;
			}, 0);
			var perfectGrade = (_.findWhere(_set.grades, { name: 'A+' }) || _.findWhere(_set.grades, { name: 'A0' })).value; // 학점 기준 (4.3 or 4.5 or 4.0)
			var gpa = 0;
			if (takenCredit > 0) {
				var totalPoint = _.reduce(_set.reports, function (memory, report) {
					return memory + report.sum;
				}, 0);
				gpa = totalPoint / takenCredit;
				if (_set.roundingType === 'floor') {
					gpa = _fn.roundDown(gpa);
				} else if (_set.roundingType === 'round') {
					gpa = _fn.roundOff(gpa);
				}
			}
			var gpaMajor = 0;
			if (takenCreditMajor > 0) {
				var totalMajorPoint = _.reduce(_set.reports, function (memory, report) {
					return memory + report.sum_major;
				}, 0);
				gpaMajor = totalMajorPoint / takenCreditMajor;
				if (_set.roundingType === 'floor') {
					gpaMajor = _fn.roundDown(gpaMajor);
				} else if (_set.roundingType === 'round') {
					gpaMajor = _fn.roundOff(gpaMajor);
				}
			}

			var grades = _.chain(_set.reports)
				.map(function (report) {
					return _.pluck(
						_.filter(report.subjects, function (subject) {
							return subject.credit > 0;
						}),
						'grade'
					);
				})
				.flatten()
				.value();
			var sum = grades.length;
			var ratio = _.chain(grades)
				.countBy()
				.reduce(function (result, count, grade) {
					result.push({
						grade: grade,
						count: count,
						ratio: count / sum
					});
					return result;
				}, [])
				.sort(function (a, b) {
					return b.ratio - a.ratio;
				})
				.value();

			return {
				requiredCredit: _set.requiredCredit,
				acquiredCredit: acquiredCredit,
				perfectGrade: perfectGrade,
				gpa: gpa,
				gpaMajor: gpaMajor,
				ratio: ratio
			};
		},
		createSemester: function () {
			var $chart = $container.find('div.chart');
			var $semester = $chart.find('article.semester');
			var $series = $semester.find('div.series');
			var data = _fn.calculateSemester();
			if (data.length) {
				$chart.removeClass('empty');
				var dataForPlot = [
					{ label: '전공', data: _.pluck(data, 'reportsMajor') },
					{ label: '전체', data: _.pluck(data, 'reports') }
				];
				_set.optionsForSemesterPlot.xaxis.ticks = data.length - 1;
				_set.optionsForSemesterPlot.xaxis.tickFormatter = function (i) {
					return data[i].semester.replace(' ', '<br>');
				};
				$series.find('div.plot').plot(dataForPlot, _set.optionsForSemesterPlot).off('plothover').on('plothover', function (event, pos, item) {
					$('div.plottooltip').remove();
					if (!item) return false;
					var $tooltip = $('<div></div>').text(item.datapoint[1]).addClass('plottooltip').appendTo('body');
					$tooltip.css({
						left: item.pageX - $tooltip.outerWidth() / 2,
						top: item.pageY + 22,
						color: item.series.color
					});
				}).resize();
			} else {
				$chart.addClass('empty');
			}
		},
		calculateSemester: function () {
			var reports = _.reject(_set.reports, function (report) {
				return report.credit_calc === 0 || report.semester.match(/(여름학기|겨울학기|기타 학기)/) ;
			});
			return _.map(reports, function (report, index) {
				var gpa = report.sum / report.credit_calc;
				var gpaMajor = undefined;
				if (report.credit_major_calc > 0) {
					gpaMajor = report.sum_major / report.credit_major_calc;
				}
				if (_set.roundingType === 'floor') {
					gpa = _fn.roundDown(gpa);
					gpaMajor = _fn.roundDown(gpaMajor);
				} else if (_set.roundingType === 'round') {
					gpa = _fn.roundOff(gpa);
					gpaMajor = _fn.roundOff(gpaMajor);
				}
				return {
					id: report.id,
					semester: report.semester,
					reports: [index, gpa],
					reportsMajor: [index, gpaMajor]
				};
			});
		},
		showSubjects: function (id) {
			var $subjects = $container.find('table.subjects');
			var $caption = $subjects.find('caption');
			var $tbody = $subjects.find('tbody');
			var report = _.findWhere(_set.reports, { id: id });
			$caption.find('h3').text(report.semester);
			$tbody.empty().data('id', report.id);
			_.each(report.subjects, function (subject) {
				_fn.insertSubject(subject);
			});
			_fn.createSubjectsInformation();
		},
		insertSubject: function (subject) {
			var $tbody = $container.find('table.subjects > tbody');
			var $tbodyTr = $('<tr></tr>').appendTo($tbody);
			var $nameTd = $('<td></td>').appendTo($tbodyTr);
			var $creditTd = $('<td></td>').appendTo($tbodyTr);
			var $gradeTd = $('<td></td>').appendTo($tbodyTr);
			var $majorTd = $('<td></td>').appendTo($tbodyTr);
			if (!subject) {
				subject = {
					name: '',
					credit: 0,
					grade: 'A+',
					isMajor: false
				};
			}
			var $gradeSelect = _set.gradeSelectTemplete.clone();
			$gradeSelect.find('option').filter(function () {
				return $(this).text() === subject.grade;
			}).attr('selected', 'selected');
			$gradeSelect.attr('name', 'grade').appendTo($gradeTd);
			$('<input>').attr('name', 'credit').val(subject.credit).attr({
				type: 'number',
				maxlength: '4'
			}).appendTo($creditTd);
			$('<input>').attr('name', 'name').val(subject.name).attr({
				maxlength: '50'
			}).appendTo($nameTd);
			$('<label>').appendTo($majorTd).append(
				$('<input>').attr({ name: 'major', type: 'checkbox' }).prop({
					checked: subject.isMajor
				}),
				$('<span>')
			);
		},
		//리셋
		resetSubjects: function () {
			var $subjects = $container.find('table.subjects');
			var $tbody = $subjects.find('tbody');
			if (!confirm($subjects.find('caption > h3').text() + ' 정보를 초기화하시겠습니까?')) {
				return false;
			}
			$tbody.find('tr:eq(9)').nextAll().remove();
			$tbody.find('select[name="grade"]').val('A+');
			$tbody.find('input[name="credit"]').val('0');
			$tbody.find('input[name="name"]').val('');
			$tbody.find('input[name="major"]').prop({ checked: false });
			$tbody.find('input').first().change();
		},
		createSubjectsInformation: function () {
			var $subjects = $container.find('table.subjects');
			var $caption = $subjects.find('caption');
			var $tbody = $subjects.find('tbody');
			var report = _.findWhere(_set.reports, { id: $tbody.data('id') });
			var gpa = 0;
			if (report.credit_calc > 0) {
				gpa = report.sum / report.credit_calc;
				if (_set.roundingType === 'floor') {
					gpa = _fn.roundDown(gpa);
				} else if (_set.roundingType === 'round') {
					gpa = _fn.roundOff(gpa);
				}
			}
			var gpaMajor = 0;
			if (report.credit_major_calc > 0) {
				gpaMajor = report.sum_major / report.credit_major_calc;
				if (_set.roundingType === 'floor') {
					gpaMajor = _fn.roundDown(gpaMajor);
				} else if (_set.roundingType === 'round') {
					gpaMajor = _fn.roundOff(gpaMajor);
				}
			}
			var acquisition = report.credit;
			$caption.find('dl.information > dd.gpa').text(gpa);
			$caption.find('dl.information > dd.major').text(gpaMajor);
			$caption.find('dl.information > dd.acquisition').text(acquisition);
			if (_set.user) {
				$caption.find('a.import').show();
			}
		},
		loadPrimaryTableList: function () {
			var $importForm = $('#importForm');
			var $select = $importForm.find('select[name="semester"]');
			if ($select.is(':empty')) {
				_fn.ajaxPrimaryTableList(function (data) {
					if (!$(data).find('table').length) {
						alert('가져올 수 있는 시간표가 없습니다.\n먼저 시간표를 만들어보세요!');
						return false;
					}
					$(data).find('table').each(function () {
						var $table = $(this);
						$('<option></option>').val($table.attr('id')).text($table.attr('year') + '년 ' + $table.attr('semester') + '학기 (' + $table.attr('name') + ')').appendTo($select);
					});
					_fn.showImportForm();
				});
			} else {
				_fn.showImportForm();
			}
		},
		ajaxPrimaryTableList: function (callback) {
			if (!_set.user) {
				callback();
				return false;
			}
			$.ajax({
				url: _apiServerUrl + '/find/timetable/table/list/primary',
				xhrFields: {withCredentials: true},
				type: 'POST',
				success: function (data) {
					callback(data);
				}
			});
		},
		showImportForm: function () {
			var $importForm = $('#importForm');
			var $select = $importForm.find('select[name="semester"]');
			$importForm.show();
			$importForm.find('a.close').one('click', function () {
				$importForm.hide();
			});
		},
		loadTableLoad: function (id) {
			_fn.ajaxTableLoad(id, function (data) {
				if (data) _fn.applyTableLoad(data);
			});
		},
		ajaxTableLoad: function (id, callback) {
			if (!_set.user) {
				callback();
				return false;
			}
			$.ajax({
				url: _apiServerUrl + '/find/timetable/table',
				xhrFields: {withCredentials: true},
				data: {
					id: id
				},
				type: 'POST',
				success: function (data) {
					var responseCode;
					if (!$(data).find('response').children().length) {
						responseCode = $(data).find('response').text();
					}
					if (responseCode === '-1' || responseCode === '-2') {
						callback();
					} else {
						callback(data);
					}
				}
			});
		},
		applyTableLoad: function (data) {
			var $subjects = $container.find('table.subjects');
			var $tbody = $subjects.find('tbody');
			$tbody.find('select[name="grade"]').val('A+');
			$tbody.find('input[name="credit"]').val('');
			$tbody.find('input[name="name"]').val('');
			$tbody.find('input[name="major"]').prop({ checked: false });
			$(data).find('subject').each(function (index) {
				var $subject = $(this);
				var $tbodyTr = $tbody.find('tr').eq(index);
				var credit = $subject.find('credit').attr('value');
				if (!credit) credit = 0;
				var name = $subject.find('name').attr('value');
				$tbodyTr.find('input[name="credit"]').val(credit);
				$tbodyTr.find('input[name="name"]').val(name);
			});
			$tbody.find('input').first().change();
		},
		changeGradeType: function () {
			if (_set.gradeType === '') {
				return false;
			}
			if (!confirm('만점 기준을 변경 시 입력하신 정보가 초기화됩니다.')) {
				return false;
			}
			if (_set.gradeType === '0') {
				location.href = '?grade_type=1';
			} else {
				location.href = '?grade_type=0';
			}
		},
		showRequiredCreditForm: function () {
			var $requiredCreditForm = $('#requiredCreditForm');
			$requiredCreditForm.find('input[name="required_credit"]').val(_set.requiredCredit);
			$requiredCreditForm.show();
			$requiredCreditForm.find('a.close').one('click', function () {
				$requiredCreditForm.hide();
			});
		},
		saveRequiredCredit: function () {
			var $requiredCreditForm = $('#requiredCreditForm');
			var $requiredCredit = $requiredCreditForm.find('input[name="required_credit"]');
			if (!$requiredCredit.val().replace(/ /gi, '') || isNaN(Number($requiredCredit.val())) || !Number($requiredCredit.val())) {
				alert('정확한 졸업 학점을 입력하세요!');
				$requiredCredit.focus();
				return false;
			}
			_set.requiredCredit = Number($requiredCredit.val());
			_fn.createOverview();
			$requiredCreditForm.hide();
			if (!_set.user) {
				return false;
			}
			$.ajax({
				url: _apiServerUrl + '/update/user/requiredCredit',
				xhrFields: {withCredentials: true},
				type: 'POST',
				data: {
					required_credit: $requiredCredit.val()
				}
			});
		},
		//학기 누르면 옆으로 스크롤
		scrollToActiveMenu: function () {
			if (!$menu.is(':has(li.active)')) {
				return false;
			}
			$menu.scrollLeft(0);
			var left = Math.floor($menu.find('li.active').position().left) - 50;
			$menu.scrollLeft(left);
		}
	};
	_fn.initiate();
});
