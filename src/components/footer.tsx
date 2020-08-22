import React from 'react';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="content">
                <h2 className="subtitle is-4">データソース</h2>
                <ul type="1">
                    <li><a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000164708_00001.html" className="href">厚生労働省報道資料</a></li>
                    <li><a href="https://www.stopcovid19.jp/" className="href">stopcovid19.jp</a>提供の<a href="https://www.stopcovid19.jp/data/covid19japan-all.json" className="href">API</a>を利用させていただいております</li>
                </ul>
            </div>
        </footer>
    )

}