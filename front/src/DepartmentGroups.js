import React, { Component } from 'react';
import GroupInfoTable from './GroupInfoTable'
import { Accordion, Card, InputGroup, FormControl, Badge } from 'react-bootstrap'
import _ from 'lodash';
import { BsChevronDown } from 'react-icons/bs';
import { delayUnmount } from './utils'
import ConfigContext from './ConfigContext'

const DelayedGroupInfoTable = delayUnmount(GroupInfoTable)

class DepartmentGroups extends Component {

  constructor(props) {
    super(props);
    this.config = this.props.config;
    this.searchInput = React.createRef();
    this.state = {
      groups: [],
      shownGroups: [],
      groupSearchText: "",
      activeGroupCn: ""
    }
  }
  
  async componentDidMount() {
    let r = await(fetch('/api/departmentGroups'))
    let departmentGroups = await r.json();
    departmentGroups = _.sortBy(departmentGroups, 'cn');
    this.setState({
      groups: departmentGroups,
      shownGroups: departmentGroups
    })
  }

  onGroupSearchChange = () => {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.setState({
        shownGroups: this.getShownGroups(this.state.groups, this.searchInput.current.value),
      });
    }, 250);
  }

  getShownGroups = (groups, text) => {
    const searchText = typeof text !== "undefined" ? text : this.state.groupSearchText;
    return _.filter(groups, g => {
      return g.cn.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
    });
  }

  toggleGroup = groupCn => {
    let activeGroupCn = this.state.activeGroupCn === groupCn ? "" : groupCn;
    this.setState({
      activeGroupCn: activeGroupCn
    })
  }

  render() {
    return (
      <div>
        <InputGroup style={{margin: "15px 0px"}}>
          <FormControl
            ref={this.searchInput}
            placeholder="Filter groups by name"
            onChange={this.onGroupSearchChange}
          >
          </FormControl>
        </InputGroup>
        <Accordion>
          {
            this.state.shownGroups.map(group => <DepartmentGroupsCard key={group.cn} toggleGroup={this.toggleGroup} group={group} isOpen={this.state.activeGroupCn === group.cn} />)
          }
        </Accordion>
      </div>
    )
  }

}

class DepartmentGroupsCard extends Component {

  static contextType = ConfigContext;

  constructor(props) {
    super(props)
    this.toggleGroup = this.toggleGroup.bind(this);
  }

  toggleGroup() {
    this.props.toggleGroup(this.props.group.cn)
  }

  render() {
    const { group, isOpen } = this.props;
    const ds = this.context.dataSources[group.dataSource];
    return (
      <Card>
        <Accordion.Toggle onClick={this.toggleGroup} style={{display: "flex", flexDirection: "row", justifyContent: "center"}} as={Card.Header} eventKey={group.cn}>
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
            <DelayedGroupInfoTable isMounted={isOpen} group={group} />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    )
  }

}

export default DepartmentGroups