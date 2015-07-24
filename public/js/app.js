/* global $ */
$(document).ready(function() {
  'use strict';
  var todoList = $('#todo-list');
  var counts = $('#todo-counts');
  var completedCounts = $('#completed-count');
  var taggleAll = $('#toggle-all');
  // 添加模板
  function addTaskToList(data) {
    var html = '<li data-id="' + data.id + '" id="J_todo_' + data.id + '"><div class="view"><input class="toggle" type="checkbox"><label>' + data.todo + '</label><button data-id="' + data.id + '" class="destroy"></button></div></li>';
    todoList.prepend(html);
    var len = parseInt(counts.html());
    counts.html(len + 1);
    taggleAll.prop('checked', false);
  }
  // 添加 todo
  $('#new-todo').on('keydown', function(event) {
    var keycode = event.which || event.keyCode;
    //
    if (keycode === 13) {
      $.post('/api/add', {
        todo: event.target.value
      }, function(res) {
        if (res.status === 1) {
          event.target.value = '';
          addTaskToList(res.data);
        }
      }, 'json');
    }
  });
  // 删除任务
  function removeTask(ids) {
    for (var i = 0; i < ids.length; i++) {
      var id = ids[i];
      var li = '#J_todo_' + id;
      $(li).remove();
    }
    var len = parseInt(counts.html());
    counts.html(len - ids.length);
  }
  $('#todo-list').delegate('.destroy', 'click ', function(event) {
    var $target = $(event.currentTarget || event.target);
    var id = $target.parents('li').data('id');
    if (!id) {
      return false;
    }
    $.ajax({
      url: '/api/del',
      type: 'DELETE',
      data: {
        id: id
      },
      dataType: 'json',
      success: function(res) {
        if (res.status === 1) {
          removeTask(res.data);
        }
      }
    });
  });
  // 检查是否都完成了
  function checkCompleteAll(len) {
    console.log(len);
    var lis = $('#todo-list li');
    if (lis.length == len) {
      taggleAll.prop('checked', true);
    } else {
      taggleAll.prop('checked', false);
    }
  }
  // 改变任务状态
  function updateTask(id, checked) {
    var li = '#J_todo_' + id;
    var count = parseInt(completedCounts.html());
    var len = parseInt(counts.html());
    if (checked) {
      $(li).addClass('completed');
      completedCounts.html(count += 1);
      counts.html(len - 1);
    } else {
      $(li).removeClass('completed');
      completedCounts.html(count -= 1);
      counts.html(len + 1);
    }
    checkCompleteAll(count)
  }
  $('#todo-list').delegate('.toggle', 'change', function(event) {
    var $target = $(event.currentTarget || event.target);
    var id = $target.parents('li').data('id');
    var checked = $target.prop('checked');
    var data = {
      id: id,
      completed: checked
    };

    $.ajax({
      url: '/api/put',
      type: 'PUT',
      data: data,
      dataType: 'json',
      success: function(res) {
        if (res.status === 1) {
          updateTask(id, checked);
        } else {
          updateTask(id, checked);
        }
      }
    });
  });
  // 完成所有任务
  function updateAll(checked) {
    var lis = $('#todo-list li');
    var litoggle = $('#todo-list li .toggle');
    if (checked) {
      taggleAll.prop('checked', true);
      litoggle.prop('checked', true);
      lis.addClass('completed');
      completedCounts.html(lis.length);
      counts.html(lis.length);
    } else {
      taggleAll.prop('checked', false);
      litoggle.prop('checked', false);
      lis.removeClass('completed');
      completedCounts.html(0);
      counts.html(0);
    }
  }
  $('#main').delegate('#toggle-all', 'change', function(event) {
    var $target = $(event.currentTarget || event.target);
    var checked = $target.prop('checked');
    pulAllTask(checked)
  });
  $('#footer').delegate('#clear-completed', 'click', function() {
    pulAllTask(false)
  });

  function pulAllTask(complete) {
    var $lis = $('#todo-list li');
    var ids = [];
    for (var i = 0; i < $lis.length; i++) {
      var $li = $($lis[i]);
      var id = $li.data('id')
      ids.push(id);
    };
    if (ids.length === 0) {
      return false;
    }
    $.ajax({
      url: '/api/complete-all',
      type: 'PUT',
      data: {
        ids: ids,
        completed: complete
      },
      dataType: 'json',
      success: function(res) {
        updateAll(complete);
      }
    });
  }
});
