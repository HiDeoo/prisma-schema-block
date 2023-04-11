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

  return { name: definition.name, values }
}

function getModelData(definition: Model): ModelData {
  const values: ModelData['values'] = []

  for (const property of definition.properties) {
    // TODO(HiDeoo) export declare type Property = GroupedModelAttribute | ModelAttribute | Field;
    if (property.type === 'field') {
      values.push(property.name)
    }
  }

  return { name: definition.name, values }
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
  name: string
  values: string[]
}

export interface ModelData {
  name: string
  // TODO(HiDeoo)
  values: string[]
}
