import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLink } from "@fortawesome/free-solid-svg-icons"
import React, { useState } from "react"
import { styled } from "linaria/react"
import {
  screenSmMin,
  lightPostLinkColor,
  lightPostLinkHoverColor,
  lightCodeNotclassBackgroundColor,
} from "../../styles/variables"
import { css, cx } from "linaria"
import { Link } from "gatsby"

export const Content = styled.div`
  margin-top: 2rem;
  p {
    font-size: 1em;
    margin: 0.5em 0;
  }
  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0.8em auto 0.3em;
  }
  ol,
  ul {
    padding-left: 1em;
  }
  & > ol,
  & > ul {
    padding-left: 2em;
  }
  blockquote {
    font: italic 14px/22px normal helvetica, serif, STSong;
    margin: 10px 0 10px 2%;
    padding: 10px 10px 10px 15px;
    border-left: 3px solid #ccc;
    background-color: #f1f1f1;
    i,
    em {
      text-decoration: underline;
    }
  }
  del {
    text-decoration: line-through red;
    text-decoration-thickness: 0.125em;
  }
  a {
    color: ${lightPostLinkColor};
    &:hover {
      color: ${lightPostLinkHoverColor};
    }
  }
  code,
  deckgo-highlight-code {
    --font-family: "Fira Code", Consolas, Monaco, Menlo, Consolas, monospace;
    --deckgo-highlight-code-font-family: var(--font-family);
    font-family: var(--font-family);
  }
`

const useAnchor = (WrappedComponent, { children }) => {
  const [active, setActive] = useState("hide")
  const handleMouseOver = () => setActive(null)
  const handleMouseOut = () => setActive("hide")
  const anchorLink = children
    .replace(/(\s+)|([.,!?:;'\"\'-])/g, "-")
    .toLowerCase()
  const Beacon = css`
    position: relative;
    .hide {
      display: none;
    }
  `
  const Anchor = css`
    position: absolute;
    top: 50%;
    left: 0.75rem;
    transform: translateY(-50%);
    right: -2rem;
    color: #161209;
  `
  return (
    <WrappedComponent
      id={anchorLink}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {children}
      <span className={Beacon}>
        <Link className={cx(Anchor, active)} to={`#${anchorLink}`}>
          <FontAwesomeIcon icon={faLink} size="xs" flip="horizontal" />
        </Link>
      </span>
    </WrappedComponent>
  )
}

const H1Anchor = props => useAnchor(`h1`, props)

const H2Anchor = props =>
  useAnchor(
    styled.h2`
      &::before {
        content: "#";
        margin-right: 5px;
        color: ${lightPostLinkColor};
      }
    `,
    props
  )

const H3Anchor = props =>
  useAnchor(
    styled.h3`
      &::before {
        content: "|";
        margin-right: 5px;
        color: ${lightPostLinkColor};
      }
    `,
    props
  )

const H4Anchor = props => useAnchor(`h4`, props)

const Table = props => {
  const style = css`
    width: 90%;
    margin: 10px auto;
    overflow-x: auto;
    box-shadow: 2px 2px 3px #00000020;
    table {
      border-spacing: 0;
      width: 100%;
      th,
      td {
        padding: 5px 15px;
        border: 1px double #dfe2e5;
      }
      tr:nth-child(even),
      thead {
        background-color: #f8f8f8;
      }
      td {
        word-break: break-word;
        text-align: center;
      }
    }
    @media (max-width: ${screenSmMin}) {
      width: 100%;
      table {
        min-width: 360px;
      }
    }
  `
  return (
    <div className={style}>
      <table {...props} />
    </div>
  )
}

const InlineCode = styled.code`
  padding: 1px 6px;
  margin: 0 2px;
  background: ${lightCodeNotclassBackgroundColor};
  border-radius: 5px;
  font-size: 0.9em;
`

const Image = props => {
  const style = css`
    display: block;
    min-width: 90%;
    max-width: 100%;
    height: auto;
    margin: 0 auto;
    overflow: hidden;
  `
  return <img className={style} decoding="async" loading="lazy" {...props} />
}

const components = {
  h1: H1Anchor,
  h2: H2Anchor,
  h3: H3Anchor,
  h4: H4Anchor,
  table: Table,
  inlineCode: InlineCode,
  img: Image,
}

export default components
