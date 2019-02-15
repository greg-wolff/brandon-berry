import React from 'react'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import styled from 'styled-components'
import HoverPlay from '../components/HoverPlay'
import moment from 'moment'
import media from '../utils/media'
import { isBrowser } from 'react-device-detect'

const DetailLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  background: white;
  height: calc(100vh - 35px);
  width: 100vw;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  ${media.tablet`
    grid-template-columns: 1fr;
    grid-template-rows: .8fr .2fr;
  `}
`

const MixColumn = styled.div`
  border-right: 1px solid #000;
  display: grid;
  flex-direction: column;
  grid-template: .7fr .3fr / 1fr;
  align-items: center;
  justify-items: center;
  position: sticky;
  top: 0;
  height: calc(100vh - 36px);
  ${media.tablet`
    position: initial;
    top: initial;
    height: initial;
    border-right: none;
  `}
`

const NextMix = styled(Link)`
  width: 100%;
  height: 100%;
  padding: 0 60px;
  box-sizing: border-box;
  display: grid;
  align-items: center;
  justify-items: center;
  text-align: center;
  border-top: 1px solid #000;
  text-decoration: none;
  color: #000;
  &:hover {
    text-decoration: underline;
  }
  ${media.tablet`
    border-bottom: 1px solid #000;
    padding: 15px 85px;
  `}
`

const PocketRecord = styled.div`
  display: grid;
  grid-auto-flow: column;
  text-align: left;
  align-items: center;
  .gatsby-image-wrapper {
    display: inline-block;
    width: 24px !important;
    margin-left: 8px;
    vertical-align: middle;
    border: 1px solid black;
  }
  ${media.tablet`
    justify-items: center;
    grid-auto-flow: row;
    text-align: center;
    .gatsby-image-wrapper {
      margin-top: 8px;
      width: 32px !important;
      border-radius: 17px;
      margin-left: 0;
      &:before {
        content: "";
        width: 14px;
        height: 14px;
        display: block;
        position: absolute;
        border-radius: 50%;
        background: #ffffffb8;
        box-sizing: border-box;
        border: 1px solid #000;
        z-index: 99;
        top: calc(50% - 7px);
        left: calc(50% - 7px);
      }
      &:after {
        content: "";
        width: 6px;
        height: 6px;
        display: block;
        position: absolute;
        border-radius: 50%;
        background: white;
        box-sizing: border-box;
        border: 1px solid #000;
        z-index: 99;
        top: calc(50% - 3px);
        left: calc(50% - 3px);
      }
    }
  `}
`

const DetailColumn = styled.div`
  padding: 77px 52px;
  ${media.tablet`
    width: 100vw;
    box-sizing: border-box;
    padding: 42px;
  `}
`

const MixHeader = styled.div`
  font-size: 26pt;
  margin-bottom: 12pt;
  ${media.tablet`
    font-size: 22pt;
  `}
`

const MixLink = styled.a`
  font-size: 16pt;
  color: black;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  ${media.tablet`
    font-size: 13pt;
  `}
`

const MixTracklist = styled(ReactMarkdown)`
  margin-top: 50pt;
  thead {
    text-align: left;
  }
  tr {
    transition: background-color 0.1s ease;
    cursor: crosshair;
    &:hover {
      background-color: #d2eaff;
    }
  }
  ${media.tablet`
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    width: calc(100% + 32px);
    margin-left: -32px;
    border: 1px solid black;
    border-radius: 3px;
    padding: 25px 15px;
    table {
      width: 100%
    }
  `}
