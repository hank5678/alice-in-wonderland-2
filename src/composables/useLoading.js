import { ref } from "vue"

export default function useLoading() {
  const status = ref(false)

  const load = (p) => {
    status.value = true
    p.finally(() => {
      status.value = false
    })
  }

  return { status, load }
}
