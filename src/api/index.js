import request from '../utils/request';
import { SERVER_HOST } from '../config';


export
const get_books_info = query => {
    // let token = sessionStorage.getItem('token')
    let token = localStorage.getItem("token")
    if (!!token){
        token=token.replace("\"","").replace("\"","");
    }
    var id =query.id;
    var books_name = query.books_name;
    var author = query.author;
    var classify = query.classify;
    var press = query.press;
    var book_status = query.book_status;
    var data={
        'page':query.page,
        'rows':query.rows,
        'id':id,
        'books_name':books_name,
        'author':author,
        'classify':classify,
        'press':press,
        'book_status':book_status
    }
    if (id.length===0){
        delete data.id;
    }if (books_name.length===0){
        delete data.books_name;
    }if(author.length===0){
        delete data.author;
    }if (classify.length===0){
        delete data.classify;
    }if (press.length===0){
        delete data.press;
    }if (book_status.length===0){
        delete data.book_status;
    }
    return request({
        url: SERVER_HOST+'/bookInfo',
        method: 'get',
        headers:{
            Authorization:token
        },
        params: data
    });
};


// 图书编辑接口
export const edit_books_info = query => {
    // let token = sessionStorage.getItem('token')
    let token = localStorage.getItem("token")

    if (!!token){
        token=token.replace("\"","").replace("\"","");
    }
    return request({
        url:  SERVER_HOST+'/bookInfo',
        method: 'put',
        headers:{
            Authorization:token
        },
        data:query
    });
};

// 图书删除接口
export
const delete_books_info = query => {
    // let token = sessionStorage.getItem('token')
    let token = localStorage.getItem("token")
    if (!!token){
        token=token.replace("\"","");
    }
    var datas={
        id:query.id
    }
    return request({
        url: SERVER_HOST+'/bookInfo',
        method: 'delete',
        headers:{
            Authorization:token
        },
        data:datas
    });
};

// 添加图书接口
export const add_books_info = query => {
    // let token = sessionStorage.getItem('token')
    let token = localStorage.getItem("token")

    if (!!token){
        token=token.replace("\"","").replace("\"","");
    }
    return request({
        url:  SERVER_HOST+'/bookInfo',
        method: 'post',
        headers:{
            Authorization:token
        },
        data:query
    });
};



// 获取用户信息接口
export
const get_user_info = query => {
    // let token = sessionStorage.getItem('token')
    let token = localStorage.getItem("token")
    if (!!token){
        token=token.replace("\"","").replace("\"","");
    }
    var id =query.id;
    var user_name = query.user_name;
    var user_phone = query.user_phone;
    var status = query.status;
    var data={
        'page':query.page,
        'rows':query.rows,
        'id':id,
        'user_name':user_name,
        'user_phone':user_phone,
        'status':status
    }
    if (id.length===0){
        delete data.id;
    }if (user_name.length===0){
        delete data.user_name;
    }if(user_phone.length===0){
        delete data.user_phone;
    }if (status.length===0){
        delete data.status;
    }
    return request({
        url: SERVER_HOST+'/userInfo',
        method: 'get',
        headers:{
            Authorization:token
        },
        params: data
    });
};


// 用户添加接口
export const add_user_info = query => {
    // let token = sessionStorage.getItem('token')
    let token = localStorage.getItem("token")

    if (!!token){
        token=token.replace("\"","").replace("\"","");
    }
    return request({
        url:  SERVER_HOST+'/userInfo',
        method: 'post',
        headers:{
            Authorization:token
        },
        data:query
    });
};

// 用户编辑接口
export const edit_user_info = query => {
    // let token = sessionStorage.getItem('token')
    let token = localStorage.getItem("token")

    if (!!token){
        token=token.replace("\"","").replace("\"","");
    }
    return request({
        url:  SERVER_HOST+'/userInfo',
        method: 'put',
        headers:{
            Authorization:token
        },
        data:query
    });
};

// 用户删除接口
export
const delete_user_info = query => {
    // let token = sessionStorage.getItem('token')
    let token = localStorage.getItem("token")
    if (!!token){
        token=token.replace("\"","");
    }
    var datas={
        id:query.id
    }
    return request({
        url: SERVER_HOST+'/userInfo',
        method: 'delete',
        headers:{
            Authorization:token
        },
        data:datas
    });
};


export
const fetchData = query => {
    // let token = sessionStorage.getItem('token')
    let token = localStorage.getItem("token")
    if (!!token){
        token=token.replace("\"","").replace("\"","");
    }
    var id =query.id;
    var commodity_code = query.commodity_code;
    var commodity_name = query.commodity_name;
    var color = query.color;
    var status = query.status;
    var data={
        'page':query.page,
        'rows':query.rows,
        'id':id,
        'commodity_code':commodity_code,
        'commodity_name':commodity_name,
        'color':color,
        'status':status
    }
    if (id.length===0){
        delete data.id;
    }if (commodity_code.length===0){
        delete data.commodity_code;
    }if(commodity_name.length===0){
        delete data.commodity_name;
    }if (color.length===0){
        delete data.color;
    }if (status.length===0){
        delete data.status;
    }
    return request({
        url: 'http://127.0.0.1:8058/com_data/',
        method: 'get',
        headers:{
            Authorization:token
        },
        params: data
    });
};


export
const fetchcount = query => {
    return request({
        url: 'http://127.0.0.1:8058/countcom/',
        method: 'get'
    });
};


export
const getinternetip = () => {
    let token = localStorage.getItem("token")
    return request({
        url: 'http://127.0.0.1:8058/clientip/',
        headers:{
            Authorization:token
        },
        method: 'get',
    });
};

export
const login = query => {
    // const user = query.user;
    // const pwd = query.pwd;
    return request({
        url: SERVER_HOST+'/login',
        method: 'post',
        data:query
    });
};

export
const register = query => {
    return request({
        url:  SERVER_HOST+'/register/',
        method: 'post',
        data:query
    });
};

export
const getCodes = () => {
    return request({
        url:  SERVER_HOST+'/vercode/',
        method: 'get'
    });
};

export
const getamapip = query => {
    if (query.ip.length===0){
        delete query.ip;
    }
    delete query.city;
    return request({
        url: 'http://restapi.amap.com/v3/ip',
        method: 'get',
        params:query
    });
};
export
const weatherData = query => {
     delete query.key;
     // query.city='厦门'
    return request({
        url: 'http://jisutqybmf.market.alicloudapi.com/weather/query',
        method: 'get',
        headers:{
            Authorization:'APPCODE f02a02d54c5d41339b812619ec69a22d'
        },
        params:query
    });
};


export
const up_com = query => {
    // let token = sessionStorage.getItem('token')
    let token = localStorage.getItem("token")

    if (!!token){
        token=token.replace("\"","").replace("\"","");
    }
    return request({
        url: 'http://127.0.0.1:8058/up_com/',
        method: 'post',
        headers:{
            Authorization:token
        },
        data:query
    });
};



export
const del_com = query => {
    // let token = sessionStorage.getItem('token')
    let token = localStorage.getItem("token")
    if (!!token){
        token=token.replace("\"","");
    }
    var datas={
        id:query.id
    }
    return request({
        url: 'http://127.0.0.1:8058/del_com/',
        method: 'delete',
        headers:{
            Authorization:token
        },
        data:datas
    });
};