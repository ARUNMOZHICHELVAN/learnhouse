import { getAPIUrl } from '@services/config/config'
import {
  RequestBodyWithAuthHeader,
  errorHandling,
} from '@services/utils/ts/requests'

/*
 This file includes only POST, PUT, DELETE requests
 GET requests are called from the frontend using SWR (https://swr.vercel.app/)
*/


export async function updatePassword(
  user_id: string,
  data: any,
  access_token: any
) {
  const result: any = await fetch(
    `${getAPIUrl()}users/change_password/` + user_id,
    RequestBodyWithAuthHeader('PUT', data, null, access_token)
  )
  
  const responseData = await result.json()
  // const res = await errorHandling(result)
  return responseData
}

// export async function updatePassword(user_id: string, data: any, access_token: any) {
//   try {
//     const result: Response = await fetch(
//       `${getAPIUrl()}users/change_password/` + user_id,
//       RequestBodyWithAuthHeader('PUT', data, null, access_token)
//     );

//     // Check if the response is ok (status in the range 200-299)
//     if (!result.ok) {
//       // Parse the JSON error response
//       const errorResponse = await result.json();
//       // Throw an error or handle it as needed
//       throw new Error(`Error ${result.status}: ${errorResponse.detail || 'An error occurred'}`);
//     }

//     // If successful, parse the response
//     const res = await result.json();
//     console.log("Success:", res);
//     return res;

//   } catch (error) {
//     // Handle fetch or any other error
//     console.error("ARUNMOZHI Error:", error);
//     return { success: false, message: "Unexpected Error" }; // Return structured error response
//   }
// }
