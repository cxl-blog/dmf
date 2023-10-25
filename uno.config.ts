import presetWeapp from 'unocss-preset-weapp'
import { extractorAttributify, transformerClass } from 'unocss-preset-weapp/transformer'
import { defineConfig } from 'unocss'
import { presetUni } from '@uni-helper/unocss-preset-uni'

const { presetWeappAttributify, transformerAttributify } = extractorAttributify()

export default defineConfig({
  presets: [
    presetUni(),
    // https://github.com/MellowCo/unocss-preset-weapp
    // @ts-expect-error
    presetWeapp(),
    // attributify autocomplete
    // @ts-expect-error
    presetWeappAttributify()
  ],
  shortcuts: [
    {
      'uno-center': 'uno-flex uno-justify-center uno-items-center'
    }
  ],

  transformers: [
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    // @ts-expect-error
    transformerAttributify(),

    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    // @ts-expect-error
    transformerClass()
  ]
})
