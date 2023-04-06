import { type FileBlockProps } from '@githubnext/blocks'

// TODO(HiDeoo) error boundary
export default function App({ content }: FileBlockProps) {
  // FIXME(HiDeoo)
  console.error('🚨 [App.tsx:5] content:', content)

  return <div>Hello</div>
}
