import React, { Component } from 'react';

export function delayUnmount(ParamComponent) {
  return class extends Component {
    state = {
      shouldRender: this.props.isMounted
    };

    componentDidUpdate(prevProps) {
      if (prevProps.isMounted && !this.props.isMounted) {
        this.timeout = setTimeout(
          () => this.setState({ shouldRender: false }),
          500
        );
      } else if (!prevProps.isMounted && this.props.isMounted) {
        clearTimeout(this.timeout)
        this.setState({ shouldRender: true });
      }
    };

    render() {
    	const { isMounted, ...theRest } = this.props;
      return this.state.shouldRender ? <ParamComponent {...theRest}/> : null;
    }
  }
}