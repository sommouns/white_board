import React, { useEffect, useState } from 'react'
import { DescEditor } from './desc-preview'
import { TitleEditor } from './title-preview'
import './index.scss'
import EditorStore, { EDITOR_CARD_NAME } from '@store/editorStore'
import { observer } from 'mobx-react'
import Sidebar from './sidebar'
import ToolBox from '@components/tool-box'
import { Button } from 'antd'
import { SellingPointSelector } from '@components/selling-point-selector'
import editorStore from '@store/editorStore'
export default observer(() => {
    const descDisabled = true;
    const [titleContentWordCount, setTitleContentWordCount] = useState(0)

    return (
        <div className='preview flex'>
            <Sidebar />
            <div className='flex flex-1' style={{ justifyContent: 'center' }}>
                <div className='preview-editor flex flex-col p-12' style={{ width: 734 }}>
                    <div className='flex mb-4'>
                        <div className='word_count'>标题词数：<span>{editorStore.titleContentWordCount}</span></div>
                        <div className='preview-btn ml-auto'>
                            <Button className='mr-4' type='default'>保存</Button>
                            <Button type='primary'>刷新优化建议</Button>
                        </div>
                    </div>
                    <div onClick={() => EditorStore.setFocusedEditorCard(EDITOR_CARD_NAME.TITLE)} className={`mb-4 ${EditorStore.focusedEditorCard === EDITOR_CARD_NAME.TITLE ? 'card-focused' : ''}`}>
                        <TitleEditor />
                    </div>
                    <div onClick={() => !descDisabled && EditorStore.setFocusedEditorCard(EDITOR_CARD_NAME.CONTENT)} style={
                        {
                            position: 'relative'
                        }
                    } className={`mb-4 ${EditorStore.focusedEditorCard === EDITOR_CARD_NAME.CONTENT ? 'card-focused' : ''}`}>
                        <DescEditor />
                        {
                            descDisabled && <div className='desc-editor--disabled'>
                                <div>
                                    <div>功能尚未开放</div>
                                    <div>敬请期待</div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className='pt-12 pr-12'>
                    <ToolBox />
                </div>
            </div>
            <SellingPointSelector />
        </div>
    )
})