"use strict";

import Vue from 'vue';
import axios from "axios";
import { Message } from 'element-ui'
import store from '@/store/index'
import VueCookie from 'vue-cookie'
import router from '@/router'
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
    baseURL: 'http://127.0.0.1:8090'
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
      const token = VueCookie.get('token')
      if (token) {
          config.headers.common.token = token
      }
      return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

const request = (url, method, params, callback, openLoading = true) => {
    const axiosConfig = {
        url: url,
        method: method
    }
    if (method === 'post') {
        const formData = new FormData()
        for(const key in params) {
            if (params[key] instanceof Array) {
                for (const i in params[key]) {
                    formData.append(key, params[key][i])
                }
            } else {
                formData.append(key, params[key])
            }
        }
        axiosConfig.data = formData
    } else {
        axiosConfig.params = params
    }
    if (openLoading) {
        store.commit('OPEN_LOADING')
    }
    _axios.request(axiosConfig).then(response => {
        if (response.data.code === 200) {
            if (response.data.msg) {
                Message.success(response.data.msg)
            }
            callback(response.data.content)
        } else {
            Message.error(response.data.msg)
            if (response.data.code === 401) {
                router.push('/login')
            }
        }
    }).catch(err => {
        console.dir(err)
        Message.error('系统异常')
    }).finally(() => {
        if (openLoading) {
            store.commit('CLOSE_LOADING')
        }

    })
}
const get = (url, params, callback, openLoading = true) => {
    request(url, 'get', params, callback, openLoading)
}
const post = (url, params, callback, formObj) => {
    if (formObj) {
        formObj.validate(valid => {
            if (valid) {
                request(url, 'post', params, callback)
            }
        })
    } else {
        request(url, 'post', params, callback)
    }


}
Vue.prototype.$get = get
Vue.prototype.$post = post
