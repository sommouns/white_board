import { Alert, Badge, Button, Divider, Input, Modal, Pagination, Tag } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import sellingPointStore from '@store/sellingPointStore';
import { DownOutlined, UpOutlined, RightOutlined } from '@ant-design/icons';
import './index.scss';
export const SellingPointSelector: React.FC = observer(() => {
    React.useEffect(() => {
        sellingPointStore.fetchRegularWords();
    }, []);

    React.useEffect(() => {
        sellingPointStore.detectWords();
    }, [sellingPointStore.selectedWords.length])
    return (
        <Modal title={null}
            footer={null}
            open={sellingPointStore.modalVisible}
            className="selling-point-selector"
            width={1016}>
            <div className='selling-point-selector'>
                <div className="selling-point-selector_title">
                    请选择符合当前商品的卖点词
                </div>
                <div className="selling-point-selector_wrapper flex">
                    <div style={{ width: 388 }}>
                        <div className="selling-point-selector_wrapper_regular">
                            <div className="selling-point-selector_wrapper_regular_title" onClick={() => sellingPointStore.setCollapsed(!sellingPointStore.collapsed)}>
                                <div className='mr-2' style={{ fontSize: '16px' }}>常用卖点词</div>
                                {
                                    sellingPointStore.collapsed ? <DownOutlined /> : <UpOutlined />
                                }

                            </div>
                            {
                                !sellingPointStore.collapsed && <div className='selling-point-selector_wrapper_regular_main'>
                                    {
                                        sellingPointStore.regularWords.map(w => <Tag onClick={() => sellingPointStore.selectWord(w)}>{w.en}</Tag>)
                                    }
                                </div>
                            }
                        </div>
                        <Divider />
                        <div className="selling-point-selector_wrapper_pages">
                            <div style={{ height: 288 }}>
                                {sellingPointStore.recommandWords.slice((sellingPointStore.pageIndex - 1) * 8, (sellingPointStore.pageIndex - 1) * 8 + 8).map(w => {
                                    return <div onClick={() => sellingPointStore.selectWord(w)} className={`selling-point-selector_wrapper_pages_card  ${sellingPointStore.selectedWords.filter(word => word.en === w.en).length
                                        && 'selling-point-selector_wrapper_pages_card--selected'}`}>
                                        <div className="selling-point-selector_wrapper_pages_card_en">{w.en}</div>
                                        <div className="selling-point-selector_wrapper_pages_card_cn">{w.cn}</div>
                                    </div>
                                })}
                            </div>

                            <Pagination size="small" current={sellingPointStore.pageIndex} total={sellingPointStore.recommandWords.length} onChange={(idx) => sellingPointStore.setPageIndex(idx)} />
                        </div>
                    </div>
                    <div className='selling-point-selector_wrapper_divider'>

                    </div>
                    <div className='flex-1'>
                        <div className="selling-point-selector_wrapper_selected">
                            <div className="selling-point-selector_wrapper_selected_title">
                                已选择<Badge showZero count={sellingPointStore.selectedWords.length} color='#F2F3F5' style={
                                    { color: '#86909C', marginLeft: '6px' }
                                } />
                            </div>
                            <div className='selling-point-selector_wrapper_selected_desc'>
                                Women's Dress 品类下排序前 5% 的商品平均包含 5 个卖点词
                            </div>
                            {sellingPointStore.warning && <Alert message={sellingPointStore.warning} type="error" />}
                            <Button type="link">查看趋势图<RightOutlined /></Button>
                            <div className="selling-point-selector_wrapper_selected_main">
                                {sellingPointStore.selectedWords.map((selectedWord, idx) =>
                                    <div className='selling-point-selector_wrapper_selected_main_card-wrapper' style={{ display: 'inline-flex' }}>
                                        <div key={idx} className={`selling-point-selector_wrapper_selected_main_card`}
                                            onClick={() => sellingPointStore.removeSelect(selectedWord)}>
                                            {selectedWord.en}
                                        </div>
                                        {selectedWord.tip && <div className='selling-point-selector_wrapper_selected_main_card-tip'>
                                            {selectedWord.tip}
                                        </div>}
                                    </div>)}
                                {
                                    sellingPointStore.tempManuInputVisible && <div className='selling-point-selector_wrapper_selected_main_card-wrapper' style={{ display: 'inline-flex' }}>
                                        <div className={`selling-point-selector_wrapper_selected_main_card selling-point-selector_wrapper_selected_main_card--input`}>
                                            <Input autoFocus onBlur={() => sellingPointStore.handleTempManulInputBlur()} onChange={(e) => sellingPointStore.handleInputChange(e.target.value)} />
                                        </div></div>
                                }
                                <div onClick={() => sellingPointStore.clickManulInput()} className="selling-point-selector_wrapper_selected_main_card selling-point-selector_wrapper_selected_main_card--add">
                                    <Button type='link'>+ 手动录入</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="selling-point-selector_preview">
                    <div className="selling-point-selector_preview_title">
                        商品标题预览
                    </div>
                    <div className="selling-point-selector_preview_content">
                        {sellingPointStore.preview}
                    </div>
                </div>
                <div className="selling-point-selector_btns">
                    {sellingPointStore.hasWarning && <Button className='mr-4' onClick={() => sellingPointStore.confirm()}>
                        不改了，就这样
                    </Button>}
                    <Button onClick={() => sellingPointStore.confirm()} type='primary' disabled={sellingPointStore.hasWarning}>
                        选好了，生成标题和描述
                    </Button>
                </div>
            </div>
        </Modal>
    )
});