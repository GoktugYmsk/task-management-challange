import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Switch, Space, Modal } from 'antd';

import './index.scss';

function AltBox({ tasks, setTasks }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);

  const handleTaskDoneChange = (index, checked) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = checked;
    setTasks(updatedTasks);
  };

  const handleTaskDelete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    setShowDeleteModal(false);
    setSelectedTaskIndex(null);
  };

  const areAllTasksSelected = tasks.length > 0 && tasks.every((task) => task.done);

  const handleToggleAllTasks = () => {
    const updatedTasks = tasks.map((task) => ({
      ...task,
      done: !areAllTasksSelected,
    }));
    setTasks(updatedTasks);
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
                  checked={task.done}
                  onChange={(e) => handleTaskDoneChange(index, e.target.checked)}
                  readOnly
                />
              </td>
              <td>{task.name}</td>
              <td className='container__altBox-actions'>
                <Space direction='vertical'>
                  <Switch checkedChildren='Done' unCheckedChildren='Incomplete' defaultChecked={task.done} />
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
