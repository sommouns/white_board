import editorStore, { ETabIndex } from '@store/editorStore';
import fiveDescStore from '@store/fiveDescStore';
import { editStore } from '@store/index';
import { Button, Card, Input, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useState } from 'react';
import MCodeMirror, { MEditor, MTextMarker } from '../../../components/m-code-mirror';
const { setTabIndex, selectCardWithId } = editorStore;
export const DescEditor: React.FC = observer(() => {
    const initialValue = `DESIGNS - Turtleneck, Balloon Sleeve, Rib Knit, Loose Fit, Solid Color, This Versatile Knitted Pullover Sweater Mini Dress is as Stylish as it is Comfortable\nMATERIAL - This mini long sleeve sweater dress is made of high-quality flexibility material, soft, warm, stretchy, comfy touch to bring you a perfect wearing experience, excellent tailoring highlights the curve silhouette\nOCCASIONS - Whether you are daily wear, work, party, trip or wedding, this cute knit mini sweater dress is definitely a smart choice. Also suitable for Christmas, New Year or other special occasions\nOUTFIT TIPS - Would be a wonderful companion with a coat, leggings, skinny jeans, heels, boots, a scarf or beanie cap for outside. This knit pullover sweater mini dress makes you vibrant, unique and charming. A fashionable and casual look is easy to achieve\nGARMENT CARE - Gentle machine wash or hand wash in cold, do not bleach, flat dry`
    const [mEditor, setMEditor] = useState<MEditor>(null);
    const handleMarkClick = useCallback((marker: MTextMarker) => {
        setTabIndex(ETabIndex.CONTENT);
        selectCardWithId(marker.id);
    }, []);

    const marks = [
        {
            id: 13,
            from: {
                line: 1,
                ch: 47
            },
            to: {
                line: 1,
                ch: 49
            }
        }
    ]
    const mark = (mEditor, from, to, id) => {
        mEditor.createMark(mEditor.editor, from, to, 'error-mark', id)
    }
    const handleEditorMounted = (editor: MEditor) => {
        setMEditor(editor);
        editStore.setContentCM(editor);
        marks.forEach(m => {
            mark(editor, m.from, m.to, m.id)
        });
    }

    const { generating } = fiveDescStore;
    return (
        <Card style={{ width: 640 }}>
            <div className='m-editor flex flex-col'>
                {
                    !generating ? (<>
                        <MCodeMirror tag='content' readOnly={false} initialValue={initialValue} customClass='content-editor' onMounted={handleEditorMounted} onMarkClick={handleMarkClick} />
                        <div className='line'></div>
                        <div className='translate'>
                            {editorStore.contentTranslate};
                        </div></>) : (
                        <div className='flex justify-center items-center flex-col' style={{ height: 400 }}>
                            <Spin className='mb-2' />
                            <div>五点描述生成中，请稍候</div>
                        </div>
                    )
                }
            </div>
        </Card>
    )
})