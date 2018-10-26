# Unoconv Promise

[![npm](https://img.shields.io/npm/v/unoconv-promise.svg?style=flat-square)](http://www.npmjs.com/package/unoconv-promise) [![Build Status](https://travis-ci.org/ryanhanwu/Unoconv-Promise.svg?branch=master)](https://travis-ci.org/ryanhanwu/Unoconv-Promise)

This is a Node.js wrapper with native Promise support for converting documents with unoconv, inspired by [Graham Floyd's implementation](https://github.com/gfloyd/node-unoconv)

## Setup

### Requirement

- [Unoconv](http://dag.wieers.com/home-made/unoconv/)
  - Tested with Unoconv version [**0.8.2**](https://github.com/dagwieers/unoconv/releases/tag/0.8.2)
- [LibreOffice](http://www.libreoffice.org/) (or OpenOffice.)
  - Tested with LibreOffice version **3.6.5** - [MacOS](https://libreoffice.en.uptodown.com/mac/download/40075), [Windows](https://libreoffice.en.uptodown.com/windows/download/40074)

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

## Supported Formats

- `bib`
- `bmp` - image/bmp
- `csv` - text/csv
- `dbf`
- `dif`
- `doc` - application/msword
- `docx` - application/vnd.openxmlformats-officedocument.wordprocessingml.document
- `emf` - application/x-msmetafile
- `eps` - application/postscript
- `fodg`
- `fodp`
- `fods`
- `fodt`
- `gif` - image/gif
- `html` - text/html
- `jpg` - image/jpeg
- `ltx`
- `met`
- `odd`
- `odg` - application/vnd.oasis.opendocument.graphics
- `odp` - application/vnd.oasis.opendocument.presentation
- `ods` - application/vnd.oasis.opendocument.spreadsheet
- `odt` - application/vnd.oasis.opendocument.text
- `otg` - application/vnd.oasis.opendocument.graphics-template
- `otp` - application/vnd.oasis.opendocument.presentation-template
- `ots` - application/vnd.oasis.opendocument.spreadsheet-template
- `ott` - application/vnd.oasis.opendocument.text-template
- `pbm` - image/x-portable-bitmap
- `pct` - image/x-pict
- `pdb` - application/vnd.palm
- `pdf` - application/pdf
- `pgm` - image/x-portable-graymap
- `png` - image/png
- `pot` - application/vnd.ms-powerpoint
- `potm` - application/vnd.ms-powerpoint.template.macroenabled.12
- `ppm` - image/x-portable-pixmap
- `pps` - application/vnd.ms-powerpoint
- `ppt` - application/vnd.ms-powerpoint
- `pptx` - application/vnd.openxmlformats-officedocument.presentationml.presentation
- `psw`
- `pwp`
- `pxl`
- `ras` - image/x-cmu-raster
- `rtf` - application/rtf
- `sda` - application/vnd.stardivision.draw
- `sdc` - application/vnd.stardivision.calc
- `sdd` - application/vnd.stardivision.impress
- `sdw` - application/vnd.stardivision.writer
- `slk`
- `stc` - application/vnd.sun.xml.calc.template
- `std` - application/vnd.sun.xml.draw.template
- `sti` - application/vnd.sun.xml.impress.template
- `stw` - application/vnd.sun.xml.writer.template
- `svg` - image/svg+xml
- `svm`
- `swf` - application/x-shockwave-flash
- `sxc` - application/vnd.sun.xml.calc
- `sxd` - application/vnd.sun.xml.draw
- `sxi` - application/vnd.sun.xml.impress
- `sxw` - application/vnd.sun.xml.writer
- `tiff` - image/tiff
- `txt` - text/plain
- `uop`
- `uos`
- `uot`
- `vor` - application/vnd.stardivision.writer
- `wmf` - application/x-msmetafile
- `wps` - application/vnd.ms-works
- `xhtml` - application/xhtml+xml
- `xls` - application/vnd.ms-excel
- `xlsx` - application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
- `xlt` - application/vnd.ms-excel
- `xml` - application/xml
- `xpm` - image/x-xpixmap'

## Reference

- [unoconv](https://github.com/dagwieers/unoconv)
- [node-unoconv](https://github.com/gfloyd/node-unoconv)
- [filepreview.js](https://github.com/maxlabelle/filepreview/blob/master/filepreview.js)
- [unoconv man page](https://linux.die.net/man/1/unoconv)
