import React from "react"

export const Footer: React.FC<{}> = () => {
  return (
    <footer className="footer mt-2">
      <div className="content">
        本Webサイトはオープンソースです。ソースコードを
        <a href="https://github.com/kj002/covid-dashboard" className="href">
          Github
        </a>
        で公開しています。
      </div>
    </footer>
  )
}
