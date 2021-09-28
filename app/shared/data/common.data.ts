import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import { DatePipe } from '@angular/common';


@Injectable({
    providedIn: 'root'
})
export class CommonService  {
  moduletypes: any[] = [
      {value: 1, title: 'List'},
      {value: 2, title: 'Add'},
      {value: 3, title: 'Edit'},
      {value: 4, title: 'Delete'},
      {value: 5, title: 'View'},
      {value: 6, title: 'Module'},
      {value: 7, title: 'Print'},
      {value: 8, title: 'Download'},
      {value: 9, title: 'Tab'},
      {value: 10, title: 'Dashboard'},
      {value: 11, title: 'Chart'}
  ]

  unittypes = [
    { value: "L", title: "Length" },
    { value: "A", title: "Area" },
    { value: "V", title: "Volume" },
    { value: "M", title: "Mass" },
    { value: "CT", title: "Countable" },
    { value: "PA", title: "Plane Angle" },
    { value: "SA", title: "Solid Angle" },
    { value: "D", title: "Density" },
    { value: "T", title: "Time" },
    { value: "Fq", title: "Frequency" },
    { value: "C", title: "Currency" },
    { value: "S", title: "Speed" },
    { value: "Fl", title: "Flow" },
    { value: "Acc", title: "Accelaration" },
    { value: "F", title: "Force" },
    { value: "P", title: "Pressure" },
    { value: "Tq", title: "Torque" },
    { value: "E", title: "Energy" },
    { value: "Pwr", title: "Power" },
    { value: "Act", title: "Action" },
    { value: "DV", title: "Dynamic Viscosity" },
    { value: "KV", title: "Kinematic Viscosity" },
    { value: "EC", title: "Electric Current" },
    { value: "ECh", title: "Electric Charge" },
    { value: "ED", title: "Electric Dipole" },
    { value: "EMF", title: "Electromotive Force" },
    { value: "ER", title: "Electrical " }
  ];

  units = [
    {unitId: 1, unitName: 'Kg', unitDescription: 'Kilograms, Kilogram, Kgm, Kilo gram, Kilo-Gram, Kgs', unitType: 'M', status: 1, unitCode: 1 },
    {unitId: 2, unitName: 'INR', unitDescription: 'INR, Rs. Rupees, Indian Rupees', unitType: 'C', status: 1, unitCode: 2 },
    {unitId: 3, unitName: 'USD', unitDescription: 'Dollars, US Dollars, Dollar', unitType: 'C', status: 1, unitCode: 3 },
    {unitId: 4, unitName: 'Month', unitDescription: 'Months, month, m, MM', unitType: 'T', status: 1, unitCode: 24 },
    {unitId: 5, unitName: 'Gm', unitDescription: 'Grams, gm, gms, grams, Gram, gram, Gms', unitType: 'M', status: 1, unitCode: 25 },
    {unitId: 6, unitName: 'Year', unitDescription: 'Year, yr, Years', unitType: 'T', status: 1, unitCode: 26 },
    {unitId: 7, unitName: 'No.', unitDescription: 'Numbers, Nos, nos., no.', unitType: 'CT', status: 1, unitCode: 27 },
    {unitId: 8, unitName: 'SET', unitDescription: 'sets', unitType: 'CT', status: 1, unitCode: 28},
    {unitId: 9, unitName: 'Boxes', unitDescription: 'box, boxes, cartoons, wooden Boxes', unitType: 'CT', status: 1, unitCode: 29},
  ]

  unitConversion = [
    {id: 1, primaryUnit: 1, secondaryUnit: 5, convfact: 1000, status: 1},
    {id: 2, primaryUnit: 5, secondaryUnit: 1, convfact: 0.001, status: 1},
    {id: 3, primaryUnit: 2, secondaryUnit: 3, convfact: 0.013, status: 1},
    {id: 4, primaryUnit: 3, secondaryUnit: 2, convfact: 75.76, status: 1},
    {id: 5, primaryUnit: 4, secondaryUnit: 6, convfact: 0.083, status: 1},
    {id: 6, primaryUnit: 6, secondaryUnit: 4, convfact: 12, status: 1}
  ]

  validation = [
    {id: 1, validation: "Mandatory"},
    {id: 2, validation: "Number"},
    {id: 3, validation: "Email"},
    {id: 4, validation: "Readonly"},
    {id: 5, validation: "Min Lenght"},
    {id: 6, validation: "Max Length"}
  ]

  entryType = [
    {id: 1, validation: "Auto Generate"},
    {id: 2, validation: "Auto Populate"},
    {id: 3, validation: "Manual Entry"},
  ]

  unitSymbol = [
    { id: 1, unitSymbol: '&#13199;'},
    { id: 2, unitSymbol: '&#8377;'},
    { id: 3, unitSymbol: '&#36;'},
    { id: 4, unitSymbol:'&#164;'},
    { id: 5, unitSymbol:'&#162;'},
    { id: 6, unitSymbol:'&#163;'},
    { id: 7, unitSymbol:'&#165;'},
    { id: 8, unitSymbol:'&#8355;'},
    { id: 9, unitSymbol:'&#8356;'},
    { id: 10, unitSymbol:'&#8359;'},
    { id: 11, unitSymbol:'&#128;'},
    { id: 12, unitSymbol:'&#8361;'},
    { id: 13, unitSymbol:'&#8372;'},
    { id: 14, unitSymbol:'&#8367;'},
    { id: 15, unitSymbol:'&#8366;'},
    { id: 16, unitSymbol:'&#8368;'},
    { id: 17, unitSymbol:'&#8370;'},
    { id: 18, unitSymbol:'&#8369;'},
    { id: 19, unitSymbol:'&#8371;'},
    { id: 20, unitSymbol:'&#8373;'},
    { id: 21, unitSymbol:'&#8365;'},
    { id: 22, unitSymbol:'&#8362;'},
    { id: 23, unitSymbol:'&#8363;'},
    { id: 24, unitSymbol:'M'},
    { id: 25, unitSymbol: 'g'},
    { id: 26, unitSymbol: 'Y'},
    { id: 27, unitSymbol: 'No.'},
    { id: 28, unitSymbol: 'SET'},
    { id: 29, unitSymbol: 'BOX'}
  ]

  countries = [
    {id: 1, countryCode: "IND", countryName: "India", defaultCurr: 2, isdCode: 91, status: 1 },
    {id: 2, countryCode: "USA", countryName: "United States of America", defaultCurr: 3, isdCode: 1, status: 1 },
  ]

