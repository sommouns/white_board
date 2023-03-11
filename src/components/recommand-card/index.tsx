import { Badge, Button, Card, Collapse, message, Modal, Pagination, Popover, Select, Space, Spin, Tag, Tooltip } from 'antd';
import React, { MouseEventHandler, ReactElement, useCallback, useEffect, useState } from 'react'
import { DeleteOutlined, AppstoreAddOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import image from '../../assets/images/arrow.jpg';
import './index.scss';
import editorStore from '@store/editorStore';
import topicStore from '@store/topicStore';
import fiveDescStore from '@store/fiveDescStore';
import { dispatch } from 'use-bus';
import { EVENTS } from '@constants/index';
import { observer } from 'mobx-react-lite';
import OrderTooltipImg from '@assets/images/Tooltip-center.png';
const { Panel } = Collapse;
export enum CARD_TYPE {
    NORMAL = 1,
    REPLACE = 2,
    STATIC = 3,
    TOPIC = 4,
    FIVE_DESC = 5,
    RECOMMAND = 6,
}
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

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
    recommandWords?: RecommandWord[];
}
export type RecommandWord = {
    word: string;
    list: string[];
    collapsed?: boolean;
    from?: {
        line: number;
        ch: number;
    };
    to?: {
        line: number;
        ch: number;
    };
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
    desc?: string | ReactElement;
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
                            {props.word && <span className='word cursor-pointer'>{props.word}</span>}
                            <span className='desc cursor-pointer'>{props.desc}</span>
                        </div>
                    ) :
                    (<div>
                        <div className='flex items-center'>
                            <div className='list-dot'></div>
                            <span className='desc cursor-pointer'>{props.desc}</span>
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


    const handleCpChange = (val) => {
        if (!val) {
            dispatch({
                type: EVENTS.rerenderTitleMark,
                tag: 'title',
            });
            return;
        }
        // let from = {};
        // let to = {};
        // let id = '';
        // if (+val === 1) {
        //     from = editorStore.topicTag.front.from;
        //     to = editorStore.topicTag.front.to;
        //     id = 'front';
        // } else if (+val === 2) {
        //     from = editorStore.topicTag.mid.from;
        //     to = editorStore.topicTag.mid.to;
        //     id = 'mid';
        // } else if (+val === 3) {
        //     from = editorStore.topicTag.after.from;
        //     to = editorStore.topicTag.after.to;
        //     id = 'after';
        // }
        // dispatch({
        //     type: EVENTS.clickTopic,
        //     tag: 'title',
        //     mark: {
        //         from,
        //         to,
        //         class: 'topic-mark',
        //         id,
        //     }
        // })
    }

    const refresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }
    return <NormalCard title={<span className='title'>{cardInfo.title}</span>}
        content={<>
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
        </>}
        collapsed={cardInfo.collapsed}
        desc={<div className='flex items-center'>
            {cardInfo.desc}<Tooltip overlayStyle={{ maxWidth: '560px' }} color="#fff" title={<div style={{
                width: '520px',
            }}>
                <img src={OrderTooltipImg} style={
                    {
                        width: '520px',
                    }
                } />
            </div>}><QuestionCircleOutlined className='ml-1' /></Tooltip>
        </div >}
        // rightTopBtn={<div className='flex items-center ml-auto' style={{ color: '#86909C' }}>
        //     {vocVisible &&
        //         <>
        //             <div className='flex items-center cursor-pointer' onClick={() => {
        //                 refresh()
        //             }}>刷新<ReloadOutlined className='ml-1' /></div>
        //         </>
        //     }
        // </div>}
        onClick={handleClick} />
})

