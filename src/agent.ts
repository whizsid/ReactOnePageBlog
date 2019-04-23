import axios, { AxiosError, AxiosResponse } from 'axios';
import { APP_URL } from './config';

interface IResponse {
	success:boolean,
	message?:string,
	[x: string]: any 
};

const request = (url:string,config=undefined)=>axios.get(APP_URL+"data/"+url,config).then((response:AxiosResponse):IResponse=>({
	success:true,
	...response.data
})).catch((err:AxiosError):IResponse=>({
	message: typeof err.response!=='undefined'?err.response.data.message:"",
	success:false
}));

const Layout = {
	mainMenuItem:()=>request("posts/index.json"),
	menuItem:(path:string)=>request("posts/"+path.replace(".","/")+"/index.json")
};

export default {
	Layout
};