import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import PlaySvg from '../assets/images/play2x.svg'
import PauseSvg from '../assets/images/pause2x.svg'

const PlayCursor = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-items: center;
  cursor: url(${props => props.playing ? PauseSvg : PlaySvg}) 18 25, auto;
`

const HoverPlay = props => (
      <PlayCursor playing={props.playing && (props.mixName === props.currentName)} onClick={() =>
        props.playing && (props.mixName === props.currentName) ? 
        props.dispatch({ type: `PAUSE` }) :
        props.dispatch({ type: `PLAY`,
          currentFile: props.mixFile,
          currentName: props.mixName
        })}>
        {props.children}
      </PlayCursor>
    )

const mapStateToProps = ({ playing, currentFile, currentName }) => {
  return { playing, currentFile, currentName }
}

export default connect(
  mapStateToProps
)(HoverPlay)
