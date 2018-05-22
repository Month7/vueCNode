import {
  CHANGE_FOOTER
} from './mutation-type.js'
export default{
  changeFooter ({commit}, newFooter) {
    commit(CHANGE_FOOTER, newFooter)
  }
}
