var API_KEY = 'f3d3fa0749c3c9ed320b8c28e1721147'
var bibleVersionID = 'de4e12af7f28f599-02' //KJV
var offset = 1
var searchText = 'I have overcome the world.'
var url = `https://api.scripture.api.bible/v1/bibles/${bibleVersionID}/search?query=${searchText}/`
var amhURL = 'https://raw.githubusercontent.com/magna25/amharic-bible-json/main/amharic_bible.json' //github url for amharic bible

$('#search').on('click', function () {
  const input = document.getElementById('key-word')
  input.setAttribute('required', '')
  let searchText = input.value
  if (
    searchText === null ||
    searchText === undefined ||
    searchText.length <= 0
  ) {
    alert('Please provide a key word!')
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
//amharic bible
fetch(amhURL)
.then((data)=>{
    return data.json()
})
.then(res=>{
    console.log(res.books[43].chapters[1].verses[36])   //books = n-1/chapters = n-1/verses = n-1 or n-2...if n is length of array//acts 2:38 = books[43].chapters[1].verses[36]
})