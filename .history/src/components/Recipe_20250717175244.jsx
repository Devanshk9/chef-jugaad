import ReactMarkdown from 'react-markdown'


export default function Recipe(props) {
    return (
        <section className='recipe'>
            <ReactMarkdown className="markdown-body">{props.recipe}
            </ReactMarkdown>
        </section>
    )
}