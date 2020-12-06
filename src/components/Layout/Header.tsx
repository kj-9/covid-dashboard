import React from "react"

export type HeaderProps = {
  title: string
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <nav
      className="navbar has-background-grey-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <div className="mt-3">
          <span className="title has-text-white-ter has-text-weight-normal is-4 ml-2">
            {title}
          </span>
        </div>
      </div>
    </nav>
  )
}
