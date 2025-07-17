import React from 'react'
import ReactDom from 'react-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function Recipe(recipe) {
    const markdown = {props.recipe}
    return (
        <section>
            {props.recipe}
        </section>
    )
}