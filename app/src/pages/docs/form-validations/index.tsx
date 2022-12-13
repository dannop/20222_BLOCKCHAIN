import { Link } from "react-router-dom";
import ChangeValidationForm from "./components/onchange-validation";
import ResponseValidationForm from "./components/response-validation";
import SubmitValidationForm from "./components/submit-validation";

const FormValidationsPage = () => {
    
    const chevron_left = (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.7912 11.005H7.62124L12.5012 6.12498C12.8912 5.73498 12.8912 5.09498 12.5012 4.70498C12.1112 4.31498 11.4812 4.31498 11.0912 4.70498L4.50124 11.295C4.11124 11.685 4.11124 12.315 4.50124 12.705L11.0912 19.295C11.4812 19.685 12.1112 19.685 12.5012 19.295C12.8912 18.905 12.8912 18.275 12.5012 17.885L7.62124 13.005H18.7912C19.3412 13.005 19.7912 12.555 19.7912 12.005C19.7912 11.455 19.3412 11.005 18.7912 11.005Z" fill="#881477"/>
      </svg>
    )

    return (
      <section className="py-lg">
        <div className="container">
            <Link className="text-link d-flex mb-xsm" to='/docs'>
              {chevron_left} 
              <span className="ml-xxsm">back</span>
            </Link>
            <h1 className="heading-lg mb-huge">Form Validations</h1>

            <div className="row">
              <div className="col-6">
                <div className="card mb-lg box-shadow border-0">
                  <div className="p-lg">
                    <SubmitValidationForm />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card mb-lg box-shadow border-0">
                  <div className="p-lg">
                    <ResponseValidationForm />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card mb-lg box-shadow border-0">
                  <div className="p-lg">
                    <ChangeValidationForm />
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>
    )
}
  
export default FormValidationsPage