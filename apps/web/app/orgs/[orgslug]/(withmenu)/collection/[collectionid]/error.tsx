'use client' // Error components must be Client Components

import ErrorUI from '@components/StyledElements/Error/Error'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {

  return (
    <div>
      <ErrorUI></ErrorUI>
    </div>
  )
}
