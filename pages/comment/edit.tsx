import { Slider } from '@mantine/core'
import CustomEditor from 'components/Editor'
import ro from 'date-fns/esm/locale/ro/index.js'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

// DB에 저장해 놓았던 Comment에 Content를 사용할 예정
function CommentEdit() {
  const router = useRouter()
  const { orderItemId } = router.query
  const [rate, setRate] = useState(5)
  const [editorState, setEditorState] = useState<EditorState | undefined>(undefined)

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
          images: [],
        }),
      })
        .then((res) => res.json())
        .then(() => {
          alert('success')
          router.back()
        })
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
    </div>
  )
}

export default CommentEdit
