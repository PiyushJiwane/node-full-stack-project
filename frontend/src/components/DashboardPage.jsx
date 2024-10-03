import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useRetriveTodoQuery, useSaveTodoMutation } from '../redux_store/todoSlice'

function DashboardPage() {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  const id = useSelector(state => state.auth._id)
  console.log(`DashboardPage : id : ${id}`);
  
  const [saveTodo, { isSuccess, data }] = useSaveTodoMutation()
  const { data:retriveTodo,isSuccess:isSuccessTodo } = useRetriveTodoQuery(id)  
  
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    await saveTodo({
      userId:id,
      title,
      desc
    }).unwrap()
    setTitle('')
    setDesc('')
}

  return (
    <>DashboardPage
  <form onSubmit={onSubmitHandler} method='POST'>
                <label>Title : </label>
                <input name='title' id='title' value={title} onChange={(e) => setTitle(e.target.value)} />
                <br /><br />
                <label>Desc : </label>
                <input name='desc' id='desc' value={desc} onChange={(e) => setDesc(e.target.value)} />
                <br /><br />
                <button name='login' type='submit' disabled={!title || !desc} >Add</button>
            </form>
            {
            isSuccess && data && (<p>save</p>)
      }
      {isSuccessTodo ? (
        <ul>
          {/* Map through the retrieved to-do items and display them */}
          {retriveTodo?.map((item) => (
            <li key={item._id}>
              <h4>Title: {item.todo.title}</h4>
              <p>Description: {item.todo.desc}</p>
              <p>
                <strong>Created At:</strong> {new Date(item.todo.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

export default DashboardPage