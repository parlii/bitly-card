# Bitly Card

Created for the Bitly hack week in June 2022 by Parli, Jimmy, and Colin.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## About the Project

Bitly Card is a greenfield app for users to input a destination URL, generate a short link, and then display a beautiful customized page for sharing the link.

### Technology

- [React 18](https://reactjs.org/) and [Next.js 12.2](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vercel](https://vercel.com/)
- Sass + [Bootstrap](https://getbootstrap.com/)
- [html-to-image](https://www.npmjs.com/package/html-to-image)
- [Haversack](https://www.npmjs.com/package/haversack)
- [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [Husky](https://typicode.github.io/husky/#/), [lint-staged](https://github.com/okonet/lint-staged) as the development stack

## Development

First, clone the project to your local machine, then set up the dependencies.

```bash
npm i
```

Now you can run your local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Please create a new branch (roughly following the Bitly workflow guidelines) for working on features.

### API Credentials

This project needs an environment variable called `BITLY_ACCESS_TOKEN` to shorten links in local. Create a file called `.env.local` at the project root and fill it with the following:

```env
BITLY_ACCESS_TOKEN=your-access-token
BITLY_DEFAULT_GROUP_GUID=your-group-guid
```

You can generate an access token from the [Developer settings](https://app.bitly.com/settings/api/) in your Bitly account.

Make sure to not commit your `.env` files.

## Deploys

This project is connected to a Vercel deployment, and each push will receive a preview URL to view the app. The `main` branch is considered "Production" and will be deployed to [https://bitly-card.vercel.app/](https://bitly-card.vercel.app/).
