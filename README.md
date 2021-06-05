# esbuild-skypack-resolver

[![main](https://github.com/rodrigo-garcia-leon/esbuild-skypack-resolver/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/rodrigo-garcia-leon/esbuild-skypack-resolver/actions/workflows/main.yml)

A plugin to resolve package names to Skypack CDN URLs.

## Installation

```sh
npm install --save-dev esbuild-skypack-resolver
```

## Usage

```js
import { build } from 'esbuild';
import { skypackResolver } from 'esbuild-skypack-resolver';

build({
    entryPoints: ['app.js'],
    bundle: true,
    outfile: 'out.js',
    plugins: [skypackResolver()],
}).catch(() => process.exit(1));
```

## API

### skypackResolver(packageLockFile?)

#### packageLockFile

Type: `string`
Default: `${process.cwd()}/package-lock.json`

File path to the package lock file used to determine which dependencies to resolve.
