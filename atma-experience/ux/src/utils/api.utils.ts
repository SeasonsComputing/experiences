import axios from 'axios'
import react from 'react'

const API_SERVER = process.env.REACT_APP_API_SERVER || ''

export type Progress = 'initiated' | 'loading' | 'not-found' | 'error' | 'success'

const reducer = (state: any, { progress, data }: any) => {
  switch (progress) {
    case 'loading': return { ...state, progress: 'loading' };
    case 'success': return { ...state, progress: 'success', data };
    case 'not-found': return { ...state, progress: 'not-found' };
    case 'error': return { ...state, progress: 'error' };
  }
}

export const useFetch = (api: string) => {
  const [url, setUrl] = react.useState(api);

  const [state, dispatch] = react.useReducer(reducer, {
    progress: 'initiated',
    data: {}
  });

  react.useEffect(() => {
    let cancelled = false; // short-circuit unwinding dispatches when exiting

    const fetchData = async () => {
      dispatch({ progress: 'loading' });

      try {
        const endpoint = url.replace('{{server}}', API_SERVER);
        const { data } = await axios(endpoint);

        if (!cancelled) {
          dispatch({ progress: 'success', data });
        }
      } catch (err: any) {
        if (!cancelled) {
          if (err?.response?.status === 404) {
            dispatch({ progress: 'not-found' })
          } else {
            console.log(err);
            dispatch({ progress: 'error' });
          }
        }
      }
    }

    fetchData();

    return () => { cancelled = true };
  }, [url]);

  return [state, setUrl];
}

export const initiated = (progress: Progress): boolean => {
  return progress === 'initiated';
}

export const loading = (progress: Progress): boolean => {
  return progress === 'loading';
}

export const notFound = (progress: Progress): boolean => {
  return progress === 'not-found';
}

export const error = (progress: Progress): boolean => {
  return progress === 'error';
}

export const inprogress = (progress: Progress): boolean => {
  return progress === 'initiated' || progress === 'loading';
}

export const failed = (progress: Progress): boolean => {
  return progress === 'not-found' || progress === 'error';
}

export const code = (progress: Progress): string => {
  switch (progress) {
    case 'initiated': return '200';
    case 'success': return '200';
    case 'not-found': return '404';
    case 'error': return '500';
    default: throw new Error();
  }
}

export const get = async (url: string): Promise<{ [k: string]: any }> => {
  const endpoint = url.replace('{{server}}', API_SERVER);
  return await axios({ method: 'get', url: endpoint });
}

export const post = async (url: string, payload: { [k: string]: any }) => {
  const endpoint = url.replace('{{server}}', API_SERVER);
  return await axios({ method: 'post', url: endpoint, data: payload });
}

const api = {
  useFetch,
  initiated,
  loading,
  notFound,
  error,
  inprogress,
  failed,
  code,
  get,
  post
}

export default api