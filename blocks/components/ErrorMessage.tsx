import styles from './ErrorMessage.module.css'

export function ErrorMessage({ error, message }: ErrorMessageProps) {
  return (
    <div className={styles.message}>
      <div>{message}</div>
      {error ? <div className={styles.error}>{error.message}</div> : null}
    </div>
  )
}

interface ErrorMessageProps {
  error?: Error
  message: string
}
