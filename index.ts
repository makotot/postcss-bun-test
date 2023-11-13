import postcss from 'postcss'
import tailwind from 'tailwindcss'
import resolveConfig from 'tailwindcss/resolveConfig'
import twconfig from './tailwind.config.ts'
import foo from './foo.ts'

console.log("Hello via Bun!");

(async () => {
  const result = await postcss([
    tailwind({
      ...resolveConfig(twconfig),
      content: ['./test.html'],
      safelist: [
        {
          pattern: /.*/,
        },
      ],
    }),
  ]).process(`
@tailwind base;
@tailwind components;
@tailwind utilities;
  `)

  const res = await postcss([foo()]).process(result.css)
  await console.log(res.messages.filter((r => r.plugin === 'foo'))[0])
})()
