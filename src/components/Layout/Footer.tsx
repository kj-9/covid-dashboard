import React from "react"

export const Footer: React.FC<{}> = () => {
  return (
    <footer className="footer">
      <div className="content">
        <h2 className="subtitle is-4">データソース</h2>
        <ul>
          <li>
            <a
              href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000164708_00001.html"
              className="href"
            >
              厚生労働省報道資料
            </a>
          </li>
          <li>
            <a href="https://github.com/kaz-ogiwara/covid19" className="href">
              こちらのGithubレポジトリ
            </a>
            <a
              href="https://www.stopcovid19.jp/data/covid19japan-all.json"
              className="href"
            ></a>
            のデータを利用させていただいております
          </li>
        </ul>
      </div>
    </footer>
  )
}
