import { Button, Card, Input } from 'antd';
import React, { useCallback, useState } from 'react';
import MCodeMirror, { MEditor, MTextMarker } from '../../../components/m-code-mirror';

export const DescEditor: React.FC = () => {
    const initialValue = `DESIGNS - Turtleneck, Balloon Sleeve, Rib Knit, Loose Fit, Solid Color, This Versatile Knitted Pullover Sweater Mini Dress is as Stylish as it is Comfortable\nMATERIAL - This mini long sleeve sweater dress is made of high-quality flexibility material, soft, warm, stretchy, comfy touch to bring you a perfect wearing experience, excellent tailoring highlights the curve silhouette\nOCCASIONS - Whether you are daily wear, work, party, trip or wedding, this cute knit mini sweater dress is definitely a smart choice. Also suitable for Christmas, New Year or other special occasions\nOUTFIT TIPS - Would be a wonderful companion with a coat, leggings, skinny jeans, heels, boots, a scarf or beanie cap for outside. This knit pullover sweater mini dress makes you vibrant, unique and charming. A fashionable and casual look is easy to achieve\nGARMENT CARE - Gentle machine wash or hand wash in cold, do not bleach, flat dry`
    const [mEditor, setMEditor] = useState<MEditor>(null);
    const handleMarkClick = useCallback((marker: MTextMarker) => {
    }, []);
    const handleEditorMounted = (editor: MEditor) => {
        setMEditor(editor);
    }
    return (
        <div className='m-editor flex'>
            <MCodeMirror initialValue={initialValue} customClass='main-editor_content' onMounted={handleEditorMounted} />
        </div>
    )
}