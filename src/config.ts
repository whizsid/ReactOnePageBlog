let APP_URL_TMP:string;
let APP_LOGGER_ON_TMP:boolean;

if(process.env.NODE_ENV === 'production'){
	APP_URL_TMP = "https://whizsid.github.io/";
	APP_LOGGER_ON_TMP = false;
} else {
	APP_URL_TMP = "http://localhost:3000/"
	APP_LOGGER_ON_TMP = true;
}

export const APP_URL = APP_URL_TMP;
export const APP_LOGGER_ON = APP_LOGGER_ON_TMP;