import React from "react"
import logo from "../../../static/logo_transparent.png"

export type HeaderProps = {
  title: string
  subtitle: string
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <nav
      className="navbar has-background-grey-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <p className="mt-2">
          <span className="title has-text-white-ter has-text-weight-normal is-3 ml-2">
            {title}
          </span>
          <span className="subtitle has-text-white-ter is-5 ml-2">
            {subtitle}
          </span>
        </p>
      </div>
    </nav>
  )
}
