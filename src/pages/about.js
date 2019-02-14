import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const AboutLayout = styled.div`
  display: grid;
  width: 100%;
  height: 100vh;
  grid-template-columns: .5fr .5fr;
  align-items: center;
  margin: 40px auto;
  div {
    padding: 0 90px
  }
`

const AboutText = styled(ReactMarkdown)`
  color: black;
  margin: 0 17px;
`

/* 
  const wordClip = (s, wl=50) => {
   let flag = 0;
   return s.split("").map((el, i, arr) => { 
     ((flag >= wl) || (flag > (wl-20) && arr[i-1] === " ")) ? flag = 0 : flag++;
     return ((flag > (wl-20)) && (el === " ")) ? "\n" : el;
   }).join("");
  }
*/

const AboutPage = () => (
  <StaticQuery
    query={graphql`
    query AboutQuery {
      allContentfulAboutPage {
        edges {
          node {
            aboutText {
              aboutText
            }
            aboutImage {
              id
              fluid(maxWidth: 450) {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      }
    }
    `}
    render={data => (
      <div>
        { data.allContentfulAboutPage.edges.map(({ node }) =>
        <AboutLayout>
          <AboutText>{node.aboutText.aboutText}</AboutText>
          <Img fluid={node.aboutImage.fluid} />
        </AboutLayout>
        )}
    </div>
    )}/>
)

export default AboutPage
