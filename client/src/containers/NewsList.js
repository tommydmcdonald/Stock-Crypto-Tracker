import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import { loadNews } from '../actions/newsActions';

import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Subheader from 'material-ui/Subheader';

class NewsList extends Component {
   componentDidMount() {
      this.props.loadNews();
   }

   renderNewslist() {
      return (
         <div>
            { this.props.news.map(newsItem => {
               return(
                  <div>
                     <ListItem primaryText = {newsItem.headline} secondaryText = {newsItem.summary}/>
                     <Divider />
                  </div>
               );
            }) }
         </div>
      );
   }

   renderOne() {
      if (this.props.news && this.props.news[0]) {
         let newsItem = this.props.news[0];
         return (
            <div>
               <ListItem
                     primaryText = {newsItem.headline}
                     secondaryText = {newsItem.summary}
                 /> <Divider />
            </div>
         )
      }
   }

   render() {
      return (
         <div className="NewsList">
            <List zDepth={1}>
            <Subheader className="News-Subheader black-text">News</Subheader>
               {this.renderNewslist()}
               {/* {this.renderOne()} */}
            </List>
         </div>

      );
   }
}

function mapStateToProps({news}){
   return {news};
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ loadNews }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
