var API_KEY = 'f3d3fa0749c3c9ed320b8c28e1721147'
var bibleVersionID = 'de4e12af7f28f599-02' //KJV
var offset = 1
// var searchText = 'I have overcome the world.'
// var url = `https://api.scripture.api.bible/v1/bibles/${bibleVersionID}/search?query=${searchText}/`
var amhURL = 'https://raw.githubusercontent.com/magna25/amharic-bible-json/main/amharic_bible.json' //github url for amharic bible

//SELECTORS
const inputEl = $('#input')
const searchBtn = $('#search')
const searchResult = $('#search-result')  //list element
const searchContainer = $('#search-container')//list entire div (container)
var languageSelection = $('#language-selection');
let resultArray = [] //holds amharic ssearch results

searchBtn.on('click', function (e) {
  e.preventDefault()
  $('.loading').removeClass('hidden')   
   if(languageSelection.val()=='en'){
        searchEnglishVerse()   
   }else if(languageSelection.val()=='am'){
    getAmharicBible()
    $('.loading').addClass('hidden')
        
   }
})


function searchEnglishVerse(){  

   
    inputEl.attr('required', '')
    const searchText = inputEl.val()
    if (
      searchText === null ||
      searchText === undefined ||
      searchText.length <= 0
    ) {
      alert('Please provide a key word!')
    }else {
      
      fetch(`https://api.scripture.api.bible/v1/bibles/${bibleVersionID}/search?query=${searchText}/`,
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
         
          displayVerse(result,searchText)
          $('.loading').addClass('hidden')
          if(result.data.verses.length === 0){
            matchNotFound()
            
          }
        })
  
    }

}

//display Verse function
function displayVerse (result,searchText){

  const verseInfo = result.data.verses //verseInfo is array of objects   

  searchResult.empty()
  searchContainer.removeClass('hidden') //displays the container for search result
  $('.loading').removeClass('hidden')
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
    const highlightedContent = arr.join(' '); //converting it back to string          
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

  function getAmharicBible(){
    //amharic bible
    searchBtn.on('click',function(e){
      e.preventDefault()
      const searchText = inputEl.val()
      if (
        searchText === null ||
        searchText === undefined ||
        searchText.length <= 0
      ) {
        alert('እባክዎ ቁልፍ ቃል ያስገቡ')
      }else{
         fetch(amhURL)
      .then((data)=>{
          return data.json()
      })
      .then(res=>{
        console.log(res)
        searchAmharicVerse(res,searchText)
        displayAmharicVerse()
        if(resultArray.length===0){
          matchNotFound()
        }
      })
      }
     
    })
     
  }
  
  function searchAmharicVerse(res,searchText){
    resultArray.length = 0;
    const books = res.books
        books.forEach((item)=>{
          const book = item.title //gENESIS          
          // console.log(book)
          const chapters = item.chapters
          chapters.forEach((item,index)=>{
            const chapterNumber = item.chapter            
            const verseContent = item.verses
            //test variables delete them after test
            let testVar = 'በዚያን ጊዜ እየታበዩ የሚፎክሩትን ከመካከልሽ አወጣለሁና፥ አንቺም በቅዱስ ተራራዬ ዳግመኛ' //sofonyas 3-11
            let testVar2 = 'ከዚህ በኋላ ታላቅ ስልጣን ያለው ሌላ መልአክ ከሰማይ ሲወርድ አየሁ፥ ከክብሩም የተነሣ ምድር በራች።' //rev 18 1 
            let testVar3 = 'ጾርዓን፥ ኤሎንን፥ ኬብሮንን፥ ሠራ።' //1gna zena 10 10 
            let testVar4 = 'ነጋዴዎችሽን ከሰማይ'
            let testVar5 = 'ኢየሱስ'
           
            //search functionality
            //reduce
            
            const result = verseContent.reduce((acc,curr,index)=>{
              if(curr.includes(searchText)){
               return resultArray.push({  //returns an object containing info about the verse match found
                  'book':book,
                  'chapter':chapterNumber,
                  'verse':index+1,
                  'content':curr
                })
              }
              return acc;
            },null)
            
            
          })
        })     
         
  }
//language
 
  languageSelection.on('change', changeLanguage);
  function changeLanguage() {
    var language = languageSelection.val();
    console.log(language)
    if(language =='am'){
        console.log('changed to ',language)
       searchBtn.text('ፈልግ')
       
    }else if(language =='en'){
      console.log('changed to ',language)
      searchBtn.text('Search')
      
    }

   
    
    
  }
 
  function displayAmharicVerse(){
   
    searchResult.empty()
    searchContainer.removeClass('hidden') //displays the container for search result
    

    resultArray.forEach((item)=>{
      const book = item.book
      const chapter = item.chapter
      const verse = item.verse
      const content = item.content
      const reference = book + ' '+chapter+':' + verse

     const liEl = $("<li>",{
      'class':'w-full bg-white font-bold rounded my-2 px-4 py-1 shadow'
    })
    const pEl = $("<p>",{'class':'italic text-xs font-light'})
    pEl.text(content)
    liEl.text(reference)
    liEl.append(pEl)
    searchResult.append(liEl)
    })
  }

  function matchNotFound(){
    console.log('match not found')
    searchResult.empty()
    searchContainer.removeClass('hidden') //displays the container for search result

    
    const pEl = $("<p>",{'class':'italic text-xs text-center font-light'})
    pEl.text('Match not found!')

    
    searchResult.append(pEl)
    
  }

