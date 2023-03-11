import { CardInfo, CARD_TYPE, FiveDescGenerateCard, RecommandWord, TitleWordRootRecommand, TopicWordSelectCard } from '@components/recommand-card';
import React, { useCallback, useEffect, useState } from 'react';
import { RecommandCard } from '@components/recommand-card';
import useBus, { dispatch } from 'use-bus'
import './index.scss';
import { EVENTS } from '@constants/index';
import { observer } from 'mobx-react-lite';
import useEditorStore, { EDITOR_CARD_NAME, ETabIndex } from '@store/editorStore';
import fiveDescStore from '@store/fiveDescStore';
import { editStore } from '@store/index';
import { Carousel, Spin } from 'antd';
export const ToolBox: React.FC = () => {
    const { cardList, setCardList, tabs, tabIndex, setTabIndex, titleCardList, contentCardList, clearSelectedErrorMask } = useEditorStore;

    useEffect(() => {
        setTabIndex(ETabIndex.TITLE);
    }, []);
    useBus(
        EVENTS.changeTab,
        (e) => {
        },
        [],
    )
    const handleTabChange = (tab) => {
        dispatch({
            type: EVENTS.rerenderTitleMark,
            tag: 'title',
        });
        setTabIndex(tab.key);
        if (tab.key === '0') {
            setCardList([...titleCardList]);
        } else if (tab.key === '1') {
            setCardList([...contentCardList]);
        }
        dispatch({
            type: EVENTS.changeTab,
            tab,
        });
    };

    const toggleCard = (idx) => {
        const arr = cardList.map((c, i) => {
            let obj = {
                ...c
            };
            const isMatch = i === idx;
            if (obj.type === CARD_TYPE.STATIC) {
                return obj;
            }

            if (obj.type === CARD_TYPE.RECOMMAND) {
                obj.collapsed = false;

                if (!isMatch) {
                    (obj as CardInfo).recommandWords.forEach((val) => {
                        val.collapsed = true;
                    });
                }
            } else {
                obj.collapsed = !isMatch;
            }
            return obj;
        })
        setCardList(arr)
    }
    const handleCardClick = (card, idx) => {
        // dispatch({
        //     type: EVENTS.rerenderTitleMark,
        //     tag: 'title',
        // });
        toggleCard(idx);
        const cardName = editStore.tabIndex === ETabIndex.TITLE ? EDITOR_CARD_NAME.TITLE : EDITOR_CARD_NAME.CONTENT;
        const eventType = editStore.tabIndex === ETabIndex.TITLE ? EVENTS.openTitleCard : EVENTS.openContentCard;
        const kAvailiableCardType = [CARD_TYPE.NORMAL, CARD_TYPE.REPLACE, CARD_TYPE.RECOMMAND];
        if (kAvailiableCardType.includes(card.type)) {
            dispatch({
                type: eventType,
                id: card.id
            });
        } else if (card.type === CARD_TYPE.STATIC) {
            clearSelectedErrorMask()
        }
        editStore.setFocusedEditorCard(cardName)
    }

    const handleTopicClick = (v) => {
        console.log(v);
    }
    const contentStyle: React.CSSProperties = {
        margin: 0,
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    const { generating } = fiveDescStore;

    const handleTitleWordRootRecommandCardTabClick = (cardInfo: CardInfo, recommandCard: RecommandWord) => {
        const cardName = editStore.tabIndex === ETabIndex.TITLE ? EDITOR_CARD_NAME.TITLE : EDITOR_CARD_NAME.CONTENT;
        const eventType = editStore.tabIndex === ETabIndex.TITLE ? EVENTS.openTitleCard : EVENTS.openContentCard;
        dispatch({
            type: eventType,
            id: cardInfo.id,
            word: recommandCard.word,
        });
        editStore.setFocusedEditorCard(cardName)
    }
    return (
        <div style={{ width: '530px' }}>
            <div className='tool-box_tab_warpper flex items-center'>
                {
                    tabs.map(tab => <div key={tab.key} className={`tool-box_tab_item ${tabIndex === tab.key && 'tool-box_tab_item--active'}`} onClick={() => !tab.disabled && handleTabChange(tab)}>{tab.label}</div>)
                }
            </div>
            <div className='tool-box_card'>
                {
                    (!generating || tabIndex === '0') ? (<>
                        {
                            cardList.map((card, idx) => {
                                if (card.type === CARD_TYPE.NORMAL || card.type === CARD_TYPE.REPLACE || card.type === CARD_TYPE.STATIC) {
                                    return <RecommandCard onClick={() => handleCardClick(card, idx)} key={`${idx}-${card.collapsed}`} cardInfo={card} />
                                } else if (card.type === CARD_TYPE.TOPIC) {
                                    return <TopicWordSelectCard onClick={() => handleTopicClick(card)} key={`${idx}-${card.collapsed}`} cardInfo={card} />
                                } else if (card.type === CARD_TYPE.FIVE_DESC) {
                                    return <FiveDescGenerateCard onClick={() => handleTopicClick(card)} key={`${idx}-${card.collapsed}`} cardInfo={card} />
                                } else if (card.type === CARD_TYPE.RECOMMAND) {
                                    return <TitleWordRootRecommand onTabClick={handleTitleWordRootRecommandCardTabClick} key={`${idx}-${card.collapsed}`} cardInfo={card} />
                                }
                            })
                        }</>) : (
                        <div className='flex justify-center items-center flex-col' style={{ height: 400 }}>
                            <Spin className='mb-2' />
                            <div>五点描述生成中，请稍候</div>
                        </div>
                    )
                }
            </div>

        </div>
    )
}
export default observer(ToolBox);
