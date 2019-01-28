import React, { Component } from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import media from '../utils/media'
import Draggable from 'react-draggable'; 
import { isMobile } from 'react-device-detect';

import PlayButton from '../components/PlayButton'

var moment = require('moment');

const CdCase = styled(Link)`
  width: 347px;
  height: 303px;
  box-shadow: 6px 8px 4px rgba(0, 0, 0, 0.5);
  border: 1px solid #000;
  display: grid;
  grid-template-columns: .12fr .88fr;
  color: #000;
  text-decoration: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
  transform: translateY(0);
  >div {
    background: rgba(255, 255, 255, 0.5);
  }
  /* img {
    opacity: 0.5 !important;
  } */
  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-2px);
    /* img {
      opacity: 1 !important;
    } */
  }
  margin: ${props => props.pos};
  ${media.tablet`
    >div {
      background: #fff;
    }
    margin: 30px auto;
    &:first-of-type {
      margin-top: 60px;
    }
  `}
`

const Spine = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid #000;
`

const Insert = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-rows: .75fr .25fr;
  .gatsby-image-wrapper {
    width: 187px;
  }
`

const Title = styled.div`
  font-size: 23px;
  align-self: start;
  text-align: center;
  padding: 0 5px;
`

const Date = styled.div`
  transform: rotate(-90deg);
  width: 40px;
  margin-bottom: 23px;
`

const ColorBlock = styled.div`
  width: 187px;
  height: 187px;
  background: ${props => props.bg};
`

const EmptyImg = props => (
  <ColorBlock bg={props.colors[Math.floor(Math.random() * props.colors.length)]}/>
)
export default class Cd extends Component {
  state = {
    loaded: false,
    pos: null
  }
  constructor(props) {
    super(props); 
    this.dragging = false;
    this._ref = React.createRef();
  }
  generateMargin = (x, mt=60, mb='') => `${mt}px calc(${x}% - ${(x > 40 ? 400 : -53)}px) ${mb}${mb && 'px'}`
  componentDidMount() {
    switch(this.props.index) {
      case 0: 
        this.setState({ pos: this.generateMargin(95, 80, 60) })
        break;
      case 1: 
        this.setState({ pos: this.generateMargin(6) })
        break;
      default: this.setState({ pos: this.generateMargin((this.props.index % 2 !== 0) ? Math.floor(Math.random() * 31) : (Math.floor(Math.random() * 31) + 71)) })
    }
  }
  onDrag = () => setTimeout(() => this.dragging = true, 100);
  onEndDrag = () => this.dragging ? setTimeout(() => this.dragging = false, 500) : this.dragging = false;
  checkClickPropagation = e => {
      if(this.dragging === true) {
          e.preventDefault();
          e.stopPropagation();
      }
  }
  render() {
    return (
      isMobile ? 
      <CdCase to={this.props.mix} pos={this.state.pos}>
        <Spine>
          <PlayButton 
            playing={false}
            currentFile={""}
            currentName={""}
            mixFile={this.props.mixFile}
            mixName={this.props.mixName} />
          <Date>
            {moment(this.props.date).format('MM/DD/YYYY')}
          </Date>
        </Spine>
        <Insert>
          {this.props.img ? <Img fluid={this.props.img.fluid}
          backgroundColor={"#eaeaea"}
          fadeIn={true} /> : <EmptyImg colors={['#FFF7CD', '#FFB35A', '#5D5AFF']}/>}
          <Title>{this.props.title}</Title>
        </Insert>
      </CdCase> :
      <Draggable onDrag={this.onDrag} onStop={this.onEndDrag}>
      <div>
        <CdCase to={this.props.mix} pos={this.state.pos} onClick={this.checkClickPropagation} innerRef={c => this._ref = c}>
          <Spine>
            <PlayButton 
              playing={false}
              currentFile={""}
              currentName={""}
              mixFile={this.props.mixFile}
              mixName={this.props.mixName} />
            <Date>
              {moment(this.props.date).format('MM/DD/YYYY')}
            </Date>
          </Spine>
          <Insert>
            {this.props.img ? <Img fluid={this.props.img.fluid}
            backgroundColor={"#eaeaea"}
            fadeIn={true} /> : <EmptyImg colors={['#FFF7CD', '#FFB35A', '#5D5AFF']}/>}
            <Title>{this.props.title}</Title>
          </Insert>
        </CdCase>
      </div>
      </Draggable>
    )
  }
}
