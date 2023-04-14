import {
  type Block,
  type Enum,
  type Field,
  type Func,
  getSchema,
  type KeyValue,
  type Model,
  type Value,
} from '@mrleebo/prisma-ast'

import { getNodeColor } from './color'

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

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- definition.enumerators can be undefined for empty enums.
  for (const enumerator of definition.enumerators ?? []) {
    if (enumerator.type === 'enumerator') {
      values.push(enumerator.name)
    }
  }

  return {
    color: getNodeColor(),
    isSource: false,
    name: definition.name,
    type: 'enum',
    values,
  }
}

function getModelData(definition: Model): ModelData {
  const properties: ModelData['properties'] = {}

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- definition.properties can be undefined for empty models.
  for (const property of definition.properties ?? []) {
    // TODO(HiDeoo) export declare type Property = GroupedModelAttribute | ModelAttribute | Field;
    if (property.type === 'field') {
      const data: ModelPropertyData = {
        isTarget: false,
        name: property.name,
        type: getPropertyType(property),
      }

      const defaultValue = getPropertyDefaultValue(property)

      if (defaultValue) {
        data.defaultValue = defaultValue
      }

      properties[property.name] = data
    }
  }

  return {
    color: getNodeColor(),
    isSource: false,
    name: definition.name,
    properties,
    type: 'model',
  }
}

function getPropertyType(property: Field) {
  const type = isFunc(property.fieldType) ? getFuncRepresentation(property.fieldType) : property.fieldType

  return {
    computed: `${type}${property.array ? '[]' : ''}${property.optional ? '?' : ''}`,
    raw: type,
  }
}

function getPropertyDefaultValue(property: Field) {
  const defaultArgument = property.attributes?.find((attribute) => attribute.name === 'default')?.args?.at(0)

  if (!defaultArgument) {
    return
  }

  if (isFunc(defaultArgument.value)) {
    return getFuncRepresentation(defaultArgument.value)
  } else if (
    typeof defaultArgument.value === 'string' ||
    typeof defaultArgument.value === 'number' ||
    typeof defaultArgument.value === 'boolean'
  ) {
    return `${defaultArgument.value}`
  }

  return
}

function getFuncRepresentation(func: Func) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- func.params can be undefined.
  return `${func.name}(${(func.params ?? []).join(', ')})`
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

function isFunc(value: KeyValue | Value): value is Func {
  return typeof value === 'object' && (value as { type?: string }).type === 'function'
}

export type Definition = Enum | Model
export type DefinitionData = EnumData | ModelData

export interface EnumData extends BaseData {
  type: 'enum'
  values: string[]
}

export interface ModelData extends BaseData {
  properties: Record<ModelPropertyData['name'], ModelPropertyData>
  type: 'model'
}

export interface ModelPropertyData {
  defaultValue?: string
  isTarget: boolean
  name: string
  type: {
    computed: string
    raw: string
  }
}

interface BaseData {
  color: string
  isSource: boolean
  name: string
  type: string
}
