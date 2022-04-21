// JSONP
function JOSNP({
  url,
  params = {},
  callbackKey = 'cb',
  callback
}){
  const callbackName = 'jsonpCallback'
  window[callbackName] = callback
  
  const params[callbackKey] = callbackName
  
  const paramString = Object.keys(params).map(key => {
    return `${key} = ${params[key]}`
  }).join('&')
  
  const script = doucument.creteElement('script')
  script.setAttribute('src', `${url}?${paramString}`)
  doucument.body.appendChild(script)
}

JSONP({
  url:'https://randomuser.me/api',
  params: {results:10},
  callbackKey = 'inc',
  callback (res) {
  	console.log(res)
	}
})