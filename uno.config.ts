// import presetWeapp from 'unocss-preset-weapp'
// import { extractorAttributify, transformerClass } from 'unocss-preset-weapp/transformer'
import { defineConfig } from 'unocss'
import { presetUni } from '@uni-helper/unocss-preset-uni'

// const { presetWeappAttributify, transformerAttributify } = extractorAttributify()

export default defineConfig({
  presets: [
    presetUni()
    // https://github.com/MellowCo/unocss-preset-weapp
    // presetWeapp(),
    // attributify autocomplete
    // presetWeappAttributify()
  ],
  shortcuts: [
    {
      'uno-center': 'uno-flex uno-justify-center uno-items-center'
    }
  ],

  transformers: [
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    // transformerAttributify(),
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    // transformerClass()
  ]
})
