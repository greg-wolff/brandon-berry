import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import media from '../utils/media'

import PlaySvg from '../assets/images/play2x.svg'
import PauseSvg from '../assets/images/pause2x.svg'

const PlayCursor = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-items: center;
  cursor: url(${props => props.playing ? PauseSvg : PlaySvg}) 18 25, auto;
  color: white;
  ${media.tablet`
    &:before {
      content: "";
      background: url(${props => props.playing ? PauseSvg : PlaySvg}) #fff no-repeat center;
      background-position: ${props => props.playing ? `50% 50%` : `calc(50% + 4px) 50%`};
      background-size: ${props => props.playing ? `30px` : `initial`};
      width: 50px;
      height: 50px;
      border: 1px solid black;
      border-radius: 50%;
      padding: 25px;
      position: absolute;
      bottom: 30px;
      right: calc(50% - 52px);
      transform-origin: bottom right;
      transform: scale(0.8);
      z-index: 100;
      -webkit-transform: translate3d(0,0,0)
    }
  `}
`

class HoverPlay extends React.Component {
      state = {
        disable: true
      }
      componentDidMount() {
        {console.log('mounted')}
        {console.log(this.state.disable)}
      }
      render() {
        return <PlayCursor
            playing={this.props.playing && (this.props.mixName === this.props.currentName)}
            onMouseMove={e => {
              (e.target.classList.contains("noHover") || e.target.tagName == 'TD') ? this.setState({ disable: true }) : this.setState({ disable: false })
            }}
            onClick={() => {
              if (this.state.disable) return
              return this.props.playing && (this.props.mixName === this.props.currentName) ? 
              this.props.dispatch({ type: `PAUSE` }) :
              this.props.dispatch({ type: `PLAY`,
                currentFile: this.props.mixFile,
                currentName: this.props.mixName
              })}}
          >
            {this.props.children}
          </PlayCursor>
      }
}

const mapStateToProps = ({ playing, currentFile, currentName }) => {
  return { playing, currentFile, currentName }
}

export default connect(
  mapStateToProps
)(HoverPlay)
