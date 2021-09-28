import { number } from 'ngx-custom-validators/src/app/number/validator';
var decodedToken: any = {}
export class colObject {
    constructor(
        public fieldWidth: String,
        public sortable: boolean,
        public filter: boolean,
        public filterType: number,
        public hiddable: boolean,
        public display: boolean,
        public displayOrder: number,
        public id: number,
        public indexFieldName: string,
        public indexFieldHeader: string,
        public dataFieldName: string,
        public tableObject: colObject[],
        public sortIcon? : string,
        public hideCol? : string,
        public hideColText? : string
    ){}
}

export class validationObject {
    constructor(
        public id: number,
        public customFieldId: number,
        public validationName: string,
        public status: string,
        public matchCase: string
    ){}
}

export class page {
    constructor(
        public perPage: number,
        public pageSort: String,
        public tableClass: String,
        public entryType: String
    ){}
}

export class pagehistory {
    constructor(
        public startPage: number,
        public endPage: number,
        public currentPage: number,
        public tableClass: string,
        public moduleId: number
    ){}
}

export class actions{
    constructor(
        public name: String,
        public title: String,
        public icon: String,
        public clickEvent: String,
        public actionClass: String,
    ){}
}

export class dataTableObject {
    constructor(
        public pager: page,
        public actions:  actions[],
        public listObject: colObject[],
    ){}
}

export class dataTableUrlEncode {
    constructor(
        public page_limit: number,
        public page_page: number,
        public page_sort: String,
        public page_order: any,
        public page_search: String,
        public page_entryType: String,
        public advanceSearch?: any,
        public screen_filter?: any,
        public advanceSort?: any,
        public filter_remove?: any,
        public advanceSearchAnd? : any
    ){}
}

export class options {
    constructor(
        public value: String,
        public title: String,
        public defaultValue: Boolean,
        public status: String,
        public id: number
    ){}
}

export class customFieldData {
    constructor(
        public id: number,
        public fieldData: any,
        public customFieldId: number
    ){}
}

export class customFields {
    constructor(
        public id: number,
        public fieldName: string,
        public parentFieldId: number,
        public fieldHeader: string,
        public fieldType: string,
        public type: any,
        public options: options[] ,
        public isMandatory: any,
        public srcModule: number,
        public errorMessage: String,
        public onChange: any,
        public onClick: any,
        public defaultShow: boolean,
        public showOn: number,
        public entryType: String,
        public module: number,
        public displayOrder: number,
        public dataSource: any,
        public indexing: Boolean,
        public shortLink: Boolean,
        public tooltipActivation: any,
        public tooltipContent: String,
        public tooltipTitle: String,
        public tooltipType: any,
        public childCustomFields: customFields[],
        public fieldIndexing: colObject[],
        public fieldValidations: validationObject[]
    ){}
}