import React from "react"

export const Footer: React.FC<{}> = () => {
  return (
    <footer className="footer">
      <div className="content">
        <h2 className="subtitle is-4">データソース</h2>
        <ul>
          <li>
            患者数は
            <a
              href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000164708_00001.html"
              className="href"
            >
              厚生労働省報道資料
            </a>
            より。データ取得に
            <a href="https://github.com/kaz-ogiwara/covid19" className="href">
              こちら
            </a>
            のGithubレポジトリを利用させて頂いています。
          </li>
          <li>
            本Webサイトはオープンソースです。ソースコードを
            <a href="https://github.com/kj002/covid-dashboard" className="href">
              Github
            </a>
            で公開しています。
          </li>
        </ul>
      </div>
    </footer>
  )
}
