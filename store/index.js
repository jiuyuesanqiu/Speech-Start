import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	strict: process.env.NODE_ENV === 'development',//开发环境时执行严格模式
	state: {
		userInfo:{}
	},
	getters:{
		/**
		 * 只要userInfo的_id为有效值，那么就说明已经登录了
		 */
		isLogin(state){
			return Boolean(state.userInfo._id);
		}
	},
	mutations: {//同步更新状态
		/**
		 * 更新用户信息
		 * @param {Object} state
		 * @param {Object} userInfoFielld	要更新的字段，传值如{signature:'走自己的路，让别人说去吧'}
		 */
		updateUserInfoField(state,userInfoFielld){
			state.userInfo = {...state.userInfo,...userInfoFielld}
		}
	},
	actions:{//异步更新状态
		updateUserInfo({commit}){
			wx.cloud.callFunction({
				name: 'getOwnerUserInfo',
			}).then(res => {
				commit("updateUserInfoField",res.result);
			})
		}
	}
})

export default store
