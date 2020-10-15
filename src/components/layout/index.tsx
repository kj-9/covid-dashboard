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
      {children}
      <Footer />
    </>
  )
}

export default Layout
