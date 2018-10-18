import React from 'react'
import styled from 'styled-components'

import Layout from "../components/layout"

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
  <Layout location={props.location}>
    <ErrorText>
      <p>404 — Page Not Found</p>
    </ErrorText>
  </Layout>
)

export default NotFoundPage
