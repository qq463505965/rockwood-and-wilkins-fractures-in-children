// remove a item in the array by value, self define function
function removeByVal(arrrlist, val){
    for(var i=0;i<arrrlist.length;i++){
        if(arrrlist[i] == val){
            arrrlist.splice(i,1);
            // break;
        }
    }
}
// cover link
var sidebar_section_link = document.getElementsByClassName("sidebar-nav")[0].querySelectorAll("a.section-link");
let sidebar_flag = sidebar_section_link[0];
let iframe_content = document.getElementById("main").getElementsByTagName("iframe")[0];
var cover = document.getElementsByClassName("sidebar")[0].querySelectorAll("#cover")[0];
cover.addEventListener('click',()=>{
    iframe_content.setAttribute("src", "cover.html");
    cover.style = "border-right:2px solid #0d7fc5;color:#0d7fc5;padding-left: 15px;line-height: 2em;cursor: pointer;";
    sidebar_flag.classList.remove("active");
    sidebar_third_flag.classList.remove("active");
    sidebar_fourth_flag.classList.remove("active");
    sidebar_flag = iframe_content;

    localStorage.setItem("element-c","COVER");
    localStorage.setItem("element-1","COVER");
    localStorage.setItem("element-2","");
    localStorage.setItem("element-3","");
})

// sidebar li elements   clicked with selected status
sidebar_section_link.forEach(a_section_link=>{
    a_section_link.addEventListener('click', ()=>{
        sidebar_flag.classList.remove("active");
        sidebar_third_flag.classList.remove("active");
        // document.getElementsByClassName("sidebar-nav")[0].querySelectorAll("a.h1-link").forEach(a_h1_link=>{a_h1_link.parentNode.classList.remove("active")});
        sidebar_fourth_flag.classList.remove("active");
        localStorage.setItem("element-2",""); // when the chapter was clicked, all below element's selected format are removed
        localStorage.setItem("element-3","");
        localStorage.setItem("element-c","");

        a_section_link.classList.add("active");
        sidebar_flag = a_section_link;
        localStorage.setItem("element-1", sidebar_flag.innerText);
        iframe_content.setAttribute("src", a_section_link.innerText.concat(".html"));  // set iframe src attribute
        cover.style = "padding-left: 15px;line-height: 2em;cursor: pointer;";  // remove the cover element's style
    })
})

// sidebar hide and show
var toggle_button = document.getElementsByClassName("sidebar-toggle")[0];
var sidebar_element = document.getElementsByClassName("sidebar")[0];
var content_element = document.getElementsByClassName("content")[0];
toggle_button.addEventListener("click",()=>{
    if(sidebar_element.className=="sidebar hide"){
        sidebar_element.classList.remove("hide");
        content_element.style = "left:450px;"
    }
    else{
        sidebar_element.classList.add("hide");
        content_element.style = "left:16px;"
    }
})

