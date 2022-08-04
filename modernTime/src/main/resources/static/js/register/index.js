$().ready(function () {
  var $container = $('#container');
  var $enterYear = $container.find('select[name="enter_year"]');
  var _set = {
    campuses: []
  };
  var _fn = {
    init: function () {
      $container.on('submit', function (event) {
        _fn.onSubmit(event);
      });
    },
    onSubmit: function (event) {
      if (!$enterYear.val()) {
        alert('입학년도를 선택해주세요.');
        event.preventDefault();
        return;
      }
    }
  };
  _fn.init();
});
