import { MEditor, MTextMarker } from '@components/m-code-mirror';
import { CardInfo, CARD_TYPE, RecommandWord } from '@components/recommand-card';
import { EVENTS } from '@constants/index';
import CodeMirror, { Editor, Position, TextMarker } from 'codemirror'
import { makeAutoObservable } from 'mobx'
import { dispatch } from 'use-bus';
export const NORMAL_MARK_CLASS = 'error-mark';
export const SELECTED_MARK_CLASS = 'error-mark error-mark--selected';
export enum EDITOR_CARD_NAME {
    TITLE,
    CONTENT,
    NONE
}
export enum eMarkType {
    Error = 'error-mark',
    Recommand = 'recommand-mark',
}
export type keyword = {
    recommand: boolean;
    val: string;
    selected: boolean;
}
export enum ETabIndex {
    TITLE = '0',
    CONTENT = '1'
}
export type TopicTagDetail = {
    id?: string;
    title: string;
}

export type TagInfo = {
    from: {
        line: number,
        ch: number,
    },
    to: {
        line: number,
        ch: number,
    },
    tag: TopicTagDetail[];
}
export type TopicTag = {
    front: TagInfo;
    mid: TagInfo;
    after: TagInfo;
}
export class EditorStore {
    constructor() {
        makeAutoObservable(this)
    }
    selectedMark: MTextMarker = null;
    focusedEditorCard: EDITOR_CARD_NAME = EDITOR_CARD_NAME.NONE;
    titleCM: MEditor;
    contentCM: MEditor;
    cardList: CardInfo[] = [];
    titleCardList: CardInfo[] = [
        {
            id: 10,
            type: CARD_TYPE.STATIC,
            title: '建议标题缩减至 15-20 个单词以内',
            content: '当单词数处于 15-20 以内时，商品搜索排序更可能排在前 20 位',
            desc: '标题过长'
        },
        {
            id: 17,
            type: CARD_TYPE.RECOMMAND,
            desc: '标题卖点词推荐',
            recommandWords: [
                {
                    word: 'Casual',
                    list: ['sleeveless', 'strethcable', 'latern sleeve', 'sleeveless', 'strethcable', 'latern sleeve', 'sleeveless', 'strethcable', 'latern sleeve'],
                    collapsed: true,
                    from: {
                        line: 0,
                        ch: 65
                    },
                    to: {
                        line: 0,
                        ch: 71
                    }
                }, {
                    word: 'Lantern Sleeve',
                    list: ['sleeveless', 'strethcable', 'latern sleeve'],
                    collapsed: true,
                    from: {
                        line: 0,
                        ch: 47
                    },
                    to: {
                        line: 0,
                        ch: 61
                    }
                }
            ],
            collapsed: false,
        },
        {
            id: 14,
            type: CARD_TYPE.TOPIC,
            desc: '标题词汇推荐',
            content: '',
            collapsed: false,
            topicCard: [
                {
                    id: '1',
                    cover: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                    title: 'Pink Queen Womens Loose Turtleneck Oversize Long Pullover Sweater Dress',
                    selected: false
                },
                {
                    id: '2',
                    cover: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                    title: 'Pink Queen Womens Loose Turtleneck Oversize Long Pullover Sweater Dress',
                    selected: false
                },
                {
                    id: '3',
                    cover: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                    title: 'Pink Queen Womens Loose Turtleneck Oversize Long Pullover Sweater Dress',
                    selected: false
                },
                {
                    id: '4',
                    cover: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                    title: 'Pink Queen Womens Loose Turtleneck Oversize Long Pullover Sweater Dress',
                    selected: false
                },
                {
                    id: '5',
                    cover: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                    title: 'Pink Queen Womens Loose Turtleneck Oversize Long Pullover Sweater Dress',
                    selected: false
                },
                {
                    id: '6',
                    cover: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                    title: 'Pink Queen Womens Loose Turtleneck Oversize Long Pullover Sweater Dress',
                    selected: false
                },
                {
                    id: '7',
                    cover: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                    title: 'Pink Queen Womens Loose Turtleneck Oversize Long Pullover Sweater Dress',
                    selected: false
                },
                {
                    id: '8',
                    cover: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                    title: 'Pink Queen Womens Loose Turtleneck Oversize Long Pullover Sweater Dress',
                    selected: false
                }
            ]
        },
        {
            id: 11,
            type: CARD_TYPE.NORMAL,
            tagText: 'Women',
            tagColor: '#E7D3FF',
            title: '建议不使用被动语态',
            content: '依据：排序表现好的标题，95%没有使用重复单词；排序表现差的标题，该比例下降至70%',
            collapsed: true,
            word: 'Women',
            desc: '词汇重复出现',
            from: {
                line: 0,
                ch: 9,
            },
            to: {
                line: 0,
                ch: 14,
            }
        },
        {
            id: 12,
            type: CARD_TYPE.REPLACE,
            tagText: 'dress',
            tagColor: '#C3F1CF',
            title: '建议不使用被动语态',
            content: '依据：排序表现好的标题，95%没有使用复数；排序表现差的标题，该比例下降至32%',
            collapsed: true,
            word: 'dresses',
            desc: '词汇重复出现',
            rawWord: 'dresses',
            from: {
                line: 0,
                ch: 15,
            },
            to: {
                line: 0,
                ch: 20,
            }
        }
    ];
    titleTranslate = 'ANRABESS 女式高领连衣裙可爱长款灯笼袖休闲宽松大码连衣裙毛衣柔软冬季套头连衣裙';
    contentTranslate = `设计 - 高领毛衣、气球袖、罗纹针织、宽松版型、纯色，这款百搭针织套头毛衣迷你连衣裙既时尚又舒适 
    材质 - 这款迷你长袖毛衣连衣裙采用优质弹性材料制成，柔软、温暖、有弹性、舒适的触感为您带来完美的穿着体验，出色的剪裁凸显曲线轮廓 
    适用场合 - 无论您是日常穿着、工作、派对、旅行还是婚礼，这款可爱的针织迷你毛衣连衣裙绝对是您的明智之选。也适合圣诞节、新年或其他特殊场合 
    着装提示 - 外穿外套、紧身裤、紧身牛仔裤、高跟鞋、靴子、围巾或无檐小便帽将是绝佳伴侣。这款针织套头毛衣迷你连衣裙让您充满活力、独特而迷人。轻松打造时尚休闲造型 服装护理 - 轻柔机洗或冷水手洗，不可漂白，平铺晾干`;
    topicTag: TopicTag = {
        front: {
            from: {
                line: 0,
                ch: 0
            },
            to: {
                line: 0,
                ch: 25
            },
            tag: [{
                id: '1',
                title: 'cardigan'
            }, {
                id: '2',
                title: 'open front'
            },
            {
                id: '3',
                title: 'long sleeve'
            }, {
                id: '4',
                title: 'knit'
            }, {
                id: '5',
                title: 'soft'
            }, {
                id: '6',
                title: 'casual'
            }]
        },
        mid: {
            from: {
                line: 0,
                ch: 26
            },
            to: {
                line: 0,
                ch: 64
            },
            tag: [{
                id: '1',
                title: 'cardigan'
            }, {
                id: '2',
                title: 'open front'
            },
            {
                id: '3',
                title: 'long sleeve'
            }, {
                id: '4',
                title: 'knit'
            }, {
                id: '5',
                title: 'soft'
            }, {
                id: '6',
                title: 'casual'
            }]
        },
        after: {
            from: {
                line: 0,
                ch: 65
            },
            to: {
                line: 0,
                ch: 130
            },
            tag: [{
                id: '1',
                title: 'cardigan'
            }, {
                id: '2',
                title: 'open front'
            },
            {
                id: '3',
                title: 'long sleeve'
            }, {
                id: '4',
                title: 'knit'
            }, {
                id: '5',
                title: 'soft'
            }, {
                id: '6',
                title: 'casual'
            }]
        }
    };
    contentCardList: CardInfo[] = [
        {
            id: 15,
            type: CARD_TYPE.FIVE_DESC,
            desc: '五点描述词汇推荐',
        },
        {
            id: 13,
            type: CARD_TYPE.NORMAL,
            tagText: 'was killed',
            tagColor: '#E7D3FF',
            title: '建议不使用被动语态',
            content: '依据：排序表现好的标题，95%没有使用重复单词；排序表现差的标题，该比例下降至70%',
            collapsed: true,
            word: 'Comfortable',
            desc: '词汇重复出现',
            from: {
                line: 0,
                ch: 66
            },
            to: {
                line: 0,
                ch: 130
            }
        }
    ]
    keywords: keyword[] = [
        {
            recommand: true,
            val: 'dress',
            selected: true,
        },
        {
            recommand: true,
            val: 'casual dress',
            selected: false,
        },
        {
            recommand: false,
            val: 'long sleeve',
            selected: false,
        }
    ];

