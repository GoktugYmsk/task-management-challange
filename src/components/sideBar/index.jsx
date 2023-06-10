import React from 'react'

import './index.scss'

function SideBar() {
  return (
    <div className='sideBar-container' >
      <div className='sideBar-container__information' >
        <h3>Information</h3>
        <p>This Mini App for TaskManagement</p>
      </div>
      <div className='sideBar-container__libraries' >
        <h3>Libraries</h3>
        <div className='sideBar-container__buttons' >
          <button > React </button>
          <button>Sass</button>
          <button> Bootstrap</button>
          <button> Antd </button>
        </div>
      </div>
    </div>
  )
}

export default SideBar