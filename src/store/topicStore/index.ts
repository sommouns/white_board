import { MEditor, MTextMarker } from '@components/m-code-mirror';
import { CardInfo, CARD_TYPE } from '@components/recommand-card';
import { EVENTS } from '@constants/index';
import CodeMirror, { Editor, Position, TextMarker } from 'codemirror'
import { makeAutoObservable } from 'mobx'
import { dispatch } from 'use-bus';
export const NORMAL_MARK_CLASS = 'error-mark';
export const SELECTED_MARK_CLASS = 'error-mark error-mark--selected';

export class TopicStore {
    constructor() {
        makeAutoObservable(this)
    }

    slideTimes = 0;
    urlInputVisible = false;
    url = '';
    btnDisabled = false;
    currentId = '';
    vocVisible = false;
    refreshing = false;

    setSlideTimes = (v) => this.slideTimes = v;
    setUrlInputVisible = (v) => this.urlInputVisible = v;
    setUrl = (v) => this.url = v;
    setBtnDisabled = (v) => this.btnDisabled = v;
    setCurrentId = (v) => this.currentId = v;
    setVocVisible = (v) => this.vocVisible = v;
    setRefreshing = (v) => this.refreshing = v;

}

export default new TopicStore();