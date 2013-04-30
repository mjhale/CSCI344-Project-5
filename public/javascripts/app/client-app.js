/*jslint indent:2, plusplus: true*/
/*global jQuery*/
(function($) {
  'use strict';

  var todos = [], buildList, loadJSON, setUpClickHandler, setUpAddHandler, setUpDeleteHandler, main;

  loadJSON = function (filePath) {
    $.getJSON(filePath, function (data) {
      $.each(data, function (key, todo) {
        todos[key] = todo;
      });
      // Initially build all list
      buildList("all");
    });
  };

  buildList = function (category) {
    var i, j, k, categories = {};

    if (category === "all") {
      $('div#all').empty();
      for (i = 0; i < todos.length; i++) {
        $('div#all').append('<div class="set set-' + i + '" />');
        $('div#all .set-' + i).wrapInner('<div class="item">' + todos[i].description + '</div>');
        for (j = 0; j < todos[i].categories.length; j++) {
          $('div#all .set-' + i).append('<span class="round label">' + todos[i].categories[j]  + '</span>');
        }
        $('div#all .set-' + i).append('<span class="round alert label delete-btn" id="' + i + '">&times;</span>');
      }
    } else if (category === "categorized") {
      $('div#categorized').empty();
      for (i = 0; i < todos.length; i++) {
        for (j = 0; j < todos[i].categories.length; j++) {
          // Check to see if the category's object is created
          if (!categories[todos[i].categories[j]] && typeof categories[todos[i].categories[j]] !== 'object') {
            categories[todos[i].categories[j]] = [];
          }
          // Add the ID of the description to the category object
          categories[todos[i].categories[j]].push(i);
        }
      }

      // Loop through the categories object
      for (k in categories) {
        // Skip meta data
        if (categories.hasOwnProperty(k)) {
          $('div#categorized').append('<div class="set set-' + k + '" />');
          $('div#categorized .set-' + k).wrapInner('<div class="round label">' + k + '</div>');
          for (i = 0; i < categories[k].length; i++) {
            $('div#categorized .set-' + k).append('<div class="set-' + categories[k][i] + '"><div class="description"><span class="delete-btn" id="' + categories[k][i] + '">&times;</span>' + todos[categories[k][i]].description + '</div></div>');
          }
        }
      }
    }
  };

  setUpClickHandler = function(element) {
    element.click(function () {
      var target = $(this).attr('id');

      $('.active').removeClass('active');
      $('.tabs #' + target).addClass('active');

      buildList(target);
    });
  };

  setUpAddHandler = function (element) {
    element.click(function () {
      if ($('textarea').val() && $('input[type=text]').val()) {
        todos.push({
          description: $('textarea').val(),
          categories: $('input[type=text]').val().split(/[\s,]+/)
        });
        $('textarea').val('');
        $('input[type=text]').val('');
      }
    });
  };

  setUpDeleteHandler = function(element) {
    // Attach to future element
    $('.tab').on('click', element, function () {
      var target = $(this).attr('id'),
        currentTab = $('.tab-navigation .active').attr('id');

      // It's likely safe to assume only one element is being removed at once
      todos.splice(target, 1);
      $('.set-' + target).fadeOut(300, function () {
        //Rebuild the list to account for new IDs
        buildList(currentTab);
      });
    });
  };

  main = function () {
    loadJSON('all.json');
    setUpClickHandler($('li.tab'));
    setUpAddHandler($('.submit-entry'));
    setUpDeleteHandler('span.delete-btn');
  };

  $(function () { main(); });
}(jQuery));