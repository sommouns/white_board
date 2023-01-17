import { Badge, Button, Card, Carousel, Collapse, Input, message, Modal, Pagination, Popover, Select, Space, Spin, Tag, Tooltip } from 'antd';
import React, { MouseEventHandler, ReactElement, useEffect, useState } from 'react'
import { SwapOutlined, ReloadOutlined, LeftOutlined, RightOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import image from '../../assets/images/arrow.jpg';
import './index.scss';
import editorStore from '@store/editorStore';
import topicStore from '@store/topicStore';
import fiveDescStore from '@store/fiveDescStore';
import Meta from 'antd/lib/card/Meta';
import useBus, { dispatch } from 'use-bus';
import { EVENTS } from '@constants/index';
import { observer } from 'mobx-react-lite';
const { Panel } = Collapse;
export enum CARD_TYPE {
    NORMAL = 1,
    REPLACE = 2,
    STATIC = 3,
    TOPIC = 4,
    FIVE_DESC = 5,
}
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
interface ICardProps {
    cardInfo: CardInfo;
    onClick?: MouseEventHandler<HTMLDivElement>;
}
export type CardInfo = {
    id?: number;
    type?: CARD_TYPE;
    tagText?: string;
    tagColor?: string;
    title?: string;
    content?: string;
    collapsed?: boolean;
    word?: string;
    desc?: string;
    rawWord?: string;
    from?: {
        line: number;
        ch: number;
    };
    to?: {
        line: number;
        ch: number;
    };
    topicCard?: TopicCard[];
}
type TopicCard = {
    cover: string;
    title: string;
    id: string;
    selected: boolean;
}

export const RecommandCard: React.FC<ICardProps> = ({ cardInfo, onClick }) => {
    return (
        <NormalCard title={
            cardInfo.type === CARD_TYPE.NORMAL || cardInfo.type === CARD_TYPE.STATIC ?
                (<>
                    {cardInfo.tagText && <Tag color={cardInfo.tagColor || ''}>{cardInfo.tagText}</Tag>}
                    <span className='title'>{cardInfo.title}</span>
                </>)
                : (<>
                    <span className='rawWord'>{cardInfo.rawWord}</span>
                    <div className='arrow'>
                        <img src={image} />
                    </div>
                    <div className='ml-3'>
                        <Tag color={cardInfo.tagColor || ''}>{cardInfo.tagText}</Tag>
                    </div>
                </>)
        } content={
            <>
                {cardInfo.content.split('\n').map(val => <p className='content' key={val}>{val}</p>)}
            </>
        } collapsed={cardInfo.collapsed}
            word={cardInfo.word}
            desc={cardInfo.desc}
            rightTopBtn={<div className='remove'></div>}
            onClick={onClick} />
    )
}

export const NormalCard: React.FC<{
    title?: ReactElement;
    content?: ReactElement;
    collapsed?: boolean;
    word?: string;
    desc?: string;
    rightTopBtn?: ReactElement;
    onClick?: MouseEventHandler<HTMLDivElement>;
}> = (props) => {
    return (
        <Card style={{ width: 530 }} className="recommand_card" onClick={props.onClick}>
            {
                props.collapsed ?
                    (
                        <div className='flex items-center'>
                            <div className='list-dot'></div>
                            {props.word && <span className='word'>{props.word}</span>}
                            <span className='desc'>{props.desc}</span>
                        </div>
                    ) :
                    (<div>
                        <div className='flex items-center'>
                            <div className='list-dot'></div>
                            <span className='desc'>{props.desc}</span>
                            {props.rightTopBtn}
                        </div>
                        <div className='flex items-center mt-5'>
                            {props.title}
                        </div>
                        <div>
                            {props.content}

                        </div>
                    </div>)
            }
        </Card>
    );
}

export const TopicWordSelectCard: React.FC<ICardProps> = observer(({ cardInfo }) => {
    const handleClick = () => { }
    const carouselEL = React.useRef(null);
    const { slideTimes, urlInputVisible, url, btnDisabled, currentId, vocVisible, setSlideTimes, setUrlInputVisible, setUrl, setBtnDisabled, setCurrentId, setVocVisible, refreshing, setRefreshing } = topicStore;
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() => {
        if (slideTimes >= 3) {
            setUrlInputVisible(true);
        }
    }, [slideTimes]);
    useEffect(() => {
        if (url || currentId) {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }
    }, [url, currentId]);

    const handleCardClick = (val) => {
        if (val.id === currentId) {
            setCurrentId('');
        } else {
            setCurrentId(val.id);
        }
        setSlideTimes(0);
        setUrlInputVisible(false);
        setUrl('');
    }

    const toClipBoard = (val) => {
        const inputo = document.createElement("input");
        document.body.appendChild(inputo);
        inputo.value = val;
        inputo.setAttribute('readOnly', 'readOnly')
        inputo.select();
        document.execCommand("Copy");
        document.body.removeChild(inputo);
        messageApi.open({
            type: 'success',
            content: '词汇已复制到剪贴板',
        });
    }

    const handleCpChange = (val) => {
        if (!val) {
            dispatch({
                type: EVENTS.rerenderTitleMark,
                tag: 'title',
            });
            return;
        }
        let from = {};
        let to = {};
        let id = '';
        if (+val === 1) {
            from = editorStore.topicTag.front.from;
            to = editorStore.topicTag.front.to;
            id = 'front';
        } else if (+val === 2) {
            from = editorStore.topicTag.mid.from;
            to = editorStore.topicTag.mid.to;
            id = 'mid';
        } else if (+val === 3) {
            from = editorStore.topicTag.after.from;
            to = editorStore.topicTag.after.to;
            id = 'after';
        }
        dispatch({
            type: EVENTS.clickTopic,
            tag: 'title',
            mark: {
                from,
                to,
                class: 'topic-mark',
                id,
            }
        })
    }

    const refresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }
    return <NormalCard title={<span className='title'>{cardInfo.title}</span>}
        content={vocVisible ? <>
            {!refreshing ? (<Space direction="vertical">
                {contextHolder}
                <Collapse collapsible="header" defaultActiveKey={['1']} expandIcon={() => <div></div>} accordion onChange={(val) => handleCpChange(val)}>
                    <Panel header="前序词推荐" key="1">
                        <p>{
                            editorStore.topicTag.front.tag.map(tag => {
                                return (
                                    <Tooltip key={tag.id} placement="top" title={"点击复制"}>
                                        <Tag className="topicTag" color={"#F5EDFF"} onClick={() => toClipBoard(tag.title)}>{tag.title}</Tag>
                                    </Tooltip>
                                )
                            })
                        }</p>
                    </Panel>
                    <Panel header="中序词推荐" key="2">
                        <p>{
                            editorStore.topicTag.mid.tag.map(tag => {
                                return (
                                    <Tooltip key={tag.id} placement="top" title={"点击复制"}>
                                        <Tag className="topicTag" color={"#F5EDFF"} onClick={() => toClipBoard(tag.title)}>{tag.title}</Tag>
                                    </Tooltip>
                                )
                            })
                        }</p>
                    </Panel>
                    <Panel header="后序词推荐" key="3">
                        <p>{
                            editorStore.topicTag.after.tag.map(tag => {
                                return (
                                    <Tooltip key={tag.id} placement="top" title={"点击复制"}>
                                        <Tag className="topicTag" color={"#F5EDFF"} onClick={() => toClipBoard(tag.title)}>{tag.title}</Tag>
                                    </Tooltip>
                                )
                            })
                        }</p>
                    </Panel>
                </Collapse>
            </Space>) : <div className='flex flex-col items-center h-52 justify-center'>
                <Spin />推荐词汇生成中</div>}
        </> : <>
            <div className=''>
                <div className='topic-title font-bold text-center mb-6'>
                    为保证推荐准确度，请选择与您的商品最相似的竞品
                </div>
                <div className='relative'>
                    <Button
                        className="leftButton"
                        style={{ left: -14 }}
                        onClick={() => {
                            carouselEL.current.prev();
                            if (!currentId) {
                                setSlideTimes(slideTimes + 1);
                            }
                        }}
                        icon={<LeftOutlined />}
                    ></Button>
                    <Button
                        className="rightButton"
                        style={{ right: -14 }}
                        onClick={() => {
                            carouselEL.current.next();
                            if (!currentId) {
                                setSlideTimes(slideTimes + 1);
                            }
                        }}
                        icon={<RightOutlined />}
                    ></Button>
                    <Carousel className='topic-carousel mb-4' slidesPerRow={3} dots={false} style={{ margin: "30px 20px 0px 20px", paddingTop: 0 }} ref={carouselEL}>
                        {
                            cardInfo.topicCard.map(tc => (
                                <Card
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={<img alt="example" src={tc.cover}
                                    />}
                                    className={`topic-carousel_card ${currentId === tc.id && 'topic-carousel_card--selected'}`}
                                    onClick={() => handleCardClick(tc)}
                                    key={tc.id}
                                >
                                    <div className='text-3'>
                                        {tc.title}
                                    </div>
                                </Card>
                            ))
                        }
                    </Carousel>
                </div>
                {urlInputVisible && <div>
                    <div className='topic-title font-bold text-center mb-4 mt-4'>
                        没有找到同类竞品？
                    </div>
                    <div className='urlInput'>
                        <Input onChange={(e) => {
                            setUrl(e.target.value);
                        }} placeholder="输入竞品链接，建议选择搜索排序靠前的竞品" />
                    </div>
                </div>}
                <div>
                    <button onClick={() => {
                        setVocVisible(true);
                        handleCpChange("1");
                    }} className={`topic-button ${btnDisabled ? 'topic-button--disabled' : ''}`}>选好了，开始推荐</button>
                </div>
            </div></>}
        collapsed={false}
        desc={cardInfo.desc}
        rightTopBtn={<div className='flex items-center ml-auto' style={{ color: '#86909C' }}>
            {vocVisible &&
                <>
                    <div className='mr-4 flex items-center cursor-pointer' onClick={() => {
                        setVocVisible(false)
                        setCurrentId('');
                        setSlideTimes(0);
                        setUrlInputVisible(false);
                        setUrl('');
                    }}>修改竞品<SwapOutlined className='ml-1' /></div>
                    <div className='flex items-center cursor-pointer' onClick={() => {
                        refresh()
                    }}>刷新<ReloadOutlined className='ml-1' /></div>
                </>
            }
        </div>}
        onClick={handleClick} />
})

