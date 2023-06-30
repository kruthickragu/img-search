const accessKey = "8g0UXXOjgPiYYyDVPPjhg-Y1Z70KnnSedXGDZkG3MXw"

const formE1 = document.querySelector("form")
const inputE1 = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results")
const showMore = document.getElementById("Show-more-button")

let inputData = ""
let page = 1;

async function searchImages(){
    inputData = inputE1.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

    const response = await fetch(url)
    const data = await response.json()

    const results = data.results
    if (page == 1){
        searchResults.innerHTML=""
    }

    results.map((result)=>{
        const imageWrapper = document.createElement('div')
        imageWrapper.classList.add("search-result") 
        const image = document.createElement('img')
        image.src = result.urls.small
        image.alt = result.alt_description
        const imagelink = document.createElement('a')
        imagelink.href = result.links.html
        imagelink.target="_blank"
        imagelink.textContent = result.alt_description

        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imagelink)
        searchResults.appendChild(imageWrapper)
    })
    
    page++
    if(page>1){
        showMore.style.display = 'block'
    }
}


formE1.addEventListener("submit",(event)=>{
    event.preventDefault()
    page=1;
    searchImages()
})


showMore.addEventListener("click",()=>{
   
    searchImages()
})
