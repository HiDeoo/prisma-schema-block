import styles from './DefinitionTable.module.css'

// TODO(HiDeoo) max width
export function DefinitionTable({ content, name, type }: DefinitionTableProps) {
  const columnCount = content.at(0)?.length ?? 1

  return (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    <table className={`${styles.table!} ${type}`}>
      <thead className={styles.header}>
        <tr>
          <th colSpan={columnCount}>{name}</th>
        </tr>
      </thead>
      <tbody>
        {content.map((row, rowIndex) => {
          return (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => {
                return <td key={cellIndex}>{cell}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

interface DefinitionTableProps {
  content: string[][]
  name: string
  type: 'enum' | 'model'
}
