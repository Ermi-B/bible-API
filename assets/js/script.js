console.log('connected')
var API_KEY = "f3d3fa0749c3c9ed320b8c28e1721147";
var bibleVersionID = "de4e12af7f28f599-01";
var offset = 0;
var searchText = ""
var url = `https://api.scripture.api.bible/v1/bibles/${bibleVersionID}/search?query=${searchText}&offset=${offset}/`
var url2 = 'https://api.scripture.api.bible/v1/bibles/'



fetch(url2,{
    headers: {
      'api-key': API_KEY
    }
    }
    )
.then((data)=>{data.json()})
.then((result)=>{
    console.log(result)
})