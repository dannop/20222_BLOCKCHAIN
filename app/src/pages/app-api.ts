import { postReq } from "../services/api";

export const session = {
  login:             async (body: string) => { return await postReq('login', 'sessao/login', body, false) },
  recovery_password: async (body: string, email: string) => { return await postReq('login', `sessao/RecuperarSenha/${email}`, body, false) },
}
