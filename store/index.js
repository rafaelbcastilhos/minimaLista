/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = () => new Vuex.Store({
    state: {
        todos: []
    },
    getters: {
        todosTodos(state) {
            return state.todos
        },
        ativoTodos(state) {
            return state.todos.filter(todo => !todo.completo)
        },
        completoTodos(state) {
            return state.todos.filter(todo => todo.completo)
        }
    },
    mutations: {
        DEFINE_TODOS(state, todos) {
            state.todos = todos
        },
        ADICIONA_TODO(state, todo) {
            state.todos.push(todo)
        },
        REMOVE_TODO(state, todo) {
            var i = state.todos.indexOf(todo)
            state.todos.splice(i, 1)
        },
        FILTRA_TODOS(state, valor) {
            state.todos.forEach((todo) => {
                todo.completo = !valor
            })
        }
    },
    actions: {
        adicionaTodo({ commit }, todo) {
            commit('ADICIONA_TODO', todo)
        },
        defineTodos({ commit }, todos) {
            commit('DEFINE_TODOS', todos)
        },
        removeTodo({ commit }, todo) {
            commit('REMOVE_TODO', todo)
        },
        tudoRealizado({ state, commit }) {
            var valor = state.todos.filter(todo => todo.completo).length === state.todos.length
            commit('FILTRA_TODOS', valor)
        },
        saveTodos({ state }) {
            axios.put('/api/todos', { todos: state.todos })
        },
        nuxtServerInit({ commit }, { req }) {
            commit('DEFINE_TODOS', req.session ? (req.session.todos || []) : [])
        }
    }
})

export default store