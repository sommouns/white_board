import React from 'react'
import { DescEditor } from './desc-preview'
import { TitleEditor } from './title-preview'
import './index.scss'
import EditorStore, { EDITOR_CARD_NAME } from '@store/editorStore'
import { observer } from 'mobx-react'
import Sidebar from './sidebar'
import ToolBox from '@components/tool-box'
import { Button } from 'antd'
export default observer(() => {

    return (
        <div className='preview flex'>
            <Sidebar />
            <div className='flex flex-1' style={{ justifyContent: 'space-around' }}>
                <div className='preview-editor flex flex-col p-12' style={{ width: 734 }}>
                    <div className='flex mb-4'>
                        <div className='word_count'>标题词数：<span>153</span></div>
                        <div className='preview-btn ml-auto'>
                            <Button className='mr-4' type='default'>保存</Button>
                            <Button type='primary'>刷新优化建议</Button>
                        </div>
                    </div>
                    <div onClick={() => EditorStore.setFocusedEditorCard(EDITOR_CARD_NAME.TITLE)} className={`mb-4 ${EditorStore.focusedEditorCard === EDITOR_CARD_NAME.TITLE ? 'card-focused' : ''}`}>
                        <TitleEditor />
                    </div>
                    <div onClick={() => EditorStore.setFocusedEditorCard(EDITOR_CARD_NAME.CONTENT)} className={`mb-4 ${EditorStore.focusedEditorCard === EDITOR_CARD_NAME.CONTENT ? 'card-focused' : ''}`}>
                        <DescEditor />
                    </div>
                </div>
                <div className='flex-1 pt-12'>
                    <ToolBox />
                </div>
            </div>
        </div>
    )
})