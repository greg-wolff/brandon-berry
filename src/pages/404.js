import React from 'react'
import styled from 'styled-components'

const ErrorText = styled.div `
  width: 100vw;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 3em;
`

const NotFoundPage = props => (
  <ErrorText>
    <p>404 — Page Not Found</p>
  </ErrorText>
)

export default NotFoundPage
