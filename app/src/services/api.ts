import { toast } from 'react-toastify';

const URL_API = 'http://127.0.0.1:3333/'; 

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

const getResp = async (label: string, resp: any) => {  
  if (resp) {
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
