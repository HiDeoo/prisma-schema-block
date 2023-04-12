import clsx from 'clsx'
import { Handle, Position } from 'reactflow'

import styles from './DefinitionTable.module.css'

// TODO(HiDeoo) max width
export function DefinitionTable({ rows, name, type }: DefinitionTableProps) {
  const columnCount = rows.at(0)?.length ?? 1

  return (
    <>
      <table className={clsx(styles.table, type)}>
        <thead className={styles.header}>
          <tr>
            <th colSpan={columnCount}>{name}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => {
                  return (
                    <td key={cellIndex}>
                      {/* TODO(HiDeoo) only show if needed */}
                      {type === 'model' && cellIndex === 0 ? (
                        <Handle id={`${name}-${cell}`} position={Position.Left} type="target" />
                      ) : null}
                      {cell}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* TODO(HiDeoo) only show if needed */}
      {type === 'enum' ? <Handle position={Position.Bottom} type="source" /> : null}
    </>
  )
}

interface DefinitionTableProps {
  name: string
  rows: string[][]
  type: 'enum' | 'model'
}
