import React, { useState,useRef } from 'react'
import Button from 'react-bootstrap/Button';

import './index.scss'

function TopBox({tasks,setTasks}) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const handleDeleteSelections = () => {
    const updatedTasks = tasks.filter((task) => !task.tic);
    setTasks(updatedTasks);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTask = () => {
    const newTask = {
      name: inputValue,
      tic: false
    };
    setTasks([...tasks, newTask]);
    setInputValue('');
    inputRef.current.focus();
  };


  return (
    <div className='content-topBox'>
      <input ref={inputRef} value={inputValue} onChange={handleInputChange} />
      <Button
        className='content-topBox__add-Button'
        onClick={handleAddTask}
        disabled={!inputValue}
      >
        Add Task
      </Button>
      <Button
        className='content-topBox__allDelete-Button'
        onClick={handleDeleteSelections}
        disabled={tasks.length === 0 || !tasks.some((task) => task.tic)}
      >
        Delete Selections
      </Button>
    </div>
  )
}

export default TopBox