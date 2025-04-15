import { FC, PropsWithChildren } from "react"
import NavBarComponent from "./navbar/NavbarComponent"
import FooterComponent from "./footer/FooterComponent"

const Layout: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
    return (
        <div>
            <NavBarComponent />
            <div>
                {children}
            </div>
            <FooterComponent />
        </div>
    )
}

export default Layout