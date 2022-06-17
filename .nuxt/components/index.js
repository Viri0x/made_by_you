export { default as SubNavSetting } from '../../components/SubNavSetting.vue'
export { default as TheFooter } from '../../components/TheFooter.vue'
export { default as TheFooterEdit } from '../../components/TheFooterEdit.vue'
export { default as TheHeader } from '../../components/TheHeader.vue'
export { default as TheHeaderEdit } from '../../components/TheHeaderEdit.vue'
export { default as TheSVG } from '../../components/TheSVG.vue'
export { default as EditAvis } from '../../components/editAvis.vue'
export { default as EditFile } from '../../components/editFile.vue'
export { default as EditLien } from '../../components/editLien.vue'
export { default as EditMedia } from '../../components/editMedia.vue'
export { default as EditSeo } from '../../components/editSeo.vue'
export { default as EditTranche } from '../../components/editTranche.vue'
export { default as Upload } from '../../components/upload.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
