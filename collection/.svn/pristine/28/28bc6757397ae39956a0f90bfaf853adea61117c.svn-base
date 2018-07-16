// import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import aside from './modules/aside'
import notes from './modules/notes'
import unread from './modules/unread'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    actions,
    modules: {
        aside,
        notes,
        unread
    },
    strict: debug,
    // plugins: debug ? [createLogger()] : []
})