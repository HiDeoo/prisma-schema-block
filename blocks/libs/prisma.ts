import { type Block, type Enum, type Field, getSchema, type Model } from '@mrleebo/prisma-ast'

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
  const properties: ModelData['properties'] = {}

  for (const property of definition.properties) {
    // TODO(HiDeoo) export declare type Property = GroupedModelAttribute | ModelAttribute | Field;
    if (property.type === 'field') {
      properties[property.name] = {
        isTarget: false,
        name: property.name,
        type: getPropertyType(property),
      }
    }

    // TODO(HiDeoo) attributes
  }

  return { name: definition.name, properties, type: 'model' }
}

function getPropertyType(property: Field) {
  const type =
    typeof property.fieldType === 'string'
      ? property.fieldType
      : `${property.fieldType.name}(${property.fieldType.params.join(', ')})`

  return `${type}${property.array ? '[]' : ''}${property.optional ? '?' : ''}`
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
  name: string
  properties: Record<ModelPropertyData['name'], ModelPropertyData>
  type: 'model'
}

export interface ModelPropertyData {
  isTarget: boolean
  name: string
  type: string
}
