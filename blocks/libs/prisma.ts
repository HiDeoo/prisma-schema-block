import { type Block, type Enum, getSchema, type Model } from '@mrleebo/prisma-ast'

export function getDefinitionsFromSchema(source: string): Definition[] {
  // TODO(HiDeoo) parse error handling
  const schema = getSchema(source)

  return schema.list.filter(isDefinition)
}

function isDefinition(block: Block): block is Definition {
  return block.type === 'enum' || block.type === 'model'
}

type Definition = Enum | Model
