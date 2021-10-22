import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import PhotoBlock from '../components/PhotoBlock'; 
import { isMobile } from 'react-device-detect'
import Img from 'gatsby-image'
import media from '../utils/media'

const AboutLayout = styled.div`
  display: grid;
  width: 100%;
  height: calc(100vh - 35px);
  grid-template-columns: .5fr .5fr;
  align-items: center;
  margin: 35px auto 0;
  ${media.tablet`
    grid-template-columns: 1fr;
    overflow: hidden;
    height: initial;
  `}
  >div:first-child {
    padding: 0 90px;
    ${media.tablet`
      padding: 0;
    `}
  }
`

const AboutText = styled(ReactMarkdown)`
  color: white;
  margin: 0 17px;
`

const AboutCollage = styled.div`
  display: grid;
  display: grid;
  grid-template-rows: .5fr .5fr;
  grid-template-columns: .5fr .5fr;
  padding: 0 3vw;
  grid-gap: 5vw 0;
  align-items: center;
  justify-items: center;
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
        { data.allContentfulAboutPage.edges.map(({ node }) =>
          isMobile ? 
            <AboutLayout key={i}>
              <Img fluid={node.aboutImage.fluid} />
              <AboutText>{node.aboutText.aboutText}</AboutText>
            </AboutLayout> : 
            <AboutLayout key={i}>
              <AboutText>{node.aboutText.aboutText}</AboutText>
              <AboutCollage>
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
              </AboutCollage>
            </AboutLayout>
        )}
        
    </div>
    )}/>
)

export default AboutPage
