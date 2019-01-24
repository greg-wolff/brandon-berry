import React, { Component } from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import media from '../utils/media'
import Draggable from 'react-draggable'; 
import { isMobile } from 'react-device-detect';

const VideoContainer = styled.video`  
  min-width: 150px;
  height: 150px;
  box-shadow: 6px 8px 4px rgba(0, 0, 0, 0.5);
  border: 1px solid #000;
  color: #000;
  text-decoration: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
  transform: translateY(0);
  &:hover {
    transform: translateY(-2px);
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
  generateMargin = (x, mt=60, mb='') => `${mt}px calc(${x}% - ${(x > 40 ? 400 : -53)}px) ${mb}${mb && 'px'}`
  componentDidMount() {
    switch(this.props.index) {
      case 0: 
        this.setState({ pos: this.generateMargin(20) })
        break;
      case 1: 
        this.setState({ pos: this.generateMargin(95) })
        break;
      default: this.setState({ pos: this.generateMargin((this.props.index % 2 == 0) ? Math.floor(Math.random() * 31) : (Math.floor(Math.random() * 31) + 71)) })
    }
  }
  render() {
    const draggableFix = this.props.index % 2 == 0 ? {zIndex: '99', position: 'absolute', top: (this.props.index * 400), left: 0} : {zIndex: '99', position: 'absolute', top: (this.props.index * 400), right: 0}
    return (
      <Draggable>
        <div style={draggableFix}>
          <VideoContainer pos={this.state.pos} muted autoPlay>
            <source src={this.props.video.file.url} type="video/mp4"/>
          </VideoContainer>
        </div>
      </Draggable>
    )
  }
}
