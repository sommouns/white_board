import { Button, Card, Input } from 'antd';
import React, { useCallback, useState } from 'react';
import MCodeMirror, { MEditor, MTextMarker } from '../../../components/m-code-mirror';
import image from '../../../assets/images/title-pic.png'
import { editStore } from '@store/index';
import editorStore, { ETabIndex } from '@store/editorStore';
import { dispatch } from 'use-bus';
import { EVENTS } from '@constants/index';
import { observer } from 'mobx-react-lite';
export const TitleEditor: React.FC = observer(() => {
    const initialValue = 'ANRABESS Women Dress with Turtleneck Cute Long Lantern Sleeve of Casual Loose Oversized Dress Sweater Soft Winter Pullover Dresses';
    const [mEditor, setMEditor] = useState<MEditor>(null);
    const { setTabIndex, selectCardWithId, setTitleCM } = editStore;
    const handleMarkClick = (marker: MTextMarker) => {
        setTabIndex(ETabIndex.TITLE);
        selectCardWithId(marker.id);
    };
    const mark = (mEditor, from, to, id) => {
        mEditor.createMark(mEditor.editor, from, to, 'error-mark', id)
    }
    const handleEditorMounted = (editor: MEditor) => {
        setMEditor(editor);
        setTitleCM(editor);
        editorStore.titleMarks.forEach(m => {
            mark(editor, m.from, m.to, m.id)
        });
    }

    return (
        <Card style={{ width: 640 }}>
            <div className='flex items-center flex-col'>
                <MCodeMirror tag='title' readOnly={false} initialValue={initialValue} showGutter={false} customClass='title-editor' onMounted={handleEditorMounted} onMarkClick={handleMarkClick} />
                <div className='line'></div>
                <div className='translate--title'>
                    {editorStore.titleTranslate};
                </div>
            </div>
        </Card>
    )
})