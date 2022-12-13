import { useContext, useEffect } from "react";

import LoaderContext from "../../../context/loader";

import CardLink from "./components/card-link";

const InitalDocsPage = () => {
  const { setLoading } = useContext(LoaderContext);

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  return (
    <section className="py-lg">
      <div className="container">
        <div className="row mb-lg">
          <div className="col-3">
            <CardLink 
              link='/docs/typography'
              title='Typographies'
              description="All typographies styles"
            />
          </div>
          <div className="col-3">
            <CardLink 
              link='/docs/buttons'
              title='Buttons'
              description="All buttons styles"
            />
          </div>
          <div className="col-3">
            <CardLink 
              link='/docs/forms'
              title='Forms'
              description="All form input styles"
            />
          </div>
          <div className="col-3">
            <CardLink 
              link='/docs/form-validations'
              title='Form Validations'
              description="All form validation types"
            />
          </div>
        </div>

        <p className="body-md">Inserir aqui um README bem bacana!</p>
      </div>
    </section>
  );
}

export default InitalDocsPage;