  state = [
    {id: 1, shortName: "AP", stateName: "Andhra Pradesh", stateCode: 37, isUT: 0, countryId: 1, status: 1},
    {id: 2, shortName: "AR", stateName: "Arunachal Pradesh", stateCode: 12, isUT: 0, countryId: 1, status: 1},
    {id: 3, shortName: "AS", stateName: "Assam", stateCode: 18, isUT: 0, countryId: 1, status: 1},
    {id: 4, shortName: "BR", stateName: "Assam", stateCode: 10, isUT: 0, countryId: 1, status: 1},
    {id: 5, shortName: "CG", stateName: "Chhattisgarh", stateCode: 22, isUT: 0, countryId: 1, status: 1},
    {id: 6, shortName: "GA", stateName: "Goa", stateCode: 30, isUT: 0, countryId: 1, status: 1},
    {id: 7, shortName: "GJ", stateName: "Gujarat", stateCode: 24, isUT: 0, countryId: 1, status: 1},
    {id: 8, shortName: "HR", stateName: "Haryana", stateCode: 6, isUT: 0, countryId: 1, status: 1},
    {id: 9, shortName: "HP", stateName: "Himachal Pradesh", stateCode: 2, isUT: 0, countryId: 1, status: 1},
    {id: 10, shortName: "JH", stateName: "JharKhand", stateCode: 20, isUT: 0, countryId: 1, status: 1},
    {id: 11, shortName: "KA", stateName: "Karnataka", stateCode: 29, isUT: 0, countryId: 1, status: 1},
    {id: 12, shortName: "KL", stateName: "Kerala", stateCode: 32, isUT: 0, countryId: 1, status: 1},
    {id: 13, shortName: "MP", stateName: "Madhya Pradesh", stateCode: 23, isUT: 0, countryId: 1, status: 1},
    {id: 14, shortName: "MH", stateName: "Maharashtra", stateCode: 27, isUT: 0, countryId: 1, status: 1},
    {id: 15, shortName: "MN", stateName: "Manipur", stateCode: 14, isUT: 0, countryId: 1, status: 1},
    {id: 16, shortName: "ML", stateName: "Meghalaya", stateCode: 17, isUT: 0, countryId: 1, status: 1},
    {id: 17, shortName: "MZ", stateName: "Mizoram", stateCode: 15, isUT: 0, countryId: 1, status: 1},
    {id: 18, shortName: "NL", stateName: "Nagaland", stateCode: 13, isUT: 0, countryId: 1, status: 1},
    {id: 19, shortName: "OD", stateName: "Odhisha", stateCode: 21, isUT: 0, countryId: 1, status: 1},
    {id: 20, shortName: "PB", stateName: "Punjab", stateCode: 3, isUT: 0, countryId: 1, status: 1},
    {id: 21, shortName: "RJ", stateName: "Rajasthan", stateCode: 8, isUT: 0, countryId: 1, status: 1},
    {id: 22, shortName: "SK", stateName: "Sikkim", stateCode: 11, isUT: 0, countryId: 1, status: 1},
    {id: 23, shortName: "TN", stateName: "Tamil Nadu", stateCode: 33, isUT: 0, countryId: 1, status: 1},
    {id: 24, shortName: "TS", stateName: "Telangana", stateCode: 36, isUT: 0, countryId: 1, status: 1},
    {id: 25, shortName: "TR", stateName: "Tirapura", stateCode: 16, isUT: 0, countryId: 1, status: 1},
    {id: 26, shortName: "UP", stateName: "Uttarpradesh", stateCode: 9, isUT: 0, countryId: 1, status: 1},
    {id: 27, shortName: "UK", stateName: "Uttrakhand", stateCode: 5, isUT: 0, countryId: 1, status: 1},
    {id: 28, shortName: "WB", stateName: "West Bengal", stateCode: 19, isUT: 0, countryId: 1, status: 1},
    {id: 29, shortName: "AN", stateName: "Andaman & Nicobar Islands", stateCode: 35, isUT: 1, countryId: 1, status: 1},
    {id: 30, shortName: "CH", stateName: "Chandigarh", stateCode: 4, isUT: 1, countryId: 1, status: 1},
    {id: 31, shortName: "DD", stateName: "Dadar & Nagar Haveli", stateCode: 26, isUT: 1, countryId: 1, status: 1},
    {id: 32, shortName: "DD", stateName: "Daman & Diu", stateCode: 25, isUT: 1, countryId: 1, status: 1},
    {id: 33, shortName: "DL", stateName: "Delhi", stateCode: 7, isUT: 1, countryId: 1, status: 1},
    {id: 34, shortName: "JK", stateName: "Jammu & Kashmir", stateCode: 1, isUT: 1, countryId: 1, status: 1},
    {id: 35, shortName: "LA", stateName: "Ladakh", stateCode: 38, isUT: 1, countryId: 1, status: 1},
    {id: 36, shortName: "LD", stateName: "LakshaDeep", stateCode: 31, isUT: 1, countryId: 1, status: 1},
    {id: 37, shortName: "PY", stateName: "Puducherry", stateCode: 34, isUT: 1, countryId: 1, status: 1},
    {id: 38, shortName: "AL", stateName: "Alabama", stateCode: 0, isUT: 0, countryId: 2, status: 1}
  ]

  zone = [
    {id: 1, zone: "North", status: 1},
    {id: 2, zone: "East", status: 1},
    {id: 3, zone: "West", status: 1},
    {id: 4, zone: "South", status: 1}
  ]

  city = [
    {id: 1, shortName: "DL", cityName: "Old Delhi", stdCode: 11, stateId: 33,zoneId: 1, status: 1},
    {id: 2, shortName: "NOI", cityName: "Noida", stdCode: 120, stateId: 26,zoneId: 1, status: 0},
    {id: 3, shortName: "AL", cityName: "Alabaster", stdCode: 205, stateId: 38,zoneId: 1, status: 1}
  ]
  
  clients = [
    {id: 1, clientCode: "CL/2019-20/0001", clientName: "Clent C", contactPerson: 'Person C', contactNumber: 9650623849,  email: "abc@abc.com", address: "Address C", cityId: 1, package: 1, dbName: "dbClientC", dbPassword: "123456", dbUser: "dbUserC", status: 2, subscriptionType: 'T', pinCode: 203456, subscriptionDate: '10/01/2020', paymentDate: '', billingCycle: '', renewableDate: '', amount: 0.00},
    {id: 2, clientCode: "CL/2019-20/0002", clientName: "Clent B", contactPerson: 'Person B', contactNumber: 8010089911,  email: "abc@abc.com", address: "Address B", cityId: 1, package: 1, dbName: "dbClientB", dbPassword: "123456", dbUser: "dbUserB", status: 3, subscriptionType: 'P', pinCode: 256458, subscriptionDate: '15/01/2020', paymentDate: '', billingCycle: '', renewableDate: '', amount: 0.00},
    {id: 3, clientCode: "CL/2019-20/0003", clientName: "Clent A", contactPerson: 'Person A', contactNumber: 8010089911,  email: "abc@abc.com", address: "Address A", cityId: 1, package: 1, dbName: "dbClientA", dbPassword: "123456", dbUser: "dbUserA", status: 5, subscriptionType: 'P', pinCode: 256458, subscriptionDate: '15/01/2019', paymentDate: '15/03/2020', billingCycle: 'M', renewableDate: '15/04/2020', amount: 24000.00}
  ]

  packageDetail = [ 
    {id: 1, packageCode: "PPL00001", packageName: "Purchase/Inventory", packageValue: 50000, packageCurr: 2, status: 1, payTenure: 2, payTenurePeriod: 4, publishedDate: '21/01/2019', tstatus: 1, trialPeriod: 14, trialTenure: 4, monthlyPrice: 25000.00, monthlyCurr: 2, yearlyPrice: 240000.00, yearlyCurr: 2, reportCount: 30, supportService: 1, implementSupport: 0, customisation: 0, description: 'To Manage the Purchase and Inventory Module along with the Item base location managment in warehouses makes use easy to handle there stock', multiCompany: 0, companyCount: 1, perCompanyUsers: 20, totalUsers: 20, customReports: 0, customReportCount: 0, roleManagement: 1, multiCountry: 1, multiCurr: 1, extraUserValue: 1000.00, extraUserCurr: 2, barcodeValue: 10000.00, barcodeCurr: 2, serialNumberValue: 0,serialNumberCurr: 0, dynamicFormats: 0, barCoding: 0, serialNumbering: 0, thirdPartyIntegrartion: 0, integrationCount: 0, integratePlatForm: "", moduleList: null}
  ]

  packageModules = [
    {id:1, parentId: 1, moduleId: 1, subModuleId: [], subSubModuleId: [2,3], status: 1}
  ]

  company = [
    {id: 1, typeId: 4, companyCode: "COMP/0001", companyName: "Company A", localName: "ABC", status: 1,  address1: "Flat 1, A BLOCK", address2: "Sector 63", cityId: 1, pincode: 100011, registrationNo: "REG2356", cinNo: "", panNo: "ALGPC2416B", gstNo: "", webUrl: "http://abc.com", msmeReg: 0, msmeRegNo: "", regdAddress1: "Flat 1, A BLOCK", regdAddress2: "Sector 63", regdCityId: 1, regdPincode: 100011, financialYear: [], bankDetails: [], sameAddress: false, license: [], attachments: [], clientId: 3}
  ]

  orgTypes = [
    {value: 1, title: "Government"},
    {value: 2, title: "Semi-Government"},
    {value: 3, title: "Limited"},
    {value: 4, title: "Private Limited"},
    {value: 5, title: "Properietry"},
    {value: 6, title: "PartnerShip Firm"},
    {value: 7, title: "Joint Venture"},
  ]

  docType = [
    {id: 1, type: "S", description: "PanCard", status: 1},
    {id: 2, type: "S", description: "Adhaar Card", status: 1},
    {id: 3, type: "L", description: "Labour License", status: 1},
    {id: 4, type: "L", description: "Security License", status: 1},
    {id: 5, type: "G", description: "Certificates", status: 1},
  ]

  branchType = [
    { value: 1, title: "Head Office"},
    { value: 2, title: "Zonal Office"},
    { value: 3, title: "Regional Office"},
    { value: 4, title: "Branch Office"},
    { value: 5, title: "Site Office"},
    { value: 6, title: "Store"}
  ]

