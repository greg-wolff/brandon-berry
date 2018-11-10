import React, { Component } from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'

const HoverImg = styled(Img)`
  position: absolute;
  left: calc(${props => props.x}px - 382px);
  top: ${props => props.y}px;
  mix-blend-mode: difference;
`;

export default class ImgCursor extends Component {
  state = { 
    active: this.props.active,
    pics: this.props.fluid,
    placed: false,
    x: 0,
    y: 0 
  }
  componentDidMount = () => {
    document.onmousemove = el => {
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
