import { db } from "../../config/firebase"
import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { Post } from "./Post";

export interface Post{
  id: string,
  username: string,
  description: string,
  title: string,
  userId: string
}




export const Main = () => {

  const [ posts, setPosts ] = useState<Post[] | null>(null) //use [] after to show it's array and use || null to allow null type
  const [ err, setErr ] = useState<any>("") 
  const postsRef = collection(db,'posts')

  const getPosts = async () => { 
    try{
      const res = await getDocs(postsRef)
      // const newPosts = res.docs.map(doc => ({ ...doc.data(), id: doc.id }  )) as Post[]
      // setPosts(newPosts)
      setPosts(res.docs.map(doc => ({ ...doc.data(), id: doc.id }  )) as Post[])
      setErr("")
    } catch(error: any){
      setErr(error.message)
    }
  }

  useEffect(()=> {
    getPosts()
  },[])

  return (
    <div className="main">
        <h1 className='title'>home page</h1>
        { posts?.map((post: Post, key: number) => <Post 
            key={key} 
            post={post}
          />
        )}
        {err && <p className="errorMsg">{err}</p>}
    </div>
  )
}