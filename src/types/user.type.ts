export default interface IUser {
  id?: any | null,
  username?: string | null,
  firstname?: string,
  lastname?: string,
  email?: string,
  password?: string,
  roles?: Array<string>
}