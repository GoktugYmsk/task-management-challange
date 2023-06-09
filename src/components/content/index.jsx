import React, { useState } from 'react';

import Pagination from 'react-bootstrap/Pagination';

import TopBox from './topBox';
import AltBox from './altBox';
import './index.scss';

function Content() {
  const [tasks, setTasks] = useState([]);

  return (
    <div className='content-container'>
     <TopBox tasks={tasks} setTasks={setTasks}/>
     <AltBox tasks={tasks} setTasks={setTasks} />
        <Pagination className='content-container__pagination'>
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Next />
        </Pagination>
    </div>
  );
}

export default Content;
