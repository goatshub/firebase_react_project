import { Post as IPost } from './Main'
import { auth, db } from '../../config/firebase'
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

interface Props{
  post: IPost
}

interface Likes{
  postId: string,
  userId: string,
  docId: string
}

export const Post = (props: Props) => {
  // const { post : {id : postId, username, title, description} } = props
  const { post } = props
  const [likesList, setLikesList ] = useState<Likes[] | null>(null)
  const likesRef = collection(db,'likes')
  const likesDoc = query(likesRef, where("postId", "==", post.id))
  const [ user ] = useAuthState(auth)

  const getLikes = async () => {
    // const res = await getDocs(likesRef)
    // const data = res.docs.map(doc => ({...doc.data(), docId: doc.id})  ) as Likes[]
    // setLikesList( data.filter(doc => doc.postId === postId) )
    const res = await getDocs(likesDoc) //use query to filter only specific post id
    setLikesList( res.docs.map(doc => ({...doc.data(), docId: doc.id})  ) as Likes[] )
  }

  useEffect(()=>{
    getLikes()
  },[])
  
  const userLike = likesList?.find(like => like.userId === user?.uid)
  
  const addLike = async () => {
    try{
      if( userLike ){
        // const docRef = doc(db, "likes",  userLike.docId)
        const likeToDeleteQuery = query(
          likesRef, 
          where('userId', '==', user?.uid ), 
          where('postId', '==', post.id ) 
        )
        const likeToDeleteData = await getDocs(likeToDeleteQuery)
        const likeToDeleteDocRef = doc(db, "likes", likeToDeleteData.docs[0].id )
        await deleteDoc(likeToDeleteDocRef)
        setLikesList(prev=> prev && prev.filter(like => like.docId !== userLike.docId ) ) 
      }else{
        const res = await addDoc(likesRef, {userId: user?.uid, postId : post.id})   
        if(user){
          setLikesList(prev=> ( (prev) ? [...prev,{userId: user?.uid, postId : post.id, docId: res.id}] : [{userId: user?.uid, postId : post.id, docId: res.id}] )) 
        }
      }
      // getLikes()
    }catch(err){
      console.log(err)
    }

  }

  return (
    <div className='post'>
      <div className='title'>
        <h1>{post.title}</h1>
      </div>
      <div className='body'>
        <p>{post.description}</p>
      </div>
      <div className='footer'>
        <p>@{post.username}</p>
        <button 
          className='button' 
          style={{backgroundColor: (userLike) ? "#c9cfe6" : "#f9deb2" }} 
          onClick={addLike}
        >
          {userLike ? <>&#128078;</> : <>&#128077;</> } 
        </button>
        <p>Likes: {likesList?.length}</p>
      </div>
    </div>
  )
}