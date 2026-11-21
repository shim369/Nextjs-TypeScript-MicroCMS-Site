# NEXT BASE

[English](./README.md)

**Next.js 16（App Router）**・**TypeScript**・**microCMS**・**GSAP** で制作したポートフォリオサイトです。

**公開URL:** https://nextbase-gsap.vercel.app/

## 主な機能

- **Cache Components**: microCMS のデータを `'use cache'`・`cacheLife`・`cacheTag` でキャッシュし、静的HTMLとして配信
- **即時反映**: microCMS の Webhook から `/api/revalidate` を呼び、`revalidateTag` でキャッシュを無効化
- **Server Action のお問い合わせフォーム**: `useActionState` + nodemailer（Gmail）。reCAPTCHA v3 は任意
- **スクロールアニメーション**: GSAP + ScrollTrigger（`@gsap/react` の `useGSAP`）。ローダー、文字分割の見出し、ブログの横スクロール、パララックス
- **ブログ**: カテゴリで絞り込める記事一覧、目次と読了時間つきの記事ページ
- **メタデータ**: Metadata API、`next/og` で生成する OG 画像、`sitemap.xml`、`robots.txt`
- **React Compiler**、型付きルート、`next/font`、`next/image`
- **SCSS** を abstracts / base / components / pages に分割

## セットアップ

Node.js 24 が必要です。

```bash
npm install
cp .env.example .env.local   # 値を設定
npm run dev
```

http://localhost:3000 を開きます。

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバー |
| `npm run build` | 本番ビルド |
| `npm run start` | 本番ビルドの起動 |
| `npm run lint` | ESLint |
| `npm run typecheck` | 型チェック |

## 環境変数

| 変数 | 必須 | 内容 |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | – | メタデータ・サイトマップに使う公開URL |
| `MICROCMS_SERVICE_DOMAIN` | ✓ | microCMS のサービスドメイン |
| `MICROCMS_API_KEY` | ✓ | microCMS の API キー |
| `MICROCMS_WEBHOOK_SECRET` | – | 再検証用 Webhook のシークレット |
| `CONTACT_TO_EMAIL` | ✓ | お問い合わせの送信先 |
| `SMTP_HOST` / `SMTP_PORT` | – | 既定値は `smtp.gmail.com` / `465` |
| `SMTP_USER` / `SMTP_PASS` | ✓ | SMTP アカウント（Gmail はアプリパスワード） |
| `RECAPTCHA_SECRET_KEY` | – | reCAPTCHA v3 のシークレットキー（空なら検証しない） |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | – | reCAPTCHA v3 のサイトキー |

## microCMS

API エンドポイント: `blogs`（リスト形式）

| フィールドID | 種類 |
| --- | --- |
| `title` | テキストフィールド |
| `content` | リッチエディタ |
| `eyecatch` | 画像 |
| `category` | コンテンツ参照（`name` フィールドを持つ API） |

### Webhook（任意）

microCMS 管理画面の **API設定 → Webhook → カスタム通知** に次を登録します。

- URL: `https://<your-domain>/api/revalidate`
- シークレット: `MICROCMS_WEBHOOK_SECRET` と同じ値

Webhook を設定しない場合も、約1分ごとに最新の内容へ更新されます。

## ディレクトリ構成

```
app/
  layout.tsx            ルートレイアウト（フォント・メタデータ・ヘッダー）
  template.tsx          ページ遷移ごとに作り直す部分（フッター・スクロール演出）
  page.tsx              トップ
  articles/             記事一覧・記事詳細
  actions/contact.ts    お問い合わせの Server Action
  api/revalidate/       microCMS の Webhook
  opengraph-image.tsx   OG 画像の生成
  sitemap.ts, robots.ts
components/             UI コンポーネント（home/, blog/, motion/）
lib/                    microCMS クライアント、GSAP 設定、ヘルパー
styles/                 SCSS（abstracts, base, components, pages）
public/img/             画像
```

## 姉妹サイト

- [NUXT BASE](https://nuxtbase-gsap.vercel.app/)
- [GATSBY BASE](https://gatsbybase.vercel.app/)
- [ASTRO BASE](https://astrobase.vercel.app/)
