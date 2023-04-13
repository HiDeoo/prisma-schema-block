import clsx from 'clsx'

import styles from './TableNode.module.css'

// TODO(HiDeoo) min width
// TODO(HiDeoo) max width
export function TableNode<TRow>({ className, cols, name, rowRenderer, rows }: TableNodeProps<TRow>) {
  return (
    <table className={clsx(styles.table, className)}>
      <thead className={styles.header}>
        <tr>
          <th colSpan={cols}>{name}</th>
        </tr>
      </thead>
      <tbody>{rows.map(rowRenderer)}</tbody>
    </table>
  )
}

interface TableNodeProps<TRow> {
  className?: string
  cols: number
  name: string
  rowRenderer: (row: TRow) => React.ReactNode
  rows: TRow[]
}
