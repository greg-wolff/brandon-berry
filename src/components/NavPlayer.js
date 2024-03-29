import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux'
import media from '../utils/media'

import PlaySvg from '../assets/images/play-white.svg'
import PauseSvg from '../assets/images/pause-white.svg'

const MarqueeDisplay = styled.div`
  width: 450px;
	line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  box-sizing: border-box;
  color: white;
  &:hover {
    cursor: url(${props => props.playing ? PauseSvg : PlaySvg}) 6 8, auto;
  }
  ${media.tablet`
    width: 220px;
  `}
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
