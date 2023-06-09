import { Row, Col } from 'react-bootstrap';

import Header from './components/header';
import Content from './components/content';
import SideBar from './components/sideBar';

import './App.css';

function App() {
  return (
    <div className="App">
      <Row>
        <Col md={12} lg={12}>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col md={8} lg={8} > 
          <Content />
        </Col>
        <Col>
          <SideBar md={4} lg={4} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
