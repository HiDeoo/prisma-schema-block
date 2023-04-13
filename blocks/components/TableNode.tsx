import clsx from 'clsx'

import styles from './TableNode.module.css'

// TODO(HiDeoo) max width
export function TableNode<TRow>({ className, columnCount, name, rowRenderer, rows }: TableNodeProps<TRow>) {
  return (
    <table className={clsx(styles.table, className)}>
      <thead className={styles.header}>
        <tr>
          <th colSpan={columnCount}>{name}</th>
        </tr>
      </thead>
      <tbody>{rows.map(rowRenderer)}</tbody>
    </table>
  )
}

interface TableNodeProps<TRow> {
  className?: string
  columnCount: number
  name: string
  rowRenderer: (row: TRow) => React.ReactNode
  rows: TRow[]
}
