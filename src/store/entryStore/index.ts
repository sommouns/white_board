import { makeAutoObservable } from "mobx";

export type Category = {
    cn: string;
    en: string;
    isOver: boolean;
    level: number;
}
const mockDataLevel0: Array<Category> = [
    { cn: '服饰服饰服饰服饰服饰服饰服饰服饰服饰服饰服饰服饰', en: 'clothes', isOver: false, level: 0 },
    { cn: '食品', en: 'foot', isOver: false, level: 0 },
    { cn: '药', en: 'medical', isOver: false, level: 0 },
]
const mockDataLevel1: Array<Category> = [
    { cn: '男装', en: 'male', isOver: false, level: 1 },
    { cn: '女装', en: 'female', isOver: false, level: 1 },
    { cn: '户外', en: 'outdoor', isOver: false, level: 1 },
    { cn: '风衣', en: 'wind', isOver: false, level: 1 },
    { cn: '夹克', en: 'jack', isOver: false, level: 1 },
]
const mockDataLevel2: Array<Category> = [
    { cn: '男外套', en: 'outwear', isOver: false, level: 2 },
    { cn: '男内裤男内裤男内裤男内裤男内裤男内裤男内裤男内裤男内裤男内裤男内裤男内裤男内裤男内裤男内裤男内裤男内裤男内裤男内裤男内裤男内裤男内裤男内裤男内裤男内裤男内裤男内裤男内裤', en: 'underwear', isOver: false, level: 2 },
    { cn: '男袜子', en: 'socks', isOver: false, level: 2 },
    { cn: '裙子', en: 'dress', isOver: false, level: 2 },
]
const mockDataLevel3: Array<Category> = [
    { cn: '阿迪', en: 'Adidas', isOver: true, level: 3 },
    { cn: '耐克', en: 'Nike', isOver: true, level: 3 },
    { cn: '彪马', en: 'Puma', isOver: true, level: 3 },
    { cn: '新百伦', en: 'New Balance', isOver: true, level: 3 },
    { cn: '李宁', en: 'LiNing', isOver: true, level: 3 },
    { cn: '安踏', en: 'ANTA', isOver: true, level: 3 },
]

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
    _category: Array<Category> = [];
    get category() {
        return this._category.map(c => c.cn).join('/');
    }
    setCategory = (v) => this._category = v;

    _tempCategory: Array<Category> = [];
    get tempCategory() {
        return this._tempCategory.map(c => c.cn).join('/');
    }
    categoryModalVisible = false;
    setCategoryModalVisible = (v) => {
        this.categoryModalVisible = v;
        if (v) {
            this._tempCategory = this._category;
        }
    }

    currentCategoryList: Array<Category> = [];
    selectCategory = (val) => {
        if (this.tempCategoryCurrentChild && this.tempCategoryCurrentChild.level === val.level) {
            this._tempCategory.pop();
        }
        this._tempCategory.push(val);
        if (!val.isOver) {
            this.currentCategoryList = this.getData(this.categoryLevel);
        }
    }

    getData(level) {
        if (level === 0) {
            return mockDataLevel0;
        }
        if (level === 1) {
            return mockDataLevel1;
        }
        if (level === 2) {
            return mockDataLevel2;
        }
        if (level === 3) {
            return mockDataLevel3;
        }
        return mockDataLevel0;
    }

    get categoryLevel() {
        return this._tempCategory.length;
    }

    fetchCategoryByLevel = (level: number) => {
        console.log(typeof level);
        if (typeof level !== 'number') {
            console.error('[typeof] level is invalid in fetchCategoryByLevel', level);
            return;
        }
        const data = (() => {
            switch (level) {
                case 0:
                    return mockDataLevel0;
                case 1:
                    return mockDataLevel1;
                case 2:
                    return mockDataLevel2;
                default:
                    return [];
            }
        })();
        this.currentCategoryList = data;
    }
    confirmCategorySelect = () => {
        this.categoryModalVisible = false;
        this._category = this._tempCategory;
        this._tempCategory = [];
        this.currentCategoryList = [];
    }

    get tempCategoryCurrentChild() {
        if (this._tempCategory.length > 1) {
            return this._tempCategory[this._tempCategory.length - 1];
        }
        return false;
    }

    handleClickWordTab(category: Category, index: number) {
        this._tempCategory = this._tempCategory.slice(0, index + 1);
        this.currentCategoryList = this.getData(this._tempCategory.length);
    }

    clearTemp = () => {
        this._tempCategory = [];
        this.currentCategoryList = this.getData(0)
    }
}

export default new EntryStore()