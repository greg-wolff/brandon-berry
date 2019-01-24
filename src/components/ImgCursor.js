import React, { Component } from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { isMobile   } from 'react-device-detect'

const HoverImg = styled(Img)`
  position: absolute;
  left: calc(${props => props.x}px - 382px);
  top: ${props => props.y}px;
  mix-blend-mode: difference;
  transition: all 0.2s ease;
`;

export default class ImgCursor extends Component {
  state = { 
    active: this.props.active,
    pics: this.props.fluid,
    placed: isMobile ? true : false,
    x: 0,
    y: 0 
  }
  componentDidMount = () => {
    if (!isMobile) document.onmousemove = el => {
      !this.state.placed && this.state.active &&
      this.setState({ 
        x: el.clientX, 
        y: el.clientY,
    })
    document.onclick = () => this.setState({ placed: true })
  }
  
}
  render() {
    return (
      <HoverImg fluid={this.state.pics}
        backgroundColor={this.props.backgroundColor}
        fadeIn={this.props.fadeIn}
        x={this.state.x}
        y={this.state.y}
      />
    )
  }
}
