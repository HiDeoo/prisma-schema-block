import { Handle as NativeHandle, type HandleProps } from 'reactflow'

export { Position } from 'reactflow'

export function Handle(props: HandleProps) {
  return <NativeHandle className="handle" isConnectable={false} {...props} />
}
