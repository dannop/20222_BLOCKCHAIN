import { LayoutProps } from "../../../types";

import './style.scss';

const BlankLayout = ({children}: LayoutProps) => {
  return (
    <div className="blank-layout-wrapper d-flex flex-column align-items-center justify-content-center">
      {children}
    </div>
  )
}

export default BlankLayout