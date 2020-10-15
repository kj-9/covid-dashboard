import React from "react"

export type HeaderProps = {
  title: string
  subtitle: string
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <section className="hero is-link is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">{title}</h1>
          <h2 className="subtitle">{subtitle}</h2>
        </div>
      </div>
    </section>
  )
}
