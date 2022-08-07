$().ready(function() {
	var $container = $('#container');
	var $agreementAll = $container.find('input[name="agreement_all"]');
	var $agreementService = $container.find('input[name="agreement_service"]');
	var $agreementPrivacy = $container.find('input[name="agreement_privacy"]');
	var $agreementRules = $container.find('input[name="agreement_rules"]');
	var $agreementIdentity = $container.find('input[name="agreement_identity"]');
	var $agreementAge14 = $container.find('input[name="agreement_age14"]');
	var $identityButton = $container.find('form > a');
	var _set = {
		campuses: []
	};
	var _fn = {
		init: function() {
			$agreementAll.on('change', function() {
				_fn.toggleAll($(this));
			});
			$agreementService.on('change', function() {
				_fn.toggleAgreement($(this));
			});
			$agreementPrivacy.on('change', function() {
				_fn.toggleAgreement($(this));
			});
			$agreementRules.on('change', function() {
				_fn.toggleAgreement($(this));
			});
			$agreementIdentity.on('change', function() {
				_fn.toggleAgreementOne($(this));
			});
			$agreementAge14.on('change', function() {
				_fn.toggleAgreementOne($(this));
				
			});
			$identityButton.on('click', function() {
				var result = _fn.onClickIdentityButton($(this));
				console.log(result);
				if (result){
					console.log($('form'))
					$('form').submit();
				}
			});
		},
		toggleAll: function($this) {
			if ($this.is(':checked')) {
				$agreementService.filter(':not(:checked)').click();
				$agreementPrivacy.filter(':not(:checked)').click();
				$agreementRules.filter(':not(:checked)').click();
			}
		},
		toggleAgreement: function($this) {
			var $text = $this.parent().next('div.text');
			if ($this.is(':checked')) {
				$text.hide();
			} else {
				$text.show();
				$agreementAll.filter(':checked').click();
			}
		},
		toggleAgreementOne: function($this) {
			var $text = $this.parent().next('div.text');
			if ($this.is(':checked')) {
				$text.hide();
			} else {
				$text.show();
			}
		},
		onClickIdentityButton: function($this) {
			if ($agreementService.is(':not(:checked)')) {
				alert('서비스이용약관에 동의해주세요.');
				return false;
			}
			if ($agreementPrivacy.is(':not(:checked)')) {
				alert('개인정보 수집 및 이용에 동의해주세요.');
				return false;
			}
			if ($agreementRules.is(':not(:checked)')) {
				alert('커뮤니티이용규칙을 확인해주세요.');
				return false;
			}
			if ($agreementIdentity.is(':not(:checked)')) {
				alert('본인 명의를 이용한 가입에 대한 안내사항을 확인해주세요.');
				return false;
			}
			if ($agreementAge14.is(':not(:checked)')) {
				alert('만 14에 이상 가입에 대한 안내사항을 확인해주세요.');
				return false;
			}
			return true;
			
		}
	};
	_fn.init();
	
});
