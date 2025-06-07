
export interface AttendanceRecord {
  id: string;
  classId: number;
  studentId: number;
  studentName: string;
  studentEmail: string;
  present: boolean;
  date: string;
  time: string;
}

export interface ClassAttendance {
  classId: number;
  className: string;
  date: string;
  time: string;
  instructor: string;
  location: string;
  records: AttendanceRecord[];
  totalStudents: number;
  presentStudents: number;
}
