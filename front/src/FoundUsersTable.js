import React, { Component } from 'react';
import './FoundUsersTable.css';
import { Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import _ from 'lodash';

class FoundUsersTable extends Component {

  render() {
    const selectedUser = this.props.selectedUser;
    const members = this.props.groupMembers;
    return (<Table style={{margin: "15px 0px"}} size="sm" bordered hover>
      <thead>
        <tr>
          <th>Display name</th>
          <th>Username</th>
          <th>Email address</th>
        </tr>
      </thead>
      <tbody>
      { this.props.users ?
        this.props.users.map(u => {
          const userInGroup = !!_.find(members, m => { return m.dn === u.dn });
          return ( userInGroup ?
            <OverlayTrigger
              key={u.dn}
              overlay={<Tooltip>This person is already in the group.</Tooltip>}
            >
              <AddPersonRow user={u} userInGroup={userInGroup} selectedUser={selectedUser} selectUser={this.props.selectUser}/>
            </OverlayTrigger>
            : <AddPersonRow key={u.dn} user={u} userInGroup={userInGroup} selectedUser={selectedUser} selectUser={this.props.selectUser}/>
          )
        }) : <tr/>
      }
      </tbody>
    </Table>)
  }
}

class AddPersonRow extends Component {
  
  render() {
    const { user, userInGroup, selectedUser, selectUser, onMouseOut, onMouseOver } = { ...this.props };
    let className = "";
    if (userInGroup) { className += "disabledPersonRow " }
    if (selectedUser && selectedUser.dn === user.dn) { className += "selectedPersonRow " }
    return (
      <tr className={ className }
        style={{cursor: userInGroup ? 'not-allowed' : 'pointer'}}
        onClick={userInGroup ? undefined : () => selectUser(user)}
        onMouseOut={onMouseOut} onMouseOver={onMouseOver}
      >
        <td>{user.displayName}</td>
        <td>{user.sAMAccountName}</td>
        <td>{user.mail}</td>
      </tr>
    )
  }
}

export default FoundUsersTable;