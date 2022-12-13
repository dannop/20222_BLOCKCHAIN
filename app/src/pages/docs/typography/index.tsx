import { Link } from "react-router-dom"

const TypographyPage = () => {
    const chevron_left = (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.7912 11.005H7.62124L12.5012 6.12498C12.8912 5.73498 12.8912 5.09498 12.5012 4.70498C12.1112 4.31498 11.4812 4.31498 11.0912 4.70498L4.50124 11.295C4.11124 11.685 4.11124 12.315 4.50124 12.705L11.0912 19.295C11.4812 19.685 12.1112 19.685 12.5012 19.295C12.8912 18.905 12.8912 18.275 12.5012 17.885L7.62124 13.005H18.7912C19.3412 13.005 19.7912 12.555 19.7912 12.005C19.7912 11.455 19.3412 11.005 18.7912 11.005Z" fill="#881477"/>
      </svg>
    )

    return (
      <section className="py-lg">
        <div className="container">
            <Link className="text-link mb-xsm" to='/docs'>
              {chevron_left} 
              <span className="ml-xxsm">back</span>
            </Link>
            <h1 className="heading-lg mb-huge">Typography</h1>

            <div className="row">
              <div className="col-6">
                <h2 className="display-lg mb-lg">Display Large</h2>
                <h2 className="display-md mb-lg">Display Medium</h2>
                <h2 className="display-sm mb-xlg">Display Small</h2>

                <h3 className="heading-lg mb-md">Heading Large</h3>
                <h3 className="heading-md mb-md">Heading Medium</h3>
                <h3 className="heading-sm mb-xlg">Heading Small</h3>

              </div>
              <div className="col-6">
                <h4 className="subtitle-lg mb-sm">Subtitle Large</h4>
                <h4 className="subtitle-md mb-xlg">Subtitle Medium</h4>
                
                <p className="body-lg mb-md">Body Large</p>
                <p className="body-md mb-md">Body Medium</p>
                <p className="body-sm mb-md">Body Small</p>
                <p className="body-xsm mb-xlg">Body XSmall</p>

                <label className="label-lg d-block mb-lg">Label Large</label>
                <label className="label-md d-block mb-lg">Label Medium</label>
                <label className="label-sm d-block">Label Small</label>
              </div>
            </div>

        </div>
      </section>
    )
  }
  
  export default TypographyPage