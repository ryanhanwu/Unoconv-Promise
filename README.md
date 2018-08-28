# Unoconv Promise

This is a Node.js wrapper with native Promise support for converting documents with unoconv, inspired by [Graham Floyd's implementation](https://github.com/gfloyd/node-unoconv)

## Setup

### Requirement

- [Unoconv](http://dag.wieers.com/home-made/unoconv/)
  - Tested with Unoconv version [**0.8.2**](https://github.com/dagwieers/unoconv/releases/tag/0.8.2)
- [LibreOffice](http://www.libreoffice.org/) (or OpenOffice.)
  - Tested with LibreOffice version [**3.6.5**](https://libreoffice.en.uptodown.com/windows/download/40074)

#### Mac Only

With [Homebrew](https://brew.sh/)

```shell
$ brew install unoconv
```

and in order to use unoconv, a copy of LibreOffice between versions **3.6.0.1 - 4.3.x** must be installed.

### Installation

```shell
$ npm install unoconv-promise
```

## Usage

### Basic

#### Convert document file into PDF and return as a Buffer

```javascript
const unoconv = require("unoconv-promise");

unoconv
  .convert("./mydoc.doc")
  .then(fileBuffer => {
    // Converted file buffer
    return Promise.resolve(fileBuffer);
  })
  .catch(e => {
    throw e;
  });
```

#### Convert document first page to PDF and save to a file

```javascript
const unoconv = require("unoconv-promise");

unoconv
  .run({
    file: "./mydoc.doc",
    output: "./temp.pdf",
    export: "PageRange=1-1"
  })
  .then(filePath => {
    console.log(filePath);
  })
  .catch(e => {
    throw e;
  });
```

#### Show supported formats

```javascript
const unoconv = require("unoconv-promise");

unoconv
  .formats()
  .then(formats => {
    // formats will be an array contains supports formats
    formats.forEach(format => {
      console.log(format);
    });
  })
  .catch(e => {
    throw e;
  });
```

- Each format will be look like this

```json
{
  "format": "doc",
  "doctype": "document",
  "extension": "doc",
  "description": " Microsoft Word 97/2000/XP",
  "mime": "application/msword"
}
```

### Unoconv.run options

#### Option (default) : Description

**From `unoconv`**
Please check `unoconv -h` more details

- `connection`
- `doctype`
- `export`
- `field`
- `format`(pdf): specify the output format
- `import-filter-name`
- `import`
- `listener`
- `no-launch`
- `output`: output basename, filename or directory
- `password`
- `pipe`
- `port`
- `printer`
- `preserve`: keep timestamp and permissions of the original document
- `server`
- `show`
- `stdout`
- `template`
- `timeout`: timeout after secs if connection to listener fails
- `verbose`
- `version`

**Extra**

- `bin` (unoconv): Binary command
- `string` (false): Return the output as string
- `file` (null): Target file

## Testing

```javascript
npm test
```

- Coverage

```javascript
npm test:coverage
```

## TODO

- Improve listener usage

## Reference

- [unoconv](https://github.com/dagwieers/unoconv)
- [node-unoconv](https://github.com/gfloyd/node-unoconv)
- [filepreview.js](https://github.com/maxlabelle/filepreview/blob/master/filepreview.js)
- [unoconv man page](https://linux.die.net/man/1/unoconv)
