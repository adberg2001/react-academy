import React from 'react'
import shortid from 'shortid'
import Todo from './Todo'
import style from './todo.module.css'
import Priorities from './Priority'

function TodoList() {
  const initialState = {
    toDoList: [],
    title: '',
    desc: '',
    priority: 'normal',
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE_TITLE':
        return {...state, title: action.payload };
      case 'CHANGE_DESC':
        return {...state, desc: action.payload };
      case 'CHANGE_PRIORITY':
        return {...state, priority: action.payload };
        case 'ADD_NEW_TODO':
        return {...state, toDoList: [...state.toDoList, action.payload] };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const {title, desc, priority, toDoList} = state;

  const handleAdd = (e) => {
    e.preventDefault();
    const newTodo = {
      id: shortid.generate(),
      title, desc, priority
    };
    dispatch({ type: 'CHANGE_TITLE', payload: '' });
    dispatch({ type: 'CHANGE_DESC', payload: '' });
    dispatch({ type: 'CHANGE_PRIORITY', payload: 'normal'});
    dispatch({ type: 'ADD_NEW_TODO', payload: newTodo });
  };

  return (
    <div className={style.page}>
      <form className={style.form}>
        <h3>Новая задача</h3>
        <input 
          type="text" 
          placeholder="Название" 
          value={title}
          onChange={(e) => dispatch({ type: 'CHANGE_TITLE', payload: e.target.value })}
        />
        <textarea 
          placeholder="Описание" 
          value={desc}
          onChange={(e) => dispatch({ type: 'CHANGE_DESC', payload: e.target.value })}
        />
        <Priorities
          priority={priority}
          setPriority={(value) => dispatch({ type: 'CHANGE_PRIORITY', payload: value })}
        />
        <button onClick={handleAdd} >
          Добавить
        </button>
      </form>
      <div className={style.list}>
      { toDoList.map(c => <Todo key={c.id} todo={c}/>)}
      </div>
    </div>
  )
}

export default TodoList
