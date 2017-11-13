import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (props) => {

  return (
     <div>
        {props.data}
     </div>
  );
}
