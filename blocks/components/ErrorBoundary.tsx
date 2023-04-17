import React from 'react'

import styles from './ErrorBoundary.module.css'
import { ErrorMessage } from './ErrorMessage'

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = {}

  static getDerivedStateFromError(error: Error) {
    console.error(error)

    return { error }
  }

  override render() {
    const { error } = this.state

    if (error) {
      return (
        <div className={styles.error}>
          <ErrorMessage message="Something went wrong." error={error} />
        </div>
      )
    }

    return this.props.children
  }
}

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  error?: Error
}
