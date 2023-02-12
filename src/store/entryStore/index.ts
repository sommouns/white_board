import { makeAutoObservable } from "mobx";

export class EntryStore {
    constructor() {
        makeAutoObservable(this);
    }

    keywords: any[] = [];
    fetchKeywords = async () => {
        const data = await new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        value: 'jack',
                        label: 'Jack',
                    },
                    {
                        value: 'lucy',
                        label: 'Lucy',
                    },
                    {
                        value: 'tom',
                        label: 'Tom',
                    },
                ]);
            }, 1000);
        });
        this.keywords = data as any[];
    }

    uploadKeyword = undefined;
    setUploadKeyword = (val) => {
        this.uploadKeyword = val;
    }

    uploadFiveDesc = undefined
    setUploadFiveDesc = (val) => {
        this.uploadFiveDesc = val;
    }

    uploadValid = true;
    setUploadValid = (v) => {
        this.uploadValid = v;
    }
    uploadNext = () => {
        if (!this.uploadFiveDesc || !this.uploadKeyword) {
            console.error('uploadFiveDesc or uploadKeyword missed');
            return;
        }
        this.setUploadValid(false);
    }

    competitorSelectorVisible = false;
    setCompetitorSelectorVisible = (v) => {
        this.competitorSelectorVisible = v;
    }

    topicCard = [
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
        }, {
            id: '9',
            cover: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
            title: 'Pink Queen Womens Loose Turtleneck Oversize Long Pullover Sweater Dress',
            selected: false
        },
        {
            id: '10',
            cover: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
            title: 'Pink Queen Womens Loose Turtleneck Oversize Long Pullover Sweater Dress',
            selected: false
        }
    ];

    currentCard = null;
    setCurrentCard = (c) => {
        this.currentCard = c;
    }

    confirmSelect = () => {
        this.competitorSelectorVisible = false;
    }

    slideTimes = 0;
    setSlideTimes = (v) => this.slideTimes = v;
    urlInputVisible
    setUrlInputVisible = (v) => this.urlInputVisible = v;
    url = '';
    setUrl = (v) => this.url = v;
}

export default new EntryStore()