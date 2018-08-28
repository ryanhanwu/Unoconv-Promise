# Unoconv Promise

Node.js wrapper with Promise for converting documents with unoconv, inspired by [Graham Floyd's version](https://github.com/gfloyd/node-unoconv)

## Setup

### Requirement

- [Unoconv](http://dag.wieers.com/home-made/unoconv/) 
- [LibreOffice](http://www.libreoffice.org/) (or OpenOffice.)

#### Mac Only
You can install unoconv with Homebrew
```
brew install unoconv
```
and in order to use unoconv, a copy of LibreOffice between versions **3.6.0.1 - 4.3.x** must be installed.

### Installation

```
npm install unoconv-promise
```

## Usage

### Basic files
```javascript
const unoconv = require('unoconv-promise')

unoconv.convert('./mydoc.doc')
  .then((fileBuffer) => {
    // Converted file buffer
    return Promise.resolve(fileBuffer)
  })
  .catch((e) => {
    throw(e)
  })
```

### Show supported formats

```javascript
const unoconv = require('unoconv-promise')

unoconv.formats()
  .then((formats) => {
    // formats will be an array contains supports formats
    
  })
  .catch((e) => {
    throw(e)
  })
```

Sample format
```json
{ 
  "format": "doc",
  "doctype": "document",
  "extension": "doc",
  "description":" Microsoft Word 97/2000/XP",
  "mime": "application/msword" 
}
```

## Test

```javascript
npm test
```

## Reference

- [node-unoconv](https://github.com/gfloyd/node-unoconv)
- [filepreview.js](https://github.com/maxlabelle/filepreview/blob/master/filepreview.js)
- [unoconv man page](https://linux.die.net/man/1/unoconv)
