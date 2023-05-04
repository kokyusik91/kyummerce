import styled from '@emotion/styled'
import React from 'react'
import Image from 'next/image'

function AutoSizeImage({ src, size = 500 }: { src: string; size?: number }) {
  return (
    <AutoSizeImageWrapper size={size}>
      <Image src={src} alt="" fill />
    </AutoSizeImageWrapper>
  )
}

const AutoSizeImageWrapper = styled.div<{ size: number }>`
  width: ${(props) => (props.size ? `${props.size}px` : '500px')};
  height: ${(props) => (props.size ? `${props.size}px` : '500px')};
  position: relative;
`

export default AutoSizeImage
