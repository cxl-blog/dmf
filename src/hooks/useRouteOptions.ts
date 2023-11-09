import { useRouter } from '@uni-helper/uni-use'

export function useRouteOptions() {
  const router = useRouter()

  const options = computed<Record<string, unknown>>(() => (unref(router.page) as any).$page.options)

  return {
    router,
    options
  }
}
