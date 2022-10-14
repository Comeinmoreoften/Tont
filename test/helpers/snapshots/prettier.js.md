# Snapshot report for `test/helpers/prettier.js`

The actual snapshot is saved in `prettier.js.snap`.

Generated by [AVA](https://avajs.dev).

## js

> Snapshot 1

    `const mql = require('@microlink/mql')␊
    ␊
    const { status, data } = await mql('https://geolocation.microlink.io', {␊
      apiKey: MyApiToken,␊
      proxy: 'https://myproxy:603f60f5@superproxy.cool:8001'␊
    })␊
    ␊
    console.log(data)␊
    `