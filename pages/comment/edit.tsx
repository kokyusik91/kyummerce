import { Slider } from '@mantine/core'
import AutoSizeImage from 'components/AutoSizeImage'
import CustomEditor from 'components/Editor'
import ro from 'date-fns/esm/locale/ro/index.js'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'

// DB에 저장해 놓았던 Comment에 Content를 사용할 예정
function CommentEdit() {
  const router = useRouter()
  const { orderItemId } = router.query
  const [rate, setRate] = useState(5)
  const [editorState, setEditorState] = useState<EditorState | undefined>(undefined)
  const inputRef = useRef<HTMLInputElement>(null)
  // 이미지를 다중 선택 (url에 배열)
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    if (orderItemId != null) {
      fetch(`/api/get-comment?orderItemId=${orderItemId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if (data.items.contents) {
            setEditorState(
              EditorState.createWithContent(convertFromRaw(JSON.parse(data.items.contents))),
            )
            setRate(data.items.rate)
            setImages(data.items.images.split(',') ?? [])
          } else {
            setEditorState(EditorState.createEmpty())
          }
        })
    }
  }, [orderItemId])

  const handleSave = () => {
    if (editorState) {
      fetch(`/api/update-comment`, {
        method: 'POST',
        body: JSON.stringify({
          orderItemId: Number(orderItemId),
          rate: rate,
          contents: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
          images: images.join(','),
        }),
      })
        .then((res) => res.json())
        .then(() => {
          alert('success')
          router.back()
        })
    }
  }

  const handleChange = () => {
    if (inputRef.current && inputRef.current.files && inputRef.current.files.length > 0) {
      for (let i = 0; i < inputRef.current.files.length; i++) {
        const fd = new FormData()
        fd.append('image', inputRef.current.files[i], inputRef.current.files[i].name)

        fetch(
          'https://api.imgbb.com/1/upload?key=82ab610ad5c2fece8049ee092743e0e0&expiration=15552000',
          {
            method: 'POST',
            body: fd,
          },
        )
          .then((res) => res.json())
          .then((data) => {
            // set 자료를 사용하여 같은 이미지는 없애준다. => 배열
            setImages((prev) => Array.from(new Set(prev.concat(data.data.image.url))))
          })
          .catch((error) => console.log(error))
      }
    }
  }

  return (
    <div>
      {editorState != null && (
        <CustomEditor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          onSave={handleSave}
        />
      )}
      <Slider
        defaultValue={5}
        min={1}
        max={5}
        step={1}
        value={rate}
        onChange={setRate}
        marks={[{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }]}
      />
      <input ref={inputRef} type="file" accept="image/*" multiple onChange={handleChange} />
      {images &&
        images.length > 0 &&
        images.map((image, idx) => <AutoSizeImage key={idx} src={image} />)}
    </div>
  )
}

export default CommentEdit
