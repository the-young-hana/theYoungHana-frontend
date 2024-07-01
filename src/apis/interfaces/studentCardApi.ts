export interface studentCardApi {
  getStudentCard(): Promise<DataResponseType<StudentCardType>>;
  getStudentQR(): Promise<DataResponseType<{ qrImage: string }>>;
}
