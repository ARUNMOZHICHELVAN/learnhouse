import { useLHSession } from '@components/Contexts/LHSessionContext'
import { updatePassword } from '@services/settings/password'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import React, { useState, useEffect } from 'react'

function UserEditPassword() {
  const session = useLHSession() as any
  const access_token = session?.data?.tokens?.access_token
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const updatePasswordUI = async (values: any) => {
    let user_id = session.data.user.id
    if (values.old_password === values.new_password) {
      setError("Old password and new password cannot be the same.");
      setSuccess(null);
      return; 
    }
    if (values.new_password.length < 8) {
      setError("New password must be at least 8 characters long.");
      setSuccess(null);
      return; 
    }
    try {
      const res= await updatePassword(user_id, values, access_token)
      //added by ARUN
      console.log("updatePassword Response"+JSON.stringify(res))
      if(res.status_code == "401"){
        setSuccess("Password updated successfully!")
        setError(null)
      }
      else {
        setError("Wrong Password")
        setSuccess(null)
      }
      
    } catch (err) {
      setError("Something Went wrong")
      setSuccess(null)
    }
  }
  
  

  useEffect(() => {
    // Any logic based on session change can be placed here
  }, [session])

  return (
    <div className="ml-10 mr-10 mx-auto bg-white rounded-xl shadow-sm px-6 py-5">
      <Formik
        initialValues={{ old_password: '', new_password: '' }}
        
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true)
          updatePasswordUI(values)
            .finally(() => setSubmitting(false))
        }}
      >
        {({ isSubmitting }) => (
          <Form className="max-w-md">
            <label className="block mb-2 font-bold" htmlFor="old_password">
              Old Password
            </label>
            <Field
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              name="old_password"
              required
            />
            <ErrorMessage name="old_password" component="div" className="text-red-500 mb-2" />

            <label className="block mb-2 font-bold" htmlFor="new_password">
              New Password
            </label>
            <Field
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              name="new_password"
              required
            />
            <ErrorMessage name="new_password" component="div" className="text-red-500 mb-2" />

            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 text-white bg-black rounded-lg shadow-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default UserEditPassword