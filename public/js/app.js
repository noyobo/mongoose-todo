$(document).ready(function() {
  // 添加 todo
  var todoList = $('#todo-list');

  function addTaskToList(data) {
    var html = '<li><div class="view"><input class="toggle" type="checkbox"><label>' + data.todo + '</label><button data-id="' + data.id + '" class="destroy"></button></div></li>';
    todoList.prepend(html)
  };

  $('#new-todo').on('keydown', function(event) {
    var keycode = event.which || event.keyCode;
    //
    if (keycode === 13) {
      $.post('/api/add', {
        todo: event.target.value
      }, function(res) {
        if (res.status === 1) {
          event.target.value = '';
          addTaskToList(res.data)
        }
      }, 'json');
    }
  })
});
