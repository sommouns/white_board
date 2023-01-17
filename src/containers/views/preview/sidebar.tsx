import { Tooltip, Button } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { QuestionCircleOutlined, PlusOutlined } from '@ant-design/icons';
import useEditorStore from '@store/editorStore';

const Sidebar: React.FC = observer(() => {
    const { keywords, setKeywords } = useEditorStore;
    return (
        <div className='preview_sidebar'>
            <div className='preview_sidebar_logo'></div>
            <div className='mt-10'>
                <div className='flex preview_sidebar_keywords_title mb-4'>
                    基于关键词
                    <Tooltip placement="top" title={'test code here'}>
                        <QuestionCircleOutlined style={{ lineHeight: '22px', marginLeft: '6px' }} />
                    </Tooltip>
                </div>
                {
                    keywords.map((w, idx) => (
                        <div onClick={() => setKeywords(idx)} key={idx} className={`preview_sidebar_keywords_val  align-center ${w.selected && 'preview_sidebar_keywords_val--active'} flex justify-between`}>
                            <div>{w.val}</div>
                            <div>{w.recommand && '推荐'}</div>
                        </div>
                    ))
                }
                <div className={`preview_sidebar_keywords_val align-center flex justify-center`}>
                    <PlusOutlined />
                </div>
            </div>
            <div className="preview_sidebar_user">

            </div>
        </div>
    )
})

export default Sidebar;