# NEXT BASE

Next.js（Pages Router）+ TypeScript + microCMS + GSAP で制作したポートフォリオサイト。

## セットアップ

```bash
npm install
cp .env.example .env.local   # 値を設定
npm run dev
```

### 環境変数

| 変数 | 用途 |
| --- | --- |
| `MICROCMS_SERVICE_DOMAIN` / `MICROCMS_API_KEY` | microCMS（エンドポイント `blogs`） |
| `CONTACT_TO_EMAIL` / `SMTP_*` | お問い合わせメール送信（`pages/api/contact.ts`、Gmailはアプリパスワード） |
| `RECAPTCHA_SECRET_KEY` / `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v3（任意。未設定なら検証をスキップ） |

## microCMS のスキーマ（`blogs`）

`title`（テキスト）/ `content`（リッチエディタ）/ `eyecatch`（画像）/ `category`（コンテンツ参照・`name` を持つ）

## 構成

- `pages/index.tsx` … トップ（Hero / About / Skills / Blog横スクロール / Contact）
- `pages/articles/index.tsx` … 記事一覧
- `pages/articles/[id].tsx` … 記事詳細（ISR 60秒・`fallback: 'blocking'`）
- `pages/api/contact.ts` … フォーム送信（nodemailer）
- `components/` … 共通コンポーネント / `hooks/useSiteAnimations.ts` … 共通スクロールアニメーション
