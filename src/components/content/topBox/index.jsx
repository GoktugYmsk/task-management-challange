import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './index.scss';

function TopBox({ tasks, setTasks }) {
  const [inputValue, setInputValue] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const inputRef = useRef(null);

  const handleDeleteSelections = () => {
    const updatedTasks = tasks.filter((task) => !task.tic);
    setTasks(updatedTasks);
    setShowConfirmationModal(false);
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

  const areAllTasksTicked = tasks.length > 0 && tasks.every((task) => task.tic);

  const handleConfirmationModalClose = () => {
    setShowConfirmationModal(false);
  };

  const handleDeleteSelectionsConfirm = () => {
    setShowConfirmationModal(false);
    handleDeleteSelections();
  };

  const handleDeleteSelectionsPrompt = () => {
    setShowConfirmationModal(true);
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
        onClick={handleDeleteSelectionsPrompt}
        disabled={tasks.length === 0 || (!areAllTasksTicked && !tasks.some((task) => task.tic))}
      >
        Delete Selections
      </Button>
      <Modal show={showConfirmationModal} onHide={handleConfirmationModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the selected tasks?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleConfirmationModalClose}>
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
