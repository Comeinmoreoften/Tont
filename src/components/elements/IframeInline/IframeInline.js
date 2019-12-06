import React, { useRef, useEffect, useState } from 'react'
import { Box, ImagePlaceholder, CodeEditor } from 'components/elements'

const IframeInline = ({
  width = CodeEditor.width,
  height = CodeEditor.height,
  ...props
}) => {
  const inputEl = useRef(null)
  const [isLoading, setLoading] = useState(true)
  const setLoaded = () => setLoading(false)

  useEffect(() => {
    if (inputEl.current) {
      const iframe = inputEl.current.querySelector('iframe')
      if (iframe) {
        iframe.addEventListener('load', setLoaded)
        return () => iframe.removeEventListener('load', setLoaded)
      }
    }
  }, [])

  return (
    <>
      {isLoading ? <ImagePlaceholder width={width} height={height} /> : null}
      <Box
        ref={inputEl}
        style={{ display: isLoading && 'none' }}
        width={width}
        {...props}
      />
    </>
  )
}

export default IframeInline
