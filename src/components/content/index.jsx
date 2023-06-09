import React, { useState, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';

import { Switch, Space } from 'antd';

import './index.scss';

function Content() {
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTask = () => {
    const newTask = {
      name: inputValue,
      done: false
    };
    setTasks([...tasks, newTask]);
    setInputValue('');
    inputRef.current.focus();
  };

  const handleTaskDoneChange = (index, checked) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = checked;
    setTasks(updatedTasks);
  };

  const handleTaskDelete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleDeleteSelections = () => {
    const updatedTasks = tasks.filter((task) => !task.done);
    setTasks(updatedTasks);
  };

  const areAllTasksSelected = tasks.length > 0 && tasks.every((task) => task.done);

  const handleToggleAllTasks = () => {
    const updatedTasks = tasks.map((task) => ({
      ...task,
      done: !areAllTasksSelected
    }));
    setTasks(updatedTasks);
  };

  return (
    <div className='content-container'>
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
          disabled={tasks.length === 0 || !tasks.some((task) => task.done)}
        >
          Delete Selections
        </Button>
      </div>
      <div className='content__altBox'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <input
                  type='checkbox'
                  checked={areAllTasksSelected}
                  onChange={handleToggleAllTasks}
                  readOnly
                />
              </th>
              <th>Task Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>
                  <input
                    type='checkbox'
                    checked={task.done}
                    onChange={(e) => handleTaskDoneChange(index, e.target.checked)}
                    readOnly
                  />
                </td>
                <td>{task.name}</td>
                <td className='container__altBox-actions' >
                  <Space direction='vertical'>
                    <Switch checkedChildren='Done' unCheckedChildren='Incomplete' defaultChecked={task.done} />
                  </Space>
                  <Button
                    className='content-delete__button'
                    variant='outline-danger'
                    onClick={() => handleTaskDelete(index)}
                  >
                    Delete
                  </Button>{' '}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

        <Pagination className='content-container__pagination'>
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Next />
        </Pagination>
    </div>
  );
}

export default Content;
