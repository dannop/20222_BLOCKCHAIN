import DefaultBtn from "../../../components/default-btn";

export default function LandingPage(props: any){
  return (
    <div className="container">
      <h1>Bem Vindo</h1>
      <DefaultBtn onClick={() => props.history.push('sign-in')}>Entrar</DefaultBtn>
    </div>
  );
}