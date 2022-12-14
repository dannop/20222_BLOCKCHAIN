import { LayoutProps } from "../../../types";

import Header from "../../header";

import navigation from '../../../router/navigation'

const NavLayout = (props: LayoutProps) => {
    const { children } = props;

    return (
      <div>
          {/* <Header menuItems={navigation} /> */}
          {children}
      </div>
    )
  }
  
  export default NavLayout