import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (props) => {

  return (
     <div>
        <ul data={props.data} />
     </div>
  );
}