// fold and unfold sidebar elements
// initialize the icon
var icon_i = 0;
var unfold_icon = document.getElementsByClassName("sidebar-nav")[0].querySelectorAll("a.unfold-icon");
for(icon_i = 0; icon_i <= unfold_icon.length; icon_i ++){
    try {
        if(unfold_icon[icon_i].parentNode.nextElementSibling.tagName=="UL"){
            if(window.getComputedStyle(unfold_icon[icon_i].parentNode.nextElementSibling).display == "none"){
                unfold_icon[icon_i].innerHTML="+";
            }
            else{
                unfold_icon[icon_i].innerHTML="&minus;";
            }
        }
        else{
            unfold_icon[icon_i].innerHTML="+";
            unfold_icon[icon_i].style = "color:transparent;"
        }
    }
    catch {
        try{
            unfold_icon[icon_i].innerHTML="+";
            unfold_icon[icon_i].style = "color:transparent;"
        }
        catch{}
    }
}
// click event
var icon_expand = [];
try{
    if(JSON.parse(localStorage.getItem("icon-expand"))){
        // if the html file is runned first time, the array will be null, so it will be wrong!
        // this if statement fit this bug
        icon_expand = JSON.parse(localStorage.getItem("icon-expand"));
    }
}catch{}
unfold_icon.forEach((a_icon, index)=>{
    a_icon.addEventListener('click', ()=>{
        try{
            if(a_icon.parentNode.nextElementSibling.tagName == "UL"){
                if(window.getComputedStyle(a_icon.parentNode.nextElementSibling).display == "none"){
                    a_icon.innerHTML="&minus;";
                    a_icon.parentNode.nextElementSibling.setAttribute("style","display:block;")
                    icon_expand.push(index);
                }
                else{
                    a_icon.innerHTML="+";
                    a_icon.parentNode.nextElementSibling.setAttribute("style","display:none;")
                    removeByVal(icon_expand, index);
                }
            }
        }
        catch{alert("error! -- index.js -- line 115");}
        // alert(icon_expand);
        localStorage.setItem("icon-expand", JSON.stringify(icon_expand));
    })
})
// navigate    click event   h1 level = third level
// sidebar li elements  clicked with selected status  third level
var third_level = document.getElementsByClassName("sidebar-nav")[0].querySelectorAll("a.h1-link");
let sidebar_third_flag = third_level[0];
third_level.forEach(third_a=>{
    third_a.addEventListener('click', ()=>{
        var address = third_a.getAttribute("data-src");
        var chapter = third_a.parentNode.parentNode.previousElementSibling.getElementsByClassName("section-link")[0].innerText.concat(".html");
        iframe_content.setAttribute("src",chapter.concat(address));
        
        sidebar_flag.classList.remove("active");
        sidebar_third_flag.classList.remove("active");
        sidebar_fourth_flag.classList.remove("active");
        third_a.parentNode.parentNode.previousElementSibling.getElementsByClassName("section-link")[0].classList.add("active");
        sidebar_flag = third_a.parentNode.parentNode.previousElementSibling.getElementsByClassName("section-link")[0];
        third_a.parentNode.classList.add("active");
        localStorage.setItem("element-1", third_a.parentNode.parentNode.previousElementSibling.getElementsByClassName("section-link")[0].innerText);
        localStorage.setItem("element-2",third_a.getAttribute("data-src"));
        localStorage.setItem("element-3","");
        localStorage.setItem("element-c","");
        sidebar_third_flag = third_a.parentNode;
        cover.style = "padding-left: 15px;line-height: 2em;cursor: pointer;";  // remove the cover element's style
    })
})
// navigate    click event   h2 level = fourth level
var fourth_level = document.getElementsByClassName("sidebar-nav")[0].querySelectorAll("a.h2-link");
var sidebar_fourth_flag = fourth_level[0];
var chapter_autoload_position = false;
fourth_level.forEach(fourth_a=>{
    fourth_a.addEventListener('click', ()=>{
        var part = fourth_a.getAttribute("data-src");
        var chapter = fourth_a.parentNode.parentNode.parentNode.previousElementSibling.getElementsByClassName("section-link")[0].innerText.concat(".html");
        iframe_content.setAttribute("src",chapter.concat(part))


        sidebar_flag.classList.remove("active");
        sidebar_third_flag.classList.remove("active");
        sidebar_fourth_flag.classList.remove("active");
        fourth_a.parentNode.parentNode.previousElementSibling.classList.add("active");
        fourth_a.parentNode.parentNode.parentNode.previousElementSibling.getElementsByClassName("section-link")[0].classList.add("active");

        sidebar_flag = fourth_a.parentNode.parentNode.parentNode.previousElementSibling.getElementsByClassName("section-link")[0];
        localStorage.setItem("element-1", sidebar_flag.innerText);

        sidebar_third_flag = fourth_a.parentNode.parentNode.previousElementSibling;
        localStorage.setItem("element-2",sidebar_third_flag.getElementsByClassName("h1-link")[0].getAttribute("data-src"));

        fourth_a.parentNode.classList.add("active");
        sidebar_fourth_flag = fourth_a.parentNode;
        localStorage.setItem("element-3",fourth_a.getAttribute("data-src"));
        localStorage.setItem("element-c","");
        cover.style = "padding-left: 15px;line-height: 2em;cursor: pointer;";  // remove the cover element's style
    })
})



// when the web page was refreshed and reloaded, the page would recover to previous format
window.onload = function(){
    // if it were cover selected
    if(localStorage.getItem("element-c").toUpperCase() == "COVER"){
        document.getElementById("main").getElementsByTagName("iframe")[0].setAttribute("src", "cover.html");
        document.getElementsByClassName("sidebar")[0].children[0].style = "border-right:2px solid #0d7fc5;color:#0d7fc5;padding-left: 15px;line-height: 2em;cursor: pointer;";
    }
    // recover sidebar section-link selected
    for (const a of document.querySelectorAll("a.section-link")) {
        if ((a.textContent.toUpperCase()).includes(localStorage.getItem("element-1").toUpperCase())) {
            a.classList.add("active");
            sidebar_flag = a;
            iframe_content.setAttribute("src", a.innerText.concat(".html"));  // set iframe src attribute
        }
        else
        {}
    }
    // recover sidebar h1-link selected
    for (const a of document.querySelectorAll("a.h1-link")) {
        a.getAttribute("data-src")
        if ((a.getAttribute("data-src") == localStorage.getItem("element-2"))) {
            a.parentNode.classList.add("active");
            sidebar_third_flag = a.parentNode;
        }
    }
    // recover sidebar h2-link selected
    for (const a of document.querySelectorAll("a.h2-link")) {
        a.getAttribute("data-src")
        if ((a.getAttribute("data-src") == localStorage.getItem("element-3"))) {
            a.parentNode.classList.add("active");
            sidebar_fourth_flag = a.parentNode;
        }
    }
    // recover sidebar expand elements
    var icon_expand_2 = JSON.parse(localStorage.getItem("icon-expand"));
    for(var i=0;i<icon_expand_2.length;i++){
        unfold_icon[Number(icon_expand_2[i])].innerHTML="&minus;";
        unfold_icon[Number(icon_expand_2[i])].parentNode.nextElementSibling.setAttribute("style","display:block;")
    }
        
    // recover sidebar to the previous position -- this line should be after the recovering sidebar expand elements
    document.getElementById("sidebar").scrollTop = Number(localStorage.getItem("index_position"));
}

document.getElementById("sidebar").onscroll = function(){
    // save the sidebar scroll position
    localStorage.setItem("index_position", document.getElementById("sidebar").scrollTop);
}

// help icon
var help = document.getElementsByClassName("sidebar")[0].querySelectorAll("#question_icon")[0];
help.addEventListener('click',()=>{
    window.open("help/help.html");
})

var is_firefox = navigator.userAgent.toLowerCase().indexOf("firefox");
// var is_chrome = navigator.userAgent.toLowerCase().indexOf("chrome");
if(is_firefox>0){
    // firefox
    help.style = "right:20px;"
}
else{
    // only installed two browsers, so the other is chrome
    help.style = "right:37px;"
}

