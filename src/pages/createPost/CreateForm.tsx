/*
npm i react-hook-form yup @hookform/resolvers
*/

import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { addDoc, collection } from 'firebase/firestore'
import { db, auth } from '../../config/firebase';
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom";

interface CreateFormData{
  title: string,
  description: string
}

export const CreateForm = () => {

  const [user] = useAuthState(auth) 
  const postsRef = collection(db, 'posts')

  const navigate = useNavigate()

  const schema = yup.object().shape({
    title: yup.string().required("You must add a title."),
    description: yup.string().required("You must add a description.")
  })

  const { register, handleSubmit, formState: {errors} } = useForm<CreateFormData>({
    resolver: yupResolver(schema)
  })

  const onCreatePost = async (data:CreateFormData) => {
    try{
      console.log(data)
      const res = await addDoc( postsRef, {  
        // title: data.title,
        // description: data.description,
        ...data,
        username: user?.displayName,
        userId: user?.uid
      } )
      console.log(res)
      navigate('/')
    }catch(err){
      alert(err)
    }
  }
  return (
    <form onSubmit={handleSubmit(onCreatePost)} className="postForm">
      <input className="formInput" placeholder="Title..." {...register('title')} />
      <p className="errorMsg">{errors.title?.message}</p>
      <textarea className="formInput" placeholder="Description..." {...register('description')} />
      <p className="errorMsg">{errors.description?.message}</p>
      <input className="submitBtn" type="submit" />
    </form>
  )
}
