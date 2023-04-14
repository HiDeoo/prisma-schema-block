import clsx from 'clsx'

import { Handle, Position } from './Handle'
import styles from './TableNode.module.css'

export function TableNode<TRow>({ className, color, cols, isSource, name, rowRenderer, rows }: TableNodeProps<TRow>) {
  return (
    <>
      <table className={clsx(styles.table, className)} style={{ '--bg-color': color }}>
        <thead className={styles.header}>
          <tr>
            <th colSpan={cols}>{name}</th>
          </tr>
        </thead>
        <tbody>{rows.map(rowRenderer)}</tbody>
      </table>
      {isSource ? <Handle isConnectable={false} position={Position.Bottom} type="source" /> : null}
    </>
  )
}

interface TableNodeProps<TRow> {
  className?: string
  color: string
  cols: number
  isSource: boolean
  name: string
  rowRenderer: (row: TRow) => React.ReactNode
  rows: TRow[]
}
