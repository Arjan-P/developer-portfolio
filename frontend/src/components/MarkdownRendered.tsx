import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProp {
  markdown: string;
}

export default function MarkdownRendered({ markdown } : MarkdownRendererProp) {
  return <ReactMarkdown>{markdown}</ReactMarkdown> 
}
