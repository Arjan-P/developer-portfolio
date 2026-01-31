import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProp {
  markdown: string;
}

export default function MarkdownRendered({ markdown }: MarkdownRendererProp) {
  return (
    <div className='markdown'>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
