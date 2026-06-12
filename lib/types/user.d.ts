import { User } from "..";
import { IEmployee } from "../data/staff";

export interface UserProps {
  id: string;
  staff_id: string;
  username: string;
  is_active: boolean;
  is_super_admin: boolean;
  role_template_label: null;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  must_change_password: boolean;
  staff: IEmployee & { details: { fullname: string } };
  permissions: any[];
}

export interface AccessibleApp {
  id: string;
  name: string;
  app_code: string;
  portal_url: string;
  icon_url: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  order: number;
  pivot: Pivot;
}

export interface Pivot {
  user_id: string;
  registered_app_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface IEmployee {
  id: string;
  nip: string;
  dpack_sales_code: null;
  biodata: Biodata;
  legal_documents: LegalDocuments;
  education: Education;
  social_media: SocialMedia;
  emergency_contact: EmergencyContact;
  employment_data: EmploymentData;
  bank_info: BankInfo;
  files: Files;
  trainings: Training[];
  work_histories: WorkHistory[];
  user_account: User;
  accessible_apps: AccessibleApp[];
  superior: {
    id: string;
    details: {
      fullname: string;
      position: PositionProps;
      department: DepartmentProps;
      photo_path: string;
    };
  };
}

export interface BankInfo {
  bank_name: null;
  bank_branch: null;
  bank_account_number: null;
}

export interface Training {
  id: string;
}
export interface WorkHistory {
  id: string;
}

export interface Biodata {
  fullname: string;
  nik: null | string;
  email: null;
  phone: null;
  gender: null | string;
  religion: null | string;
  marital_status: null;
  blood_type: null;
  birth_place: null | string;
  birth_date: Date | null;
  address: Address;
  family: Family;
}

export interface Address {
  ktp_address: null;
  home_address: null;
}

export interface Family {
  dependency_count: number;
  dependency_details: null;
}

export interface Education {
  latest_education: null;
  latest_education_major: null;
  latest_education_graduation_year: null;
  latest_education_university: null;
  academic_degree: null;
}

export interface EmergencyContact {
  name: null;
  relationship: null;
  phone: null;
  address: null;
}

export interface EmploymentData {
  join_date: Date | null;
  is_shift_worker: boolean;
  branch: {
    id: string;
    name: string;
  };
  area: {
    id: string;
    name: string;
  };
  sub_area: {
    id: string;
    name: string;
  };
  grade: {
    id: string;
    name: string;
    level: string;
  };
  neq: {
    id: string;
    name: string;
  };
  employment_status: EmploymentStatusProps;
  department: DepartmentProps;
  position: PositionProps;
}

export interface Files {
  photo_path: null;
  signature_path: null;
  id_card_photo_path: null | string;
  latest_education_certificate_path: null;
  resume_path: null;
}

export interface LegalDocuments {
  npwp: null;
  bpjs_kesehatan: null;
  bpjs_kesehatan_mandiri: null;
  bpjs_ketenagakerjaan: null;
  bpjs_ketenagakerjaan_mandiri: null;
  driver_license_number: null;
  driver_license_type: null;
}

export interface SocialMedia {
  facebook: null;
  twitter: null;
  instagram: null;
  linkedin: null;
}
