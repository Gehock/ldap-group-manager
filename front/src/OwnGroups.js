import React, { Component } from 'react';
import _ from 'lodash';
import GroupInfoTable from './GroupInfoTable'
import { Accordion, Card, Badge } from 'react-bootstrap'
import { BsChevronDown } from 'react-icons/bs';
import ConfigContext from './ConfigContext'

class OwnGroups extends Component {

  static contextType = ConfigContext;

  constructor(props) {
    super(props);
    this.config = this.props.config;
    this.state = {
      ownGroups: { "haveInfo": [], "haveNoInfo": [] }
    }
  }
  
  async componentDidMount() {
    let r = await(fetch('/api/ownGroups'))
    let ownGroups = await r.json();
    ownGroups = {
      "haveInfo": _.filter(ownGroups, g => { return g.haveInfo }),
      "haveNoInfo": _.filter(ownGroups, g => { return !g.haveInfo })
    }
    this.setState({
      ownGroups: ownGroups
    })
  }

  render() {
    return (
      <div style={{marginTop: "15px"}}>
        <h5>Your groups that we have information about</h5>
        <Accordion>
          {
            this.state.ownGroups.haveInfo.map(group => {
              const ds = this.context.dataSources[group.dataSource];
              return (
                <Card key={group.cn}>
                  <Accordion.Toggle style={{display: "flex", flexDirection: "row", justifyContent: "center"}} as={Card.Header} eventKey={group.cn}>
                    <span style={{fontSize: "1.2rem", fontWeight: "500"}}>
                      { group.cn }
                    </span>
                    <div style={{display: "flex", flexGrow: "1"}} />
                    <span style={{fontSize: "16px", marginRight: "10px"}}>
                      <Badge pill style={{ backgroundColor: ds['badge-background'], color: ds['badge-text'] }}>{ds.tag}</Badge>
                    </span>
                    <BsChevronDown style={{fontSize: "1.25rem"}} />
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={group.cn}>
                    <Card.Body>
                      <GroupInfoTable group={group}/>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              )
            })
          }
        </Accordion>
        <h5 style={{marginTop: "15px"}}>Your other groups</h5>
        {
          this.state.ownGroups.haveNoInfo.map(g => {
            return <div key={g.cn}>{g.cn}</div>
          })
        }
      </div>
    )
  }

}

export default OwnGroups