  branches = [
    { id: 1, branchName: "Delhi Branch", company:1, status: 1, branchCode: "B/HO/00001", branchType: 1, reportingBranchId: 0, gstNo: "STALGSPH8776A56", altContactEmail:'a@a.com', briefDescription:"", contactPhoneNo: 91112256459, contactPerson: "Abhishekk Das", contactEmail: 'b@b.com', cityId: 1, address1: "Gateway Business Park, H141", address2: "3rd Floor, Office 1, Shastri Nagar", pinCode: 100011, contactMobileNo: 918648754152, remarks: "", altContactPerson: "Raj Sandhu", altPhoneNo: 91112265894, altMobileNo: 918459545685, altRemarks: "", bankDetails: [], attachments: [], license: []},
    { id: 2, branchName: "Noida Branch", company:1, status: 1, branchCode: "B/BO/00002", branchType: 4, reportingBranchId: 1, gstNo: "STALGSPH8776A56", altContactEmail:'a@a.com', briefDescription:"", contactPhoneNo: 91120256459, contactPerson: "Abhishekk Das", contactEmail: 'b@b.com', cityId: 2, address1: "ALPC Business Park, H141", address2: "3rd Floor, Office 1, Shastri Nagar", pinCode: 100011, contactMobileNo: 918648754152, remarks: "", altContactPerson: "Raj Sandhu", altPhoneNo: 91120265894, altMobileNo: 918459545685, altRemarks: "", bankDetails: [], attachments: [], license: []},
    { id:3, branchName: "Noida Store", company:1, status: 1, branchCode: "B/BS/00003", branchType: 6, reportingBranchId: 2, gstNo: "STALGSPH8776A56", altContactEmail:'a@a.com', briefDescription:"", contactPhoneNo: 91120256459, contactPerson: "Abhishekk Das", contactEmail: 'b@b.com', cityId: 2, address1: "ALPC Business Park, H141", address2: "3rd Floor, Office 1, Shastri Nagar", pinCode: 100011, contactMobileNo: 918648754152, remarks: "", altContactPerson: "Raj Sandhu", altPhoneNo: 91120265894, altMobileNo: 918459545685, altRemarks: "", bankDetails: [], attachments: [], license: []}
  ]

  departMent = [
    { id: 1, departmentCode: "DEPTT/0001", departmentName: "Accounts", status: 1},
    { id: 2, departmentCode: "DEPTT/0002", departmentName: "Finance", status: 1},
    { id: 3, departmentCode: "DEPTT/0003", departmentName: "Admin", status: 1},
    { id: 4, departmentCode: "DEPTT/0004", departmentName: "HR", status: 1},
    { id: 5, departmentCode: "DEPTT/0005", departmentName: "Gaurd", status: 1},
  ]

  designation = [
    { id: 1, designationCode: "DESIG/0001", department: 1, designation: "Account Manager", status: 1},
    { id: 2, designationCode: "DESIG/0002", department: 2, designation: "Finance Manager", status: 1},
    { id: 3, designationCode: "DESIG/0003", department: 1, designation: "A/c Executive", status: 1},    
    { id: 4, designationCode: "DESIG/0004", department: 1, designation: "Accountant", status: 1},
    { id: 5, designationCode: "DESIG/0005", department: 3, designation: "Legal Advisor", status: 1},
    { id: 6, designationCode: "DESIG/0006", department: 3, designation: "Administrator", status: 1},
    { id: 7, designationCode: "DESIG/0007", department: 4, designation: "HR Manager", status: 1},
    { id: 8, designationCode: "DESIG/0008", department: 5, designation: "Armed Gaurd", status: 1},
  ]

  empType = [
    {value : 1, title: "Permanent"},
    {value : 2, title: "Contractual"},
    {value : 3, title: "Gaurd"},
    {value : 4, title: "Adhoc"},
    {value : 5, title: "Trainee"}
  ]

  jobProfile = [
    { id: 1, profileCode: "PROF/0001", designation: 1, branch: 2, empType: 1, profileDetails: "Control All Accounts related work and responsibilities", status: 1},
    { id: 2, profileCode: "PROF/0002", designation: 2, branch: 2, empType: 1, profileDetails: "Control All Finance related work and responsibilities", status: 1},
    { id: 3, profileCode: "PROF/0003", designation: 4, branch: 2, empType: 1, profileDetails: "Salary payment, Payment to Vendors and Receive Payments from Clients", status: 1},    
    { id: 4, profileCode: "PROF/0004", designation: 8, branch: 2, empType: 1, profileDetails: "Work as armed security gaurd on various sites.", status: 1},
  ]

  employee =[
    {id: 1, employeeCode: "EMP/00001", deputingBranchId:2, firstName: "Manohar" ,middleName: "Lal", lastName:"Gupta", gender: "M", dob: "1981-10-01", fatherName: "K.L. Gupta", maritalStatus: 'M', contactNo: 91112356458, idCard: "IDEMP00001", profile : "Accountant", deptId: 1, desigId: 4, doj:"2018-01-10",  erpUser: 1, status:1, addline1: "Test Address", addline2:"", cityId: 1, pincode:100011, mobile:919650623849, sameAddress: true, paddline1:"Test Address", paddline2:"", regCityId: 1, regpincode: 100011, pmobile:919650623849, ctc: 540000.00, note:"", pf:"", bankDetails: [], attachments: []}
  ]

  grouptype = [
    { value: "I", title: "Item"},
    { value: "S", title: "Service"}
  ]

  group= [
    { id: 1, groupCode: "01", groupName: "Uniforms", upperGroup: null, type: "I", status: 1},
    { id: 2, groupCode: "0101", groupName: "Dress", upperGroup: 1, type: "I", status: 1},
    { id: 3, groupCode: "0102", groupName: "Shoes", upperGroup: 1, type: "I", status: 1},
    { id: 4, groupCode: "02", groupName: "Stationary", upperGroup: null, type: "I", status: 1},
    { id: 5, groupCode: "03", groupName: "Armory", upperGroup: null, type: "I", status: 1},
    { id: 6, groupCode: "04", groupName: "Manpower", upperGroup: null, type: "S", status: 1}
  ]

  itemCat = [
    {value: "C", title: "Consumables"},
    {value: "A", title: "Assets"},
    {value: "O", title: "Other"}
  ]

  taxes = [
    {id: 1, tax: 5, title: "GST@5%", type: "A", status: 1},
    {id: 2, tax: 12, title: "GST@12%", type: "A", status: 1},
    {id: 3, tax: 18, title: "GST@18%", type: "A", status: 1},
    {id: 4, tax: 28, title: "GST@28%", type: "A", status: 1},
    {id: 5, tax: 1, title: "TDS@1%", type: "D", status: 1},
    {id: 6, tax: 4, title: "TDS@4%", type: "D", status: 1},
  ]
  items = [
    { id: 1, itemCode: "M010100001",  itemType: "I", itemName: "Black Armed Gaurd Uniform",  groupId: 2, category: "O", itemFrom: "D", itemDescription: "Black Color, Size: 42 (XL), Slim Armored Gaurd Uniform Set", itemRate: 1000.00, hsnCode: 26548, gstRate: 3, batchNo: 1, qualityCheck: 0, unitId: 7, minLevel: 10, maxLevel: 50, reorderLevel: 5, leadTime: 10, averageRate: 0.00, lastPoRate: 0.00, status: 1, altunitDetails: [null],  attachments: [null]},
    { id: 2, itemCode: "M010200001",  itemType: "I", itemName: "Black Shoes",  groupId: 2, category: "O", itemFrom: "D", itemDescription: "Black Color, Size: 9, Formal Shoes", itemRate: 1000.00, hsnCode: 266489, gstRate: 3, batchNo: 1, qualityCheck: 0, unitId: 8, minLevel: 10, maxLevel: 50, reorderLevel: 5, leadTime: 10, averageRate: 0.00, lastPoRate: 0.00, status: 1, altunitDetails: [null],  attachments: [null]}
  ]

  itemAlterUnit = [
    {id: 1, parentId: 1, unitId: 9, convFact: 10, status: 1}
  ]

  brand = [
    {id: 1, brandName: "Reebok", status: 1},
    {id: 2, brandName: "Levis", status: 1},
    {id: 3, brandName: "WoodLand", status: 1},
    {id: 4, brandName: "Action", status: 1},
  ]

