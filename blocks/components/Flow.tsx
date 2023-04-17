import 'reactflow/dist/style.css'

import { ReactFlowProvider } from 'reactflow'

import { getDefinitionsFromSchema } from '../libs/prisma'

import { Schema } from './Schema'

export function Flow({ schema }: FlowProps) {
  const definitions = getDefinitionsFromSchema(schema)

  return (
    <ReactFlowProvider>
      <Schema definitions={definitions} />
    </ReactFlowProvider>
  )
}

interface FlowProps {
  schema: string
}
