import React, { Component } from 'react';
import { Modal, Button, FormControl } from 'react-bootstrap';

class RemoveMemberModal extends Component {

  constructor(props) {
    super(props);
    this.commentsInput = React.createRef();
    this.state = {  }
  }

  render() {
    const { member, group, onConfirm, onDismiss } = { ...this.props }
    return (
      <Modal show={!!member} onHide={onDismiss}>
        <Modal.Header closeButton>
          <Modal.Title>Remove group member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Remove {member ? member.displayName : ''} from group {group ? group.cn : ''}?
          <FormControl id="commentsInput" ref={this.commentsInput} style={{marginTop: "10px"}} placeholder="Comment / Reason for removal" />
        </Modal.Body>
        <Modal.Footer>
          <Button value="1" onClick={onDismiss} variant="outline-secondary">Cancel</Button>
          <Button value="0" onClick={() => onConfirm(member, this.commentsInput.current.value)} variant="primary">Remove</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default RemoveMemberModal