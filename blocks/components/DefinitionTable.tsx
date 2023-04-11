import styles from './DefinitionTable.module.css'

// TODO(HiDeoo) max width
export function DefinitionTable({ content, name, type }: DefinitionTableProps) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    <table className={`${styles.table!} ${type}`}>
      <thead className={styles.header}>
        <tr>
          <th>{name}</th>
        </tr>
      </thead>
      <tbody>
        {content.map((row, rowIndex) => {
          return (
            <tr key={rowIndex}>
              {row.map((column, columnIndex) => {
                return <td key={columnIndex}>{column}</td>
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
