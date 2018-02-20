import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';

import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Subheader from 'material-ui/Subheader';

export default class NewsList extends Component {

   render() {
      return (
         <List className="NewsList" zDepth={3}>
         <Subheader className="news-subheader white-text">News</Subheader>
            <ListItem
                      primaryText="Article 1"
                      secondaryText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet ipsum id massa tincidunt ullamcorper. Mauris eleifend sed nulla vel interdum. Etiam vitae dictum risus."
                     />
            <ListItem
                     primaryText="Article 2"
                     secondaryText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet ipsum id massa tincidunt ullamcorper. Mauris eleifend sed nulla vel interdum. Etiam vitae dictum risus."
                     />
            <ListItem
                     primaryText="Article 3"
                     secondaryText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet ipsum id massa tincidunt ullamcorper. Mauris eleifend sed nulla vel interdum. Etiam vitae dictum risus."
                     />
            <ListItem
                      primaryText="Article 4"
                      secondaryText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet ipsum id massa tincidunt ullamcorper. Mauris eleifend sed nulla vel interdum. Etiam vitae dictum risus."
                     />
            <ListItem
                      primaryText="Article 5"
                      secondaryText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet ipsum id massa tincidunt ullamcorper. Mauris eleifend sed nulla vel interdum. Etiam vitae dictum risus."
                     />
            <ListItem
                      primaryText="Article 6"
                      secondaryText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet ipsum id massa tincidunt ullamcorper. Mauris eleifend sed nulla vel interdum. Etiam vitae dictum risus."
                     />
         </List>
      );
   }
}
