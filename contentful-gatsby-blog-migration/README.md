# Contentful Gatsby Starter Blog

Create a [Gatsby](http://gatsbyjs.com/) blog powered by [Contentful](https://www.contentful.com). This is a simplified version of the [Gatsby Contentful Starter](https://github.com/contentful-userland/gatsby-contentful-starter) which is maintained by our Community.

![The index page of the starter blog](https://rawgit.com/contentful-userland/gatsby-contentful-starter/master/screenshot.jpg "The index page of the starter blog")

Static sites are scalable, secure and have very little required maintenance. They come with a drawback though. Not everybody feels good editing files, building a project and uploading it somewhere. This is where Contentful comes into play.

With Contentful and Gatsby you can connect your favorite static site generator with an API that provides an easy to use interface for people writing content and automate the publishing using services like [Travis CI](https://travis-ci.org/) or [Netlify](https://www.netlify.com/).

## Features

- Simple content model and structure. Easy to adjust to your needs.
- Use the [synchronization feature](https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/synchronization) of our [Delivery API](https://www.contentful.com/developers/docs/references/content-delivery-api/).
- Responsive/adaptive images via [gatsby-image](https://www.gatsbyjs.org/packages/gatsby-image/) and our [Images API](https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/synchronization/initial-synchronization-of-entries-of-a-specific-content-type).

## Getting started

See our [official Contentful getting started guide](https://www.contentful.com/developers/docs/tutorials/general/get-started/).

### Get the source code and install dependencies.

```
$ git clone https://github.com/contentful/starter-gatsby-blog.git
$ npm install
```

Or use the [Gatsby CLI](https://www.npmjs.com/package/gatsby-cli).

```
$ gatsby new contentful-starter-blog https://github.com/contentful/starter-gatsby-blog/
```

### Set up of the needed content model and create a configuration file

This project comes with a Contentful setup command `npm run setup`.

This command will ask you for a space ID, and access tokens for the Contentful Management and Delivery API and then import the needed content model into the space you define and write a config file (`./.contentful.json`).

`npm run setup` automates that for you but if you want to do it yourself rename `.contentful.json.sample` to `.contentful.json` and add your configuration in this file.

## Crucial Commands

### `npm run dev`

Run the project locally with live reload in development mode.

### `npm run build`

Run a production build into `./public`. The result is ready to be put on any static hosting you prefer.

### `npm run serve`

Spin up a production-ready server with your blog. Don't forget to build your page beforehand.

## Deployment

See the [official Contentful getting started guide](https://www.contentful.com/developers/docs/tutorials/general/get-started/).

## Contribution

Feel free to open pull requests to fix bugs. If you want to add features, please have a look at the [original version](https://github.com/contentful-userland/gatsby-contentful-starter). It is always open to contributions and pull requests.

You can learn more about how Contentful userland is organized by visiting [our about repository](https://github.com/contentful-userland/about).

## Setup

1. Install the `contentful-cli` SDK via npm globaly.

```bash
$ npm i -g contentful-cli
```

2. Login to the CLI. This will prompt you to login/create yout CF account, authorize the CLI tool to get the CMA token and paste it in the tool.

```bash
$ contentful login
```

3. Set which space to use by default if no -s is provided.

```bash
$ contentful space ls
$ contentful space use -s <space-id>
```

4. Create dev environment

```bash
$ contentful space environment create -e 'dev' --name 'Development'
```

5. Write your scripts in the migrations folder

6. Execute your script

```bash
$ contnetful space migration -e <environment> <path-to-script>
# Example
$ contentful space migration -e 'dev' migrations/01-add-category-field.js
```

## Migration examples

Add a new field to an existing content model

```bash
$ contentful space migration -e 'dev' migrations/01-add-category-field.js
```

Transform content from one existing field to another existing field

```bash
$ contentful space migration -e 'dev' migrations/02-transform-content.js --yes
```

Transform the type of a field

```bash
$ contentful space migration migrations/03-category-link.js --yes
```

```js
// Content types
// Create content type
.createContentType("") // Api Identifier
.name("") // (required) - Name
.description("") // Description
.displayField(""); // (required) - ID of the field to use as the "Entry title"

// Edit content type
.editContentType("")
...

// Delete content type
.deleteContentType("")

// Entries
// For the given content type, transforms all its entries according to the user-provided transformEntryForLocale function
.transformEntries({
  contentType: 'newsArticle', // (required) - Api Identifier
  from: ['author', 'authorCity'], // (required) - Array of the source field IDs
  to: ['byline'], // (required) - Array of the target field IDs
  transformEntryForLocale: async (fromFields, currentLocale) => { // (required) - Transformation function to be applied
    // fromFields = {author: {'en-US': 'John Doe'}}
    // currentLocale = 'en-US'
    if (currentLocale === 'de-DE') {
      return // If it returns undefined, this the values for this locale on the entry will be left untouched.
    }
    const newByLine = `${fromFields.author[currentLocale]} ${fromFields.authorCity[currentLocale]}`

    // Must return an object that has keys as specified in to
    return {
      byline: newByLine
    }
  },
  shouldPublish: 'preserve' // (optional) – Boolean flag that specifies publishing of target entries, preserve will keep current states of the source entries (default 'preserve')
})

// For each entry of the given content type (source entry), derives a new entry and sets up a reference to it on the source entry
.deriveLinkedEntries({
  contentType: 'dog', // (required) – Source content type ID
  derivedContentType: 'owner', // (required) – Target content type ID
  from: ['owner'], // (required) – Array of the source field IDs
  toReferenceField: 'ownerRef', // (required) – ID of the field on the source content type in which to insert the reference
  derivedFields: ['firstName', 'lastName'], // (required) – Array of the field IDs on the target content type
  identityKey: async (fromFields) => { // (required) - Called once per source entry. Returns the ID used for the derived entry, which is also used for de-duplication so that multiple source entries can link to the same derived entry.
    return fromFields.owner['en-US'].toLowerCase().replace(' ', '-')
  },,
  deriveEntryForLocale : async (fromFields, locale) => { // (required) – Function that generates the field values for the derived entry.
    if (locale !== 'en-US') {
      return
    }
    const [firstName, lastName] = inputFields.owner[locale].split(' ')
    return {
      firstName,
      lastName
    }
  },
  shouldPublish : 'preserve'
})
```
