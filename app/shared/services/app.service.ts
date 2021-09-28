import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { CommonService } from '../data/common.data';
import { RouteInfo } from '../vertical-menu/vertical-menu.metadata';
import { request } from 'http';
import { pagehistory } from '../data/data.object';
//import { DatePipe } from '@angular/common';
//import { FormBuilder, Validators, FormGroup } from '@angular/forms';
// import { DatePipe } from '@angular/common';
//export var bankForm: FormGroup;
//export var licenseForm: FormGroup;
declare let oauthToken: string

@Injectable({
  providedIn: 'root'
})
export class AppService {
  returnUrl: any;
  event: any;
  ROUTES: RouteInfo[];
  HROUTES: RouteInfo[];
  pageHistory: pagehistory

  // macaddress = require('macaddress');
  constructor(private commonService: CommonService, private datePipe: DatePipe, private http: HttpClient) {
    this.pageHistory = {
      startPage: environment.startPage,
      endPage: environment.endPage,
      currentPage: environment.page,
      tableClass: "table",
      moduleId: 0
    }
  }

  getMacAddress() {
    //   var locator = new ActiveXObject("WbemScripting.SWbemLocator");
    // var service = locator.ConnectServer(".");
    // var properties = service.ExecQuery("SELECT * FROM Win32_NetworkAdapterConfiguration");
    // var e = new Enumerator (properties);
    // document.write("<table border=1>");
    // // dispHeading();
    // for (;!e.atEnd();e.moveNext ())
    // {
    //       var p = e.item ();
    //       document.write("<tr>");
    //       document.write("<td>" + p.Caption + "</td>");
    //       document.write("<td>" + p.IPFilterSecurityEnabled + "</td>");
    //       document.write("<td>" + p.IPPortSecurityEnabled + "</td>");
    //       document.write("<td>" + p.IPXAddress + "</td>");
    //       document.write("<td>" + p.IPXEnabled + "</td>");
    //       document.write("<td>" + p.IPXNetworkNumber + "</td>");
    //       document.write("<td>" + p.MACAddress + "</td>");
    //       document.write("<td>" + p.WINSPrimaryServer + "</td>");
    //       document.write("<td>" + p.WINSSecondaryServer + "</td>");
    //       document.write("</tr>");
    // }
    // document.write("</table>");
  }

  // getCountry(){
  //   return this.http.get(`${environment.login_url}/country/getAll`);
  // }

  // getState(countryId){
  //   return this.http.get(`${environment.login_url}/state/getAll`);
  // }
  // menuId: number
  getCutomFields(moduleId) {
    environment.bearer_token_header.moduleId = moduleId
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(`${environment.login_url}/customfield/get/${moduleId}`, { headers: environment.bearer_token_header });
  }

  getState(countryId, moduleId) {
    environment.bearer_token_header.moduleId = moduleId
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(`${environment.login_url}/state/getAllActive/${countryId}`, { headers: environment.bearer_token_header })
  }

  getFields(selectedModule, moduleId, fieldTypes) {
    let requestDTO = {}
    requestDTO["moduleId"] = selectedModule
    requestDTO["fieldTypeIds"] = fieldTypes
    console.log(requestDTO)
    environment.bearer_token_header.moduleId = moduleId
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.post(`${environment.login_url}/customfield/getSelectionList`, requestDTO, { headers: environment.bearer_token_header })
  }

  getCityOne(cityId, moduleId) {
    environment.bearer_token_header.moduleId = moduleId
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(`${environment.login_url}/city/get/${cityId}`, { headers: environment.bearer_token_header })
  }

  getCity(stateId, moduleId) {
    environment.bearer_token_header.moduleId = moduleId
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(`${environment.login_url}/city/getAllActive/${stateId}`, { headers: environment.bearer_token_header })
  }

  getAll(urlData, moduleId) {
    environment.bearer_token_header.moduleId = moduleId
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    var urlData = urlData
    return this.http.get(`${environment.api_url}/list`, { params: urlData, headers: environment.bearer_token_header });
  }

