import { Handle as NativeHandle, type HandleProps } from 'reactflow'

import styles from './Handle.module.css'

export { Position } from 'reactflow'

export function Handle(props: HandleProps) {
  return <NativeHandle className={styles.handle} isConnectable={false} {...props} />
}
