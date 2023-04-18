import { Handle, Position } from './Handle'

export function TableNode<TRow>({ color, cols, isSource, name, rowRenderer, rows }: TableNodeProps<TRow>) {
  return (
    <>
      <table className="table" style={{ '--bg-color': color }}>
        <thead>
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
  color: string
  cols: number
  isSource: boolean
  name: string
  rowRenderer: (row: TRow) => React.ReactNode
  rows: TRow[]
}
