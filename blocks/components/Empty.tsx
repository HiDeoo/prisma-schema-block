import { ErrorMessage } from './ErrorMessage'

export function Empty() {
  return <ErrorMessage message="The provided schema is empty." />
}
