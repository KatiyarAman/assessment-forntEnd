import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: 'application',
    loadChildren: () => import('../../application/application.module').then(m => m.ApplicationModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('../../employee/employee.module').then(m => m.EmployeeModule)
  },
  {
    path: 'statutorydetails',
    loadChildren: () => import('../../statutorydetails/statutorydetails.module').then(m => m.StatutoryDetailsModule)
  },
  {
    path: 'approvalGroup',
    loadChildren: () => import('../../approvalGroup/approvalGroup.module').then(m=>m.ApprovalGroupModule)
  },
  {
    path: 'approvalManagement',
    loadChildren: () => import('../../approvalManagement/approvalManagement.module').then(m => m.ApprovalConfigModule)
  },
  {
    path: 'department',
    loadChildren: () => import('../../department/department.module').then(m => m.DepartmentModule)
  },
  {
    path: 'designation',
    loadChildren: () => import('../../designation/designation.module').then(m => m.DesignationModule)
  },
  {
    path: 'type',
    loadChildren: () => import('../../type/type.module').then(m => m.TypeModule)
  },
  {
    path: 'customfields',
    loadChildren: () => import('../../customfields/customfields.module').then(m => m.CustomFieldsModule)
  },
  {
    path: 'role',
    loadChildren: () => import('../../role/role.module').then(m => m.RoleModule)
  },
  {
    path: 'moduleSettings',
    loadChildren: () => import('../../moduleSettings/moduleSettings.module').then(m => m.ModuleSettingsModule)
  },
  {
    path: 'user',
    loadChildren: () => import('../../user/user.module').then(m => m.UserModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('../../calendar/calendar.module').then(m => m.CalendarsModule)
  },
  {
    path: 'charts',
    loadChildren: () => import('../../charts/charts.module').then(m => m.ChartsNg2Module)
  },
   {
    path: 'forms',
    loadChildren: () => import('../../forms/forms.module').then(m => m.FormModule)
  },
  {
    path: 'maps',
    loadChildren: () => import('../../maps/maps.module').then(m => m.MapsModule)
  },
  {
    path: 'tables',
    loadChildren: () => import('../../tables/tables.module').then(m => m.TablesModule)
  },
  {
    path: 'datatables',
    loadChildren: () => import('../../data-tables/data-tables.module').then(m => m.DataTablesModule)
  },
  {
    path: 'uikit',
    loadChildren: () => import('../../ui-kit/ui-kit.module').then(m => m.UIKitModule)
  },
  {
    path: 'components',
    loadChildren: () => import('../../components/ui-components.module').then(m => m.UIComponentsModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('../../pages/full-pages/full-pages.module').then(m => m.FullPagesModule)
  },
  {
    path: 'cards',
    loadChildren: () => import('../../cards/cards.module').then(m => m.CardsModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('../../chat/chat.module').then(m => m.ChatModule)
  },
  {
    path: 'chat-ngrx',
    loadChildren: () => import('../../chat-ngrx/chat-ngrx.module').then(m => m.ChatNGRXModule)
  },
  {
    path: 'inbox',
    loadChildren: () => import('../../inbox/inbox.module').then(m => m.InboxModule)
  },
  {
    path: 'taskboard',
    loadChildren: () => import('../../taskboard/taskboard.module').then(m => m.TaskboardModule)
  },
  {
    path: 'taskboard-ngrx',
    loadChildren: () => import('../../taskboard-ngrx/taskboard-ngrx.module').then(m => m.TaskboardNGRXModule)
  },
  {
    path: 'generalSettings',
    loadChildren: () => import('../../generalSettings/generalSettings.module').then(m => m.GeneralSettingsModule)
  },
  {
    path: 'smtpSettings',
    loadChildren: () => import('../../smtp-settings/smtp-settings.module').then(m => m.SMTPSettingsModule)
  },
  {
    path: 'customer',
    loadChildren: () => import('../../customer-master/customer-master.module').then(m => m.CustomerMasterModule)
  },
  {
    path: 'vendor',
    loadChildren: () => import('../../vendor-master/vendor-master.module').then(m => m.VendorMasterModule)
  },
  {
    path: 'taxMaster',
    loadChildren: () => import('../../taxMaster/taxMaster.module').then(m => m.TaxMasterModule)
  },
  {
    path: 'purchaseBillBook',
    loadChildren: () => import('../../purchase-bill-book/purchase-bill-book.module').then(m => m.PurchaseBillBookModule)
  },
  {
    path: 'invoice',
    loadChildren: () => import('../../invoice/invoice.module').then(m => m.InvoiceModule)
  },
  {
    path: 'itemSettings',
    loadChildren: () => import('../../itemSettings/item-settings.module').then(m => m.ItemSettingsModule)
  },
  {
    path: 'stockControl',
    loadChildren: () => import('../../stock-control/stock-control.module').then(m => m.StockControlModule)
  },
  {
    path: 'branchMaster',
    loadChildren: () => import('../../branch-master/branch-master.module').then(m => m.BranchMasterModule)
  },
  {
    path: 'purchaseOrder',
    loadChildren: () => import('../../purchase-order/purchase-order.module').then(m => m.PurchaseOrderModule)
  },
  {
    path: 'salesOrder',
    loadChildren: () => import('../../sales-order/sales-order.module').then(m => m.SalesOrderModule)
  },
  {
   path: 'moduleEntries',
   loadChildren: () => import('../../module-entries/module-entries.module').then(m => m.ModuleEntriesModule)
  },
  {
   path: 'buttons',
   loadChildren: () => import('../../buttons/buttons.module').then(m => m.ButtonsModule)
  },
  {
    path: 'industryTypes',
    data: {title : 'my custom data'},
    loadChildren: () => import('../../IndustryTypes/industry-types.module').then(m => m.IndustryTypesModule)
  },
  {
    path: 'jobProfiles',
    loadChildren: () => import('../../job-profiles/job-profiles.module').then(m => m.JobProfilesModule)
  },
  {
    path: 'questionnaires',
    loadChildren: () => import('../../questionnaires/questionnaires.module').then(m => m.QuestionnairesModule)
  },
  {
    path: 'job-roles',
    loadChildren: () => import('../../jobRoles/job-roles.module').then(m => m.JobRolesModule)
  },
  {
    path: 'skills',
    loadChildren: () => import('../../skills/skills.module').then(m => m.SkillsModule)
  },
  {
    path: 'assessment-tests',
    loadChildren: () => import('../../AssessmentTests/assessment-tests.module').then(m => m.AssessmentTestsModule)
  },
  {
    path: 'general-questions',
    loadChildren: () => import('../../generalQuestions/general-question.module').then(m => m.GeneralQuestionModule)
  },
  {
    path: 'securitySettings',
    loadChildren: () => import('../../securitySettings/security-settings.module').then(m => m.SecuritySettingsModule)
  },
  {
    path: 'deviceRegKey',
    loadChildren: ()=> import('../../deviceRegKey/device-reg-key.module').then(m => m.DeviceRegKeyModule)
  },
  {
    path: 'unit',
    loadChildren: () => import('../../measurementUnits/measurement-units.module').then(m => m.MeasurementUnitsModule)
  },
  {
    path: 'unitconv',
    loadChildren: () => import('../../measurementUnitConversion/measurement-unit-conversion.module').then(m => m.MeasurementUnitConversionModule)
  },
  {
    path: 'paymentterm',
    loadChildren: () => import('../../paymentTerms/payment-terms.module').then(m => m.PaymentTermsModule)
  },
  {
    path: 'termcondition',
    loadChildren: () => import('../../termsAndConditions/terms-and-conditions.module').then(m => m.TermsAndConditionsModule)
  },
  {
    path: 'itemgroup',
    loadChildren: () => import('../../itemGroup/item-group.module').then(m => m.MasterModule)
  },
  {
    path: 'servicegroup',
    loadChildren: () => import('../../serviceGroup/service-group.module').then(m => m.ServiceGroupModule)
  },
  {
    path: 'vendorgroup',
    loadChildren: () => import('../../vendorGroup/vendor-group.module').then(m => m .VendorGroupModule)
  },
  {
    path: 'customerGroup',
    loadChildren: () => import('../../customerGroup/customer-group.module').then(m => m.CustomerGroupModule)
  },
  {
    path: 'items',
    loadChildren: () => import('../../item-master/item-master.module').then(m => m.ItemMasterModule)
  },
  {
    path: 'services',
    loadChildren: () => import('../../services/services.module').then(m => m.ServiceGroupModule)
  },
  {
    path: 'spectitle',
    loadChildren: () => import('../../specsLabel/specs-label.module').then(m => m.SpecsLabelModule)
  },
  {
    path: 'specdata',
    loadChildren: () => import('../../specsMaster/specs-master.module').then(m => m.SpecsMasterModule)
  },
  {
    path: 'brands',
    loadChildren: () => import('../../brands/brands.module').then(m => m.BrandsModule)
  },
  {
    path: 'allowded',
    loadChildren: () => import('../../allowanceAndDeduction/allowance-deduction.module').then(m => m.AllowanceDeductionModule)
  },
  {
    path: 'bom',
    loadChildren: () => import('../../billOfMaterial/bill-of-material.module').then(m => m.BillOfMaterialModule)
  },
  {
    path: 'exphead',
    loadChildren: () => import('../../expenseHead/expense-head.module').then(m => m.ExpenseHeadModule)
  },
  {
    path: 'warehouse',
    loadChildren: () => import('../../warehouseMangement/warehouse-management.module').then(m => m.WarehouseManagementModule)
  },
  {
    path: 'itemlocation',
    loadChildren: () => import('../../itemLocation/item-location.module').then(m => m.ItemLocationModule)
  },
  {
    path: 'area',
    loadChildren: () => import('../../areaPincode/area-pincode.module').then(m => m.AreaPincodeModule)
  },
  {
    path: 'statutoryModule',
    loadChildren: ()=> import('../../statutoryModule/statutory-module.module').then(m => m.StatutoryDetailsModule)
  },
  {
    path: 'enquiry',
    loadChildren: () => import('../../enquiry/enquiry.module').then(m => m.EnquiryModule)
  },
  {
    path: 'itemservreq',
    loadChildren: () => import('../../itemServiceRequest/item-service-request.module').then(m => m.ItemServiceRequestModule)
  },
  {
    path: 'estimation',
    loadChildren: () => import('../../estimation/estimation.module').then(m => m.EstimationModule)
  },
  {
    path: 'followup',
    loadChildren: () => import('../../followup/follow-up.module').then(m => m.FollowUpModule)
  },
  {
    path: 'saletarget',
    loadChildren: () => import('../../saleTarget/sale-target.module').then(m => m.SaleTargetModule)
  },
  {
    path: 'saleOrder',
    loadChildren: () => import('../../sales-order/sales-order.module').then(m => m.SalesOrderModule)
  },
  {
    path: 'proformaInvoices',
    loadChildren: () => import('../../proformaInvoices/proforma-invoices.module').then(m => m.ProformaInvoicesModule)
  },
  {
    path: 'taxInvoices',
    loadChildren: () => import('../../TaxInvoices/tax-invoices.module').then(m => m.TaxInvoicesModule)
  },
  {
    path: 'saleSchemes',
    loadChildren: () => import('../../saleSchemes/sale-schemes.module').then(m => m.SaleSchemesModule)
  },
  {
    path: 'jobPosting',
    loadChildren: () => import('../../jobPostings/job-postings.module').then(m => m.JobPostingsModule)
  },
  {
    path: 'interview',
    loadChildren: () => import('../../interview/interview.module').then(m => m.InterviewModule)
  },
  {
    path: 'company',
    loadChildren: () => import('../../company/company.module').then(m => m.CompanyModule)
  },
  {
    path: 'branch',
    loadChildren: () => import('../../branch/branch.module').then(m => m.BranchModule)
  },
  {
    path: 'candidatesApplications',
    loadChildren: () => import('../../candidates-applications/candidates-application.module').then(m => m.CandidatesApplicationModule)
  }
];
