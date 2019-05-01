import axios, { AxiosError,AxiosRequestConfig, AxiosResponse } from 'axios';
import { APP_URL } from './config';

interface IResponse {
	success:boolean,
	message?:string,
	[x: string]: any 
};

const request = (url:string,config:undefined|AxiosRequestConfig=undefined)=>axios.get(APP_URL+"data/"+url,config).then((response:AxiosResponse):IResponse=>({
	success:true,
	...response.data
})).catch((err:AxiosError):IResponse=>({
	message: typeof err.response!=='undefined'?err.response.data.message:"",
	success:false
}));


const requestNormal = (url:string,config:undefined|AxiosRequestConfig=undefined)=>axios.get(APP_URL+"data/"+url,config).then(({data}:AxiosResponse):IResponse=>({
	data,
	success:true,
})).catch((err:AxiosError):IResponse=>({
	message: typeof err.response!=='undefined'?err.response.data.message:"",
	success:false
}));

const Layout = {
	mainMenuItem:()=>request("posts/index.json"),
	menuItem:(path:string)=>request("posts/"+path.replace(".","/")+"/index.json")
};

const Post = {
	content:(path:string)=>requestNormal("posts/"+path+".md",{
		responseType:"text"
	}),
	meta:(path:string)=>request("meta/posts/"+path+".json")
}

export default {
	Layout,
	Post
};