  pr = [
    { id: 1, documentNo: "PR/18-19/00001", refDoc: "D", refDocId: null, documentDate: "2019-03-01", branchId: 2, status: 2, revNo: 0, amendNo: 0, requiredDate: "2019-05-10", purpose: "", prType: ""},
    { id: 2, documentNo: "PR/18-19/00002", refDoc: "D", refDocId: null, documentDate: "2019-03-01", branchId: 2, status: 6, revNo: 0, amendNo: 0, requiredDate: "2019-05-10", purpose: "", prType: "PO"},
    { id: 3, documentNo: "PR/18-19/00003", refDoc: "D", refDocId: null, documentDate: "2019-03-01", branchId: 2, status: 6, revNo: 0, amendNo: 0, requiredDate: "2019-05-10", purpose: "", prType: "RFQ"},
    { id: 4, documentNo: "PR/18-19/00004", refDoc: "D", refDocId: null, documentDate: "2019-03-01", branchId: 2, status: 13, revNo: 0, amendNo: 0, requiredDate: "2019-05-10", purpose: "", prType: "RFQ"},
    { id: 5, documentNo: "PR/18-19/00005", refDoc: "D", refDocId: null, documentDate: "2019-03-01", branchId: 2, status: 12, revNo: 0, amendNo: 0, requiredDate: "2019-05-10", purpose: "", prType: "PO"},
    { id: 6, documentNo: "PR/18-19/00006", refDoc: "D", refDocId: null, documentDate: "2019-03-01", branchId: 2, status: 14, revNo: 0, amendNo: 0, requiredDate: "2019-05-10", purpose: "", prType: "RFQ"},
    { id: 7, documentNo: "PR/18-19/00007", refDoc: "D", refDocId: null, documentDate: "2019-03-01", branchId: 2, status: 15, revNo: 0, amendNo: 0, requiredDate: "2019-05-10", purpose: "", prType: "RFQ"},
    { id: 8, documentNo: "PR/18-19/00008", refDoc: "D", refDocId: null, documentDate: "2019-03-01", branchId: 2, status: 12, revNo: 0, amendNo: 0, requiredDate: "2019-05-10", purpose: "", prType: "RFQ"},
    { id: 9, documentNo: "PR/18-19/00009", refDoc: "D", refDocId: null, documentDate: "2019-03-01", branchId: 2, status: 16, revNo: 0, amendNo: 0, requiredDate: "2019-05-10", purpose: "", prType: "PO"},
    { id: 10, documentNo: "PR/18-19/00010", refDoc: "D", refDocId: null, documentDate: "2019-03-01", branchId: 2, status: 7, revNo: 0, amendNo: 0, requiredDate: "2019-05-10", purpose: "", prType: ""},
    { id: 11, documentNo: "", refDoc: "D", refDocId: null, documentDate: "2019-03-01", branchId: 2, status: 17, revNo: 0, amendNo: 0, requiredDate: "2019-05-10", purpose: "", prType: ""},
    { id: 12, documentNo: "PR/18-19/00011", refDoc: "D", refDocId: null, documentDate: "2019-03-01", branchId: 2, status: 13, revNo: 0, amendNo: 0, requiredDate: "2019-05-10", purpose: "", prType: "RFQ"},
  ]

  purchaseLine = [
    { id: 1, itemId: 1, parentId: 1, brandId: 2, purchaseUnit: 7, convFact: 1.000, purchaseQty: 50.00, status: 2},
    { id: 2, itemId: 1, parentId: 2, brandId: 2, purchaseUnit: 7, convFact: 1.000, purchaseQty: 50.00, status: 2},
    { id: 3, itemId: 1, parentId: 3, brandId: 2, purchaseUnit: 9, convFact: 10.000, purchaseQty: 50.00, status: 2},
    { id: 4, itemId: 1, parentId: 4, brandId: 2, purchaseUnit: 7, convFact: 1.000, purchaseQty: 50.00, status: 2},
    { id: 5, itemId: 1, parentId: 5, brandId: 2, purchaseUnit: 7, convFact: 1.000, purchaseQty: 50.00, status: 2},
    { id: 6, itemId: 1, parentId: 6, brandId: 2, purchaseUnit: 7, convFact: 1.000, purchaseQty: 50.00, status: 2},
    { id: 7, itemId: 1, parentId: 7, brandId: 2, purchaseUnit: 7, convFact: 1.000, purchaseQty: 50.00, status: 2},
    { id: 8, itemId: 1, parentId: 8, brandId: 2, purchaseUnit: 7, convFact: 1.000, purchaseQty: 50.00, status: 2},
    { id: 9, itemId: 1, parentId: 9, brandId: 2, purchaseUnit: 7, convFact: 1.000, purchaseQty: 50.00, status: 2},
    { id: 10, itemId: 1, parentId: 10, brandId: 2, purchaseUnit: 7, convFact: 1.000, purchaseQty: 50.00, status: 2},
    { id: 11, itemId: 1, parentId: 11, brandId: 2, purchaseUnit: 7, convFact: 1.000, purchaseQty: 50.00, status: 2},
    { id: 12, itemId: 1, parentId: 12, brandId: 2, purchaseUnit: 7, convFact: 1.000, purchaseQty: 50.00, status: 2},
    { id: 13, itemId: 2, parentId: 3, brandId: 1, purchaseUnit: 8, convFact: 1.000, purchaseQty: 10.00, status: 2},
  ]

  vendor = [
    { id: 1, vendorCode: "V/00001", msmeRegister: 0, vendorName: "A to Z Pvt. Ltd.",  localName: "A to Z", vendorCategory: 0, webUrl:'', status:1, regNo:'', cinNo:'', gstNo:'', panNo:'', msmeNo:'', creditLimit: 30000.00, creditDays: 30, addressDetails: [], contactDetails:[], bankDetails:[], vendorRating: 3.5, license: [], attachments: [] },
    { id: 2, vendorCode: "V/00002", msmeRegister: 0, vendorName: "Akshat Dresses", localName: "Akshat", vendorCategory: 0, webUrl:'', status:1, regNo:'', cinNo:'', gstNo:'', panNo:'', msmeNo:'', creditLimit: 10000.00, creditDays: 30, addressDetails: [], contactDetails:[], bankDetails:[], vendorRating: 2, license: [], attachments: [] }
  ]

  rfq = [
    { id: 1, documentNo: "RQQ/18-19/0001", refDocId: 4, refDoc: "PR", documentDate: "2019-02-02", quoteDate: "2019-02-03", requiredDate: "2019-05-10", status: 2, remarks: '' },
    { id: 2, documentNo: "RQQ/18-19/0002", refDocId: 6, refDoc: "PR", documentDate: "2019-02-02", quoteDate: "2019-02-03", requiredDate: "2019-05-10", status: 14, remarks: '' },
    { id: 3, documentNo: "RQQ/18-19/0003", refDocId: 7, refDoc: "PR", documentDate: "2019-02-02", quoteDate: "2019-02-03", requiredDate: "2019-05-10", status: 15, remarks: '' },
    { id: 4, documentNo: "RQQ/18-19/0004", refDocId: 8, refDoc: "PR", documentDate: "2019-02-02", quoteDate: "2019-02-03", requiredDate: "2019-05-10", status: 12, remarks: '' },
    { id: 5, documentNo: "RQQ/18-19/0005", refDocId: 12, refDoc: "PR", documentDate: "2019-02-02", quoteDate: "2019-02-03", requiredDate: "2019-05-10", status: 17, remarks: '' },
  ]

  rfqLines = [
    { id: 1, parentId: 1, itemId: 1, brandId: 2, unitId: 9, rfqQty: 50.00, convFact: 10.000, status: 2, },
    { id: 2, parentId: 2, itemId: 1, brandId: 2, unitId: 7, rfqQty: 50.00, convFact: 1.000, status: 2, },
    { id: 3, parentId: 3, itemId: 1, brandId: 2, unitId: 7, rfqQty: 50.00, convFact: 1.000, status: 2, },
    { id: 4, parentId: 4, itemId: 1, brandId: 2, unitId: 7, rfqQty: 50.00, convFact: 1.000, status: 2, },
    { id: 5, parentId: 5, itemId: 1, brandId: 2, unitId: 7, rfqQty: 50.00, convFact: 1.000, status: 2, },
    { id: 6, parentId: 1, itemId: 2, brandId: 1, unitId: 8, rfqQty: 10.00, convFact: 1.000, status: 2, }
  ]

  rfqVendors = [
    {id: 1, vendorId: 1, parentId: 1},
    {id: 2, vendorId: 2, parentId: 1},
    {id: 3, vendorId: 1, parentId: 2},
    {id: 4, vendorId: 2, parentId: 2},
    {id: 5, vendorId: 1, parentId: 3},
    {id: 6, vendorId: 2, parentId: 3},
    {id: 7, vendorId: 1, parentId: 4},
    {id: 8, vendorId: 2, parentId: 4},
    {id: 9, vendorId: 2, parentId: 5},
    {id: 10, vendorId: 2, parentId: 6}
  ]


