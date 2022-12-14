import { postReq } from "../../services/api";

export const auth = {
  login:             async (body: any) => { return await postReq('login', 'login', JSON.stringify(body), false) },
  register:          async (body: any) => { return await postReq('register', 'register', JSON.stringify(body), false) }
}
