---
title: Custom post types
description: Learn how to add custom post types to your WordPress backend and how to fetch the data in your Next.js application.
---

Learn how to add custom post types to your WordPress backend and how to fetch the data in your Next.js application. **Copy and paste from Custom post type Project to get it working asap**

---

## Configuring the post type

The backend plugin is built so adding multiple custom post types is easy and uncluttered, there is an example already implemented called `Project`.

### Create a new file

Create a new file in the `src/PostTypes` folder. The name of the file will be the singular name of the custom post type + `PostType.php`. For example: `ReviewPostType.php`.

The name of the class will be the singular name of the custom post type + `PostType`. For example: `ReviewPostType`. The key of the custom post type will also be the singular name of the custom post type. For example: `review`.

```php
<?php

namespace HeadlesswpPluginStarter\PostTypes;

use HeadlesswpPluginStarter\Interfaces\Hookable;
use HeadlesswpPluginStarter\Interfaces\CustomPostType;

class ReviewPostType implements Hookable, CustomPostType {

    const KEY = 'review';

    public function register_hooks(): void {
        add_action( 'init', [ $this, 'register' ] );
    }

    public function register(): void {
        // add your hookable functions
    };

};
```

### Register the post type

Register the custom post type with the wordpress `register_post_type` function. Add it inside your `public function register()`. You can find more information about the `register_post_type` function [here](https://developer.wordpress.org/reference/functions/register_post_type/).

```php
register_post_type( self::KEY, [
    'public'              => true,
    'menu_icon'           => 'dashicons-portfolio',
    'supports'            => ['title', 'editor', 'thumbnail', 'excerpt', 'revisions'],
    'rewrite'             => ['slug' => 'Reviews'],
    'show_in_graphql'     => true,
    'graphql_single_name' => self::GRAPHQL_SINGLE_NAME,
    'graphql_plural_name' => 'Reviews',
] );
```

### Generating labels

I have implemented a function that will generate the labels for you. You can find the function in the `src/PostTypes/PostTypeLabelUtility.php` file.

First import the label utility class inside of your custom post type class:

```php
use PostTypeLabelUtility;
```

Then call the `generate_labels` function inside your `register_post_type` function, add your singular and plural name as arguments:

```php
'labels' => $this->generate_labels( 'Review', 'Reviews' ),
```

---

## Hooking up the post type

The plugin implements the `Hookable` interface, this means that you can call the `register_hooks` function inside of the `src/HeadlesswpPluginStarter.php` file.

### Create a new instance

Create a new instance of your custom post type class under `private function create_instances()` inside of the `src/HeadlesswpPluginStarter.php` file.

```php
$this->instances['review_post_type'] = new PostTypes\ReviewPostType();
```

---

## Front-end structure

Fetch the custom post type data in your Next.js application with WPGraphQL.

### Creating the route

Create a folder inside of the `src/pages` folder with the slug of the custom post type. For example: `src/pages/reviews`. Inside of the folder create a file called `[slug].tsx`. For example: `src/pages/reviews/[slug].tsx`.

### Create the scaffolding

Create the scaffolding for your page. You can find an example in the `src/pages/projects/[slug].tsx` file, the most import part is the `getStaticPaths` and `getStaticProps` functions if you want to do static site generation.

Generating all the available paths for the custom post type:

```js
export const getStaticPaths: GetStaticPaths = async () => {
  const allReviews = await getAllReviewsWithSlug()

  return {
    paths: allReviews.edges.map(({ node }) => `/reviews/${node.slug}`) || [],
    fallback: true,
  }
}
```

Fetching the data for the custom post type:

```js
export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const data = await getReviewAndMoreReviews(params?.slug, preview, previewData)

  const { moreReviews, review } = data

  return {
    props: {
      preview,
      review: review,
      moreReviews: moreReviews,
      optionsMenu: data.optionsMenu,
    },
    revalidate: 10,
  }
}
```

Your data will now be available in the `props` object.

### Creating GraphQL queries

An example of a GraphQL query can be found in the `src/lib/queries/projects.ts` file. You can find more information about the WPGraphQL queries [here](https://www.wpgraphql.com/docs/queries/).

First you will retrieve all the slugs for the getStaticPaths function:

```js
export async function getAllReviewsWithSlug() {
  const data = await fetchAPI(`
    {
      reviews(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  return data?.reviews
}
```

Then you will retrieve the data for the getStaticProps function:

Look at the `getProjectAndMoreProjects` function in the `src/lib/queries/projects.ts` file for an example of how to retrieve the data for the Project custom post type single page.

## Preset

Create the file in `src/PostTypes`. Copy and paste from below, replace all instances of `Review` plural and singular with `Your post type name` plural and singular.

```php
<?php

namespace HeadlesswpPluginStarter\PostTypes;

use HeadlesswpPluginStarter\Interfaces\Hookable;
use HeadlesswpPluginStarter\Interfaces\CustomPostType;

class ReviewPostType implements Hookable, CustomPostType {
    use PostTypeLabelUtility;

    const KEY = 'review';
    const GRAPHQL_SINGLE_NAME = 'Review';

    public function register_hooks(): void {
        add_action( 'init', [ $this, 'register' ] );
    }

    public function register(): void {
        register_post_type( self::KEY, [
          	'labels'              => $this->generate_labels( 'Review', 'Reviews' ),
			'public'              => true,
			'menu_icon'           => 'dashicons-portfolio',
			'supports'            => ['title', 'editor', 'thumbnail', 'excerpt', 'revisions'],
			'rewrite'             => ['slug' => 'reviews'],
			'show_in_graphql'     => true,
			'graphql_single_name' => self::GRAPHQL_SINGLE_NAME,
			'graphql_plural_name' => 'Reviews',
        ]);
    }
}
```
