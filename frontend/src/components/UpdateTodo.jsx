import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useRetriveTodoQuery, useSaveTodoMutation, useUpdateTodoMutation } from '../redux_store/todoSlice'

function UpdateTodo() {
  const location = useLocation();
  const navigate = useNavigate()

  console.log(location.state?.item.todo._id);

  // Access the passed state
  const userId = location.state?.item.userId;
  const todoId = location.state?.item.todo._id;

  const [title, setTitle] = useState(location.state?.item?.todo?.title)
  const [desc, setDesc] = useState(location.state?.item?.todo?.desc)

  const [updateTodo, { isSuccess, data }] = useUpdateTodoMutation()

  const onSubmitUpdateTodoHandler = (e) => {
    e.preventDefault()
    updateTodo({
      todoId,
      userId,
      title,
      desc
    }).unwrap()
    setTitle('')
    setDesc('')
    navigate('/dashobard')
  }
  return (
    <>
      <form onSubmit={onSubmitUpdateTodoHandler} method='POST'>
        <label>Title : </label>
        <input name='title' id='title' value={title} onChange={(e) => setTitle(e.target.value)} />
        <br /><br />
        <label>Desc : </label>
        <input name='desc' id='desc' value={desc} onChange={(e) => setDesc(e.target.value)} />
        <br /><br />
        <button name='login' type='submit' disabled={!title || !desc} >Update</button>
      </form>
    </>
  )
}

export default UpdateTodo