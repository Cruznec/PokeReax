// @flow
import React, { Component } from 'react';
import Card from '../components/Card';

export default class CardPage extends Component<Props> {
  render() {
    return <Card {...this.props} />;
  }
}
