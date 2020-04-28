import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import ConfigContext from './ConfigContext'
import ManagedGroups from './ManagedGroups'
import DepartmentGroups from './DepartmentGroups'
import OwnGroups from './OwnGroups'

const config = {}

class App extends Component {

  render() {
    return (
      <ConfigContext.Provider value={config}>
      <div>
        <Container>
          <Row style={{"alignItems": "center"}}>
            <Col>
              <h2>CS Group management</h2>
            </Col>
          </Row>
          <Tabs transition={false} defaultActiveKey="managedGroups">
            <Tab eventKey="managedGroups" title="Managed by you">
              <ManagedGroups config={config} />
            </Tab>
            <Tab eventKey="ownGroups" title="Your groups">
              <OwnGroups config={config} />
            </Tab>
            <Tab eventKey="departmentGroups" title="All department groups">
              <DepartmentGroups config={config} />
            </Tab>
          </Tabs>
        </Container>
      </div>
      </ConfigContext.Provider>
    )
  }
}

export default App;
