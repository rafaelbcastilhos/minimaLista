<template>
	<footer class="footer" v-if="todos.length">
		<span class="todo-contador"><strong>{{ restantes }}</strong>
			tarefa<span v-if="restantes > 1">s</span> pendente</span>
			<ul class="filtros">
				<li>
					<nuxt-link to = "/" exact>Todos</nuxt-link>
				</li>
				<li>
					<nuxt-link to = "/ativo">Ativo</nuxt-link>
				</li>
				<li>
					<nuxt-link to = "/completo">Completo</nuxt-link>
				</li>
			</ul>
			<button class="limpar-completo" @click="removeCompleto"
				v-if="todos.length > restantes">
				Limpar completos
			</button>
	</footer>
</template>

<script>
export default {
	computed: {
		todos(){
			return this.$store.getters.todosTodos
		},
		ativo(){
			return this.$store.getters.ativoTodos
		},
		restantes(){
			return this.$store.getters.ativoTodos.length
		}
	},
	methods: {
		removeCompleto(){
			this.$store.dispatch('defineTodos', this.ativo)
		}
	}
}
</script>
