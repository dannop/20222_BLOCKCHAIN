import { LayoutProps } from "../../../../types";

const AuthLayout = ({children}: LayoutProps) => {

  return (
    <div className="container">
        <div className="d-flex flex-column align-items-center">
            <div className="col-6">
              <div className='d-flex flex-column align-items-center pb-xhuge'>
                {children}
              </div>
            </div>
        </div>
    </div>
  );
}

export default AuthLayout;