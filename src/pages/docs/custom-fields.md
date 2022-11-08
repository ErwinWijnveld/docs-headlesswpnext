---
title: Custom fields
description: Learn how to add custom fields to your WordPress backend and how to fetch the data in your Next.js application.
---

Learn how to add custom fields to your WordPress backend and how to fetch the data in your Next.js application.

---

## Configuring your custom fields

There are already custom fields implemented for Pages, Posts and Projects. You can find them in the `src/Acf` folder. The fields are registered in the `src/Acf/AcfSetup.php` file.

### Configuring flexible content

There is a flexible content field implemented for global usage. You can find it in the `src/Acf/flexible-layout.php` file. You can add fields or layouts to the flexible content field in this file.

### Adding a layout

To add a new layout to the flexible content field, you need to add a new file in the `src/Acf/partials` folder. The name of the file will be the name of the layout. For example: `Hero.php`.

We use Stoutlogic's [AcfBuilder](https://github.com/Log1x/acf-builder-cheatsheet) to create the fields. You can find the documentation [here](https://github.com/Log1x/acf-builder-cheatsheet).

First you need to create a new instance of the `FieldsBuilder` class. You can do this by adding the following code to the top of your file:

```php
$hero = new FieldsBuilder('hero');
```

The name of the variable will be the name of the layout. For example: `$hero`.

Next you need to add the fields to the layout. You can do this by adding the following code to the bottom of your file:

```php
$hero
    ->addText('title')
    ->addTextarea('description')
    ->addImage('image');

return $hero;
```

The name of the field will be the name of the field in the database. For example: `title`.

After you registered your layout, you need to add it to the flexible content field. You can do this by adding the following code to the `src/Acf/flexible-layout.php` file:

```php
$hero = get_field_partial('partials.hero');
```

The name of the variable will be the name of the layout. For example: `$hero`.

Under // Load layouts you need to add the following code:

```php
->addLayout($hero)
```

## Confifuring fields for a custom post type

When you want to add custom fields to a custom post type, you need to create a new file in the `src/Acf` folder. The name of the file will be the singular name of the custom post type. For example: `Review.php`.

### Configuring fields

You will create a class that has the same name as the file. For example: `Review.php` will have the class `Review`. With a public static function index. This function will return the fields.

```php
namespace HeadlesswpPluginStarter\Acf;

use StoutLogic\AcfBuilder\FieldsBuilder;

class Review {
    public static function index() {

    }
}
```

You can add fields to the function by using the `FieldsBuilder` class. You can find the documentation [here](https://github.com/Log1x/acf-builder-cheatsheet). You can also find an example in the `src/Acf/Project.php` file.

```php
->addText('title')
->addTextarea('description')
->addImage('image')
```

### Configuring WPGraphQL

You can add the fields to the WPGraphQL schema by adding the following code to the file, we are using the flexible layout preset as an example:

```php
$flexibleReview = new FieldsBuilder('flexibleReview', [
    'position' => 'acf_after_title',
    'hide_on_screen'    => [
        'the_content'
    ],
    'show_in_graphql' => true,
    'graphql_field_name' => 'flexibleReview'
]);
```

### Loading the fields

You need to load the fields in the `src/Acf/AcfSetup.php` file. You can do this by adding the following code to the `register` function inside the fields array:

```php
$fields = [
    new Post(),
    new Page(),
    new OptionsMenu(),
    new Project(),
    new Review(),
];
```

## Preset

You can copy and paste this code and replace all the `Review` with the name of your custom post type.

```php
<?php

namespace HeadlesswpPluginStarter\Acf;

use StoutLogic\AcfBuilder\FieldsBuilder;

class Review {
    public static function index() {
        $flexibleReview = new FieldsBuilder('flexibleReview', [
            'position' => 'acf_after_title',
            'hide_on_screen'    => [
                'the_content'
            ],
            'show_in_graphql' => true,
            'graphql_field_name' => 'flexibleReview'
        ]);

        $flexibleReview
            ->setLocation('post_type', '==', 'review');


        // Load content partials
        $flexible_layout = get_field_partial('flexible-layout');

        $flexibleReview
            ->addFields($flexible_layout)

        ;return $flexibleReview;
    }
}
```
