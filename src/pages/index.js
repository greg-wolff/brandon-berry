import React from 'react'
import { connect } from 'react-redux'
import { StaticQuery, graphql } from 'gatsby'
import Cd from '../components/Cd'
import moment from 'moment'
import PhotoBlock from '../components/PhotoBlock';
import VideoBlock from '../components/VideoBlock';

Object.defineProperty(Array.prototype, 'flat', {
  value: function(depth = 1) {
    return this.reduce(function (flat, toFlatten) {
      return flat.concat((Array.isArray(toFlatten) && (depth-1)) ? toFlatten.flat(depth-1) : toFlatten);
    }, []);
  }
});

class IndexPage extends React.Component {
  render() {
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
      render={data => (
        <main className="animated fadeInUp">
          { data.allContentfulMix.edges.sort((a,b) => moment.utc(a.node.date).diff(moment.utc(b.node.date))).slice(0).reverse().map(({ node }, i, arr) => {
              return (
                <Cd key={node.id}
                  mix={node.fields.slug}
                  date={node.date}
                  img={node.thumbnailImage}
                  title={`${arr.length-i}. ${node.title}`}
                  mixFile={node.mixFile && (node.mixFile.file.url || "")}
                  mixName={node.mixFile && (node.mixFile.file.fileName || "")}
                  index={i}
                />
              )
            }
          )
          }
          { data.allContentfulImage.edges.map((v, i) => [v, data.allContentfulVideo.edges[i]]).flat().filter(u => u !== undefined).map(({node}, i) => {   
          if (node.video)
            return <VideoBlock key={i}
              video={node.video}
              index={i} />
            console.log(node.images)
          if (node.images && !node.images[0].title.includes("img01"))
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
}

const mapStateToProps = ({ currentFile, currentName }) => {
  return { currentFile, currentName }
}

export default connect(
  mapStateToProps
)(IndexPage)
