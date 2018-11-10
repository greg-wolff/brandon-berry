import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import ImgCursor from '../components/ImgCursor';

const AboutLayout = styled.div`
  display: grid;
  width: 40%;
  margin: 90px auto;
`

const AboutText = styled(ReactMarkdown)`
  width: 50%;
  transform: scale(1.5);
  color: red;
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
                ...GatsbyContentfulFluid_tracedSVG
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
          <ImgCursor fluid={node.aboutImage.fluid} 
            backgroundColor={"#eaeaea"}
            fadeIn={true}
            active={true}/>
          <AboutText>{node.aboutText.aboutText}</AboutText>
        </AboutLayout>
        )}
    </div>
    )}/>
)

export default AboutPage
