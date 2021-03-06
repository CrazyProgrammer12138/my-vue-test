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
// 获取某一本书
export let findBook = (id)=>{
  return axios.get(`/book?id=${id}`);
}

// 修改图书
/**
 * @param id 编号
 * @param data 数据 请求体发送
 * @return {AxiosPromise<T>}
 */
export let updateBook = (id, data) =>{
  return axios.put(`/book?id=${id}`, data);
}

export let addBook = (data) =>{
  return axios.post('/book', data);
}
// axios.all有个方法和promise.all类似
export let getAll = ()=>{
  return axios.all([getSliders(), getHotBook()])
}

// 获取更多
export let pagination = (offset) =>{
  return axios.get(`/page?offset=${offset}`);
}
