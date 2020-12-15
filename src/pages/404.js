import React from "react"
import { styled } from "linaria/react"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function NotFoundPage() {
  const emojis = [
    "\\(o_o)/",
    "(o^^)o",
    "(˚Δ˚)b",
    "(^-^*)",
    "(≥o≤)",
    "(^_^)b",
    "(·_·)",
    "(='X'=)",
    "(>_<)",
    "(;-;)",
    "\\(^Д^)/",
    "_(:з」∠)_",
  ]

  return (
    <Layout>
      <SEO title="404: Not found" />
      <NotFound>
        <h1>{emojis[Math.floor(Math.random() * emojis.length)]}</h1>
        <p>/* 404 page not found. */</p>
        <p>
          <a
            href="#"
            onClick={() => {
              window.history.back()
            }}
          >
            ↑ Go Back ↑
          </a>
        </p>
      </NotFound>
    </Layout>
  )
}

const NotFound = styled.div`
  font-size: 3em;
  transform: translateY(30vh);
  text-align: center;
`
