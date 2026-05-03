# CKEditor 5 Anchor ID Plugin

[![npm version](https://img.shields.io/npm/v/ckeditor5-anchor-id)](https://www.npmjs.com/package/ckeditor5-anchor-id)
[![license](https://img.shields.io/npm/l/ckeditor5-anchor-id)](LICENSE)

Plugin for adding anchor IDs to content in CKEditor 5.

## Installation

```
npm install ckeditor5-anchor-id --save-dev
```

## Usage

```
import AnchorIdPlugin from 'ckeditor5-anchor-id';

Editor.builtinPlugins = [
  ...,
  AnchorIdPlugin
]

const editorConfig = {
  ...,
  toolbar: {
    ...,
    items: [
      ...,
      "anchorId"
    ]
  }
}
```

## Examples

![Icon](docs/images/1.jpg)

![Demo](docs/images/2.jpg)

## License

MIT