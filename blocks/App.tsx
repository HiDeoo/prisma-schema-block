import { type FileBlockProps } from '@githubnext/blocks'

import { getDefinitionsFromSchema } from './libs/prisma'

// TODO(HiDeoo) error boundary
// TODO(HiDeoo) nis
export default function App({ content }: FileBlockProps) {
  const definitions = getDefinitionsFromSchema(content)

  console.error('🚨 [App.tsx:11] definitions:', definitions)

  return <div>Hello</div>
}
