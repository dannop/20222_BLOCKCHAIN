import { toast } from 'react-toastify';

const URL_PROD = 'http://127.0.0.1:3333/'; 
const URL_TEST = 'http://127.0.0.1:3333/';

const HOST_NAME = window.location.hostname;
const parts = HOST_NAME.split('.');

let last_index = -2;
const last = parts[parts.length - 1];
const is_localhost = last === 'localhost';
if (is_localhost) last_index = -1;

const subdomain = parts.slice(0, last_index).join('.');

let URL_API = URL_PROD;

if (subdomain) {
  if (subdomain === 'test') URL_API = URL_TEST;
}

const CONFIG = {
  URL: URL_API
};

const setHeaders = (check: boolean) => {
  let headers = new Headers({
    'Content-Type': 'application/json, text/html',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, sessao, Authorization',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, PUT, GET, PATCH, DELETE, OPTIONS'
  });
  if(check){
    headers.append('Authorization', `Bearer ${localStorage.getItem('@base-token')}`)
  }
  return headers;
}

const getFilePDF = async (resp: any) => {
  const pdf = await resp.blob();
  const file = new Blob([pdf], {type: 'application/pdf'});
  const fileURL = window.URL.createObjectURL(file);
  window.open(fileURL);
  setTimeout(() => {
    window.URL.revokeObjectURL(fileURL);
  }, 100);
};

const getFileXLS = async (resp: any) => { 
  const xls = await resp.blob();
  const file = new Blob([xls], {type: 'application/vnd.ms-excel'});
  const fileURL = window.URL.createObjectURL(file);
  window.open(fileURL);
  setTimeout(() => {
    window.URL.revokeObjectURL(fileURL);
  }, 100);
};

const getFileHTML = async (resp: any) => { 
  const html = await resp.blob();
  const file = new Blob([html], {type: 'text/html'});
  const fileURL = window.URL.createObjectURL(file);
  window.open(fileURL);
  setTimeout(() => {
    window.URL.revokeObjectURL(fileURL);
  }, 100);
};

const getResp = async (label: string, resp: any) => {  
  if (resp) {
    const content_type = resp.headers.get("Content-Type");    
    if (content_type.includes("pdf")) {
      if (resp.status === 200) await getFilePDF(resp);      
    } else if (content_type.includes("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
      if (resp.status === 200) await getFileXLS(resp);
    } else if (content_type.includes("text/html")) {
      if (resp.status === 200) await getFileHTML(resp);
    } else {
      const json = await resp.json();
      if (resp.status !== 200) {
        if (json && json.Message && json.Message !== '') {
          
          if (!toast.isActive('toastDefaultError')) toast.error(`Erro no ${label}: `+json.Message, {autoClose: false, toastId: 'toastDefaultError'});
          else toast.update('toastDefaultError', {render: `Erro no ${label}: `+json.Message, autoClose: false});
          
          if (json.ValidationErrors) {
            return json
          }
        } 
      } else if (json) return json;
    }
  } 
  return null;
}

export const getReq = async (label: string, url: string, check: boolean) => {
  if (navigator.onLine) {
    try{
      let headers = setHeaders(check);
      
      let reqParams = {
        method: 'GET',
        headers
      }
  
      let url_completa = CONFIG.URL + url;
      
      let resp = await fetch(url_completa, reqParams);
      //console.log('url', url_completa);
      // console.log('resp', resp); 
  
      return await getResp(label, resp); 
    }catch(e){
      console.log(`Erro ao carregar ${label}: `+e);
    }
  } else toast.error('Sem conexão com a Internet.', {autoClose: false, toastId: 'toastError'});
  return null;
} 

export const postReq = async (label: string, url: string, body: string, check: boolean) => {
  if (navigator.onLine) {
    try{
      let headers = setHeaders(check);
      
      let reqParams = {
        method: 'POST',
        headers,
        body,
      }
      
      let url_completa = CONFIG.URL + url;

      let resp = await fetch(url_completa, reqParams);
      
      return await getResp(label, resp);
    }catch(e){
      console.log(`Erro ao criar ${label}: `+e);
    }
  } else toast.error('Sem conexão com a Internet.', {autoClose: false, toastId: 'toastError'});
  return null;
}

export const putReq = async (label: string, url: string, body: string, check: boolean, hasReturn: boolean) => {
  if (navigator.onLine) {
    try{
      let headers = setHeaders(check);

      let reqParams = {
        method: 'PUT',
        headers,
        body
      }
      
      let url_completa = CONFIG.URL + url;
      let resp = await fetch(url_completa, reqParams);
      
      
      if (resp.status !== 200 && !hasReturn){
        return await resp.json();
      } 
      else return await getResp(label, resp);
    }catch(e){
      console.warn(`Erro ao atualizar ${label}: `+e);
    }
  } else toast.error('Sem conexão com a Internet.', {autoClose: false, toastId: 'toastError'});
  if (!hasReturn) return null;
}

export const deleteReq = async (label: string, url: string, check: boolean) => {
  if (navigator.onLine) {
    try{
      let headers = setHeaders(check);

      let reqParams = {
        method: 'DELETE',
        headers,
      }

      let url_completa = CONFIG.URL + url;
      let resp = await fetch(url_completa, reqParams);

      // console.log('url', url_completa);
      // console.log('resp', resp);

      if (resp.status !== 200) return await resp.json();
    }catch(e){
      console.warn(`Erro ao remover ${label}: `+e);
    }
  } else toast.error('Sem conexão com a Internet.', {autoClose: false, toastId: 'toastError'});
  return null;
}
