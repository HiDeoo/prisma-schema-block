import { type FileBlockProps } from '@githubnext/blocks'

import { ErrorBoundary } from './components/ErrorBoundary'
import { Flow } from './components/Flow'

import './App.css'

export default function App({ content }: FileBlockProps) {
  return (
    <div className="app">
      <ErrorBoundary>
        <Flow schema={content} />
      </ErrorBoundary>
    </div>
  )
}
