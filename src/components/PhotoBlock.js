import React, { Component } from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import media from '../utils/media'
import Draggable from 'react-draggable'; 
import { isMobile, ConsoleView } from 'react-device-detect';

const PhotoContainer = styled.div`  
  width: 150px;
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

export default class PhotoBlock extends Component {
  state = {
    loaded: false,
    pos: null
  }
  generateMargin = (x, mt=60, mb='', x2) => `${mt}px calc(${x2 || x}% - ${(x > 50 ? 400 : -53)}px) ${mb}${mb && 'px'}`
  componentDidMount() {
    if (typeof this.props.index === "string")
      this.setState({ pos: this.generateMargin(0, 60, '', -(Math.floor((Math.random()*390)+50))) })
    else
      switch(this.props.index) {
        case 0: 
          this.setState({ pos: this.generateMargin(0, 60, '', 100) })
          break;
        case 1: 
          this.setState({ pos: this.generateMargin(95, 80, 60) })
          break;
        default: this.setState({ pos: this.generateMargin((this.props.index % 2 == 0) ? Math.floor(Math.random() * 31) : (Math.floor(Math.random() * 31) + 71)) })
      }
  }
  render() {
    const draggableFix = (typeof this.props.index !== "string") ? (this.props.index % 2 == 0 ? {zIndex: '99', position: 'absolute', top: (this.props.index * 400), left: 0} : {zIndex: '99', position: 'absolute', top: (this.props.index * 400), right: 0}) : {zIndex: '99', position: 'absolute', top: (Number(this.props.index.charAt(0)) * 200), right: 0 }
    return (
      !isMobile && <Draggable>
        <div style={draggableFix}>
          <PhotoContainer pos={this.state.pos}>
            {this.props.img && <Img fluid={this.props.img[0].fluid}
                backgroundColor={"#eaeaea"}
                fadeIn={true} />}
          </PhotoContainer>
        </div>
      </Draggable>
    )
  }
}