    get titleMarks(): Array<{
        id: string;
        markType: eMarkType;
        from: {
            line: number;
            ch: number;
        };
        to: {
            line: number;
            ch: number;
        }
    }> {
        const val = this.titleCardList.reduce((total, val, idx) => {
            if (!total) {
                total = [];
            }
            // 标题卖点词推荐
            if (val.recommandWords) {
                const marks = val.recommandWords.map((v) => ({ from: v.from, to: v.to, markType: eMarkType.Recommand, id: val.id }));
                total = [...total, ...marks];
                return total;
            }
            if (val.from && val.to) {
                // 普通卡片
                total.push({
                    id: val.id,
                    from: val.from,
                    to: val.to,
                    markType: eMarkType.Error,
                });
            }
            return total;
        }, []);
        console.log(val)
        return val;
    }
    tabIndex = ETabIndex.TITLE;
    tabs = [
        {
            label: `商品标题优化`,
            key: ETabIndex.TITLE,
        },
        {
            label: `五点描述优化 (尚未开放)`,
            key: ETabIndex.CONTENT,
            disabled: true,
        }
    ];

    select = (marker: MTextMarker) => {
        this.selectedMark = marker;
        return SELECTED_MARK_CLASS;
    }

    setFocusedEditorCard = (t: EDITOR_CARD_NAME) => {
        if (this.focusedEditorCard === t) return;
        this.focusedEditorCard = t;
        this.setTabIndex(t === EDITOR_CARD_NAME.TITLE ? ETabIndex.TITLE : ETabIndex.CONTENT);
    }

