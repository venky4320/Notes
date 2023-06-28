import React ,{useState,useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import './index.css'
import Footer from '../Footer'

const Notes = () => {

    const data = JSON.parse(localStorage.getItem("name"));

    const [title,setTitle] = useState('')
    const [message,setMessage] = useState('')
    const [error,setError] = useState('')

    const [userList,setUserList] = useState(data)

    const handleSubmit = () =>{
        if (message!=='' && title!== ''){
            const newList = userList.concat({title:title,message:message,id:uuidv4()})
            setUserList(newList)
            setMessage('')
            setTitle('')
            setError('')
        }
        else{
            setError('message and title not should be empty')
        }
   
    }

    const handleRemove = ((id)=>{
        const newItem = userList.filter((eachItem)=>{
                return eachItem.id !== id
        })
        setUserList(newItem)

    })

    useEffect(()=>{
        document.title = `Notes:  ${userList.length}`
        
    }) 

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem("name"));
        if (data){
            setUserList(data)
        }
    },[])

    useEffect(() => {
        localStorage.setItem("name", JSON.stringify(userList));
      },[userList]);

  return (
    <div>
        <div className='note-container'>
            <input type='text' placeholder='Title' value={title} onChange={(e)=>{setTitle(e.target.value)}} />
            <input name="text" placeholder='Take a note' value={message} onChange={(e)=>{setMessage(e.target.value)}}/>
            <button className="button"onClick={handleSubmit}>Add</button>
            <p className='error-container'>{error}</p>
        </div>
        <p>{userList.length ?
            <div className='message-container'>
                {userList.map((usersList)=>{
                    const {id,title,message} = usersList
                    return <div className='container' >
                                    <ul key={id}>
                                            <h2>{title}</h2>
                                            <p>{message}</p>
                                        
                                    </ul>
                                    <button className='remove-button' onClick={()=>handleRemove (id)}>Remove</button>
                                </div>
                    
                })}
            </div>
            :
            <div>
                <Footer />
            </div>
}</p>
    </div>
  )
}

export default Notes