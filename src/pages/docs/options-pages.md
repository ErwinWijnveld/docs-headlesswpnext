---
title: Options pages
description: Learn how to add custom options pages to your WordPress backend and how to fetch the data in your Next.js application.
---

Learn how to add options pages to your WordPress backend and how to fetch the data in your Next.js application. **Copy and paste from Website settings to get it working asap**

---

## Configuring options page

The backend plugin is built so adding multiple custom post types is easy and uncluttered, there is an example already implemented called `Website settings`.

### Register the options page

Navigate to `src/OptionsPages/RegisterOptionsPages.php` register the options page with the wordpress `acf_add_options_page` function. Add it inside your `public function register()`. You can find more information about the `acf_add_options_page` function [here](https://www.advancedcustomfields.com/resources/acf_add_options_page/).

```php
if( function_exists('acf_add_options_page') ) {
    acf_add_options_page(array(
        'page_title'        => __('Sidebar Settings'),
        'menu_title'        => __('Sidebar Settings'),
        'menu_slug'         => 'sidebar-menu',
        'update_button'     => 'Bewaar Menu',
        'updated_message'   => 'Menu opgeslagen',
        'position'          => '4',
        'capability'        => 'edit_posts',
        'redirect'          => false,
        'show_in_graphql'   => true,
    ));
}
```

## Fetching the data

You can fetch options pages in the root of yout GraphQL query. For example:

```graphql
query {
  SidebarSettings {
    title
  }
}
```

### display the data

When using options pages, the idea is that its accessible from anywhere in your application. You can use the `useOptions` hook to fetch the data.

Insert the data into your <Layout> component under the prop `optionsMenu`, for example:

```jsx
optionsMenu.sidebarSettings = sidebarSettings;
<Layout optionsMenu={optionsMenu}>
```

Then you can use the data in your components, for example:

```jsx
import { useOptions } from '../hooks/useOptions'

const Sidebar = () => {
  const { SidebarSettings } = useOptions()

  return (
    <div>
      <h1>{SidebarSettings.title}</h1>
    </div>
  )
}
```
