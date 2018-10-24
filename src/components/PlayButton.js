import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import PlaySvg from '../assets/images/play.svg'
import PauseSvg from '../assets/images/pause.svg'

const Play = styled.img`
  padding: 13px 0;
`

class PlayButton extends Component {
  handleClick = (e) => {
    e.preventDefault();
    return (
      this.props.playing && (this.props.mixName === this.props.currentName) ? 
      this.props.dispatch({ type: `PAUSE` }) : 
      this.props.dispatch({ type: `PLAY`,
        currentFile: this.props.mixFile,
        currentName: this.props.mixName
      }));
  }
  render() {
    return (
      <Play src={this.props.playing && (this.props.mixName === this.props.currentName) ? PauseSvg : PlaySvg} onClick={this.handleClick}/>
    )
  }
}

const mapStateToProps = ({ playing, currentFile, currentName }) => {
  return { playing, currentFile, currentName }
}

export default connect(
  mapStateToProps
)(PlayButton)