  getAllList(moduleId) {
    environment.bearer_token_header.moduleId = moduleId
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(`${environment.api_url}/getAll`, { headers: environment.bearer_token_header });
  }

  getAllActive(moduleId, object) {
    //console.log(object)
    environment.bearer_token_header.moduleId = moduleId
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(`${environment.api_url}/getSelectionList`, { params: object, headers: environment.bearer_token_header });
  }

  getById(id, moduleId, caseSet) {
    //console.log(id+"=="+moduleId+"=="+caseSet)
    environment.bearer_token_header.moduleId = moduleId
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(`${environment.api_url}/getById/${id}`, { headers: environment.bearer_token_header })
  }

  /**
     * APIs For Assessment Tools
     * 
    */

  getQuestionnaireDetails(id: number) {
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token);
    return this.http.get(`${environment.api_url}/getQuestionnaireDetailsById/${id}`, { headers: environment.bearer_token_header });
  }
  getQuestionnaireDetailsById(id: number) {
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token);
    return this.http.get(`${environment.api_url}/getQuestionnaireDetailsByAssessmentId/${id}`, { headers: environment.bearer_token_header });
  }
  getSkillsDetails(id: number) {
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token);
    return this.http.get(`${environment.api_url}/getSkillDetails/${id}`, { headers: environment.bearer_token_header });
  }
  getSkillByJobPostingId(id: number) {
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token);
    return this.http.get(`${environment.api_url}/getById/${id}`, { headers: environment.bearer_token_header });
  }
  getQuestionnairesBySkillId(skillId: number) {
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token);
    return this.http.get(`${environment.api_url}/getQuestionnairesBySkillId/${skillId}`, { headers: environment.bearer_token_header });
  }
  generateQuestions(beginner:any,intermediate:any,expert:any) {
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token);
    return this.http.get(`${environment.api_url}/getRandomQuestions/${beginner}/${intermediate}/${expert}`, { headers: environment.bearer_token_header });
  }

  downloadResume(resume: any) {
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token);
    this.http.get(`${environment.api_url}/resumes/${resume.filename}`, { headers: environment.bearer_token_header, observe: 'response', responseType: 'arraybuffer' }).subscribe(data => {
      const blob = new Blob([data.body], { type: resume.contentType });
      const contentDisposition = data.headers.get('Content-Disposition');
      const filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();;
      const a = document.createElement('a') as HTMLAnchorElement;
      a.setAttribute('href', URL.createObjectURL(blob));
      a.download = filename;
      document.body.append(a);
      a.click();
      document.body.removeChild(a);
    })
  }

  getIntroVideo(introVideo) {
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token);
    return this.http.get(`${environment.api_url}/introVideos/${introVideo.filename}`, { headers: environment.bearer_token_header, responseType: 'arraybuffer'});
  }

  addReminder(moduleId, reminder) {
    environment.bearer_token_header.moduleId = moduleId;
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token);
    return this.http.post(`${environment.login_url}/common_reminders/add`, reminder, {headers: environment.bearer_token_header});
  }

  getReminderList(moduleId, docRefId) {
    environment.bearer_token_header.moduleId = moduleId;
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token);
    return this.http.get(`${environment.login_url}/common_reminders/list/${docRefId}`, {headers: environment.bearer_token_header});
  }
  getHiringRounds(moduleId, docRefId){
    environment.bearer_token_header.moduleId = moduleId;
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token);
    return this.http.get(`${environment.login_url}/candidateApplication/rounds/${docRefId}`, {headers: environment.bearer_token_header});
  }
  getQuestinnaireListByIds(ids: string[]) {
    let p = new HttpParams({ fromObject: { "ids": ids } });
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token);
    return this.http.get(`${environment.login_url}/assessment-questionnaires/getQuestionniareListById`, { headers: environment.bearer_token_header, params: p });
  }

  changePassword(data) {
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.put(`${environment.base_url}/user/changepassword`, data, { headers: environment.bearer_token_header })
  }

  forgotPassword(data) {
    return this.http.post(`${environment.base_url}/auth/forgotPassword`, data);
  }

  subdomain(data) {
    return this.http.get(`${environment.base_url}/auth/tenantInfo/${data}`)
  }

  getSearchModule(title) {
    environment.bearer_token_header.moduleId = "2"
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(`${environment.login_url}/module/search/` + title, { headers: environment.bearer_token_header })
  }

  getModuleActions(moduleId) {
    console.log(moduleId)
    environment.bearer_token_header.moduleId = moduleId
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(`${environment.login_url}/module/activemoduleaction`, { headers: environment.bearer_token_header })
  }

  updateCtrl(data, moduleId) {
    let formData = new FormData();
    console.log(data)
    // if(logo!=null){
    // if(logo!=null){
    //   //console.logog("abc");
    //   formData.append('files', logo, logo.name);
    // }
    environment.bearer_token_header.moduleId = moduleId
    environment.bearer_token_header_file.moduleId = moduleId
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    environment.bearer_token_header_file.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    formData.append('object', new Blob([JSON.stringify(data)], { type: "application/json" }));
    return this.http.put(`${environment.api_url}/update`, data, { headers: environment.bearer_token_header })
  }

  addData(data, moduleId) {
    environment.bearer_token_header_file.moduleId = moduleId
    environment.bearer_token_header_file.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    let formData = new FormData();
    let i = 0
    if (data["documents"] && data.documents.length > 0) {
      let documents = data["documents"]
      documents.forEach(doc => {
        if (doc["files"] && doc.files.length > 0) {
          let files = doc["files"]
          let file = []
          files.forEach(uploads => {
            const filename = uploads.name
            formData.append("files", uploads, filename);
            file.push(i)
            i++;
          });
          doc["files"] = file
        }
      });
    }
    if (data.uploadFileMap && data.uploadFileMap.size > 0) {
      // let documents = data["mainFiles"]
      // documents.forEach(doc => {
      //       const filename = doc.name
      //       formData.append("mainFiles", doc, filename);
      // });

      data.uploadFileMap.forEach((files, key) => {
        if (files) {
          files.forEach(file => {
            const filename = file.name;
            formData.append(key, file, filename);
          });
        }
      });
    }
    console.log(data)
    formData.append('object', new Blob([JSON.stringify(data)], { type: "application/json" }));
    let hostName = environment.root
    console.log(hostName)
    formData.append('hostName',new Blob([hostName], { type: "application/json" }))
    let object = {}
    return this.http.post(`${environment.api_url}/add`, formData, { headers: environment.bearer_token_header_file })
  }

  processFiles(files, moduleId) {
    environment.bearer_token_header_file.moduleId = moduleId
    environment.bearer_token_header_file.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    let formData = new FormData();
    console.log(files)
    const filename = files[0].name
    formData.append("files", files[0], filename);
    return this.http.post(`${environment.api_url}/processTemplate`, formData, { headers: environment.bearer_token_header_file })
  }

  serilaizeData(data, moduleId) {
    environment.bearer_token_header_file.moduleId = moduleId
    environment.bearer_token_header_file.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    let formData = new FormData();
    console.log(data)
    // if(logo!=null){
    // if(logo!=null){
    //   //console.logog("abc");
    //   formData.append('files', logo, logo.name);
    // }
    formData.append('object', new Blob([JSON.stringify(data)], { type: "application/json" }));
    let object = {}
    return this.http.post(`${environment.login_url}/autosave`, formData, { headers: environment.bearer_token_header_file })
  }

  getDataBySerialization(moduleId) {
    environment.bearer_token_header.moduleId = moduleId
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(`${environment.login_url}/getserialize`, { headers: environment.bearer_token_header })
  }

  getMenuList() {
    environment.bearer_token_header.Authorization = "Bearer " + localStorage.getItem(environment.oauth_token)
    return this.http.get(`${environment.login_url}/module/getAllActive`, { headers: environment.bearer_token_header })
  }

  getNewObject(obj, type?) {
    // console.log(JSON.parse(JSON.stringify(obj)))
    return JSON.parse(JSON.stringify(obj))
  }
  require: any


  convertdateFormat(dates) {
    var date: any;
    if (dates != undefined && dates != '' && dates != null) {
      //console.logog(typeof dates == "object")
      if (typeof dates == "object") {
        //console.logog(dates)
        var padStart = require('pad-start');
        date = dates['year'] + "-" + padStart(dates['month'], 2, '00') + "-" + padStart(dates['day'], 2, '00')
      } else {
        //console.logog(dates+" ==== date")
        //console.logog(this.datePipe.transform(new Date(dates),"yyyy-MM-dd hh:mm"))
        if (new Date(dates).toString() != "Invalid Date") {
          const prebid = this.datePipe.transform(new Date(dates), "yyyy-MM-dd hh:mm").split(" ");
          //console.logog(prebid)
          const predate = prebid[0].split("-")
          // this.datesForm.get('selectedPreBid').setValue()
          // this.datesForm.get('selectprebidtime').setValue(prebid[1])
          date = { year: parseInt(predate[0]), month: parseInt(predate[1]), day: parseInt(predate[2]) }
        }
      }
    } else {
      date = ''
    }
    return date
  }

  converttongbDate(date) {
    console.log(date)
    if (date != '') {
      const predate = date.split("/")
      // this.datesForm.get('selectedPreBid').setValue()
      // this.datesForm.get('selectprebidtime').setValue(prebid[1])
      return { year: parseInt(predate[2]), month: parseInt(predate[1]), day: parseInt(predate[0]) }
    } else {
      return ''
    }
  }

  converttolocal(dates) {
    var date: any
    //console.log(typeof dates)
    if (dates != undefined && dates != '' && dates != null) {
      if (typeof dates == "object") {
        var padStart = require('pad-start');
        date = padStart(dates['day'], 2, '00') + "/" + padStart(dates['month'], 2, '00') + "/" + padStart(dates['year'], 4, '00')
      } else {
        //console.log(dates)
        if (new Date(dates).toString() != "Invalid Date") {
          //console.log(dates)
          const prebid = this.datePipe.transform(new Date(dates), "yyyy-MM-dd hh:mm").split(" ");
          //console.log(prebid)
          const predate = prebid[0].split("-")
          // this.datesForm.get('selectedPreBid').setValue()
          // this.datesForm.get('selectprebidtime').setValue(prebid[1])
          //date = {year: parseInt(predate[0]), month: parseInt(predate[1]), day: parseInt(predate[2]) }

          var padStart = require('pad-start');
          date = padStart(parseInt(predate[2]), 2, '00') + "/" + padStart(parseInt(predate[1]), 2, '00') + "/" + padStart(parseInt(predate[0]), 4, '00')
        }
      }
    } else {
      date = ''
    }
    return date
  }

  GetSortOrder(prop, order) {
    return function (a, b) {
      if (order == "asc") {
        if (a[prop] > b[prop]) {
          return 1;
        } else if (a[prop] < b[prop]) {
          return -1;
        }
      } else {
        if (a[prop] > b[prop]) {
          return -1;
        } else if (a[prop] < b[prop]) {
          return 1;
        }
      }
    }
    return 0;
  }

  sortByDate(prop, order) {
    return function (a, b) {
      if (order == "asc") {
        return <any>new Date(b[prop]) - <any>new Date(a[prop])
      } else {
        return <any>new Date(a[prop]) - <any>new Date(b[prop])
      }
    }
    return 0;
  }

  addbank(value, countries, states, cities) {
    const CountryName = countries.filter(x => x.countryId == value['bankCountry'])
    // console.log(CountryName[0]['countryName']);
    value['countryName'] = CountryName[0]['countryName']
    const stateName = states.filter(x => x.stateId == value['bankState'])
    //console.log(stateName[0]['stateName'])
    value['stateName'] = stateName[0]['stateName']
    const cityName = cities.filter(x => x.cityId == value['cityId'])
    //console.log(cityName[0]['cityName'])
    value['cityName'] = cityName[0]['cityName']
    return value;
  }
  removebank(i, bankSource) {
    if (bankSource[i]['bankDetailId']) {
      bankSource[i]['status'] = 0
    } else {
      bankSource.splice(i, 1)
    }
    return bankSource;
  }
  editbank(i, bankSource, bankForm) {
    bankForm.get('bankDetailId').setValue(bankSource[i]['bankDetailId'])
    bankForm.get('bankName').setValue(bankSource[i]['bankName'])
    bankForm.get('accountNo').setValue(bankSource[i]['accountNo'])
    bankForm.get('address').setValue(bankSource[i]['address'])
    bankForm.get('bankCountry').setValue(bankSource[i]['bankCountry'])
    bankForm.get('countryName').setValue(bankSource[i]['countryName'])
    bankForm.get('bankState').setValue(bankSource[i]['bankState'])
    bankForm.get('stateName').setValue(bankSource[i]['stateName'])
    bankForm.get('cityId').setValue(bankSource[i]['cityId'])
    bankForm.get('cityName').setValue(bankSource[i]['cityName'])
    bankForm.get('pincode').setValue(bankSource[i]['pincode'])
    bankForm.get('ifscCode').setValue(bankSource[i]['ifscCode'])
    bankForm.get('swiftCode').setValue(bankSource[i]['swiftCode'])
    bankForm.get('micr').setValue(bankSource[i]['micr'])
    bankForm.get('status').setValue(bankSource[i]['status'])
    return bankForm;
  }
  savebank(i, bankSource, value, countries, states, cities, bankForm) {
    console.log(countries)
    console.log(states)
    console.log(cities)
    const CountryName = countries.filter(x => x.countryId == value['bankCountry'])
    //console.log(CountryName[0]['countryName']);
    value['countryName'] = CountryName[0]['countryName']
    const stateName = states.filter(x => x.stateId == value['bankState'])
    //console.log(stateName[0]['stateName'])
    value['stateName'] = stateName[0]['stateName']
    const cityName = cities.filter(x => x.cityId == value['cityId'])
    //console.log(cityName[0]['cityName'])
    value['cityName'] = cityName[0]['cityName']
    // this.bankSource.push(bankForm.value); 
    bankSource[i]['bankName'] = value['bankName']
    bankSource[i]['accountNo'] = value['accountNo']
    bankSource[i]['address'] = value['address']
    bankSource[i]['bankCountry'] = value['bankCountry']
    bankSource[i]['countryName'] = value['countryName']
    bankSource[i]['bankState'] = value['bankState']
    bankSource[i]['stateName'] = value['stateName']
    bankSource[i]['cityId'] = value['cityId']
    bankSource[i]['cityName'] = value['cityName']
    bankSource[i]['pincode'] = value['pincode']
    bankSource[i]['ifscCode'] = value['ifscCode']
    bankSource[i]['swiftCode'] = value['swiftCode']
    bankSource[i]['micr'] = value['micr']
    bankForm.reset()
    bankForm.get('status').setValue('1')
    return bankSource
  }


  addlicense(value, licensetypes) {
    const grantdate = value['selectGrantDate']
    //console.logog(grantdate)
    const validfrom = value['selectValidFrom']
    //console.logog(validfrom)
    const validto = value['selectValidTo']
    //console.logog(validto)
    // var padStart = require('pad-start');
    value['grandDate'] = this.convertdateFormat(grantdate)
    value['gdate'] = this.converttolocal(grantdate)
    //console.logog(licenseForm.value['grandDate'])
    value['validateFrom'] = this.convertdateFormat(validfrom)
    value['fromdate'] = this.converttolocal(validfrom)
    //console.logog(licenseForm.value['validateFrom'])
    value['validateTo'] = this.convertdateFormat(validto)
    value['todate'] = this.converttolocal(validto)
    //console.logog(licenseForm.value['validateTo'])
    console.log(value)
    console.log(licensetypes)
    const licenseType = licensetypes.filter(x => x.id == value['typeOfLicense'])
    console.log(licenseType);
    value['licenseType'] = licenseType[0]['description']
    return value
  }
  removelicense(i, licenseSource) {
    if (licenseSource[i]['id']) {
      licenseSource[i]['status'] = 0
    } else {
      licenseSource.splice(i, 1)
    }
  }
  editlicenses(i, licenseSource, licenseForm) {
    console.log(licenseSource[i])
    licenseForm.get('id').setValue(licenseSource[i]['id'])
    licenseForm.get('licenseType').setValue(licenseSource[i]['licenseType'])
    licenseForm.get('typeOfLicense').setValue(licenseSource[i]['typeOfLicense'])
    licenseForm.get('licenseName').setValue(licenseSource[i]['licenseName'])
    licenseForm.get('licenseNumber').setValue(licenseSource[i]['licenseNumber'])
    licenseForm.get('grandDate').setValue(licenseSource[i]['grandDate'])
    licenseForm.get('selectGrantDate').setValue(licenseSource[i]['selectGrantDate'])
    licenseForm.get('gdate').setValue(licenseSource[i]['gdate'])
    licenseForm.get('validateFrom').setValue(licenseSource[i]['validateFrom'])
    licenseForm.get('selectValidFrom').setValue(licenseSource[i]['selectValidFrom'])
    licenseForm.get('fromdate').setValue(licenseSource[i]['fromdate'])
    licenseForm.get('validateTo').setValue(licenseSource[i]['validateTo'])
    licenseForm.get('selectValidTo').setValue(licenseSource[i]['selectValidTo'])
    licenseForm.get('todate').setValue(licenseSource[i]['todate'])
    licenseForm.get('leadTime').setValue(licenseSource[i]['leadTime'])
    licenseForm.get('status').setValue(licenseSource[i]['status'])
    return licenseForm.value
  }

  savelicense(i, value, licenseSource, licenseTypes, licenseForm) {
    const grantdate = licenseForm.value['selectGrantDate']
    const validfrom = licenseForm.value['selectValidFrom']
    const validto = licenseForm.value['selectValidTo']
    value['grandDate'] = this.convertdateFormat(grantdate)
    value['validateFrom'] = this.convertdateFormat(validfrom)
    value['validateTo'] = this.convertdateFormat(validto)
    value['gdate'] = this.converttolocal(grantdate)
    value['fromdate'] = this.converttolocal(validfrom)
    value['todate'] = this.converttolocal(validto)
    const licenseType = licenseTypes.filter(x => x.id == value['typeOfLicense'])
    ////console.logog(CountryName[0]['countryName']);
    value['licenseType'] = licenseType[0]['docType']
    licenseSource[i]['typeOfLicense'] = value['typeOfLicense']
    licenseSource[i]['licenseType'] = value['licenseType']
    licenseSource[i]['licenseName'] = value['licenseName']
    licenseSource[i]['licenseNumber'] = value['licenseNumber']
    licenseSource[i]['grandDate'] = value['grandDate']
    licenseSource[i]['selectGrantDate'] = value['selectGrantDate']
    licenseSource[i]['gdate'] = value['gdate']
    licenseSource[i]['validateFrom'] = value['validateFrom']
    licenseSource[i]['selectValidFrom'] = value['selectValidFrom']
    licenseSource[i]['fromdate'] = value['fromdate']
    licenseSource[i]['validateTo'] = value['validateTo']
    licenseSource[i]['selectValidTo'] = value['selectValidTo']
    licenseSource[i]['todate'] = value['todate']
    licenseSource[i]['leadTime'] = value['leadTime']
    ////console.logog(this.bankSource)
    licenseForm.reset()
    licenseForm.get('typeOfLicense').setValue(null);
    licenseForm.get('status').setValue(1);
    return licenseSource
  }

}
