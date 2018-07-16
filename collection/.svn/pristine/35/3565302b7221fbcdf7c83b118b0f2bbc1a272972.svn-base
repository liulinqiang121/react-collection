import * as types from '../mutation-types';

// import Vue from 'vue';

import axios from 'axios'
import {
    MessageBox
} from 'element-ui';
import * as util from '../../util/util.js'
// initial state
const state = {
    unReadCount: 0,
    timer: null,
}

// getters
const getters = {
    unReadCount: state => state.unReadCount,
}

// actions
const actions = {
    getunReadCount({ state, commit }) {
        axios.post("/api/assignee/messageReminder/unread", {})
            .then(res => {
                if (res.data.code == 0) {
                    commit(types.SET_COUNT, {
                            count: res.data.data
                        })
                        // state.unReadCount = res.data.data
                } else {
                    util.failCallback(res.data, Vue)
                }
            })
            .catch(err => {
                console.log(err);
            });
    },
    // 定时任务更新
    intervalChange({
        commit,
        state,
        dispatch
    }) {
        // 清除上一个定时任务
        commit(types.REMOVE_INTERVAL)
        let timer = setInterval(function() {
                dispatch('getunReadCount')

            }, 5 * 60 * 1000)
            // 保存新的定时任务
        commit(types.SET_INTERVAL, {
            timer: timer
        })
    },

}

// mutations
const mutations = {
    // 未读数量
    [types.SET_COUNT](state, {
        count
    }) {
        state.unReadCount = count
    },
    // 设置
    [types.SET_INTERVAL](state, {
        timer
    }) {
        state.timer = timer
    },
    // 清未读消息定时任务
    [types.REMOVE_INTERVAL](state) {
        clearInterval(state.timer)
        state.timer = null
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}