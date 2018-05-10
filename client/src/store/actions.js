import * as types from './types'

// export default {
//   UserLogin({ commit }, data){
//     commit(types.LOGIN, data);
//   },
//   UserLogout({ commit }){
//       commit(types.LOGOUT);
//   },
//   UserName({ commit }, data){
//       commit(types.USERNAME, data);
//   }
// }

//改法：
//举个例子：先引入api, 利用载荷拿到参数，然后发送登录请求
import api from '../instance';
export default {
    // actions需要返回一个promise对象，是用于通知外面该actions执行完毕。（官网有写）
    UserLogin({ commit }, { username, password }){ 
       return new Promise((resolve, reject) => {
            api.userLogin({ username, password})
                .then(res => {
                    //登录成功
                    if(res.data.success === true){
                        let token = res.data.data.token;
                        commit(types.LOGIN, token);
                        resolve(res.data.success);
                    }
                    //登录失败： 用户名或密码错误
                    if(res.data.success === false){
                        commit(types.LOGOUT);
                        resolve(res.data.success)
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });

    }
}