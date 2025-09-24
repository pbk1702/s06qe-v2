import config from '@/config.js'
import axios from 'axios'


// fetch ok/error, api ok/error, error as string

export default async function api_fetch ( url, method = "GET", data = undefined, options = {}) {
  const o = {
    baseURL: config.baseURL,
    url,
    method,
    data,
    options,
  }
  let d = {};
  try {
    const resp = await axios(o)    
    d.ok = ( resp.status >= 200 && resp.status < 300 );
    if( resp.data ) d = resp.data; 
  } catch ( e ) {
    if( e.response ) {
      console.log('e.resp', e.response);             
      d = Object.assign({ ok: false, error: String(e) }, e.response?.data);      
    } else if ( e.request ) {
      d = { ok: false, error: String( e ) }
    } else if ( e instanceof Error ) {
      d = { ok: false, error: String( e ) }
    } else {
      throw e;
    }    
  }
  return d;  
}