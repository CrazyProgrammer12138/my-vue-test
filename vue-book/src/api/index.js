//放接口

import axios from 'axios';
// 增加默认的请求路径
axios.defaults.baseURL = 'http://localhost:3000';

//let {data:sliders} = await getSliders();,统一处理{data}，使用axios数据拦截，interceptors
//拦截器
axios.interceptors.response.use((res)=>{
  // 在这里统一拦截结果，把结果处理成res.data形式
  return res.data;
})

// 获取轮播图数据
export let getSliders = ()=>{
  // 返回一个promise实例，谁用在谁上调用
  return axios.get('/sliders');
}

// 获取热门图书接口
export let getHotBook = () =>{
  return axios.get('/hot');
}

// 获取全部图书
export let getBooks = () =>{
  return axios.get('/book');
}

// 删除谋一本书
export let removeBook = (id) =>{
  return axios.delete(`/book?id=${id}`);
}
