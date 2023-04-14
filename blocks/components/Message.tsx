import { type NodeProps } from 'reactflow'

import styles from './Message.module.css'

export function Message({ id }: NodeProps) {
  return (
    <div className={styles.message}>{id === 'empty' ? 'The provided schema is empty.' : 'Something went wrong.'}</div>
  )
}
