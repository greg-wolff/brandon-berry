import React, { Component } from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import PlayButton from '../components/PlayButton'

var moment = require('moment');


const CdCase = styled.div`
  width: 347px;
  height: 303px;
  box-shadow: 6px 8px 4px rgba(0, 0, 0, 0.5);
  border: 1px solid #000;
  display: grid;
  grid-template-columns: .12fr .88fr;
  grid-gap: 1px;
  color: #000;
  text-decoration: none;
  >div {
    background: #fff;
  }
`

const CdBorder = styled.div`
  width: 347px;
  height: 303px;
  background-color: #000;
  margin: 90px auto;
`

const Spine = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Insert = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-rows: .75fr .25fr;
  .gatsby-image-outer-wrapper {
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
  render() {
    return (
      <CdBorder>
        <CdCase to='/'>
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
            {this.props.img ? <Img sizes={this.props.img.sizes}
            backgroundColor={"#eaeaea"}
            fadeIn={true}/> : <EmptyImg colors={['#FFF7CD', '#FFB35A', '#5D5AFF']}/>}
            <Title>{this.props.title}</Title>
          </Insert>
        </CdCase>
      </CdBorder>
    )
  }
}
