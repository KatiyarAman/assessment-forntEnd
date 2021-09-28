import { Role } from './role';
import { accessRoles } from './accessroles';

export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: Role;
    status: number;
    isExpirable: boolean;
    expiryDate: string;
    emailAddress: String;
    contactNumber: number;
    roleId: number;
    userType?: accessRoles;
    token?: string;
    createdDate: string;
    createdBy: number;
    createdByUser?: User;
    modifiedDate: string;
    modifiedBy: number;
    modifiedByUser? : User
  }