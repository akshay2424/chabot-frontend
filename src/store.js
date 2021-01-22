import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            loggedIn: true,
            isSubscribed: false
        }
    },

    getters: {
        auth(state) {
            return state.user
        }
    },
    mutations: {
        SET_MESSAGE: (state, newValue) => {
            state.user.loggedIn = newValue
        }
    },
    actions: {
        setMessage: ({ commit, state }, newValue) => {
            commit('SET_MESSAGE', newValue)
            return state.user.loggedIn
        }
    },

})

// export default check_user
