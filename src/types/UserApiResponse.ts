export interface UserApiResponse<T extends boolean> {
  success: T
  data: T extends true ? string : void
}
