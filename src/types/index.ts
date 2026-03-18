export type Employee = {
  employeesId: number;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  status: string;
  title: string;
};

export type Option = {
  pretasksCheckboxOptionsId: number;
  name: string;
  type: string;
  description: string;
};

export type Job = {
  jobsId: number | null;
  number: string;
  type: string;
  name: string;
  address: string;
  contractor: string;
  contact: string;
  status: string;
};

export type Activity = {
  activitiesId: number | null;
  activity: string;
  hazards: string;
  controls: string;
};

export type PretaskOption = {
  pretasksOptionsId: number | null;
  pretasksCheckboxOptionsId: number;
  other: string;
};

export type Signature = {
  temporalId: string;
  ptSignaturesId: number;
  employeesId: number;
  imgData: string | null;
};

export type HazardReport = {
  preTasksId: number | null;
  jobsId: number;
  userName: string;
  date: string;
  supervisor: string;
  comment: string;
  activities: Activity[];
  options: PretaskOption[];
  signatures: Signature[];
};

export type User = {
  id: number;
  fullName: string;
  email: string;
  roles: Role[];
};

export type Role = {
  id: number;
  name: string;
};
