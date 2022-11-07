export const uploadImageToBlob = (uri) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function() {
      resolve(xhr.response)
    }
    xhr.onerror = function(e) {
      console.log(e)
      reject(new TypeError('Network request failed'))
    }
    xhr.responseType = 'blob'
    xhr.open('GET', uri, true)
    xhr.send(null)
  })
}

export const fileTypeConverter = (string) => {
  if(string?.includes('wordprocessingml')) 
    return {icon:'fas fa-file-word', color: '#2194ff', name: 'Word', docType: 'word'}
  else if(string?.includes('spreadsheetml')) 
    return {icon: 'fas fa-file-excel', color: '#73d609', name: 'Excel', docType: 'excel'}
  else if(string?.includes('presentationml'))
    return {icon: 'fas fa-file-powerpoint', color: '#ff640a', name: 'PowerPoint', docType: 'powerpoint'}
  else if(string?.includes('pdf'))
    return {icon: 'fas fa-file-pdf', color: '#ff0a37', name: 'PDF', docType: 'pdf'}
  else if(string?.includes('audio'))
    return {icon: 'fas fa-music-alt', color: '#ff6c24', name: 'Audio', docType: 'none'}
  else if(string?.includes('image'))
    return {icon: 'fas fa-image', color: '#6c26ff', name: 'Image', docType: 'none'}
  else if(string?.includes('video'))
    return {icon: 'fas fa-video', color: '#a9cf00', name: 'Image', docType: 'none'}
  else if(string?.includes('zip-compressed'))
    return {icon: 'fas fa-file-archive', color: '#9fb8c4', name: 'Zip', docType: 'none'}
  else if(string?.includes('html'))
    return {icon: 'far fa-code', color: '#9fb8c4', name: 'HTML', docType: 'none'}
  else
    return {icon: 'fas fa-file-alt', color: '#9fb8c4', name: 'Other', docType: 'none'}
}

export const fileTypePathConverter = (string) => {
  if(string?.includes('zip'))
    return 'other'
  else if(string?.includes('application')) 
    return 'document'
  else if(string?.includes('audio'))
    return 'audio'
  else if(string?.includes('image'))
    return 'image'
  else if(string?.includes('video'))
    return 'video'
  else if(string?.includes('html'))
    return 'html'
  else
    return 'other'
}

export const convertBytesToKbMbGb = (bytes, toFixedNum=2) => {
  if(bytes < 1024) {
    return bytes + ' B'
  }
  else if(bytes < 1048576) {
    return (bytes/1024).toFixed(toFixedNum) + ' KB'
  }
  else if(bytes < 1073741824) {
    return (bytes/1048576).toFixed(toFixedNum) + ' MB'
  }
  else {
    return (bytes/1073741824).toFixed(toFixedNum) + ' GB'
  }
}