export interface FacultyCoordinator {
  name: string;
  designation: string;
  phone: string;
  email: string;
}

export interface StudentCoordinator {
  name: string;
  role: string;
  phone: string;
  email: string;
  linkedin?: string;
}

export const FACULTY_COORDINATORS: FacultyCoordinator[] = [
  {
    name: "Dr.D.Pravin kumar",
    designation: "Event Coordinator, CSE Dept.",
    phone: "+91 97894 12345",
    email: "pravinkumar@klnce.edu"
  },
  {
    name: "Mr. A. Alagar",
    designation: "Faculty Coordinator, CSE Dept.",
    phone: "+91 94420 99881",
    email: "alagar@klnce.edu"
  },
  {
    name: "Ms.R.Nivethitha",
    designation: "Faculty Coordinator, CSE Dept.",
    phone: "+91 98421 88990",
    email: "nivethitha@klnce.edu"
  },
  {
    name: "Mrs. A. Nazmunisa",
    designation: "Faculty Coordinator, CSE Dept.",
    phone: "+91 94435 01234",
    email: "nazmunisa@klnce.edu"
  }
];

export const STUDENT_COORDINATORS: StudentCoordinator[] = [
  {
    name: "Inbasekaran C",
    role: "Student President",
    phone: "+91 7604996450",
    email: "zeigen2k26@gmail.com",
    linkedin: "https://linkedin.com/in/inbasekaran"
  },
  {
    name: "Shahana R",
    role: "Secretary",
    phone: "+91 97865 12345",
    email: "shahana.zeugen26@gmail.com",
    linkedin: "https://linkedin.com/in/shahana"
  },
  {
    name: "Priyadharshini SH",
    role: "Treasurer",
    phone: "+91 96554 87654",
    email: "priyadharshini.zeugen26@gmail.com",
    linkedin: "https://linkedin.com/in/priyadharshini"
  },
  {
    name: "Suriya Vijay MB",
    role: "Student Coordinator",
    phone: "+91 98765 00001",
    email: "suriyavijay.zeugen26@gmail.com"
  },
  {
    name: "Reshmi NRJ",
    role: "Student Coordinator",
    phone: "+91 98765 00002",
    email: "reshmi.zeugen26@gmail.com"
  },
  {
    name: "Jayabalajivel R",
    role: "Student Coordinator",
    phone: "+91 98765 00003",
    email: "jayabalajivel.zeugen26@gmail.com"
  }
];
