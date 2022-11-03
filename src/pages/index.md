---
title: Getting started
pageTitle: HeadlessWpNext - Balzing fast WordPress with Next.js
description: Take your slow wordpress site and make it blazing fast with Next.js and WPGraphQL.
---

This is a framework for a headless WordPress site using Next.js. It uses the WordPress WPGraphQL and ApolloClient to fetch data from WordPress and display it on the frontend. {% .lead %}

{% quick-links %}

{% quick-link title="Installation" icon="installation" href="/docs/installation" description="Step-by-step guides to setting up your backend system and the framework." /%}

{% quick-link title="Architecture" icon="presets" href="/" description="Learn how the internals work and contribute." /%}

{% quick-link title="Plugins" icon="plugins" href="/" description="Extend the library with third-party plugins or write your own." /%}

{% quick-link title="API reference" icon="theming" href="/" description="Learn to easily customize and modify your app's visual design to fit your brand." /%}

{% /quick-links %}

Possimus saepe veritatis sint nobis et quam eos. Architecto consequatur odit perferendis fuga eveniet possimus rerum cumque. Ea deleniti voluptatum deserunt voluptatibus ut non iste.

---

## Quick start

This framework has a front-end and back-end setup. The frontend is a Next.js app that uses ApolloClient to fetch data from the backend. The backend is a WordPress site that uses the WPGraphQL plugin to expose data to the frontend.

### Back-end setup

I have developed a plugin for your wordpress backend that perfectly integrates with this framework. It is called headlesswp-plugin-starter. You can download the plugin from the repository. [headlesswp starter plugin](http://https://github.com/ErwinWijnveld/headlesswp-plugin-starter 'headlesswp starter plugin')

#### Installing all the plugins

You will need to install the required plugins for this to work. You can do this by going to the plugins page in your WordPress admin and installing all the plugins from the plugin pack located in the frontend repo at `docs/pluginpack.zip`.

#### Configuring Wordpress/WPGraphQL for this framework

- Go to Settings > Permalinks and set your permalinks to "Post name"
- Go to Settings > General and set your site url to `https://headlesswpstarter.com` (or whatever your frontend url is)

### Front-end setup

First you will need to clone the repo:

```bash
git clone https://github.com/ErwinWijnveld/headlesswp-nextjs-starter.git
```

Then you will need to install the dependencies, we decided to use yarn for this project:

```bash
yarn install
```

{% callout type="warning" title="Oh no! Something went wrong!" %}
You got an error when running `yarn install`. This is probably because your node version is too old. Please upgrade to the latest supported version of node and try again.
{% /callout %}

#### Set up environment variables

Copy the `.env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Then open `.env.local` and set `WORDPRESS_API_URL` and `NEXT_PUBLIC_WORDPRESS_URL` to be the URL to your GraphQL endpoint in WordPress. For example: `https://mybackend.com/graphql`.

Your `.env.local` file should look like this:

```bash
WORDPRESS_API_URL=https://mybackend.com/graphql
NEXT_PUBLIC_WORDPRESS_URL=https://mybackend.com/graphql
```

### Start developing

After you have set up your environment variables, you can start the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Basic usage

When you click on the text you will be prompted with a navigation menu. This menu will show you all the data that has been fetched from the backend. You can click on the links to see the data that has been fetched.

### Adding a homepage

When you want to add a homepage you will need to create a page in WordPress. You can do this by going to `Pages > Add New`. You will need to add a title and a slug. You will want to add a slug with the name `home`. This is the slug that the framework will use to fetch the homepage data.

### Adding a post

When you want to add a post you will need to create a post in WordPress. You can do this by going to `Posts > Add New`. You will need to add a title, some content and a featured image. You can add a featured image by clicking on the "Set featured image" button.

### Adding a project

When you want to add a project you will need to create a project in WordPress. You can do this by going to `Projects > Add New`. You will need to add a title, some content and a featured image. You can add a featured image by clicking on the "Set featured image" button.

## Getting help

If you have any questions or need help, please send me an email at [info@erwinwijnveld.nl](mailto:info@erwinwijnveld.nl)
