import { Button, Card, Input } from 'antd';
import React, { useCallback, useState } from 'react';
import MCodeMirror, { MEditor, MTextMarker } from '../../../components/m-code-mirror';
import image from '../../../assets/images/title-pic.png';
import editorStore from '@store/editorStore';
import { observer } from 'mobx-react-lite';
export const TitleEditor: React.FC = observer(() => {
    const initialValue = 'ANRABESS Women Dress with Turtleneck Cute Long Lantern Sleeve of Casual Loose Oversized Dress Sweater Soft Winter Pullover Dresses';
    const [mEditor, setMEditor] = useState<MEditor>(null);
    const handleMarkClick = (marker: MTextMarker) => {
    };
    const handleEditorMounted = (editor: MEditor) => {
        setMEditor(editor);
        editorStore.titleCM = editor;
    }
    return (
        <div className='flex items-center border-b-1'>
            <MCodeMirror initialValue={initialValue} showGutter={false} customClass='main-editor_title' onMounted={handleEditorMounted} />
            <div className='line'></div>
            <div className='translate'>
                {editorStore.titleTranslate};
            </div>
        </div >
    )
})