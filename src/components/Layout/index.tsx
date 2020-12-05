import React from "react"
import { Header, HeaderProps } from "./Header"
import { Footer } from "./Footer"
import { SEO } from "./SEO"

type LayoutProps = {
  headerProps: HeaderProps
}

const Layout: React.FC<LayoutProps> = ({ headerProps, children }) => {
  return (
    <>
      <SEO />
      <Header {...headerProps} />
      <hr className="m-0" />
      <div className="container ml-1 mt-4">{children}</div>
      <Footer />
    </>
  )
}

export default Layout