`

const Platter = styled(Img)`
  width: 220px;
  height: 220px;
  border: 1px solid #000;
  border-radius: 50%;
  background: #fff;
  animation: ${props => props.playing ? 'spin 10s linear infinite' : 'spin 10s linear infinite paused'};
  @keyframes spin {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  &:before {
    content: "";
    width: 50px;
    height: 50px;
    display: block;
    position: absolute;
    border-radius: 50%;
    background: #ffffffb8;
    box-sizing: border-box;
    border: 1px solid #000;
    z-index: 99;
    top: calc(50% - 25px);
    left: calc(50% - 25px);
  }
  &:after {
    content: "";
    width: 14px;
    height: 14px;
    display: block;
    position: absolute;
    border-radius: 50%;
    background: white;
    box-sizing: border-box;
    border: 1px solid #000;
    z-index: 99;
    top: calc(50% - 7px);
    left: calc(50% - 7px);
  }
`

const RecordBox = styled.div`
  width: 248px;
  height: 248px;
  border: 1px solid #000;
  display: grid;
  align-items: center;
  justify-items: center;
  ${media.tablet`
    margin: 60px 0;
  `}
`

const RecordLabel = styled.span`
  background: white;
  border: 1px solid #000;
  border-radius: 4px;
  padding: 3px 7px;
  text-transform: uppercase;
  position: absolute;
  margin-top: 80px;
  ${media.tablet`
    margin-top: 0;
    position: relative;
    bottom: 43px;
  `}
`

const Arrow = styled.span`
  display: block;
  margin-bottom: 32px;
  color: #000;
  font-family: "Times New Roman";
  font-size: 24pt;
  user-select: none;
  cursor: pointer;
`

const ProjectInfo = props => {
  return (
    <DetailLayout>
      <MixColumn>
        <HoverPlay mixName={props.mixName} mixFile={props.mixFile}>
          <RecordBox>
          {(props.img && props.mixFile) ? <Platter fluid={props.img.fluid}
              backgroundColor={"#ffffff"}
              playing={props.playing}
              fadeIn={true}/> : <div>x___x</div>
            }
          </RecordBox>
          {props.mixes.some((el, i) => ((el.title === props.title) && (i === props.mixes.length-1))) && <RecordLabel>Newest Mix!</RecordLabel>}
        </HoverPlay>
        {props.mixes.some((el, i) => ((el.title === props.title) && (i === props.mixes.length-1))) ? 
        <NextMix to={props.slug}>
          {props.nextMix}
        </NextMix> :
        <NextMix to={props.mixes.slice(0).reverse().find((e, i, arr) => arr[i+1].title === props.title).fields.slug}>
          <div><div>Next Mix...</div><PocketRecord>{props.mixes.slice(0).reverse().find((e, i, arr) => arr[i+1].title === props.title).title}<Img fluid={props.mixes.slice(0).reverse().find((e, i, arr) => arr[i+1].title === props.title).thumbnailImage.fluid}/></PocketRecord></div>
        </NextMix>
        }
      </MixColumn>
      <DetailColumn>
        {isBrowser && <Arrow onClick={() => window.history.back()}>←</Arrow>}
        <MixHeader>{props.date}<br/>{props.title}</MixHeader>
        <MixLink href={`https:${props.mixFile}`} download={props.mixName}>Download Mix</MixLink>
        <MixTracklist source={props.trackList.tracklist}/>
      </DetailColumn>
    </DetailLayout>
  );
};

class MixPage extends React.Component {
  render() {
    return (
      <ProjectInfo
        slug={this.props.data.contentfulMix.fields.slug || ''}
        title={this.props.data.contentfulMix.title || ''}
        date={moment(this.props.data.contentfulMix.date).format('MMMM DD, YYYY') || ''}
        img={this.props.data.contentfulMix.thumbnailImage}
        mixName={(this.props.data.contentfulMix.mixFile !== null) && this.props.data.contentfulMix.title || ''}
        mixFile={(this.props.data.contentfulMix.mixFile !== null) && this.props.data.contentfulMix.mixFile.file.url || undefined}
        trackList={this.props.data.contentfulMix.tracklist || ''}
        playing={this.props.playing && (this.props.currentName === (this.props.data.contentfulMix.mixFile && (this.props.data.contentfulMix.mixFile.file.fileName || "")))}
        mixes={this.props.data.allContentfulMix.edges.map(el => el.node, {}).sort((a,b) => moment.utc(a.date).diff(moment.utc(b.date)))}
        nextMix={this.props.data.allContentfulAboutPage.edges[0].node.nextMix.nextMix}
        dispatch={this.props.dispatch}
      />
    );
  }
}

export const query = graphql`
  query MixQuery($slug: String!) {
    allContentfulMix {
      edges {
        node {
          id
          title
          date
          fields {
            slug
          }
          thumbnailImage {
            id
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
          nextMix {
            nextMix
          }
        }
      }
    }
    contentfulMix(fields: { slug: { eq: $slug } }) {
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
      tracklist {
        id
        tracklist
      }
      fields {
        slug
      }
    }
  }
`

const mapStateToProps = ({ playing, currentFile, currentName }) => {
  return { playing, currentFile, currentName }
}

export default connect(
  mapStateToProps
)(MixPage)
