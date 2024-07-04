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
    if (!p) {
      return <strong key="no-displayname">Error: no display name!</strong>
    }
    if (!p.dn || !p.displayName) {
      console.log("group missing dn or displayName", p)
      return <div key="missing-data">error</div>
    }
    return <div key={p.dn}>{ p.displayName }</div>
  }

  makeEmailLine = (p) => {
    if (!p) {
      return <strong key="no-email">Error: no email!</strong>
    }
    return <div key={p.dn}>{ p.mail }</div>
  }

  render() {
    const group = this.props.group;
    return (
      <Table className="groupInfoTable" size="sm">
        <tbody>
          {
            group.description ? (
              <tr>
                <td>Description</td><td colSpan="2">{ group.description }</td>
              </tr>
            ) : null
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
            group.expires ?
            (
              <tr>
                <td>Expires</td><td colSpan="2">{ group.expires }</td>
              </tr>
            ) : null
          }
          {
            group.comments ?
            (
              <tr>
                <td>Comments</td><td colSpan="2">{ group.comments }</td>
              </tr>
            ) : null
          }
        </tbody>
      </Table>
    )
  }
}

export default GroupInfoTable;

