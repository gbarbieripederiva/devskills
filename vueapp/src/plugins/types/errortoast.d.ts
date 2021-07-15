import Vue from "vue" // eslint-disable-line

interface ShowErrorToastFunc{
  (errorMessage:string):void
}

declare module 'vue/types/vue' {
  interface Vue {
    $showErrorToast: ShowErrorToastFunc
  }
}