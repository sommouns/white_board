import React from 'react'
import { DescEditor } from './desc-editor'
import { TitleEditor } from './title-editor'
import './index.css'
import EditorStore, { EDITOR_CARD_NAME } from '@store/editorStore'
import classNames from 'classnames'
import { observer } from 'mobx-react'

export default observer(() => {
    return (
        <div className='main-editor bg-white flex flex-col items-center'>
            <TitleEditor />
            <DescEditor />
        </div>
    )
})