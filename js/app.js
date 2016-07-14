(function (window) {
	'use strict';
	Vue.filter('equalCompare', function (value,filter) {
		var result = [];
		console.log(filter);

		if(filter.completed==undefined){
			for (var i = 0; i < value.length; i++) {
				result.push(value[i]);
			}
		}else if(filter.completed){
			for (var i = 0; i < value.length; i++) {
				if (value[i].completed) {
					result.push(value[i]);
				}
			}
		}else {
			for (var i = 0; i < value.length; i++) {
				if (!value[i].completed) {
					result.push(value[i]);
				}
			}
		}

		return result;
	});

	var app = new Vue({
		el: "#app",
		data: {
			newTodo: '',
			todos: [
				{
					id: 1,
					text: '学习',
					completed: true
				},
				{
					id: 2,
					text: '睡觉',
					completed: false
				},
				{
					id: 3,
					text: '敲代码',
					completed: true
				}
			],
			selector:{completed:undefined}
		},
		methods: {
			addTodo: function () {
				var text = this.newTodo.trim();
				if (text) {
					this.todos.push({text: text, id: getId(), completed: false});
					this.newTodo = "";
				}
			},
			removeTodo: function (index) {
				this.todos.splice(index, 1);
			},
			clear: function () {
				var result = [];
				for (var i = 0; i < this.todos.length; i++) {
					if (!this.todos[i].completed) {
						result.push(this.todos[i]);
					}
				}
				this.todos = result;
			},
			toggleAll: function () {
				var now = true;
				for (var i = 0; i < this.todos.length; i++) {
					this.todos[i].completed = now;
				}
				now = !now;
			},
			filters:function (opt) {
				if(opt==undefined){
					this.selector={completed:undefined};
				}else if(opt){
					this.selector={completed:true};
				}else{
					this.selector={completed:false};
				}
			}
		}
	});

	function getId() {
		var id = Math.random();
		for (var i = 0; i < app.todos.length; i++) {
			if (app.todos[i].id === id) {
				id = getId();
				break;
			}
		}
		return id;
	}
})(window);
