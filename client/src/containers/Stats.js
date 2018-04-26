import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import { Row, Col, Preloader } from 'react-materialize';
import { TYPE } from '../actions/types';
import { loadChartData, selectChart } from '../actions'
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

   renderStats() {
      const { name, type } = this.props.selectedChart;
      let stats = [];
      let headings = {};
      let order = ['high'];

      headings = {'high': 'High', 'low': 'Low', 'open': 'Open', 'marketCap': 'Market Cap',
         'sector': 'Sector', 'supply': 'Supply', 'volume': 'Volume', 'week52High': '52 Week High',
         'week52Low': '52 Week Low'};

      if(type === "CRYPTO") {
            order = ['high', 'low', 'marketCap', 'open', 'supply', 'volume', 'week52High', 'week52Low'];
      }
      else if(type === "STOCK") {
         order = ['high', 'low', 'marketCap', 'open', 'sector', 'volume', 'week52High', 'week52Low'];
      }

      for(var i = 0; i < this.props.tickerList.length; i++) {
         if(this.props.tickerList[i].name === name) {
            stats = this.props.tickerList[i].data;
         }
      }

      return (
         <div>
            <Row>
               {order.map(key => {
                  return (
                     <Col s={3}>
                        <p className="stat-heading">{headings[key]}</p>
                        <p className="stat-number">{stats[key]}</p>
                     </Col>
                  );
               })}
            </Row>
         </div>
      );

   }

   render() {
      return (
         <div>
            {this.renderStats()}
         </div>
      );
   }


}

function mapStateToProps({ tickerList, selectedChart }){
   return { tickerList, selectedChart };
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ selectChart }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
