export interface studentCardApi {
  getStudentCard(): Promise<DataResponseType<StudentCardType>>;
}
