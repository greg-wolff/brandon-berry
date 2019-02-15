import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import PhotoBlock from '../components/PhotoBlock';
import Img from 'gatsby-image'  
import media from '../utils/media'

const AboutLayout = styled.div`
  display: grid;
  width: 100%;
  height: 100vh;
  grid-template-columns: .5fr .5fr;
  align-items: center;
  margin: 40px auto;
  ${media.tablet`
    grid-template-columns: 1fr;
    overflow: hidden;
  `}
  >div:first-child {
    padding: 0 90px;
    ${media.tablet`
      padding: 0;
    `}
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
let i = 0
const AboutPage = () => (
  <StaticQuery
    query={graphql`
    query AboutQuery {
      allContentfulImage {
        edges {
          node {
            images {
              id
              title
              fluid(maxWidth: 374, maxHeight: 374) {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      }

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
        { data.allContentfulAboutPage.edges.map(({ node }, i) =>
        <AboutLayout key={i}>
          <AboutText>{node.aboutText.aboutText}</AboutText>
          {/* <Img fluid={node.aboutImage.fluid} /> */}
          { data.allContentfulImage.edges.map(({node}) => {   
            return (node.images && node.images[0].title.includes("aboutPage")) &&
            (
                <PhotoBlock key={i}
                  img={node.images}
                  index={`${i++}random_right`}
                />
              )
            })
          }
        </AboutLayout>
        )}
        
    </div>
    )}/>
)

export default AboutPage
