import 'reactflow/dist/style.css'

import { type FileBlockProps } from '@githubnext/blocks'
import { ReactFlow } from 'reactflow'

import { getDefinitionsFromSchema } from './libs/prisma'

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
]
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }]

// TODO(HiDeoo) error boundary
// TODO(HiDeoo) nis
export default function App({ content }: FileBlockProps) {
  const definitions = getDefinitionsFromSchema(content)

  console.error('🚨 [App.tsx:11] definitions:', definitions)

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow nodes={initialNodes} edges={initialEdges} />
    </div>
  )
}
