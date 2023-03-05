import { Button, Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import entryStore from '@store/entryStore';
import { RightOutlined, CloseCircleOutlined } from '@ant-design/icons';
import './index.scss'
enum LangType {
    CN = 'cn',
    EN = 'en'
}

export const CategoryModal: React.FC<{
    visible: boolean;
}> = observer((props) => {
    const [lang, setLang] = useState(LangType.EN);
    const { currentCategoryList, selectCategory, tempCategory, _tempCategory } = entryStore;
    useEffect(() => {
        entryStore.fetchCategoryByLevel(0);
    }, []);
    return (
        <Modal width={680} className='category-modal' open={props.visible} title={null} footer={null} closable={false}>
            <div className='category-modal_header flex items-center'>
                <div className='category-modal_header_title'>选择商户所属品类</div>
                <div className='category-modal_header_lang-tab flex items-center justify-center ml-auto'>
                    <div className={`${lang === LangType.CN && 'category-modal_header_lang-tab--selected'}`} onClick={() => setLang(LangType.CN)}>中文</div>
                    <div className={`${lang === LangType.EN && 'category-modal_header_lang-tab--selected'}`} onClick={() => setLang(LangType.EN)}>英文</div>
                </div>
            </div>
            <div className='category-modal_main'>
                <div className='category-modal_main_input flex items-center'>
                    <div className='category-modal_main_input_main flex-1'>{_tempCategory.length ? (
                        <>
                            {_tempCategory.map((c, index) => (
                                <>
                                    {index > 0 && <span className='ml-2 mr-2' style={{ color: '#86909C' }}>/</span>}
                                    <span className='category-modal_main_input_word' onClick={() => entryStore.handleClickWordTab(c, index)}>{lang === LangType.EN ? c.en : c.cn}</span>
                                </>
                            ))}
                        </>
                    ) : <span className='category-modal_main_input--placeholder'>请选择</span>}</div>
                    <CloseCircleOutlined onClick={() => entryStore.clearTemp()} className='ml-auto cursor-pointer' style={{ color: '#86909C' }} />
                </div>
                <div className='category-modal_main_options'>
                    {currentCategoryList.map((category) => (<div onClick={() => selectCategory(category)} key={category.en + category.cn}
                        className={`category-modal_main_item flex items-center 
                            ${entryStore.tempCategoryCurrentChild &&
                            ((entryStore.tempCategoryCurrentChild.en + entryStore.tempCategoryCurrentChild.level) === (category.en + category.level)) &&
                            'category-modal_main_item--active'}`}>
                        {lang === LangType.EN ? category.en : category.cn}
                        {!category.isOver && <RightOutlined style={{ color: '#86909C' }} className='ml-auto' />}
                    </div>))}
                </div>
            </div>

            <div className='category-modal_btns flex items-center justify-center'>
                <Button className='mr-3' onClick={() => entryStore.setCategoryModalVisible(false)}>取消</Button>
                <Button type='primary' onClick={() => entryStore.confirmCategorySelect()}>选好了</Button>
            </div>

        </Modal>
    )
})