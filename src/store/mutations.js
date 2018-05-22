import {
  CHANGE_FOOTER
} from './mutation-type.js'

export default{
  [CHANGE_FOOTER] (state, newFooter) {
    state.footer = newFooter
  }
}
