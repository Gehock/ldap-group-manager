import React, { Component } from 'react';
import './App.css';
import { Table } from 'react-bootstrap';

class GroupInfoTable extends Component {

  constructor(props) {
    super(props);
    this.makeDisplayNameLine = this.makeDisplayNameLine.bind(this);
    this.makeEmailLine = this.makeEmailLine.bind(this);
  }

  makeDisplayNameLine = (p) => {
    if (!p || !p.dn || !p.displayName) {
        console.log("group", p)
        console.log("group.dn", p.dn)
        console.log("group.displayName", p.displayName)
    }
    return <div key={p.dn}>{ p.displayName }</div>
  }

  makeEmailLine = (p) => {
    return <div key={p.dn}>{ p.mail }</div>
  }

  render() {
    const group = this.props.group;
    if (group.managers.indexOf(null) >= 0) { console.log("group missing a manager!", group) }
    return (
      <Table className="groupInfoTable" size="sm">
        <tbody>
          {
            group.description && <tr>
              <td>Description</td><td colspan="2">{ group.description }</td>
            </tr>
          }
          <tr>
            <td>Owners</td>
            <td>{ group.owners.map(this.makeDisplayNameLine) }</td>
            <td>{ group.owners.map(this.makeEmailLine) }</td>
          </tr>
          <tr>
            <td>Managers</td>
            <td>{ group.managers.map(this.makeDisplayNameLine) }</td>
            <td>{ group.managers.map(this.makeEmailLine) }</td>
          </tr>
          {
            group.expires && <tr>
              <td>Expires</td><td colSpan="2">{ group.expires }</td>
            </tr>
          }
          {
            group.comments && <tr>
              <td>Comments</td><td colSpan="2">{ group.comments }</td>
            </tr>
          }
        </tbody>
      </Table>
    )
  }
}

export default GroupInfoTable;