  quotes = [
    { id: 1, documentNo: "QT/18-19/00001", documentDate: "2019-02-03", refDoc: 'RFQ', refDocId:2,  vendorId: 1, vendorQuoteNo: "VT2348758", vendorExperience: 2, vendorExpUnit: 6, finantialCapacity: 1000000.00, creditDays: 30, priceValidity: 4, priceValidityUnit: 4, paymentMode: 4, transportationMode: 5, deliveryPeriod: 1, deliveryPeriodUnit: 4, subTotal: 1000.00, discount: 10.00, discountType: 0, taxableAmt: 900.00, gstTotal: 162.00, packageCharge: 0.00, transportCharge: 500.00, otherCharge: 0.00, grandTotal: 1562.00, remarks:'', status: 2,quotationItems:[], attachments: [] },
    { id: 2, documentNo: "QT/18-19/00002", documentDate: "2019-02-03", refDoc: 'RFQ', refDocId:2,  vendorId: 2, vendorQuoteNo: "TG439057", vendorExperience: 2, vendorExpUnit: 6, finantialCapacity: 1000000.00, creditDays: 30, priceValidity: 4, priceValidityUnit: 4, paymentMode: 4, transportationMode: 5, deliveryPeriod: 1, deliveryPeriodUnit: 4, subTotal: 1250.00, discount: 10.00, discountType: 0, taxableAmt: 1125.00, gstTotal: 202.50, packageCharge: 0.00, transportCharge: 500.00, otherCharge: 0.00, grandTotal: 1827.50, remarks:'', status: 2,quotationItems:[], attachments: [] },
    { id: 3, documentNo: "QT/18-19/00003", documentDate: "2019-02-03", refDoc: 'RFQ', refDocId:3,  vendorId: 1, vendorQuoteNo: "VT2348758", vendorExperience: 2, vendorExpUnit: 6, finantialCapacity: 1000000.00, creditDays: 30, priceValidity: 4, priceValidityUnit: 4, paymentMode: 4, transportationMode: 5, deliveryPeriod: 1, deliveryPeriodUnit: 4, subTotal: 1000.00, discount: 10.00, discountType: 0, taxableAmt: 900.00, gstTotal: 162.00, packageCharge: 0.00, transportCharge: 500.00, otherCharge: 0.00, grandTotal: 1562.00, remarks:'', status: 15,quotationItems:[], attachments: [] },
    { id: 4, documentNo: "QT/18-19/00004", documentDate: "2019-02-03", refDoc: 'RFQ', refDocId:3,  vendorId: 2, vendorQuoteNo: "TG439057", vendorExperience: 2, vendorExpUnit: 6, finantialCapacity: 1000000.00, creditDays: 30, priceValidity: 4, priceValidityUnit: 4, paymentMode: 4, transportationMode: 5, deliveryPeriod: 1, deliveryPeriodUnit: 4, subTotal: 1250.00, discount: 10.00, discountType: 0, taxableAmt: 1125.00, gstTotal: 202.50, packageCharge: 0.00, transportCharge: 500.00, otherCharge: 0.00, grandTotal: 1827.50, remarks:'', status: 15,quotationItems:[], attachments: [] },
    { id: 5, documentNo: "QT/18-19/00005", documentDate: "2019-02-03", refDoc: 'RFQ', refDocId:4,  vendorId: 1, vendorQuoteNo: "VT2348758", vendorExperience: 2, vendorExpUnit: 6, finantialCapacity: 1000000.00, creditDays: 30, priceValidity: 4, priceValidityUnit: 4, paymentMode: 4, transportationMode: 5, deliveryPeriod: 1, deliveryPeriodUnit: 4, subTotal: 1000.00, discount: 10.00, discountType: 0, taxableAmt: 900.00, gstTotal: 162.00, packageCharge: 0.00, transportCharge: 500.00, otherCharge: 0.00, grandTotal: 1562.00, remarks:'', status: 12,quotationItems:[], attachments: [] },
    { id: 6, documentNo: "QT/18-19/00006", documentDate: "2019-02-03", refDoc: 'RFQ', refDocId:4,  vendorId: 2, vendorQuoteNo: "TG439057", vendorExperience: 2, vendorExpUnit: 6, finantialCapacity: 1000000.00, creditDays: 30, priceValidity: 4, priceValidityUnit: 4, paymentMode: 4, transportationMode: 5, deliveryPeriod: 1, deliveryPeriodUnit: 4, subTotal: 1250.00, discount: 10.00, discountType: 0, taxableAmt: 1125.00, gstTotal: 202.50, packageCharge: 0.00, transportCharge: 500.00, otherCharge: 0.00, grandTotal: 1827.50, remarks:'', status: 12,quotationItems:[], attachments: [] }
  ]

  quoteItems = [
    { id: 1, parentId: 1, itemId: 1, brandId: 2, unitId: 7, reqQty: 50.00, convFact: 1.000, status: 2, unitRate: 20.00, taxableAmount: 1000.00, gstAmount: 180.00, amount: 1180.00, rfqItem: 2},    
    { id: 2, parentId: 2, itemId: 1, brandId: 2, unitId: 7, reqQty: 50.00, convFact: 1.000, status: 2, unitRate: 25.00, taxableAmount: 1250.00, gstAmount: 225.00, amount: 1475.00, rfqItem: 2},
    { id: 3, parentId: 3, itemId: 1, brandId: 2, unitId: 7, reqQty: 50.00, convFact: 1.000, status: 2, unitRate: 20.00, taxableAmount: 1000.00, gstAmount: 180.00, amount: 1180.00, rfqItem: 3},    
    { id: 4, parentId: 4, itemId: 1, brandId: 2, unitId: 7, reqQty: 50.00, convFact: 1.000, status: 2, unitRate: 25.00, taxableAmount: 1250.00, gstAmount: 225.00, amount: 1475.00, rfqItem: 3},
    { id: 5, parentId: 5, itemId: 1, brandId: 2, unitId: 7, reqQty: 50.00, convFact: 1.000, status: 2, unitRate: 20.00, taxableAmount: 1000.00, gstAmount: 180.00, amount: 1180.00, rfqItem: 4},    
    { id: 6, parentId: 6, itemId: 1, brandId: 2, unitId: 7, reqQty: 50.00, convFact: 1.000, status: 2, unitRate: 25.00, taxableAmount: 1250.00, gstAmount: 225.00, amount: 1475.00, rfqItem: 4},
  ]

  comparision = [
    { id: 1, documentNo: "COMP/18-19/0001", documentDate: "2019-03-03", refDocId: 3, quoteCount: 2, reasonForNotL1:"", remarks:"", status: 6, selectedVendor: '' },
    { id: 2, documentNo: "COMP/18-19/0002", documentDate: "2019-03-03", refDocId: 4, quoteCount: 2, reasonForNotL1:"", remarks:"", status: 12, selectedVendor: '' }
  ]

  compVendors = [
    {id: 1, parentId: 1, quoteId: 3, vendorId: 1, selected: 1},
    {id: 2, parentId: 1, quoteId: 4, vendorId: 2, selected: 0},
    {id: 3, parentId: 2, quoteId: 5, vendorId: 1, selected: 1},
    {id: 4, parentId: 2, quoteId: 6, vendorId: 2, selected: 0},
  ]

  poList = []

  compItems = [
    { id: 1, parentId: 1, itemId: 1, brandId: 2, unitId: 7, reqQty: 50.00, convFact: 1.000, status: 2, unitRate: 20.00, taxableAmt: 1000.00, gstAmount: 180.00, amount: 1180.00, rfqLine: 3, quoteLine: 3},    
    { id: 2, parentId: 2, itemId: 1, brandId: 2, unitId: 7, reqQty: 50.00, convFact: 1.000, status: 2, unitRate: 25.00, taxableAmt: 1250.00, gstAmount: 225.00, amount: 1475.00, rfqLine: 3, quoteLine: 4},
    { id: 3, parentId: 3, itemId: 1, brandId: 2, unitId: 7, reqQty: 50.00, convFact: 1.000, status: 2, unitRate: 20.00, taxableAmt: 1000.00, gstAmount: 180.00, amount: 1180.00, rfqLine: 4, quoteLine: 5},    
    { id: 4, parentId: 4, itemId: 1, brandId: 2, unitId: 7, reqQty: 50.00, convFact: 1.000, status: 2, unitRate: 25.00, taxableAmt: 1250.00, gstAmount: 225.00, amount: 1475.00, rfqLine: 4, quoteLine: 6},
  ]
  
  addressType = [
    {id: 1, type: "Communication Address"},
    {id: 2, type: "Warehouse Address"}
  ]

  status = [
    {id: 1, value: 0, description: "InActive", classStyle: 'status-inactive'},
    {id: 2, value: 1, description: "Active", classStyle: 'status-active'},
    {id: 3, value: 2, description: "Submitted", classStyle: 'status-submitted'},
    {id: 4, value: 3, description: "Verified", classStyle: 'status-verified'},
    {id: 5, value: 4, description: "Canceled", classStyle: 'status-canceled'},
    {id: 6, value: 5, description: "Paid", classStyle: 'status-paid'},
    {id: 7, value: 6, description: "Approved", classStyle: 'status-approved'},
    {id: 8, value: 7, description: "Rejected", classStyle: 'status-rejected'},
    {id: 9, value: 8, description: "Partialy Approved", classStyle: 'status-partiallyapproved'},
    {id: 10, value: 9, description: "Returned", classStyle: 'status-returned'},
    {id: 11, value: 10, description: "Revised", classStyle: 'status-revised'},   
    {id: 12, value: 11, description: "Amended", classStyle: 'status-amended'}, 
    {id: 13, value: 12, description: "PO Created", classStyle: 'status-pocreated'},  
    {id: 14, value: 13, description: "RFQ Created", classStyle: 'status-rfqcreated'},
    {id: 15, value: 14, description: "Quotation Created", classStyle: 'status-quotecreated'},
    {id: 16, value: 15, description: "Comparision Created", classStyle: 'status-compcreated'},
    {id: 17, value: 16, description: "Closed", classStyle: 'status-closed'},
    {id: 18, value: 17, description: "Drafted", classStyle: 'status-draft'},
    {id: 19, value: 18, description: "Deleted", classStyle: 'status-deleted'},
  ]

