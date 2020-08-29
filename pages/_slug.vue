<template>
	<section class="todoapp">
		<todo-header/>
		<section class="main" v-if="todos.length">
			<input class="alterna-todos" type="checkbox" @click="tudoRealizado">
			<label for="alterna-todos">Marque todos como completo.</label>
			<ul class="todo-lista">
				<li v-for="todo in todos" :class=
					"{'completo': todo.completo, 'editando': todo === editadoTodo}">
					<div class="view">
						<input class="alterna" type="checkbox" v-model="todo.completo">
						<label @dblclick="editarTodo(todo)">{{ todo.title }}</label>
						<button class="destroi" @click="removeTodo(todo)"></button>
					</div>
					<input class="editar" type="text" v-model="todo.title"
						v-todo-focus="todo == editadoTodo" @blur="realizadoEdicao(todo)"
							@keyup.enter="realizadoEdicao(todo)" @keyup.esc="cancelaEdicao(todo)">
				</li>
			</ul>
		</section>
		<todo-footer/>
	</section>
</template>

<script>
import TodoHeader from '~/components/header'
import TodoFooter from '~/components/footer'

export default {
	validate ({ params }) {
		return !params.slug || params.slug === 'ativo' || params.slug === 'completo'
	},
	head () {
		return {
			title: this.$route.params.slug || 'todos',
		}
	},
	data () {
		return {
			editadoTodo: null
		}
	},
	watch: {
		todos: {
			deep: true,
			handler: 'save'
		}
	},
	computed: {
		todos () {
			if (this.$route.params.slug === 'ativo') {
				return this.$store.getters.ativoTodos
			}
			if (this.$route.params.slug === 'completo') {
				return this.$store.getters.completoTodos
			}
			return this.$store.getters.todosTodos
		}
	},
	methods: {
		tudoRealizado () {
			this.$store.dispatch('tudoRealizado')
		},
		editarTodo (todo) {
			this.beforeEditCache = todo.title
			this.editadoTodo = todo
		},
		realizadoEdicao (todo) {
			this.editadoTodo = null
			todo.title = todo.title.trim()
			if (!todo.title) {
				this.$store.dispatch('removeTodo', todo)
			}
		},
		cancelaEdicao (todo) {
			this.editadoTodo = null
			todo.title = this.beforeEditCache
		},
		removeTodo (todo) {
			this.$store.dispatch('removeTodo', todo)
		},
		save () {
			this.$store.dispatch('saveTodos')
		}
	},
	directives: {
		'todo-focus' (el, binding) {
			if (binding.value) {
				el.focus()
			}
		}
	},
	components: {
		TodoHeader,
		TodoFooter
	}
}
</script>
