<template>
	<header class="header">
		<h1><span>Minima</span>Lista</h1>
		<input class="novo-todo" placeholder="O que precisa ser feito?" autofocus v-model="todo" @keyup.enter="adicionaTodo">
	</header>
</template>

<script>
export default {
	data(){
		return { todo: '' }
	},
	methods: {
		adicionaTodo(){
			var valor = this.todo && this.todo.trim()
			if(valor){
				this.$store.dispatch('adicionaTodo', { title: valor,
					completo: this.$route.params.slug === 'completo' })
				this.todo = ''
			}
		}
	}
}
</script>
