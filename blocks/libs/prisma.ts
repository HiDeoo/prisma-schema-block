import { type Block, type Enum, getSchema, type Model } from '@mrleebo/prisma-ast'

export function getDefinitionsFromSchema(source: string): Definition[] {
  // TODO(HiDeoo) parse error handling
  const schema = getSchema(source)

  return schema.list.filter(isDefinition)
}

export function getDefinitionData(definition: Definition): DefinitionData {
  return isEnum(definition) ? getEnumData(definition) : getModelData(definition)
}

function getEnumData(definition: Enum): EnumData {
  const values: EnumData['values'] = []

  for (const enumerator of definition.enumerators) {
    if (enumerator.type === 'enumerator') {
      values.push(enumerator.name)
    }
  }

  return { isSource: false, name: definition.name, type: 'enum', values }
}

function getModelData(definition: Model): ModelData {
  const columns: ModelData['columns'] = {}

  for (const property of definition.properties) {
    // TODO(HiDeoo) export declare type Property = GroupedModelAttribute | ModelAttribute | Field;
    if (property.type === 'field') {
      // TODO(HiDeoo) fieldType: string | Func;
      columns[property.name] = {
        isTarget: false,
        name: property.name,
        // TODO(HiDeoo) remove as string cast
        type: property.fieldType as string,
      }
    }
  }

  return { columns, name: definition.name, type: 'model' }
}

function isEnum(block: Block): block is Enum {
  return block.type === 'enum'
}

function isModel(block: Block): block is Model {
  return block.type === 'model'
}

function isDefinition(block: Block): block is Definition {
  return isEnum(block) || isModel(block)
}

export type Definition = Enum | Model
export type DefinitionData = EnumData | ModelData

export interface EnumData {
  isSource: boolean
  name: string
  type: 'enum'
  values: string[]
}

export interface ModelData {
  columns: Record<ModelColumnData['name'], ModelColumnData>
  name: string
  type: 'model'
}

export interface ModelColumnData {
  isTarget: boolean
  name: string
  type: string
}
