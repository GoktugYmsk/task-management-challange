import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Switch, Space, Modal } from 'antd';

import './index.scss';

function AltBox({ tasks, setTasks }) {
  const initialTasks = [
    { name: 'Task 1', done: true, tic: false },
    { name: 'Task 2', done: false, tic: false },
    { name: 'Task 3', done: true, tic: false }
  ];

  useState(() => {
    setTasks(initialTasks);
  }, []);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);

  const handleTaskDoneChange = (index, checked) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], done: checked };
    setTasks(updatedTasks);
  };

  const handleTaskOption = (index, ticked) => {
    const optionTasks = [...tasks];
    optionTasks[index] = { ...optionTasks[index], tic: ticked };
    setTasks(optionTasks);
  };

  const handleTaskDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setShowDeleteModal(false);
    setSelectedTaskIndex(null);
  };

  const areAllTasksSelected = tasks.length > 0 && tasks.every((task) => task.tic);

  const handleToggleAllTasks = () => {
    const allToggle = tasks.map((task) => ({ ...task, tic: !areAllTasksSelected }));
    setTasks(allToggle);
  };

  const handleDeleteConfirmation = (index) => {
    setSelectedTaskIndex(index);
    setShowDeleteModal(true);
  };

  const handleDeleteCancel = () => {
    setSelectedTaskIndex(null);
    setShowDeleteModal(false);
  };

  const handleDeleteConfirm = () => {
    if (selectedTaskIndex !== null) {
      handleTaskDelete(selectedTaskIndex);
    }
  };

  return (
    <div className='content__altBox'>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <input type='checkbox' checked={areAllTasksSelected} onChange={handleToggleAllTasks} readOnly />
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
                  checked={task.tic}
                  onChange={(e) => handleTaskOption(index, e.target.checked)}
                />
              </td>
              <td className={`content__altBox-message ${task.done ? 'completed-task' : ''}`}>{task.name}</td>
              <td className='container__altBox-actions'>
                <Space direction='vertical'>
                  <Switch
                    checkedChildren='Done'
                    unCheckedChildren='Incomplete'
                    checked={task.done}
                    onChange={(checked) => handleTaskDoneChange(index, checked)}
                  />
                </Space>
                <Button
                  className='content-delete__button'
                  variant='outline-danger'
                  onClick={() => handleDeleteConfirmation(index)}
                >
                  Delete
                </Button>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        title='Confirmation'
        visible={showDeleteModal}
        onCancel={handleDeleteCancel}
        onOk={handleDeleteConfirm}
        cancelButtonProps={{ className: 'delete-modal-cancel-button' }}
        okButtonProps={{ className: 'delete-modal-ok-button' }}
      >
        <p>{selectedTaskIndex !== null ? `Are you sure you want to delete "${tasks[selectedTaskIndex]?.name}"?` : ''}</p>
      </Modal>
    </div>
  );
}

export default AltBox;
