import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './index.scss';

function TopBox({ tasks, setTasks }) {
  const [inputValue, setInputValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef(null);

  const handleDeleteSelections = () => {
    const deleteSelectedTick = tasks.filter((task) => !task.tick);
    setTasks(deleteSelectedTick);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    
  };

  const handleAddTask = () => {
    const newTask = {
      name: inputValue,
      tick: false
    };
    setTasks([...tasks, newTask]);
    setInputValue('');
    inputRef.current.focus();
  };

  const tasksTicked = tasks.length > 0 && tasks.every((task) => task.tick);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleDeleteSelectionsConfirm = () => {
    setShowModal(false);
    handleDeleteSelections();
  };

  const deleteSelections = () => {
    setShowModal(true);
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
        onClick={deleteSelections}
        disabled={tasks.length === 0 || (!tasksTicked && !tasks.some((task) => task.tick))}
      >
        Delete Selections
      </Button>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the selected tasks?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant='danger' onClick={handleDeleteSelectionsConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TopBox;
