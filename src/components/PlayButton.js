import React, { Component } from 'react'
import PropTypes from "prop-types"
import styled from 'styled-components'
import { connect } from "react-redux"

import PlaySvg from '../assets/images/play.svg'
import PauseSvg from '../assets/images/pause.svg'

const Play = styled.img`
  padding: 13px 0;
`

class PlayButton extends Component {
  handleClick = (e) => {
    e.preventDefault();
    return (this.props.playing ? this.props.pause : this.props.play);
  }
  render() {
    return (
      <Play src={this.props.mixName === this.props.currName ? PauseSvg : PlaySvg} onClick={this.props.play}/>
    )
  }
}

PlayButton.propTypes = {
  playing: PropTypes.bool.isRequired,
  currentFile: PropTypes.string.isRequired,
  currentName: PropTypes.string.isRequired,
  mixFile: PropTypes.string.isRequired,
  mixName: PropTypes.string.isRequired
}

const mapStateToProps = ({ playing, currentFile, currentName }) => {
  return { playing, currentFile, currentName }
}

const mapDispatchToProps = dispatch => {
  return {
    play: () => dispatch({ type: `PLAY` }),
    pause: () => dispatch({ type: `PAUSE`})
  }
}

// const ConnectedAudio = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(PlayButton)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayButton)
