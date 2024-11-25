import React from 'react'
import *  as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik';

const EcoConsultancyForm = () => {
    const initialValues = {
        name: '',
        username: '',
        email: '',
        password: '',
      };
    
      const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        username: Yup.string().required('Username is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    
      });
  return (
   <Formik   initialValues={initialValues}
   validationSchema={validationSchema}
   onSubmit={(values, { setSubmitting }) => {
     // Handle form submission here   
 
     // ...
     setSubmitting(false);
   }}>
    <Form className="flex flex-col items-center mt-20">
    <h1 className="text-center font-bold text-2xl">REGISTER FORM</h1>
    {/* {isLoading && <Spinner/>}
    {error && <p className='text0red-500'>{error}</p>} */}
    <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg">
      <label  className="px-2 py-2 mt-4" htmlFor="name">Location</label>
      <Field 
      name="name" 
      type="name" 
      id="name" 
      className="rounded-md active:border-2 border-green-300 hover:border-green-500 border-2 px-1 py-2"
      />
      <ErrorMessage 
      name="name" 
      component="div" 
      className="text-red-500"/>
    </div>
    <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg">
      <label  className="px-2 py-2 mt-4" htmlFor="name">Aera Size</label>
      <Field 
      name="name" 
      type="name" 
      id="name" 
      className="rounded-md active:border-2 border-green-300 hover:border-green-500 border-2 px-1 py-2"
      />
      <ErrorMessage 
      name="name" 
      component="div" 
      className="text-red-500"/>
    </div>
    <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg">
      <label  className="px-2 py-2 mt-4" htmlFor="username">User Name</label>
      <Field 
      name="username" 
      type="username" 
      id="username" 
      className="rounded-md active:border-2 border-green-300 hover:border-green-500 border-2 px-1 py-2"
      />
      <ErrorMessage 
      name="username" 
      component="div" 
      className="text-red-500"/>
    </div>
    <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg">
      <label  className="px-2 py-2 mt-4" htmlFor="email">Email Address</label>
      <Field 
      name="email" 
      type="email" 
      id="email" 
      className="rounded-md active:border-2 border-green-300 hover:border-green-500 border-2 px-1 py-2"
      />
      <ErrorMessage 
      name="email" 
      component="div" 
      className="text-red-500"/>
    </div>
    <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg">
      <label className="px-2 py-2 mt-4" htmlFor="password">Password</label>
      <Field 
      name="password" 
      type="password" 
      id="password" 
      className="rounded-md active:border-2 border-green-300 hover:border-green-500 border-2 px-1 py-2"
      />
      <ErrorMessage 
      name="password" 
      component="div" 
      className="text-red-500" />
    </div>

    <button
    // disabled={isLoading}
    type="submit"
    className="rounded-md bg-green-800 disabled:bg-green-800/50 hover:bg-green-600 w-1/2 mx-auto flex text-center hover:bg-green-900e text-white font-bold py-2 px-4 mt-7 border"
 
    >
      Register

    </button>
    </Form>
   </Formik>
  )
}

export default EcoConsultancyForm