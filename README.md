# is-https
> Check if the given request is HTTPS

[![npm](https://img.shields.io/npm/dt/is-https.svg?style=flat-square)](https://npmjs.com/package/is-https)
[![npm (scoped with tag)](https://img.shields.io/npm/v/is-https/latest.svg?style=flat-square)](https://npmjs.com/package/is-https)

## Usage
Install package
```bash
yarn add is-https # or npm install is-https
```

Exported function blueprint is `isHTTPS (req, xForwardedProto = true): Boolean`.

## Behaviour
This function tries to use 3 standard checks for HTTPS detection:
- Test if `req.connection.encrypted` is `true`
- Test if `req.protocol` is `https`
- Test if `x-forwarded-proto` header contains `https` (Only when `xForwardedProto` argument is `true`)

Return value:

- If **one** of tests is **passing**, function return `true`
- If **all** tests are **unavailable**, function returns `null`
- Else function returns `false`

## License
MIT - [Nuxt.js](https://nuxtjs.org)