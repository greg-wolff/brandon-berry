import React from 'react'
import { connect } from 'react-redux'
import { StaticQuery, graphql } from 'gatsby'
import Cd from '../components/Cd'
import moment from 'moment'
import PhotoBlock from '../components/PhotoBlock';
import VideoBlock from '../components/VideoBlock';
import { isMobile } from 'react-device-detect';

Object.defineProperty(Array.prototype, 'flat', {
  value: function(depth = 1) {
    return this.reduce(function (flat, toFlatten) {
      return flat.concat((Array.isArray(toFlatten) && (depth-1)) ? toFlatten.flat(depth-1) : toFlatten);
    }, []);
  }
});
let j = 0
class IndexPage extends React.Component {
  render() {
    j = 0
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
                    ...GatsbyContentfulFluid
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
                  title
                  fluid(maxWidth: 374, maxHeight: 374) {
                    ...GatsbyContentfulFluid
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
      render={data => {
        let largest = data.allContentfulImage.edges.length > data.allContentfulVideo.edges.length ? data.allContentfulImage.edges.filter(el => !el.node.images[0].title.includes("aboutPage")) : data.allContentfulVideo.edges;
        let smallest = data.allContentfulImage.edges.length > data.allContentfulVideo.edges.length ? data.allContentfulVideo.edges : data.allContentfulImage.edges.filter(el => !el.node.images[0].title.includes("aboutPage"));
        console.log(largest, smallest)
        return (
        <main className="animated fadeInUp">
          { data.allContentfulMix.edges.sort((a,b) => moment.utc(a.node.date).diff(moment.utc(b.node.date))).slice(0).reverse().map(({ node }, i, arr) => {
              return (
                <Cd key={node.id}
                  mix={node.fields.slug}
                  date={node.date}
                  img={node.thumbnailImage}
                  title={node.title}
                  mixFile={node.mixFile && (node.mixFile.file.url || "")}
                  mixName={node.mixFile && (node.title || "")}
                  index={i}
                />
              )
            }
          )
          }
          { largest.map((v, i) => [smallest[i], v]).flat().filter(u => u !== undefined).map(({node}) => {
            if (!isMobile && node.video)
              return <VideoBlock key={j}
                video={node.video}
                index={j++} />
            if (!isMobile && node.images && !node.images[0].title.includes("aboutPage"))
              return <PhotoBlock key={j}
              last={node.images[0].title === `fallig`}
              img={node.images}
              index={j++}
              />
            else return null
          })
          }
        </main>
        )
      }}
    />
  )
}
}

const mapStateToProps = ({ currentFile, currentName }) => {
  return { currentFile, currentName }
}

export default connect(
  mapStateToProps
)(IndexPage)
