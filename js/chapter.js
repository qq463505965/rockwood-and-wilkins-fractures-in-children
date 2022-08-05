var scroll_top_img = document.body.getElementsByClassName("scroll-top")[0]
// click the arrow up, the document goes up.
scroll_top_img.addEventListener('click', ()=>{
    document.documentElement.scrollTop=0;
})
// initialize the arrow up icon, if top=0, invisible, else visible.
if (document.documentElement.scrollTop){
    scroll_top_img.style = "position:fixed;bottom: 60px; right: 20px;z-index: 35;cursor: pointer;";
}
else{
    scroll_top_img.style = "position:fixed;bottom: 60px; right: 20px;z-index: 35;cursor: pointer;width:0px;height:0px;";
}

// while scrolling, show the icon and save the position of chapter.
document.onscroll = function(){
    if (document.documentElement.scrollTop){
        scroll_top_img.style = "position:fixed;bottom: 60px; right: 20px;z-index: 35;cursor: pointer;";
        localStorage.setItem("chapter_position", document.documentElement.scrollTop);
    }
    else{
        scroll_top_img.style = "position:fixed;bottom: 60px; right: 20px;z-index: 35;cursor: pointer;width:0px;height:0px;";
        localStorage.setItem("chapter_position", document.documentElement.scrollTop);
        
    }
}

// recover the last position in each chapter html
document.onbeforeunload = function(){
    localStorage.setItem("chapter_position", document.documentElement.scrollTop);
}

window.onload = function(){
    document.documentElement.scrollTop = Number(localStorage.getItem("chapter_position"));
}
// open a reference in a new window from the num
var references = document.querySelectorAll("sup.reference");
references.forEach((ref)=>{
    ref.addEventListener('click', ()=>{
        // get the filename according to the data-src attribute
        window.open("references/".concat(ref.getAttribute("data-src")));
    })
})

// open a reference in a new window from the document svg icon
var document_svg = document.querySelectorAll("img.document-svg");
document_svg.forEach((ref)=>{
    ref.addEventListener('click', ()=>{
        // get the filename according to the data-src attribute
        window.open("references/".concat(ref.getAttribute("data-src")));
    })
})
