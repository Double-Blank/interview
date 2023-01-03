// 处理异步操作
async init() {
  const fetchUser = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() = > {
        resolve()
      }, 3000)
    })
  }
  const user = await fetchUser()
  return {user}
}

onErrorCaptured(e => {
  
})

<Suspense>
  <template #default>
   <User />
  </template>
  <template #fallback>
   div loading
  </template>
</Suspense>