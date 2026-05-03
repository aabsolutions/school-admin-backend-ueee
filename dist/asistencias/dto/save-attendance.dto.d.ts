export declare class AttendanceEntryDto {
    studentId: string;
    status?: string;
    note?: string;
}
export declare class SaveAttendanceDto {
    cursoLectivoId: string;
    date: string;
    records: AttendanceEntryDto[];
}
