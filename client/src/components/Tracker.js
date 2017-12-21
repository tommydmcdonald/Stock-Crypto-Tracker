import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Icon, Col } from 'react-materialize';

export default class Tracker extends Component {

   render() {
      const { name, type, currentPrice, quantity, chartData } = this.props;
      return (
         <div className='valign-wrapper tracker-row'>
            <Col s={2}>{name}</Col>
            <Col s={5}>{currentPrice}</Col>
            <Col s={4}><input className='quantity' value={quantity} onChange={ event => this.props.updateQuantity(name, type, event.target.value)} /></Col>
            <Col s={2}>
               <a className='tracker-icon'onClick={ () => this.props.updateGraphTicker({name, type})}>
               <Icon small>assessment</Icon>
               </a>
            </Col>
            <Col s={2}>
               <a className='tracker-icon' onClick={ () => this.props.onClick(name, type)}>
               <Icon small>clear</Icon>
               </a>
            </Col>
         </div>
      );
   }
}
