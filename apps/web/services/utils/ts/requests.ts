import { getUriWithOrg } from '@services/config/config'

export const RequestBody = (method: string, data: any, next: any) => {
  let HeadersConfig = new Headers({ 'Content-Type': 'application/json' })
  let options: any = {
    method: method,
    headers: HeadersConfig,
    redirect: 'follow',
    credentials: 'include',
    // Next.js
    next: next,
  }
  if (data) {
    options.body = JSON.stringify(data)
  }
  return options
}

export const RequestBodyWithAuthHeader = (
  method: string,
  data: any,
  next: any,
  token?: string
) => {
  let HeadersConfig = new Headers(
    token
      ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      : { 'Content-Type': 'application/json' }
  )
  let options: any = {
    method: method,
    headers: HeadersConfig,
    redirect: 'follow',
    credentials: 'include',
    body: (method === 'POST' || method === 'PUT') ? JSON.stringify(data) : null,
    // Next.js
    next: next,
  }
  return options
}

export const RequestBodyForm = (method: string, data: any, next: any) => {
  let HeadersConfig = new Headers({})
  let options: any = {
    method: method,
    headers: HeadersConfig,
    redirect: 'follow',
    credentials: 'include',
    body: (method === 'POST' || method === 'PUT') ? JSON.stringify(data) : null,
    // Next.js
    next: next,
  }
  return options
}

export const RequestBodyFormWithAuthHeader = (
  method: string,
  data: any,
  next: any,
  access_token: string
) => {
  let HeadersConfig = new Headers({
    Authorization: `Bearer ${access_token}`,
  })
  let options: any = {
    method: method,
    headers: HeadersConfig,
    redirect: 'follow',
    credentials: 'include',
    body: data,
    // Next.js
    next: next,
  }
  return options
}

export const swrFetcher = async (url: string, token?: string) => {
  // Create the request options
  let HeadersConfig = new Headers(
    token
      ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      : { 'Content-Type': 'application/json' }
  )
  let options: any = {
    method: 'GET',
    headers: HeadersConfig,
    redirect: 'follow',
    credentials: 'include',
  }

  try {
    // Fetch the data
    console.log("URL used in swrFetcher "+url)
    
    const request = await fetch(url, options)
    // let res = errorHandling(request)
    const res = await errorHandling(request);


    // Return the data
    return res
  } catch (error: any) {
    throw error
  }
}

// export const errorHandling = (res: any) => {
  
//   // return res;
//   if (!res.ok) {
//     console.log(JSON.stringify(res))
//     const error: any = new Error(`${res.statusText}`)
//     error.status = res.status
//     throw error
//   }
//   return res.json()
// }
export const errorHandling = async (res: any) => {
  console.log("Error handling req "+JSON.stringify(res))  
  if (!res.ok) {
    // Create an error object with status and message
    var error:any
    if(res?.status){
       error = new Error(`Error: ${res.status} ${res.statusText}`);
    }
    else {
       error = new Error(`${res.statusText}`);
       error.status = res.status;
       throw error;

    }
    error.status = res.status;
    throw error;
  }
  
  // Await the JSON response before returning
  return await res.json();
};


type CustomResponseTyping = {
  success: boolean
  data: any
  status: number
  HTTPmessage: string
}

export const getResponseMetadata = async (
  fetch_result: any
): Promise<CustomResponseTyping> => {
  const json = await fetch_result.json()
  console.log("JSON DATA  ❌❌"+JSON.stringify(json))
  if (fetch_result.status === 200) {
    return {
      success: true,
      data: json,
      status: fetch_result.status,
      HTTPmessage: fetch_result.statusText,
    }
  } else {
    console.log("success:false is returned")
    return {
      success: false,
      data: json,
      status: fetch_result.status,
      HTTPmessage: fetch_result.statusText,
    }
  }
}

export const revalidateTags = async (tags: string[], orgslug: string) => {
  const url = getUriWithOrg(orgslug, '')
  tags.forEach((tag) => {
    fetch(`${url}/api/revalidate?tag=${tag}`)
  })
}
