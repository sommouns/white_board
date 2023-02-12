import { message } from "antd";
import { makeAutoObservable } from "mobx";

export type SellingPointWord = {
    id?: string;
    en?: string;
    cn?: string;
    tip?: string;
};
export class SellingPointStore {
    constructor() {
        makeAutoObservable(this);
    }

    modalVisible: boolean = false;
    setModalVisible = (visible) => {
        this.modalVisible = visible;
    }

    collapsed: boolean = true;
    setCollapsed = (visible) => {
        this.collapsed = visible;
    }

    regularWords: SellingPointWord[] = [];
    fetchRegularWords = () => {
        this.regularWords = [
            {
                id: '1',
                cn: '',
                en: 'open front',
            },
            {
                id: '2',
                cn: '',
                en: 'neck',
            },
            {
                id: '1',
                cn: '',
                en: 'open front',
            },
            {
                id: '3',
                cn: '',
                en: 'latern sleeve',
            },
            {
                id: '4',
                cn: '',
                en: 'cardigan',
            }, {
                id: '5',
                cn: '',
                en: 'stretchable',
            }, {
                id: '6',
                cn: '',
                en: 'deep V-neck',
            }, {
                id: '7',
                cn: '',
                en: 'solid',
            }, {
                id: '8',
                cn: '',
                en: 'cocktail',
            }, {
                id: '9',
                cn: '',
                en: 'test',
            }, {
                id: '10',
                cn: '',
                en: 'open front',
            }
        ]
    }

    recommandWords: SellingPointWord[] = [
        {
            id: '1',
            cn: '悬垂',
            en: 'drape',
        },
        {
            id: '2',
            cn: '无袖的',
            en: 'sleeveless',
        },
        {
            id: '1',
            cn: '悬垂',
            en: 'kxing sleeve',
        },
        {
            id: '3',
            cn: '开衫',
            en: 'latern sleeve',
        },
        {
            id: '4',
            cn: '深V领',
            en: 'cardigan',
        }, {
            id: '5',
            cn: '便装',
            en: 'stretchable',
        }, {
            id: '6',
            cn: '便装的',
            en: 'deep V-neck',
        }, {
            id: '7',
            cn: '深V领',
            en: 'solid',
        }, {
            id: '8',
            cn: '深V领',
            en: 'cocktail',
        }, {
            id: '9',
            cn: '深V领',
            en: 'test',
        }, {
            id: '10',
            cn: '深V领',
            en: 'open front',
        }
    ];
    pageIndex: number = 1;
    setPageIndex = (idx) => {
        this.pageIndex = idx;
    }

    selectedWords: SellingPointWord[] = [];

    tempManulInputWord: string = '';
    handleInputChange = (v) => {
        this.tempManulInputWord = v;
    }
    tempManuInputVisible = false;
    handleTempManulInputBlur = () => {
        console.log(this.tempManulInputWord)
        this.tempManuInputVisible = false;
        if (this.tempManulInputWord) {
            const result = this.selectedWords.filter(w => w.en === this.tempManulInputWord);
            if (result.length) {
                message.warning('卖点词已存在');
                return;
            }
            setTimeout(() => {
                this.selectedWords.push({
                    en: this.tempManulInputWord
                })
            }, 0);
        }
    }
    setTempManuInputVisible = (v) => {
        this.tempManuInputVisible = v;
        this.tempManulInputWord = '';
    }
    clickManulInput = () => {
        this.setTempManuInputVisible(true);
    }
    preview: string = `Women's Dress Long Sleeve Waist Ruffle Mini Swing Skater lantern sleeve soft sleeveless open front soft sleeveless open front soft sleeveless open front soft sleeveless open front soft sleeveless open front soft sleeveless open front soft sleeveless open front soft sleeveless open front soft sleeveless open front soft sleeveless open front sleeveless sleeveless open front`;

    selectWord = (w: SellingPointWord) => {
        if (!this.selectedWords.filter(word => word.en === w.en).length) {
            this.selectedWords.push(w);
        } else {
            this.removeSelect(w);
        }
    }
    removeSelect = (w) => {
        this.selectedWords = this.selectedWords.filter(word => word.en !== w.en)
    }

    warning: string = '';
    detectWords = () => {
        this.selectedWords = this.selectedWords.map((v, idx) => {
            let temp = { ...v };
            if (idx === 2) {
                temp.tip = '该卖点词排序靠后，建议删除'
                this.warning = '卖点词过多，建议删减当前卖点词';
            }
            return temp;
        })
    }

    get hasWarning() {
        return !!(this.warning || this.selectedWords.filter(w => w.tip).length)
    }

    confirm = () => {
        this.setModalVisible(false);
    }
}

export default new SellingPointStore()