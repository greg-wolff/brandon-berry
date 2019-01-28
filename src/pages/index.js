import React from 'react'
import { connect } from 'react-redux'
import { StaticQuery, graphql } from 'gatsby'
import Cd from '../components/Cd'
import moment from 'moment'
import PhotoBlock from '../components/PhotoBlock';
import VideoBlock from '../components/VideoBlock';

const IndexPage = props => {
  return (
    <StaticQuery
      query={
        graphql`
        query HomepageQuery {
          allContentfulMix {
            edges {
              node {
                id
                title
                date
                mixFile {
                  id
                  file {
                    url
                    fileName
                    contentType
                  }
                }
                thumbnailImage {
                  id
                  fluid(maxWidth: 374, maxHeight: 374) {
                    ...GatsbyContentfulFluid_tracedSVG
                  }
                }
                fields {
                  slug
                }
              }
            }
          }
          allContentfulImage {
            edges {
              node {
                images {
                  id
                  fluid(maxWidth: 374, maxHeight: 374) {
                    ...GatsbyContentfulFluid_tracedSVG
                  }
                }
              }
            }
          }
          allContentfulVideo {
            edges {
              node {
                video {
                  id
                  file {
                    url
                  }
                }
              }
            }
          }
        }
      `
      
      }
      render={data => (
        <main className="animated fadeInUp">
          { data.allContentfulMix.edges.sort((a,b) => moment.utc(a.node.date).diff(moment.utc(b.node.date))).slice(0).reverse().map(({ node }, i, arr) =>
            <Cd key={node.id}
              mix={node.fields.slug}
              date={node.date}
              img={node.thumbnailImage}
              title={`${arr.length-i}. ${node.title}`}
              mixFile={node.mixFile && (node.mixFile.file.url || "")}
              mixName={node.mixFile && (node.mixFile.file.fileName || "")}
              index={i}
            />
          ) }
          { data.allContentfulImage.edges.map((v, i) => [v, data.allContentfulVideo.edges[i]]).flat().filter(u => u !== undefined).map(({node}, i) => {   
          if (node.video)
            return <VideoBlock key={i}
              video={node.video}
              index={i} />
          if (node.images)
            return <PhotoBlock key={i}
            img={node.images}
            index={i}
            />
          else return
          })
          }
        </main>
      )}
    />
  )
}

export default connect()(IndexPage)
