import React, { useCallback, useState } from 'react'
import { Button, Layout, Input } from 'antd'
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/lib/codemirror.js';
import 'codemirror/theme/material.css';
import 'codemirror/mode/clike/clike.js';
import { TextMarker, Editor, Position, MarkerRange } from 'codemirror';
import editorStore, { EditorStore, EDITOR_CARD_NAME, NORMAL_MARK_CLASS, SELECTED_MARK_CLASS } from '@store/editorStore'
import { observer } from 'mobx-react';
import useBus, { dispatch } from 'use-bus'
import { EVENTS } from '@constants/index';
import { editStore } from '@store/index';
export interface IMCodeMirror {
    onMarkClick?: (marker: MTextMarker) => void;
    onMounted?: (editor: MEditor) => void;
    onChange?: (editor: Editor, data: string, value: string) => void;
    initialValue?: string;
    showGutter?: boolean;
    customClass?: string;
    readOnly?: boolean;
    tag?: string;
}
export interface MTextMarker {
    id?: number;
    text?: string;
    marker?: TextMarker;
    editor: Editor;
    line?: number;
    ch?: number;
}
export interface MEditor {
    editor: Editor;
    createMark: (editor: Editor, from: Position, to: Position, markClass: string, id: number) => void;
    clearMarks: (editor: Editor) => void;
}
const MCodeMirror: React.FC<IMCodeMirror> = (props) => {
    const { onMounted, onMarkClick, initialValue = '', showGutter = true, customClass = '', readOnly = false, tag = '' } = props;
    // if (!onMarkClick || !onMounted) {
    //     console.error('[m-codemirror] `onMarkClick` and `onMounted` is required!');
    //     return;
    // }
    const [, setInstance] = useState(null);


    /**
     * mark handler
     */
    const [marks, setMarks] = useState([]);
    const createMark = (editor: Editor, from: Position, to: Position, markClass, id, needReplace = true) => {
        if (needReplace) {
            const span = document.createElement('span');
            span.innerHTML = editor.getDoc().getRange(from, to);
            span.className = markClass;
            span.dataset.pos = [from.line, from.ch, to.line, to.ch].join('-')
            span.dataset.id = id
            let mark = editor.getDoc().markText(from, to, {
                atomic: true,
                selectRight: true,
                className: markClass,
                replacedWith: span,
                handleMouseEvents: true,
            })
            setMarks([...marks, mark])
            return mark;
        }
        let mark = editor.getDoc().markText(from, to, {
            className: markClass,
        })
        setMarks([...marks, mark])
        return mark;
    }
    const clearMarks = (editor) => {
        (editor as Editor).getDoc().getAllMarks().forEach(mark => mark.clear())
        setMarks([]);
    };
    const getMark = (editor: Editor): MTextMarker | boolean => {
        const cursorPos = editor.getCursor();
        const lineMarks = editor.getDoc().findMarksAt(cursorPos);
        if (!lineMarks.length) {
            return false;
        }
        const target = lineMarks[0].replacedWith;
        return lineMarks.length ? {
            id: +lineMarks[0].replacedWith.dataset.id,
            marker: lineMarks[0],
            text: target.innerText,
            editor: editor,
            line: cursorPos.line,
            ch: cursorPos.ch
        } : false;
    };

    const findMark = (id, event, word = ''): MTextMarker | false => {
        if (event) {
            if (event === EVENTS.openTitleCard && tag === 'content') return;
            if (event === EVENTS.openContentCard && tag === 'title') return;
        }
        const cm = event === EVENTS.openTitleCard ? editStore.titleCM : editStore.contentCM;
        const lineMarks = cm.editor.getDoc().getAllMarks();
        let resultMark = lineMarks.filter(mark => {
            if (+mark.replacedWith.dataset.id === id && ((word && mark.replacedWith.innerText === word) || !word)) {
                return mark
            }
        });
        return resultMark.length ? {
            id: +resultMark[0].replacedWith.dataset.id,
            marker: resultMark[0],
            text: '',
            editor: event === EVENTS.openTitleCard ? editStore.titleCM.editor : editStore.contentCM.editor,
        } : false;
    }

    function updateMark(marker: MTextMarker, color: string) {
        const m = marker.marker;
        const id = +m.replacedWith.dataset.id;
        const res = m.find();
        if (!res) {
            console.log('?????????cm')
            return;
        }
        const { from, to } = res as MarkerRange;
        m.clear();
        const newM = createMark(marker.editor, from, to, color, id);
        marker.marker = newM;
    }
    function resetOldMark(marker: MTextMarker) {
        const _marker = marker.marker;
        const className = _marker.className;
        const newMarkerClassName = className.split(' ')[0];
        updateMark(marker, newMarkerClassName)
    }
    function selectNewMark(marker: MTextMarker) {
        const _marker = marker.marker;
        const className = _marker.className;
        const newMarkerClassName = className + ' ' + className + '--selected';
        updateMark(marker, newMarkerClassName)
        editorStore.selectedMark = marker;
    }

    const editorMounted = (editor: Editor) => {
        setInstance(editor)
        onMounted({
            editor,
            createMark,
            clearMarks,
        });
        editor.on('cursorActivity', (instance: Editor) => {
            const mark = getMark(instance);
            if (!mark) {
                return;
            }
            onMarkClick(mark as MTextMarker);
            const { selectedMark } = editorStore;
            if (selectedMark && selectedMark.marker.className === ((mark as MTextMarker).marker.className)) {
                return;
            }
            if (selectedMark) {
                resetOldMark(selectedMark);
            }
            selectNewMark(mark as MTextMarker);
            editStore.setFocusedEditorCard(tag === 'title' ? EDITOR_CARD_NAME.TITLE : EDITOR_CARD_NAME.CONTENT);
        });
    }

    useBus(
        EVENTS.openTitleCard,
        (e) => {
            const mark = findMark(e.id, EVENTS.openTitleCard, e.word);
            if (!mark) {
                return;
            }
            const { selectedMark } = editorStore;
            if (selectedMark && selectedMark.marker.className === ((mark as MTextMarker).marker.className)) {
                return;
            }
            if (selectedMark) {
                resetOldMark(selectedMark);
            }
            selectNewMark(mark as MTextMarker);
        },
        [],
    )
    useBus(
        EVENTS.openContentCard,
        (e) => {
            const mark = findMark(e.id, EVENTS.openContentCard);
            if (!mark) {
                return;
            }
            const { selectedMark } = editorStore;
            if (selectedMark && selectedMark.marker.className === ((mark as MTextMarker).marker.className)) {
                return;
            }
            if (selectedMark) {
                resetOldMark(selectedMark);
            }
            selectNewMark(mark as MTextMarker);
        },
        [],
    )

    useBus(
        EVENTS.clearSelectedMark,
        (e) => {
            console.log(e);
            if (e.tag === tag) {
                resetOldMark(e.marks as MTextMarker);
            }
        }
    )

    useBus(
        EVENTS.clickTopic,
        (e) => {
            if (tag !== 'title') return;
            clearMarks(editStore.titleCM.editor);
            createMark(editStore.titleCM.editor, e.mark.from, e.mark.to, e.mark.class, e.mark.id, false)
        }
    )

    useBus(
        EVENTS.rerenderTitleMark,
        (e) => {
            if (tag !== 'title') return;
            clearMarks(editStore.titleCM.editor);
            editStore.titleMarks.forEach(m => {
                editStore.titleCM.createMark(editStore.titleCM.editor, m.from, m.to, 'error-mark', +m.id)
            });
        }
    )
    return (
        <Layout>
            <CodeMirror
                className={customClass}
                value={initialValue}
                options={{
                    mode: 'string',
                    lineWrapping: true,
                    lineNumbers: showGutter,
                    lineNumberFormatter: () => {
                        return '??'
                    },
                    readOnly: readOnly ? 'nocursor' : false,
                }}
                editorDidMount={editorMounted}
                onChange={(editor, data, value) => props.onChange(editor, data, value)}
            />
        </Layout>
    )
}

export default observer(MCodeMirror);