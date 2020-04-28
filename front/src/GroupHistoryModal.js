import React, { Component } from 'react';
import { Modal, Table, Button } from 'react-bootstrap';
import moment from 'moment';

class RemoveMemberModal extends Component {

  render() {
    const { group, changes, onDismiss } = { ...this.props }
    return (
      <Modal size="lg" show={!!group} onHide={onDismiss}>
        <Modal.Header closeButton>
          <Modal.Title>Change history</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table size="sm" bordered hover>
            <tbody>
              <tr>
                <th>When</th>
                <th>What</th>
                <th>Comments</th>
              </tr>
              {
                changes ? changes.map(c => {
                  const m = moment(c.timestamp);
                  return <tr key={c.timestamp}>
                    <td>{m.fromNow()} <span>({ m.format('MMMM Do YYYY, HH:mm') })</span></td>
                    <td>
                      {c.changedBy} {c.operation === "add" ? <span style={{color: "green"}}>added</span> : <span style={{color: "red"}}>removed</span>} {c.targetPerson}
                    </td>
                    <td>
                      { c.comments }
                    </td>
                  </tr>
                }) : <tr/>
              }
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button value="1" onClick={onDismiss} variant="outline-secondary">OK</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default RemoveMemberModal