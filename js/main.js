(function() {
  'use strict';

  // two way data binding( to UI)

  var vm = new Vue({
    el: '#app',
    data: {
      newItem: '',
      todos: []
      
    },

    watch: {
      // 
      todos: {
        handler: function() {
          localStorage.setItem('todos', JSON.stringify(this.todos));
          alert('保存しまーす！');
        },
        deep: true
      }

    },
    mounted: function() {
      this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    },
    methods: {
      addItem: function() {
        var item = {
          title: this.newItem,
          isDone: false

        };
        this.todos.push(item);
        this.newItem = '';
      },
      deleteItem: function(index) {
        if (confirm('本当に消すん?')) {
        this.todos.splice(index, 1);
        }
      },
      purge: function() {
        if (!confirm('マジで消すよ?')) {
        return;
        }
        this.todos = this.todos.filter(function(todo) {
          return !todo.isDone;

        });
      }
    },
    computed: {
      remaining: function() {
        var items = this.todos.filter(function(todo) {
          return !todo.isDone;

        });
        return items.length;
      }
    }
  });
})();
