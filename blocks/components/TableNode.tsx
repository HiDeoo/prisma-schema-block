import clsx from 'clsx'
import { Handle, Position } from 'reactflow'

import styles from './TableNode.module.css'

// TODO(HiDeoo) min width
// TODO(HiDeoo) max width
export function TableNode<TRow>({ className, cols, isSource, name, rowRenderer, rows }: TableNodeProps<TRow>) {
  return (
    <>
      <table className={clsx(styles.table, className)}>
        <thead className={styles.header}>
          <tr>
            <th colSpan={cols}>{name}</th>
          </tr>
        </thead>
        <tbody>{rows.map(rowRenderer)}</tbody>
      </table>
      {isSource ? <Handle position={Position.Bottom} type="source" /> : null}
    </>
  )
}

interface TableNodeProps<TRow> {
  className?: string
  cols: number
  isSource: boolean
  name: string
  rowRenderer: (row: TRow) => React.ReactNode
  rows: TRow[]
}
