const plugin = (opts = {}) => {
  return {
    postcssPlugin: 'foo',
    prepare: () => {
      const classes = new Set()
      
      return {
        // @ts-expect-error
        Rule: (rule) => {
          if (rule.selector.startsWith('.')) {
            classes.add({
              selector: rule.selector,
              // @ts-expect-error
              decl: rule.nodes.map(node => node.type === 'decl' ? `${node.prop}: ${node.value}` : '')
            })
          }
        },
        // @ts-expect-error
        OnceExit: (css, {result}) => {
          result.messages.push({
            plugin: 'foo',
            classes: classes,
          })
        },
      }
    },
  }
}

export default plugin