export const FiveDescGenerateCard: React.FC<ICardProps> = observer(({ cardInfo }) => {
    const { totalWords, currentPage, setPage, currentWords, selectWord, setGenerating } = fiveDescStore;
    useEffect(() => {
        setPage(0);
    }, []);
    const confirmFiveGenerate = () => {
        Modal.confirm({
            title: '当前版本的五点描述将被替换且无法找回，是否重新生成五点描述？',
            cancelText: '暂不生成',
            okText: '重新生成',
            icon: <QuestionCircleOutlined color='#fff' />,
            onOk() {
                console.log('OK');
                setGenerating(true);

                // TDOO ajax
                setTimeout(() => {
                    setGenerating(false);
                }, 2000);
            },
            onCancel() {
                console.log('Cancel');
            },
        })
    }
    const manualInput = (
        <div>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="请输入词汇"
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={[
                    {
                        value: '1',
                        label: 'Not Identified',
                    },
                    {
                        value: '2',
                        label: 'Closed',
                    },
                    {
                        value: '3',
                        label: 'Communicated',
                    },
                    {
                        value: '4',
                        label: 'Identified',
                    },
                    {
                        value: '5',
                        label: 'Resolved',
                    },
                    {
                        value: '6',
                        label: 'Cancelled',
                    },
                ]}
            />
            <div className='flex justify-center mt-2'>
                <Button className='mr-2' type='default'>取消</Button>
                <Button type='primary'>保存</Button>
            </div>
        </div>
    );
    return (
        <NormalCard content={
            <div className='five-key'>
                <div className='topic-title font-bold text-center mb-6'>
                    请选择希望在五点描述体现的词汇
                </div>
                <div className='five-key_card_wrapper'>
                    {
                        currentWords.map(word => (
                            <div className={`five-key_card ${totalWords.filter(w => w.id === word.id)[0].selected && 'five-key_card--selected'}`} key={word.id} onClick={() => selectWord(word)}>
                                <div className='five-key_card_en'>{word.val}</div>
                                <div className='five-key_card_cn'>{word.cn}</div>
                            </div>
                        ))
                    }
                </div>
                <div className='text-center mt-4'>
                    <Pagination defaultCurrent={currentPage + 1} total={totalWords.length} onChange={(v) => {
                        setPage(v - 1)
                    }} />
                </div>
                <div>
                    <div className='flex items-center'>
                        <div>已选词汇 <Badge count={22} color='#F2F3F5' /></div>
                        <div className='flex items-center ml-auto'>
                            <Popover content={manualInput} title={null} trigger="click">
                                <Button type='link' >+ 手动录入</Button>
                            </Popover>
                        </div>
                    </div>
                    <div className='checked-box'>
                        {totalWords.filter(w => w.selected).map(v => (
                            <div key={v.id} className='selectedWord'>{v.val}</div>
                        ))}
                    </div>
                </div>
                <div>
                    <button onClick={() => {
                        confirmFiveGenerate();
                    }} className={`topic-button`}>选好了，重新生成五点描述</button>
                </div>
            </div>
        } collapsed={false}
            desc={cardInfo.desc} />
    )
});