  holidays = []

  refDocs = [
    {value: "D", title: "Direct"},
    {value: "MR", title: "Material Requisiton"},
    {value: "PR", title: "Purchase Requisition"},
    {value: "RFQ", title: "RFQ"},
    {value: "PO", title: "Purchase Order"},
  ]

  displayLimit = [
    {value: 0, title: "All"},
    {value: 5, title: "5"},
    {value: 10, title: "10"},
    {value: 20, title: "20"},
    {value: 50, title: "50"},
    {value: 100, title: "100"}
  ]

  paymentMode = [
    {id: 1, title:"Cheque"},
    {id: 2, title:"NEFT"},
    {id: 3, title:"RTGS"},
    {id: 4, title:"Cash"},
    {id: 5, title:"Draft"},
  ]

  transportationMode = [
    {id: 1, title:"Air"},
    {id: 2, title:"Rail"},
    {id: 3, title:"Ship"},
    {id: 4, title:"Road"},
    {id: 5, title:"Courier"},
    {id: 6, title:"Hand"},
  ]
  
  modules = [
      { id: 1, displayOrder: 1, status: 1, parentId: 0, path: '', title: 'Dashboard', icon: 'ft-home', className: 'has-sub', badge: '2', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [] },      
      { id: 2, displayOrder: 1,  status: 1, parentId: 1, path: '/dashboard/dashboard1', title: 'Dashboard1', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 3, displayOrder: 2,  status: 1, parentId: 1, path: '/dashboard/dashboard2', title: 'Dashboard2', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 4, displayOrder: 9,  status: 0, parentId: 0, path: '/colorpalettes', title: 'Color Palette', icon: 'ft-droplet', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 5, displayOrder: 10, status: 0, parentId: 0, path: '/inbox', title: 'Inbox', icon: 'ft-mail', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 6, displayOrder: 11, status: 0, parentId: 0, path: '/chat', title: 'Chat', icon: 'ft-message-square', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 7, displayOrder: 12, status: 0, parentId: 0, path: '/chat-ngrx', title: 'Chat NgRx', icon: 'ft-message-square', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 8, displayOrder: 13, status: 0, parentId: 0, path: '/taskboard', title: 'Task Board', icon: 'ft-file-text', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 9, displayOrder: 14, status: 0, parentId: 0, path: '/taskboard-ngrx', title: 'Task Board NgRx', icon: 'ft-file-text', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 10, displayOrder: 15, status: 0, parentId: 0, path: '/player', title: 'Player', icon: 'ft-music', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 11, displayOrder: 16, status: 0, parentId: 0, path: '', title: 'UI Kit', icon: 'ft-aperture', className: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },        
      { id: 12, displayOrder: 1, status: 1, parentId: 11, path: '/uikit/grids', title: 'Grid', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 13, displayOrder: 2, status: 1, parentId: 11, path: '/uikit/typography', title: 'Typography', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 14, displayOrder: 3, status: 1, parentId: 11, path: '/uikit/syntaxhighlighter', title: 'Syntax Highlighter', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 15, displayOrder: 4, status: 1, parentId: 11, path: '/uikit/helperclasses', title: 'Helper Classes', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 16, displayOrder: 5, status: 1, parentId: 11, path: '/uikit/textutilities', title: 'Text Utilities', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 17, displayOrder: 6, status: 1, parentId: 11, path: '', title: 'Icons', icon: '', className: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 18, displayOrder: 1, status: 1, parentId: 17, path: '/uikit/feather', title: 'Feather Icon', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 19, displayOrder: 2, status: 1, parentId: 17, path: '/uikit/font-awesome', title: 'Font Awesome Icon', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 20, displayOrder: 3, status: 1, parentId: 17, path: '/uikit/simple-line', title: 'Simple Line Icon', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 21, displayOrder: 17, status: 0, parentId: 0, path: '', title: 'Components', icon: 'ft-box', className: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 22, displayOrder: 1, status: 1, parentId: 21, path: '', title: 'Bootstrap', icon: '', className: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },      
      { id: 23, displayOrder: 2, status: 1, parentId: 22, path: '/components/lists', title: 'List', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 24, displayOrder: 3, status: 1, parentId: 22, path: '/components/buttons', title: 'Buttons', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 25, displayOrder: 4, status: 1, parentId: 22, path: '/components/ng-buttons', title: 'NG Buttons', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 26, displayOrder: 5, status: 1, parentId: 22, path: '/components/alerts', title: 'Alerts', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 27, displayOrder: 6, status: 1, parentId: 22, path: '/components/badges', title: 'Badges', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 28, displayOrder: 7, status: 1, parentId: 22, path: '/components/dropdowns', title: 'Dropdowns', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 29, displayOrder: 8, status: 1, parentId: 22, path: '/components/inputgroups', title: 'Input Groups', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 30, displayOrder: 9, status: 1, parentId: 22, path: '/components/media', title: 'Media Objects', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 31, displayOrder: 10, status: 1, parentId: 22, path: '/components/pagination', title: 'Pagination', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 32, displayOrder: 11, status: 1, parentId: 22, path: '/components/progress', title: 'Progress Bars', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 33, displayOrder: 12, status: 1, parentId: 22, path: '/components/models', title: 'Modals', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 34, displayOrder: 13, status: 1, parentId: 22, path: '/components/collapse', title: 'Collapse', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 35, displayOrder: 14, status: 1, parentId: 22, path: '/components/accordion', title: 'Accordion', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 36, displayOrder: 15, status: 1, parentId: 22, path: '/components/carousel', title: 'Carousel', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 37, displayOrder: 16, status: 1, parentId: 22, path: '/components/datepicker', title: 'Datepicker', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 38, displayOrder: 17, status: 1, parentId: 22, path: '/components/popover', title: 'Popover', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 39, displayOrder: 18, status: 1, parentId: 22, path: '/components/rating', title: 'Rating', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 40, displayOrder: 19, status: 1, parentId: 22, path: '/components/tables', title: 'Tables', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 41, displayOrder: 20, status: 1, parentId: 22, path: '/components/tabs', title: 'Tabs', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 42, displayOrder: 21, status: 1, parentId: 22, path: '/components/timepicker', title: 'Timepicker', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 43, displayOrder: 22, status: 1, parentId: 22, path: '/components/tooltip', title: 'Tooltip', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 44, displayOrder: 23, status: 1, parentId: 22, path: '/components/typeahead', title: 'Typeahead', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 45, displayOrder: 2, status: 1, parentId: 21, path: '', title: 'Extra', icon: '', className: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },      
      { id: 46, displayOrder: 1, status: 1, parentId: 45, path: '/components/sweetalerts', title: 'Sweet Alert', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 47, displayOrder: 2, status: 1, parentId: 45, path: '/components/toastr', title: 'Toastr', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 48, displayOrder: 3, status: 1, parentId: 45, path: '/components/select', title: 'Select', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 49, displayOrder: 4, status: 1, parentId: 45, path: '/components/nouislider', title: 'NoUI Slider', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 50, displayOrder: 5, status: 1, parentId: 45, path: '/components/upload', title: 'Upload', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 51, displayOrder: 6, status: 1, parentId: 45, path: '/components/editor', title: 'Editor', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 52, displayOrder: 7, status: 1, parentId: 45, path: '/components/dragndrop', title: 'Drag and Drop', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 53, displayOrder: 8, status: 1, parentId: 45, path: '/components/tour', title: 'Tour', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 54, displayOrder: 9, status: 1, parentId: 45, path: '/components/cropper', title: 'Image Cropper', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 55, displayOrder: 10, status: 1, parentId: 45, path: '/components/tags', title: 'Input Tags', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 56, displayOrder: 11, status: 1, parentId: 45, path: '/components/switch', title: 'Switch', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 57, displayOrder: 18,  status: 0, parentId: 0, path: '', title: 'Forms', icon: 'ft-edit', className: 'has-sub', badge: 'New', badgeClass: 'badge badge-pill badge-primary float-right mr-1 mt-1', isExternalLink: false, submenu: [] },      
      { id: 58, displayOrder: 1, status: 0, parentId: 57, path: '', title: 'Elements', icon: '', className: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 59, displayOrder: 1, status: 1, parentId: 58, path: '/forms/inputs', title: 'Inputs', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 60, displayOrder: 2, status: 1, parentId: 58, path: '/forms/input-groups', title: 'Input Group', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 61, displayOrder: 3, status: 1, parentId: 58, path: '/forms/input-grid', title: 'Input Grid', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 62, displayOrder: 2, status: 1, parentId: 57, path: '', title: 'Layouts', icon: '', className: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },      
      { id: 63, displayOrder: 1, status: 1, parentId: 62, path: '/forms/basic', title: 'Basic Forms', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 64, displayOrder: 2, status: 1, parentId: 62, path: '/forms/horizontal', title: 'Horizontal Forms', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 65, displayOrder: 3, status: 1, parentId: 62, path: '/forms/hidden-labels', title: 'Hidden Labels', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 66, displayOrder: 4, status: 1, parentId: 62, path: '/forms/form-actions', title: 'Form Actions', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 67, displayOrder: 5, status: 1, parentId: 62, path: '/forms/bordered', title: 'Bordered Forms', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 68, displayOrder: 6, status: 1, parentId: 62, path: '/forms/striped-rows', title: 'Striped Rows', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 69,  displayOrder: 3, status: 1, parentId: 57, path: '/forms/validation', title: 'Validation', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 70,  displayOrder: 4, status: 1, parentId: 57, path: '/forms/ngx', title: 'NGX Wizard', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 71,  displayOrder: 5, status: 1, parentId: 57, path: '/forms/archwizard', title: 'ArchWizard', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 72,  displayOrder: 19, status: 0, parentId: 0, path: '', title: 'Tables', icon: 'ft-grid', className: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 73, displayOrder: 1, status: 1, parentId: 72, path: '/tables/regular', title: 'Regular', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 74, displayOrder: 2, status: 1, parentId: 72, path: '/tables/extended', title: 'Extended', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 75, displayOrder: 20, status: 0, parentId: 0, path: '', title: 'Data Tables', icon: 'ft-layout', className: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 76, displayOrder: 1, status: 1, parentId: 75, path: '/datatables/basic', title: 'Basic', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 77, displayOrder: 2, status: 1, parentId: 75, path: '/datatables/editing', title: 'Editing', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 78, displayOrder: 3, status: 1, parentId: 75, path: '/datatables/filter', title: 'Filter', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 79, displayOrder: 4, status: 1, parentId: 75, path: '/datatables/fullscreen', title: 'Fullscreen', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 80, displayOrder: 5, status: 1, parentId: 75, path: '/datatables/paging', title: 'Paging', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 81, displayOrder: 6, status: 1, parentId: 75, path: '/datatables/pinning', title: 'Pinning', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 82, displayOrder: 7, status: 1, parentId: 75, path: '/datatables/selection', title: 'Selection', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 83, displayOrder: 8, status: 1, parentId: 75, path: '/datatables/sorting', title: 'Sorting', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 84, displayOrder: 21, status: 0, parentId: 0, path: '', title: 'Cards', icon: 'ft-layers', className: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 85, displayOrder: 1, status: 1, parentId: 84, path: '/cards/basic', title: 'Basic Cards', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 86, displayOrder: 2, status: 1, parentId: 84, path: '/cards/advanced', title: 'Advanced Cards', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 87, displayOrder: 22, status: 0, parentId: 0, path: '', title: 'Maps', icon: 'ft-map', className: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 88, displayOrder: 1, status: 1, parentId: 87, path: '/maps/google', title: 'Google Map', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 89, displayOrder: 2, status: 1, parentId: 87, path: '/maps/fullscreen', title: 'Full Screen Map', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 90, displayOrder: 23, status: 0, parentId: 0, path: '', title: 'Charts', icon: 'ft-bar-chart-2', className: 'has-sub', badge: '2', badgeClass: 'badge badge-pill badge-success float-right mr-1 mt-1', isExternalLink: false, submenu: [] },
      { id: 91, displayOrder: 1, status: 1, parentId: 90, path: '/charts/chartjs', title: 'ChartJs', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 92, displayOrder: 2, status: 1, parentId: 90, path: '/charts/chartist', title: 'Chartist', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 93, displayOrder: 3, status: 1, parentId: 90, path: '/charts/ngx', title: 'NGX Chart', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 94, displayOrder: 24, status: 0, parentId: 0, path: '/calendar', title: 'Calendar', icon: 'ft-calendar', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 95, displayOrder: 25, status: 0, parentId: 0, path: '', title: 'Pages', icon: 'ft-copy', className: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },      
      { id: 96, displayOrder: 1, status: 1, parentId: 95, path: '/pages/forgotpassword', title: 'Forgot Password', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 97, displayOrder: 2, status: 1, parentId: 95, path: '/pages/horizontaltimeline', title: 'Horizontal Timeline', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 98, displayOrder: 3, status: 1, parentId: 95, path: '/pages/verticaltimeline', title: 'Vertical Timeline', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 99, displayOrder: 4, status: 1, parentId: 95, path: '/pages/login', title: 'Login', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 100, displayOrder: 5, status: 1, parentId: 95, path: '/pages/register', title: 'Register', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 101, displayOrder: 6, status: 1, parentId: 95, path: '/pages/profile', title: 'User Profile', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 102, displayOrder: 7, status: 1, parentId: 95, path: '/pages/lockscreen', title: 'Lock Screen', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 103, displayOrder: 8, status: 1, parentId: 95, path: '/pages/invoice', title: 'Invoice', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 104, displayOrder: 9, status: 1, parentId: 95, path: '/pages/error', title: 'Error', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 105, displayOrder: 10, status: 1, parentId: 95, path: '/pages/comingsoon', title: 'Coming Soon', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 106, displayOrder: 11, status: 1, parentId: 95, path: '/pages/maintenance', title: 'Maintenance', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 107, displayOrder: 12, status: 1, parentId: 95, path: '/pages/gallery', title: 'Gallery', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 108, displayOrder: 13, status: 1, parentId: 95, path: '/pages/search', title: 'Search', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 109, displayOrder: 14, status: 1, parentId: 95, path: '/pages/faq', title: 'FAQ', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 110, displayOrder: 15, status: 1, parentId: 95, path: '/pages/kb', title: 'Knowledge Base', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 111, displayOrder: 26, status: 0, parentId: 0, path: 'https://pixinvent.com/apex-angular-4-bootstrap-admin-template/documentation', title: 'Documentation', icon: 'ft-book', className: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
      { id: 112, displayOrder: 27, status: 0, parentId: 0, path: 'https://pixinvent.ticksy.com/', title: 'Support', icon: 'ft-life-buoy', className: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
      { id: 113, displayOrder: 2, status: 1, parentId: 0, path: '', title: 'Admin Panel', icon: 'ft-home', className: 'has-sub', badge: '2', badgeClass: 'badge badge-pill badge-danger float-right mr-1 mt-1', isExternalLink: false, submenu: [] },      
      { id: 114, displayOrder: 1, status: 1, parentId: 113, path: '', title: 'Super Admin', icon: '', className: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },      
      { id: 115, displayOrder: 1, status: 0, parentId: 114, path: '/adminpanel/module', title: 'Module', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 116, displayOrder: 4, status: 1, parentId: 114, path: '/adminpanel/clientMaster', title: 'Client Master', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 117, displayOrder: 4, status: 0, parentId: 113, path: '', title: 'Standard Master', icon: '', className: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 118, displayOrder: 1, status: 1, parentId: 117, path: '/adminpanel/units', title: 'Unit Master', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 119, displayOrder: 3, status: 1, parentId: 117, path: '/adminpanel/country', title: 'Country Master', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 120, displayOrder: 4, status: 1, parentId: 117, path: '/adminpanel/state', title: 'State Master', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 121, displayOrder: 6, status: 1, parentId: 117, path: '/adminpanel/city', title: 'City Master', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 122, displayOrder: 2, status: 0, parentId: 114, path: '/adminpanel/package', title: 'Packages', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 123, displayOrder: 5, status: 1, parentId: 117, path: '/adminpanel/zone', title: 'Zone Master', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 124, displayOrder: 2, status: 1, parentId: 117, path: '/adminpanel/unitConversion', title: 'Unit Conversion Master', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 125, displayOrder: 2, status: 0, parentId: 113, path: '', title: 'Admin Setup', icon: '', className: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 126, displayOrder: 1, status: 1, parentId: 125, path: '/adminpanel/company', title: 'Company Master', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 127, displayOrder: 2, status: 1, parentId: 125, path: '/adminpanel/branch', title: 'Branch Master', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 128, displayOrder: 3, status: 0, parentId: 113, path: '', title: 'Transactional Master', icon: '', className: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 129, displayOrder: 1, status: 1, parentId: 128, path: '/adminpanel/department', title: 'Department Master', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 130, displayOrder: 2, status: 1, parentId: 128, path: '/adminpanel/designation', title: 'Designation Master', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 131, displayOrder: 7, status: 1, parentId: 117, path: '/adminpanel/docType', title: 'DocType Master', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 132, displayOrder: 4, status: 1, parentId: 128, path: '/adminpanel/employee', title: 'Employee Master', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 134, displayOrder: 3, status: 1, parentId: 128, path: '/adminpanel/jobProfile', title: 'Job Profile Master', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 135, displayOrder: 5, status: 1, parentId: 128, path: '/adminpanel/group', title: 'Group Master', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 136, displayOrder: 6, status: 1, parentId: 128, path: '/adminpanel/item', title: 'Item Master', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 137, displayOrder: 3, status: 0, parentId: 0, path: '', title: 'HR Payroll Management', icon: 'ft-users', className: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 138, displayOrder: 4, status: 0, parentId: 0, path: '', title: 'Purchase Management', icon: 'ft-shopping-cart', className: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 139, displayOrder: 5, status: 0, parentId: 0, path: '', title: 'Inventory Management', icon: 'ft-layout', className: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 140, displayOrder: 7, status: 0, parentId: 0, path: '', title: 'Accounts Management', icon: 'ft-package', className: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 141, displayOrder: 8, status: 0, parentId: 0, path: '', title: 'Reports', icon: 'ft-list', className: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 142, displayOrder: 1, status: 0, parentId: 138, path: '/supplychain/materialrequisition', title: 'Requisition', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 143, displayOrder: 2, status: 1, parentId: 138, path: '/supplychain/purchaserequisition', title: 'Purchase Requisition', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 144, displayOrder: 3, status: 0, parentId: 138, path: '/supplychain/prreview', title: 'PR Review', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 145, displayOrder: 4, status: 0, parentId: 138, path: '/supplychain/indent', title: 'Indent', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 146, displayOrder: 6, status: 1, parentId: 138, path: '/supplychain/quotations', title: 'Quotations', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 147, displayOrder: 7, status: 1, parentId: 138, path: '/supplychain/comparision', title: 'Comparision', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 148, displayOrder: 8, status: 1, parentId: 138, path: '/supplychain/po', title: 'Purchase Order', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 149, displayOrder: 6, status: 0, parentId: 0, path: '', title: 'Contracts Management', icon: 'ft-layers', className: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 150, displayOrder: 7, status: 1, parentId: 128, path: '/adminpanel/vendor', title: 'Vendor Master', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 151, displayOrder: 5, status: 1, parentId: 138, path: '/supplychain/rfq', title: 'RFQ', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 152, displayOrder: 1, status: 0, parentId: 139, path: '/inventory/gateentry', title: 'Gate Entry', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 153, displayOrder: 2, status: 1, parentId: 139, path: '/inventory/grn', title: 'GRN', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 154, displayOrder: 3, status: 1, parentId: 139, path: '/inventory/opengrn', title: 'Open GRN', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 155, displayOrder: 4, status: 0, parentId: 139, path: '/inventory/transferrequest', title: 'Transfer Request', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 156, displayOrder: 5, status: 1, parentId: 139, path: '/inventory/issueslip', title: 'Material Issue', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 157, displayOrder: 6, status: 0, parentId: 139, path: '/inventory/mtn', title: 'Material Transfer', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 158, displayOrder: 7, status: 0, parentId: 139, path: '/inventory/transferreceipt', title: 'Transfer Receipt', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 159, displayOrder: 8, status: 1, parentId: 139, path: '/inventory/stockadj', title: 'Stock Adjustment', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 160, displayOrder: 9, status: 0, parentId: 139, path: '/inventory/stockconv', title: 'Stock Conversion', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 161, displayOrder: 7, status: 1, parentId: 117, path: '/adminpanel/tax', title: 'Tax Master', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 162, displayOrder: 7, status: 0, parentId: 128, path: '/adminpanel/shifts', title: 'Shift Master', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },      
      { id: 163, displayOrder: 8, status: 0, parentId: 128, path: '/adminpanel/roaster', title: 'Roaster', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 164, displayOrder: 9, status: 1, parentId: 138, path: '/supplychain/purchaseBill', title: 'Purchase Bill', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 165, displayOrder: 1, status: 1, parentId: 137, path: '', title: 'Policies', icon: '', className: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 166, displayOrder: 2, status: 1, parentId: 137, path: '', title: 'Recruitment', icon: '', className: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 167, displayOrder: 3, status: 1, parentId: 137, path: '', title: 'Payroll', icon: '', className: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 168, displayOrder: 1, status: 1, parentId: 165, path: '/hrpayroll/holidaypolicy', title: 'Holiday Policy', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 169, displayOrder: 2, status: 1, parentId: 165, path: '/hrpayroll/leavePolicy', title: 'Leave Policy', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 170, displayOrder: 3, status: 1, parentId: 165, path: '/hrpayroll/hrpolicy', title: 'HR Policy', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 171, displayOrder: 4, status: 1, parentId: 165, path: '/hrpayroll/salarypolicy', title: 'Salary Policy', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 172, displayOrder: 5, status: 1, parentId: 165, path: '/hrpayroll/pfpolicy', title: 'PF Policy', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 173, displayOrder: 6, status: 1, parentId: 165, path: '/hrpayroll/esipolicy', title: 'ESI Policy', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 174, displayOrder: 7, status: 1, parentId: 165, path: '/hrpayroll/allowance', title: 'Allowance/Deduction', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 175, displayOrder: 8, status: 1, parentId: 165, path: '/hrpayroll/travelpolicy', title: 'Travel Policy', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 176, displayOrder: 9, status: 1, parentId: 165, path: '/hrpayroll/perksPolicy', title: 'Perks Policy', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 177, displayOrder: 1, status: 1, parentId: 166, path: '/hrpayroll/appointment', title: 'Appointment', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 178, displayOrder: 2, status: 1, parentId: 166, path: '/hrpayroll/documents', title: 'Doc. Verification', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 179, displayOrder: 3, status: 1, parentId: 166, path: '/hrpayroll/offerletter', title: 'Offer Letter', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 180, displayOrder: 1, status: 1, parentId: 167, path: '/hrpayroll/leaves', title: 'Leaves', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 181, displayOrder: 2, status: 1, parentId: 167, path: '/hrpayroll/attendance', title: 'Attendance', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 182, displayOrder: 3, status: 1, parentId: 167, path: '/hrpayroll/leavecomp', title: 'Leave Comp', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 183, displayOrder: 4, status: 1, parentId: 167, path: '/hrpayroll/arrear', title: 'Arrear', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 184, displayOrder: 5, status: 1, parentId: 167, path: '/hrpayroll/performance', title: 'Performance', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 185, displayOrder: 6, status: 1, parentId: 167, path: '/hrpayroll/appraisal', title: 'Appraisal', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 186, displayOrder: 7, status: 1, parentId: 167, path: '/hrpayroll/salaries', title: 'Salary Book', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 187, displayOrder: 8, status: 1, parentId: 167, path: '/hrpayroll/paymentadvice', title: 'Payment Advice', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 188, displayOrder: 9, status: 1, parentId: 167, path: '/hrpayroll/expenses', title: 'Expenses', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 189, displayOrder: 10, status: 1, parentId: 167, path: '/hrpayroll/transfers', title: 'Transfer', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 170, displayOrder: 1, status: 1, parentId: 140, path: '/accounts/contra', title: 'Contra Voucher', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 171, displayOrder: 2, status: 1, parentId: 140, path: '/accounts/creditnote', title: 'Credit Note', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 172, displayOrder: 3, status: 1, parentId: 140, path: '/accounts/debitnote', title: 'Debit Note', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 173, displayOrder: 4, status: 1, parentId: 140, path: '/accounts/receipt', title: 'Receipt Voucher', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 174, displayOrder: 5, status: 1, parentId: 140, path: '/accounts/payment', title: 'Payment Voucher', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 175, displayOrder: 6, status: 1, parentId: 140, path: '/accounts/journals', title: 'Journals Voucher', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 176, displayOrder: 7, status: 1, parentId: 140, path: '/accounts/memo', title: 'Memo Voucher', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 177, displayOrder: 8, status: 1, parentId: 140, path: '/accounts/posting', title: 'Posting', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 178, displayOrder: 1, status: 1, parentId: 149, path: '/contracts/contracts', title: 'Contracts', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 179, displayOrder: 2, status: 1, parentId: 149, path: '/contracts/contractBill', title: 'Contract Bill', icon: '', className: ' ', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 180, displayOrder: 3, status: 1, parentId: 125, path: '/adminpanel/erpsetting', title: 'Module Settings', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { id: 181, displayOrder: 3, status: 0, parentId: 114, path: '/adminpanel/workflow', title: 'WorkFlow', icon: '', className: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  ]
}


