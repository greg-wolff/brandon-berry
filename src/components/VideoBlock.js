import React, { Component } from 'react'
import styled from 'styled-components'
import media from '../utils/media'
import Draggable from 'react-draggable'; 

const VideoContainer = styled.video`  
  cursor: grab;
  width: 266px;
  max-height: 200px;
  box-shadow: 6px 8px 4px rgba(0, 0, 0, 0.5);
  border: 1px solid #000;
  color: #000;
  text-decoration: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
  transform: translateY(0);
  &:hover {
    transform: translateY(-2px);
  }
  &:active {
    cursor: grabbing;
  }
  margin: ${props => props.pos};
  ${media.tablet`
    margin: 30px auto;
    &:first-of-type {
      margin-top: 60px;
    }
  `}
`

export default class VideoBlock extends Component {
  state = {
    loaded: false,
    pos: null
  }
  generateMargin = (x, mt=60, mb='', x2) => `${mt}px calc(${x2 || x}% - ${(x > 40 ? 350 : -33)}px) ${mb}${mb && 'px'}`
  componentWillMount() {
    switch(this.props.index) {
      case 0: 
      this.setState({ pos: this.generateMargin(0, 20, '', 80) })
      break;
    case 1: 
      this.setState({ pos: this.generateMargin(65, 20) })
      break;
    default: this.setState({ pos: this.generateMargin((this.props.index % 2 === 0) ? Math.floor(Math.random() * 31) : (Math.floor(Math.random() * 31) + 71), 60, 20) })
    }
  }
  render() {
    const draggableFix = this.props.index % 2 === 0 ? {zIndex: '99', position: 'absolute', top: (this.props.index * 360), left: 0} : {zIndex: '99', position: 'absolute', top: (this.props.index * 360), right: 0}
    return (
       <Draggable>
        <div style={draggableFix}>
          <VideoContainer pos={this.state.pos} muted autoPlay loop>
            <source src={this.props.video.file.url} type="video/mp4"/>
            Your browser can't play videos! :(
          </VideoContainer>
        </div>
      </Draggable>
    )
  }
}
