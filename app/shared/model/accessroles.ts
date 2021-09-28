import { privilages } from './privilages';

export class accessRoles {
    id: number;
    roleName: string;
    parentRole: accessRoles;
    privilages: privilages;
    createdDate: string;
    createdBy: number;
    modifiedDate: string;
    modifiedBy: number;
  }