export const TitleWordRootRecommand: React.FC<ICardProps & {
    onTabClick?: (cardInfo: CardInfo, recommandCard: RecommandWord) => void;
}> = observer(({ cardInfo, onTabClick }) => {
    const toClipBoard = useCallback((val) => {
        const inputo = document.createElement("input");
        document.body.appendChild(inputo);
        inputo.value = val;
        inputo.setAttribute('readOnly', 'readOnly')
        inputo.select();
        document.execCommand("Copy");
        document.body.removeChild(inputo);
        message.success('词汇已复制到剪贴板');
    }, []);

    const handleTabClick = (cardInfo: CardInfo, recommandCard: RecommandWord, recommandWords: RecommandWord[]) => {
        editorStore.toggleRecommandWordTabCollapse(recommandCard, recommandWords);
        console.log(onTabClick);
        onTabClick(cardInfo, recommandCard);
    }
    return (
        <NormalCard content={
            <div className='recommand-word'>
                {cardInfo.recommandWords.map((recommandCard, idx) => {
                    return (<div className="recommand-word_card" key={idx}>
                        <div className={`recommand-word_card_title flex flex-row items-center 
                            ${recommandCard.collapsed && 'recommand-word_card_title--collapsed'}`}
                            onClick={() => handleTabClick(cardInfo, recommandCard, cardInfo.recommandWords)}>
                            <div className='recommand-word_card_title-content cursor-pointer flex items-center'>根据
                                <span> {recommandCard.word} </span>
                                推荐</div>
                            <Tooltip title={"删除推荐"}>
                                <DeleteOutlined className='ml-auto cursor-pointer'
                                    onClick={() => editorStore.removeRecommandWordTab(recommandCard, cardInfo.id)}
                                    style={{
                                        color: '#86909C'
                                    }} />
                            </Tooltip>
                        </div>
                        {
                            !recommandCard.collapsed && <>
                                <div className="recommand-word_card_list">
                                    {
                                        recommandCard.list.map((tag, idx) => {
                                            return (
                                                <Tooltip key={idx} placement="top" title={"点击复制"}>
                                                    <Tag className="topicTag" color={"#F5EDFF"} onClick={() => toClipBoard(tag)}>{tag}</Tag>
                                                </Tooltip>
                                            )
                                        })
                                    }
                                </div>
                                <div onClick={() => editorStore.recommandWordLoadmore(recommandCard)} className='recommand-word_card_more flex items-center justify-center cursor-pointer'>
                                    <AppstoreAddOutlined className='mr-1' />更多卖点词
                                </div>
                            </>
                        }
                    </div>)
                })}
            </div>
        } collapsed={cardInfo.collapsed}
            desc={cardInfo.desc} />
    )
});

// 五点描述生成卡片
export const FiveDescGenerateCard: React.FC<ICardProps> = observer(({ cardInfo }) => {
    const { totalWords, currentPage, setPage, currentWords, selectWord, setGenerating, append } = fiveDescStore;
    useEffect(() => {
        setPage(0);
    }, []);
    const [popoverVisible, setPopoverVisible] = React.useState(false);
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
    const options = [
        {
            id: '555',
            val: 'party',
            cn: '排队',
            label: 'party',
            value: '555',
        },
        {
            id: '444',
            val: 'pa',
            cn: '排队',
            label: 'party',
            value: '444',
        },
        {
            id: '111',
            val: 'rty',
            cn: '排队',
            label: 'party',
            value: '111',
        },
        {
            id: '222',
            val: 'prty',
            cn: '排队',
            label: 'party',
            value: '222',
        },
        {
            id: '333',
            val: 'partyqweqe',
            cn: '排队',
            label: 'party',
            value: '333',
        },
        {
            id: '13',
            val: 'party',
            cn: '排队',
            label: 'party',
            value: '13',
        },
    ];
    const [manualInputVal, setManualInputVal] = useState(null);
    const manualInput = (
        <div>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="请输入词汇"
                optionFilterProp="children"
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={options}
                onChange={(val) => {
                    setManualInputVal(val)
                }}
                value={manualInputVal}
            />
            <div className='flex justify-center mt-2'>
                <Button className='mr-2' type='default' onClick={() => setPopoverVisible(false)}>取消</Button>
                <Button type='primary' onClick={() => {
                    if (!manualInputVal) return;
                    let [target] = options.filter((v) => v.value === manualInputVal);
                    append({
                        id: target.id,
                        val: target.val,
                        cn: target.cn,
                        selected: true
                    });
                    setPopoverVisible(false);
                    setManualInputVal(null);
                }}>保存</Button>
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
                        <div>已选词汇 <Badge showZero count={totalWords.filter(w => w.selected).length} color='#F2F3F5' style={
                            { color: '#86909C' }
                        } /></div>
                        <div className='flex items-center ml-auto'>
                            <Popover content={manualInput} title={null} trigger="click" open={popoverVisible}>
                                <Button type='link' onClick={() => setPopoverVisible(true)}>+ 手动录入</Button>
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