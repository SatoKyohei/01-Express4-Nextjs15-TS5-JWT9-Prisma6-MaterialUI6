## 写経
- 今回は写経ではないためURLなし


<br/>
<br/>

## 成果物
- 未デプロイ

<br/>
<br/>

## 技術スタック
◯ フロントエンド
  - フレームワーク/ライブラリ
    - Next.js 15.1.3
    - React 19.0.0
    - React DOM 19.0.0
    - TypeScript 5.x
  - UIライブラリ/スタイリング
    - Material-UI (MUI) 6.3.0
    - MUI Icons 6.3.0
    - Emotion/react 11.14.0
    - Emotion/styled 11.14.0
  - フォーム/バリデーション
    - React Hook Form 7.54.2
    - Zod 3.24.1
    - Hookform/resolvers 3.9.1
  - 状態管理/ユーティリティ
    - js-cookie 3.0.5
  - 開発ツール
    - ESLint 9.17.0
    - Prettier 3.4.2

◯ バックエンド
  - ランタイム/フレームワーク
    - Express 4.21.2
    - TypeScript 5.7.2
  - データベース関連
    - Prisma 6.1.0
    - @prisma/client 6.1.0
  - 認証/セキュリティ
    - jsonwebtoken 9.0.2
    - bcryptjs 2.4.3
  - ミドルウェア/ユーティリティ
    - cors 2.8.5
    - cookie-parser 1.4.7
    - dotenv 16.4.7
  - 開発ツール
    - nodemon 3.1.9
    - ts-node 10.9.2
    - ESLint 9.17.0
    - Prettier 3.4.2
    - typescript-eslint 8.18.2

<br/>
<br/>

## 実行したコマンド（順不同）
- npm run seed
- npm install bcryptjs jsonwebtoken @types/bcryptjs @types/jsonwebtoken
- npm install -D eslint eslint-plugin-prettier eslint-config-prettier prettier eslint-plugin-import eslint-plugin-react
- npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
- npm i cors @types/cors
- npm i react-hook-form zod @hookform/resolvers
- npm i js-cookie @types/js-cookie
- npm i cookie-parser @types/cookie-parser

<br/>
<br/>

## 学べる／学んだ点
- JWT/bcryptによる認証の実装
- フロントエンドからの認証リクエスト実装（cookieなど）
- グローバルステートの実装&利用方法（createContext、Providerなど）
- Material UIによるUI実装
- ESLint
  - tsParser：TypeScriptをESLintが解析する際に必須のパーサー
  - typescriptEslint：@typescript-eslint/ から始まるルール設定時に必須
- ルートハンドラーの定義でなぜか型エラーを起こす
  - expressと@types/expressのメジャーバージョンが合ってないのが原因だった。
- bcryptの実行が失敗。bcryptjsであれば問題ないとのこと。Chatgpt「bcryptライブラリのネイティブバイナリが現在の実行環境と互換性がない場合に発生します。」
・Next.jsの.envファイルでは、プレフィックスとしてNEXT_PUBLIC_をつけないと読み込まれない仕様。

<br/>
<br/>

## 使用した外部サービス
- なし

<br/>
<br/>

## 他
- 細かい実装は行なっていない。あくまで簡易的な部分のみ。
- ハイドレーションエラーがuse clientで解消したが、本当の意味で理解できていない気がする。

