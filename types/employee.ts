export interface Employee {
  phoneNumber: ReactNode;
  email: ReactNode;
  _id: string;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  salary?: number;
  isActive: boolean;
  hiredAt: string;
  status: "active" | "terminated" | "resigned" | "retired";
  statusUpdatedAt: string;
}
