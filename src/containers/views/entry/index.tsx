import { Button, Card, Carousel, Input, Modal, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { SwapOutlined, ReloadOutlined, LeftOutlined, RightOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import entryStore from '@store/entryStore';
import sellingPointStore from '@store/sellingPointStore';
import './index.scss';
import history from '@shared/App/ht'
const { TextArea } = Input;
export default observer(() => {
    const { keywords, fetchKeywords, slideTimes, setUrlInputVisible } = entryStore;
    const carouselEL = React.useRef(null);

    useEffect(() => {
        fetchKeywords();
    }, []);
    useEffect(() => {
        if (slideTimes >= 3) {
            setUrlInputVisible(true);
        }
    }, [slideTimes]);
    function next() {
        sellingPointStore.setModalVisible(true);
        history.push('/preview');
    }
    return (
        <div className='entry'>
            <div className="entry_wrapper">
                <div className="entry_wrapper_nav">
                    <div className="entry_wrapper_nav_logo"></div>
                    <div className="entry_wrapper_nav_btns">
                        <Button type='link' onClick={() => history.push('/signin')}>登录</Button>
                        <Button type='link' onClick={() => history.push('/register')}>注册</Button>
                    </div>
                </div>
                <div className='entry_wrapper_title'>
                    Adtron，最懂亚马逊的SEO优化引擎
                </div>
                <div className='entry_wrapper_desc'>
                    为您的商品名称和五点描述提供最准确的优化建议
                </div>
                <div className='entry_wrapper_main'>
                    <div className='entry_wrapper_main_card'>
                        <Card style={{ width: 460 }}>
                            <div className="entry_wrapper_main_card_title">
                                我要上架
                            </div>
                            <div className="entry_wrapper_main_card_desc">
                                帮你快速生成高质量的商品标题和五点描述
                            </div>
                            <div className='entry_wrapper_main_card_form'>
                                <Select
                                    bordered={false}
                                    showSearch
                                    placeholder="请选择"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={keywords}
                                    onChange={(v) => entryStore.setUploadKeyword(v)}
                                    value={entryStore.uploadKeyword}
                                    popupClassName="entry-selector_popup"
                                />
                                <TextArea
                                    showCount
                                    bordered={false}
                                    maxLength={20}
                                    style={{ height: 120, resize: 'none' }}
                                    placeholder="请输入"
                                    value={entryStore.uploadFiveDesc}
                                    onChange={(e) => {
                                        entryStore.setUploadFiveDesc(e.target.value)
                                    }}
                                />
                                <div style={{ clear: 'both' }}></div>
                                <div className={`entry_wrapper_main_card_form_tip ${!entryStore.uploadValid && 'entry_wrapper_main_card_form_tip--invalid'}`}>
                                    {entryStore.uploadValid ? '至少输入5个单词，包含商品名称、品类和卖点' : (
                                        <>
                                            词根模糊，请细化商品品类名称或<span onClick={() => entryStore.setCompetitorSelectorVisible(true)}>选择相似竞品</span>
                                        </>
                                    )}
                                </div>

                            </div><div className='flex-1'></div>
                            <div className='text-center'>
                                <Button type='primary' onClick={() => entryStore.uploadNext()} disabled={!(entryStore.uploadValid && entryStore.uploadFiveDesc && entryStore.uploadKeyword)}>
                                    下一步
                                </Button>
                            </div>
                        </Card>
                    </div>
                    <div className='entry_wrapper_main_or'>或</div>
                    <div className='entry_wrapper_main_card'>
                        <Card style={{ width: 460 }}>
                            <div className="entry_wrapper_main_card_title">
                                我要优化
                            </div>
                            <div className="entry_wrapper_main_card_desc">
                                从现有商品标题和五点描述进行优化
                            </div>
                            <div className='entry_wrapper_main_card_form'>

                                <Input bordered={false} placeholder='输入商品链接或商品ASIN' />
                            </div>
                            <div className='flex-1'></div>
                            <div className='text-center mt-auto'>
                                <Button type='primary' onClick={next}>
                                    下一步
                                </Button>
                            </div>
                        </Card>
                    </div>

                    <Modal
                        centered
                        open={entryStore.competitorSelectorVisible}
                        onOk={() => entryStore.setCompetitorSelectorVisible(false)}
                        onCancel={() => entryStore.setCompetitorSelectorVisible(false)}
                        width={1000}
                        className="entry_modal"
                        title={null}
                        footer={null}
                        closable={false}
                    >
                        <div className='relative m-auto' style={{ width: 700 }}>
                            <Button
                                className="leftButton"
                                style={{ left: -14 }}
                                onClick={() => {
                                    entryStore.setSlideTimes(slideTimes + 1);
                                    carouselEL.current.prev();
                                }}
                                icon={<LeftOutlined />}
                            ></Button>
                            <Button
                                className="rightButton"
                                style={{ right: -14 }}
                                onClick={() => {
                                    entryStore.setSlideTimes(slideTimes + 1);
                                    carouselEL.current.next();
                                }}
                                icon={<RightOutlined />}
                            ></Button>
                            <Carousel className='topic-carousel mb-4 entry-carousel' slidesPerRow={4} rows={2} dots={false} style={{ margin: "0 auto", paddingTop: 0, width: '600px' }} ref={carouselEL}>
                                {
                                    entryStore.topicCard.map(tc => (
                                        <div>
                                            <Card
                                                hoverable
                                                style={{ width: 140, margin: '10px auto' }}
                                                cover={<img alt="example" src={tc.cover}
                                                />}
                                                className={`topic-carousel_card m-auto ${entryStore.currentCard && entryStore.currentCard.id === tc.id && 'entry-carousel_card--selected'}`}
                                                onClick={() => {
                                                    entryStore.setUrl('');
                                                    entryStore.setUrlInputVisible(false);
                                                    entryStore.setCurrentCard(tc);
                                                }}
                                                key={tc.id}
                                            >
                                                <div className='text-3'>
                                                    {tc.title}
                                                </div>
                                            </Card>
                                        </div>
                                    ))
                                }
                            </Carousel>
                            {entryStore.urlInputVisible && <div>
                                <div className='m-auto' style={{
                                    width: 600
                                }}>
                                    <div className='topic-title font-bold text-center mb-4 mt-4'>
                                        没有找到同类竞品？
                                    </div>
                                    <div className='urlInput'>
                                        <Input onChange={(e) => {
                                            entryStore.setUrl(e.target.value);
                                            entryStore.setCurrentCard(null);
                                        }} placeholder="输入竞品链接，建议选择搜索排序靠前的竞品" />
                                    </div>
                                </div>
                            </div>}

                            <div className='text-center'>
                                <Button type='primary' onClick={() => entryStore.confirmSelect()} disabled={!(entryStore.currentCard && entryStore.currentCard.id) && !entryStore.url}>
                                    选好了，生成标题和描述
                                </Button>
                            </div>
                        </div>

                    </Modal>
                </div>
            </div>

        </div>
    )
})