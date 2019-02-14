import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactHowler from 'react-howler'
const uuidv4 = require('uuid/v4');

class Player extends Component {
  constructor(props) {
    super(props)
    this.player = React.createRef()
  }

  getHowler () {
    return this.player
  }

  getDuration () {
    return this.player.current.duration()
  }

  getSeek () {
    return this.player.current.seek()
  }

  setSeek () {
    this.player.current.seek(this.props.status*this.getDuration())
  }
  componentDidMount() {
    // this.props.dispatch({ type: `SEEK`, status: (this.getSeek()/this.getDuration())})
    this.interval = setInterval(() => {
      this.props.playing ? this.props.dispatch({ 
        type: `SEEK`, 
        status: (this.getSeek()/this.getDuration())
      }) : this.setSeek()
    }, 2000)
    setInterval(() => console.log(`STATUS: ${this.props.status}
    PLAYING: ${this.props.playing}
    CURRENTFILE: ${this.props.currentFile}`), 10)
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {

    return (
      <ReactHowler
        id={uuidv4()}
        src={`http:${this.props.currentFile}`}
        playing={this.props.playing}
        ref={this.player}
        html5
      />
    )
  }
}

const mapStateToProps = ({ playing, currentFile, currentName, status }) => {
  return { playing, currentFile, currentName, status }
}

export default connect(
  mapStateToProps
)(Player)
