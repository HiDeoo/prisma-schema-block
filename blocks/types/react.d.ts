import 'react'

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style -- we want to merge the interfaces.
  interface CSSProperties {
    [key: `--${string}`]: string | number
  }
}