    setKeywords = (idx) => {
        this.keywords = this.keywords.map((key, index) => {
            if (index === idx) {
                key.selected = true;
            } else {
                key.selected = false;
            }
            return key;
        })
    }

    setCardList = (list: CardInfo[]) => {
        this.cardList = list;
    }
    setTabIndex = (index) => {
        if (this.tabIndex === index && this.cardList.length) return;
        this.tabIndex = index;
        if (index === ETabIndex.CONTENT) {
            this.cardList = [...this.contentCardList];
            this.focusedEditorCard = EDITOR_CARD_NAME.CONTENT;
        } else if (index === ETabIndex.TITLE) {
            this.cardList = [...this.titleCardList];
            this.focusedEditorCard = EDITOR_CARD_NAME.TITLE;
        }
        this.clearSelectedErrorMask();

    }
    selectCardWithId = (id, text) => {
        const arr = this.cardList.map(card => {
            let obj = { ...card };
            if (obj.type === CARD_TYPE.STATIC) {
                return obj;
            }

            if (obj.type === CARD_TYPE.RECOMMAND) {
                obj.collapsed = false;
            } else {
                obj.collapsed = obj.id !== id;
            }
            if (obj.id === id && obj.recommandWords) {
                obj.recommandWords.forEach(word => {
                    word.collapsed = !(word.word === text);
                });
            }
            return obj;
        });
        setTimeout(() => {
            this.cardList = [...arr];
        }, 0);
    }
    selectCardWithPos = (line, ch) => {
        const arr = this.cardList.map(card => {
            let obj = { ...card };
            const isMatch = obj.from.line === line && obj.from.ch === ch;
            if (obj.type === CARD_TYPE.STATIC) {
                return obj;
            }

            if (obj.type === CARD_TYPE.RECOMMAND) {
                obj.collapsed = false;
            } else {
                obj.collapsed = !isMatch;
            }
            return obj;
        })
        setTimeout(() => {
            this.cardList = [...arr];
        }, 0);
    }
    setTitleCM = (cm: MEditor) => {
        console.log(cm)
        this.titleCM = cm;
    }
    setContentCM = (cm: MEditor) => {
        this.contentCM = cm;
    }
    clearSelectedErrorMask = () => {
        if (!this.titleCM) {
            return;
        }
        if (!this.contentCM) {
            return;
        }
        const titleMark = this.titleCM.editor.getAllMarks().filter((mark) => mark.className.includes('error-mark--selected'))
        titleMark.length && dispatch({
            type: EVENTS.clearSelectedMark,
            tag: 'title',
            marks: {
                marker: titleMark[0],
                editor: this.titleCM.editor
            }
        });
        const contentMark = this.contentCM.editor.getAllMarks().filter((mark) => mark.className.includes('error-mark--selected'))
        contentMark.length && dispatch({
            type: EVENTS.clearSelectedMark,
            tag: 'content',
            marks: {
                marker: contentMark[0],
                editor: this.contentCM.editor
            }
        });


    }
    setTopicTag = () => {

    }

    removeRecommandWordTab = (w: RecommandWord, id: number) => {
        const list = this.titleCardList;
        const card = list.find(item => item.id === id);
        if (!card) {
            console.error('[removeRecommandWordTab]card not exist');
            return;
        }
        card.recommandWords = card.recommandWords.filter(word => word.word !== w.word);
        this.titleCardList = list;
    }

    toggleRecommandWordTabCollapse = (word: RecommandWord, recommandWords: RecommandWord[]) => {
        recommandWords.forEach(val => val.collapsed = true)
        word.collapsed = !word.collapsed;
    }

    recommandWordLoadmore = (recommandCard: RecommandWord) => {
        recommandCard.list = [...recommandCard.list, 'ceshi', 'abc'];
    }
    titleContent = '';
    setTitleContent(val) {
        console.log(val);
        this.titleContent = val;
    }

    get titleContentWordCount() {
        if (!this.titleContent) {
            return 0;
        }
        return this.titleContent.split(' ').length;
    }
}

export default new EditorStore()
