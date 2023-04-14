import 'reactflow/dist/style.css'

import { type FileBlockProps } from '@githubnext/blocks'
import { ReactFlowProvider } from 'reactflow'

import { Schema } from './components/Schema'
import { getDefinitionsFromSchema } from './libs/prisma'

import './App.css'

// TODO(HiDeoo) error boundary
// TODO(HiDeoo) viewport
// TODO(HiDeoo) loading / suspense
export default function App({ content }: FileBlockProps) {
  const definitions = getDefinitionsFromSchema(content)

  // FIXME(HiDeoo)
  console.error('🚨 [App.tsx:11] definitions:', definitions)

  return (
    <ReactFlowProvider>
      {/* // TODO(HiDeoo)  */}
      <div style={{ width: '100vw', height: '100vh' }}>
        <Schema definitions={definitions} />
      </div>
    </ReactFlowProvider>
  )
}
