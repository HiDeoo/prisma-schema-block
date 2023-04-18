export function ErrorMessage({ error, message }: ErrorMessageProps) {
  return (
    <div className="errorMessage">
      <div>{message}</div>
      {error ? <div className="error">{error.message}</div> : null}
    </div>
  )
}

interface ErrorMessageProps {
  error?: Error
  message: string
}
