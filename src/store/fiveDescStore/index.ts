import { MEditor, MTextMarker } from '@components/m-code-mirror';
import { CardInfo, CARD_TYPE } from '@components/recommand-card';
import { EVENTS } from '@constants/index';
import CodeMirror, { Editor, Position, TextMarker } from 'codemirror'
import { makeAutoObservable } from 'mobx'
import { dispatch } from 'use-bus';
export const NORMAL_MARK_CLASS = 'error-mark';
export const SELECTED_MARK_CLASS = 'error-mark error-mark--selected';
type Word = {
    id: string,
    val: string,
    cn: string,
    selected: boolean;
}
export class fiveDescStore {
    constructor() {
        makeAutoObservable(this)
    }

    totalWords: Word[] = [
        {
            id: '1',
            val: 'party',
            cn: '排队',
            selected: false,
        }, {
            id: '2',
            val: 'sleeveless',
            cn: '排队',
            selected: false,
        }, {
            id: '3',
            val: 'soft',
            cn: '排队',
            selected: false,
        }, {
            id: '4',
            val: 'cardigan sweater',
            cn: '排队',
            selected: false,
        }, {
            id: '5',
            val: 'Imported',
            cn: '排队',
            selected: false,
        }, {
            id: '6',
            val: 'knit',
            cn: '排队',
            selected: false,
        }, {
            id: '7',
            val: 'ruffle hem',
            cn: '排队',
            selected: false,
        }, {
            id: '8',
            val: 'Flattering fit',
            cn: '排队',
            selected: false,
        }, {
            id: '9',
            val: 'formal',
            cn: '排队',
            selected: false,
        }, {
            id: '10',
            val: 'lantern sleeve',
            cn: '排队',
            selected: false,
        }, {
            id: '11',
            val: 'casual',
            cn: '排队',
            selected: false,
        }, {
            selected: false,
            id: '12',
            val: 'stretchable',
            cn: '排队',
        }, {
            id: '13',
            val: 'party',
            cn: '排队',
            selected: false,
        }, {
            id: '14',
            val: 'party',
            cn: '排队',
            selected: false,
        }, {
            selected: false,
            id: '15',
            val: 'party',
            cn: '排队',
        }
    ]

    currentWords: Word[] = [];
    currentPage: number = 0;
    generating: boolean = false;
    setPage = (page) => {
        this.currentPage = page;
        this.currentWords = this.totalWords.slice(page * 12, (page + 1) * 12);
    }

    selectWord = (word) => {
        this.totalWords.forEach(w => {
            if (w.id === word.id) {
                w.selected = !w.selected;
            }
        })
        console.log(this.totalWords);
    }
    setGenerating = (val) => this.generating = val;
}

export default new fiveDescStore();