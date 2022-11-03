---
title: Installation
description: How to install and setup the framework, you will have a decoupled wordpress/next.js app in no time.
---

This framework has a front-end and back-end setup. The frontend is a Next.js app that uses ApolloClient to fetch data from the backend. The backend is a WordPress site that uses the WPGraphQL plugin to expose data to the frontend.

---

## Back-end setup

I have developed a plugin for your wordpress backend that perfectly integrates with this framework. It is called headlesswp-plugin-starter. You can download the plugin from the repository. [headlesswp starter plugin](http://https://github.com/ErwinWijnveld/headlesswp-plugin-starter 'headlesswp starter plugin')

### Installing all the plugins

You will need to install the required plugins for this to work. You can do this by going to the plugins page in your WordPress admin and installing all the plugins from the plugin pack located in the frontend repo at `docs/pluginpack.zip`.

- ACF Content Analysis voor Yoast SEO
- Add WPGraphQL SEO
- Advanced Custom Fields PRO
- Classic Editor
- Gravity Forms
- Headless WP Email Settings
- Jetpack
- SVG Support
- WP GraphQL
- WPGraphQL CORS
- WPGraphQL for Advanced Custom Fields
- WPGraphQL for Gravity Forms
- WPGraphQL JWT Authentication
- Yoast SEO

### Configuring Wordpress

- Go to Settings > Permalinks and set your permalinks to "Post name"
- Go to Settings > General and set your site url to `https://headlesswpstarter.com` (or whatever your frontend url is)
- Go to Settings > WPGraphQL > Settings > cors and set the allowed origins to `http://localhost:3000` (or whatever your development/frontend url is)
- Go to Settings > WPGraphQL > Settings > cors and check the following boxes: `Send site credentials.`, `Add Site Address to "Access-Control-Allow-Origin" header`, `Enable login mutation`, `Enable logout mutation`.
- Go to Settings > WPGraphQL > Settings > cors and set the `Extend "Access-Control-Allow-Headers` to `content-type`.

## Front-end setup

### Clone the repo

First you will need to clone the repo:

```bash
git clone https://github.com/ErwinWijnveld/headlesswp-nextjs-starter.git
```

Then you will need to install the dependencies, we decided to use yarn for this project:

```bash
yarn install
```

{% callout type="warning" title="Oh no! Something bad happened!" %}
You got an error when running `yarn install`. This is probably because your node version is too old. Please upgrade to the latest supported version of node and try again.
{% /callout %}

### Set up environment variables

Copy the `.env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Then open `.env.local` and set `WORDPRESS_API_URL` and `NEXT_PUBLIC_WORDPRESS_URL` to be the URL to your GraphQL endpoint in WordPress. For example: `https://mywordpressinstallationurl.com/graphql`.

Your `.env.local` file should look like this:

```bash
WORDPRESS_API_URL=https://mywordpressinstallationurl.com/graphql

NEXT_PUBLIC_WORDPRESS_URL=https://mywordpressinstallationurl.com/graphql
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000

# Only required if you want to enable preview mode
# WORDPRESS_AUTH_REFRESH_TOKEN=
# WORDPRESS_PREVIEW_SECRET=

# Only required if you want to use google analytics
# NEXT_PUBLIC_GOOGLE_ANALYTICS=

```

## Add authentication

**This step is optional.** By default, the blog will work with public posts, pages and projects from your WordPress site. Private content such as unpublished posts and private fields cannot be retrieved. To have access to unpublished posts you'll need to set up authentication.

To add a [WPGraphQL JWT plugin](https://github.com/wp-graphql/wp-graphql-jwt-authentication) secret to your wordpress installation you go to `Website Settings > General -> GRAPHQL JWT AUTH SECRET KEY` and [add the generated auth token.](https://api.wordpress.org/secret-key/1.1/salt/)

> You can read more about this in the documentation for [WPGraphQL JWT Authentication](https://docs.wpgraphql.com/extensions/wpgraphql-jwt-authentication/).

Now, you need to get a **refresh token** to make authenticated requests with GraphQL. Make the following GraphQL mutation to your WordPress site from the GraphQL IDE (See notes about WPGraphiQL from earlier). Replace `your_username` with the **username** of a user with the `Administrator` role, and `your_password` with the user's password.

```graphql
mutation Login {
  login(
    input: {
      clientMutationId: "uniqueId"
      password: "your_password"
      username: "your_username"
    }
  ) {
    refreshToken
  }
}
```

Copy the `refreshToken` returned by the mutation, then open `.env.local`, and make the following changes:

- Uncomment `WORDPRESS_AUTH_REFRESH_TOKEN` and set it to be the `refreshToken` you just received.
- Uncomment `WORDPRESS_PREVIEW_SECRET` and set it to be any random string (ideally URL friendly).

Your `.env.local` file should look like this:

```bash
WORDPRESS_API_URL=https://mywordpressinstallationurl.com/graphql

NEXT_PUBLIC_WORDPRESS_URL=https://mywordpressinstallationurl.com/graphql
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000

# Only required if you want to enable preview mode
WORDPRESS_AUTH_REFRESH_TOKEN=%mXqnx>A,hb~st!Ce 3SWdcvwPdX=$bDY^-oYE4KJ5Q+KgR:h?JcI:}}6>iCE;#
WORDPRESS_PREVIEW_SECRET=HeadlessPreviewSecret

# Only required if you want to use google analytics
# NEXT_PUBLIC_GOOGLE_ANALYTICS=
```

**Important:** Restart your Next.js server to update the environment variables.

## Try preview mode

On your WordPress admin, create a new post like before, but **do not publish** it.

Now, if you go to `http://localhost:3000`, you won’t see the post. However, if you enable **Preview Mode**, you'll be able to see the change ([Documentation](https://nextjs.org/docs/advanced-features/preview-mode)).

To enable Preview Mode, go to this URL:

```
http://localhost:3000/api/preview-page?secret=<secret>&id=<id>
```

- `<secret>` should be the string you entered for `WORDPRESS_PREVIEW_SECRET`.
- `<id>` should be the post's `databaseId` field, which is the integer that you usually see in the URL (`?post=18` → 18).
- Alternatively, you can use `<slug>` instead of `<id>`. `<slug>` is generated based on the title.

You should now be able to see this post. To exit Preview Mode, you can click on **Click here to exit preview mode** at the top.

## Start developing

After you have set up your environment variables, you can start the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
