import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import { Row, Col, Preloader } from 'react-materialize';
import { TYPE } from '../actions/types';
import { selectChart } from '../actions';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class Stats extends Component {
   constructor() {
       super();
   }

   // renderStats() {
   //    const { name } = this.props.selectedChart;
   //
   //    // let stats = this.props.tickerList.find(this.props.tickerList () => this.props.tickerList.name === name);
   //
   //
   //    console.log('stats info: ', name);
   //    // const { data } = this.props.tickerList.indexOf(name);
   //
   //    return <div></div>
   //
   // }

   return() {
      <div>
         // {this.renderStats()}
      </div>
   }


}

function mapStateToProps({ tickerList, selectedChart }){
   return { tickerList, selectedChart };
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ selectChart }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
