import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactHowler from 'react-howler'
const uuidv4 = require('uuid/v4');

class Player extends Component {
  render() {
    return (
      <ReactHowler
        id={uuidv4()}
        src={`http:${this.props.currentFile}`}
        playing={this.props.playing}
        html5
      />
    )
  }
}

const mapStateToProps = ({ playing, currentFile, currentName }) => {
  return { playing, currentFile, currentName }
}

export default connect(
  mapStateToProps
)(Player)
