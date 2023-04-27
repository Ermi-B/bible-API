var API_KEY = 'f3d3fa0749c3c9ed320b8c28e1721147'
var bibleVersionID = 'de4e12af7f28f599-02' //KJV
var offset = 1
// var searchText = 'I have overcome the world.'
// var url = `https://api.scripture.api.bible/v1/bibles/${bibleVersionID}/search?query=${searchText}/`
var amhURL = 'https://raw.githubusercontent.com/magna25/amharic-bible-json/main/amharic_bible.json' //github url for amharic bible

//SELECTORS
const inputEl = $('#key-word')
const searchBtn = $('#search')
const searchResult = $('#search-result')  //list element
const searchContainer = $('#search-container')//list entire div (container)



searchBtn.on('click', function () {
  inputEl.attr('required', '')
  const searchText = inputEl.val()
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
        getVerse(result,searchText)
      })

  }
})

//getVerse function
function getVerse (result,searchText){

  const verseInfo = result.data.verses //verseInfo is array of objects   

  searchResult.empty()
  searchContainer.removeClass('hidden') //displays the container for search result

  verseInfo.forEach(verse =>{
    const chapterId = verse.chapterId //JHN.16
    const verseId = verse.id          //JHN.16.33
    const textContent = verse.text    //These things I have spoken unto you, that in me ye might have peace...
    const reference = verse.reference //John 16:33
    

    //adding yellow highlight to user search term in our results         
    const arr = textContent.split(" ")
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      if(element.toUpperCase().includes(searchText.toUpperCase())){
        arr[i] = `<span style="background-color: yellow;">${arr[i]}</span>`
      }
      
    }
    const highlightedContent = arr.join(' '); //convering it back to string          
    const liEl = $("<li>",{
      'class':'w-full bg-white font-bold rounded my-2 px-4 py-1 shadow'
    })
    const pEl = $("<p>",{'class':'italic text-xs font-light'})
    pEl.html(highlightedContent)
    liEl.text(reference)
    liEl.append(pEl)
    searchResult.append(liEl)
  })
}





//amharic bible
fetch(amhURL)
.then((data)=>{
    return data.json()
})
.then(res=>{
  console.log(res)
    console.log(res.books[43].chapters[1].verses[36])   //books = n-1/chapters = n-1/verses = n-1 or n-2...if n is length of array//acts 2:38 = books[43].chapters[1].verses[36]
    document.body.append(res.books[43].chapters[1].verses[36])
  })

  function getAmharicBible(){
    
  }