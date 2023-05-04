import styled from '@emotion/styled'
import AutoSizeImage from 'components/AutoSizeImage'
import Button from 'components/Button'
import Image from 'next/image'
import React, { useRef, useState } from 'react'

function Upload() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState('')

  const handleUpload = () => {
    if (inputRef.current && inputRef.current.files) {
      const fd = new FormData()
      fd.append('image', inputRef.current.files[0], inputRef.current.files[0].name)

      fetch(
        'https://api.imgbb.com/1/upload?key=82ab610ad5c2fece8049ee092743e0e0&expiration=15552000',
        {
          method: 'POST',
          body: fd,
        },
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data)

          setImage(data.data.image.url)
        })
        .catch((error) => console.log(error))
    }
  }

  return (
    <div>
      <input ref={inputRef} type="file" accept="image/*" />
      <Button onClick={handleUpload}>업로드</Button>
      {image !== '' && <AutoSizeImage src={image} />}
    </div>
  )
}

export default Upload
