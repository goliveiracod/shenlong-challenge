export interface ICreateUserTravelerDTO {
  id: string;
  nickname: string;
  email: string;
  password: string;
  planet_id?: string;
  avatar?: string;
}
