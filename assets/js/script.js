var API_KEY = 'f3d3fa0749c3c9ed320b8c28e1721147'
var bibleVersionID = 'de4e12af7f28f599-02' //KJV
var offset = 1
var searchText = 'I have overcome the world.'
var url = `https://api.scripture.api.bible/v1/bibles/${bibleVersionID}/search?query=${searchText}/`

// fetch(url, {
//   headers: {
//     'api-key': API_KEY,
//   },
// })
//   .then((data) => {
//     return data.json()
//   })
//   .then((result) => {
//     console.log(result)
//   })

$('#search').on('click', function () {
  const input = document.getElementById('key-word')
  input.setAttribute('required', '')
  let searchText = input.value
  if (searchText === null || searchText === undefined) {
  } else {
    fetch(
      `https://api.scripture.api.bible/v1/bibles/${bibleVersionID}/search?query=${searchText}/`,
      {
        headers: {
          'api-key': API_KEY,
        },
      }
    )
      .then((data) => {
        return data.json()
      })
      .then((result) => {
        console.log(result)
      })
  }
})
