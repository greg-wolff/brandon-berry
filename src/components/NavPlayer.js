import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux'

import PlaySvg from '../assets/images/play.svg'
import PauseSvg from '../assets/images/pause.svg'

const MarqueeDisplay = styled.div`
  width: 450px;
	line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  box-sizing: border-box;
  &:hover {
    cursor: url(${props => props.playing ? PauseSvg : PlaySvg}) 6 8, auto;
  }
`

const Marquee = styled.span`
  display: inline-block;
  padding-left: 100%;
  animation: ${props => props.playing ? 'marquee 10s linear infinite' : 'marquee 10s linear infinite paused'};
  @keyframes marquee {
    0%   { transform: translate(0, 0); }
    100% { transform: translate(-100%, 0); }
  }
`

const NavPlayer = props => (
  <MarqueeDisplay playing={props.playing} onClick={() =>
    props.playing ? 
    props.dispatch({ type: `PAUSE` }) :
    props.dispatch({ type: `PLAY`,
      currentFile: props.currentFile,
      currentName: props.currentName
    })
  }>
  <Marquee playing={props.playing}>{props.children}</Marquee>
  </MarqueeDisplay>
)

const mapStateToProps = ({ playing, currentFile, currentName }) => {
  return { playing, currentFile, currentName }
}

export default connect(
  mapStateToProps
)(NavPlayer)
