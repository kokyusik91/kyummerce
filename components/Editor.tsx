import styled from '@emotion/styled'
import { EditorState } from 'draft-js'
import dynamic from 'next/dynamic'
import { Dispatch, SetStateAction, useState } from 'react'
import { EditorProps } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import Button from './Button'

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  { ssr: false },
)

type CustomEditorProps = {
  editorState: EditorState
  readOnly?: boolean
  // 저장 콜백함수
  onSave?: () => void
  onEditorStateChange?: Dispatch<SetStateAction<EditorState | undefined>>
}

function CustomEditor({
  editorState,
  readOnly = false,
  onEditorStateChange,
  onSave,
}: CustomEditorProps) {
  return (
    <Wrapper>
      <Editor
        readOnly={readOnly}
        editorState={editorState}
        toolbarHidden={readOnly}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: ['inline', 'list', 'textAlign', 'link'],
        }}
        localization={{ locale: 'ko' }}
      />
      {!readOnly && <Button onClick={onSave}>저장하기</Button>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 16px;
`

export default CustomEditor
