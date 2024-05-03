//ontokenrespon sistemala!!!
//problema di flex-shrink 
//quando clicclo esc il testo di svuota (hotel)
//ricorda di levare i console.log
//newsletter

const navClick = document.querySelectorAll('.header_nav_lower span');
const popUpMenu = document.querySelectorAll('.pop_up_menu');
const closeButton = document.querySelectorAll('.close');
const images = document.querySelectorAll('.section-box img');
const header_scroll = document.querySelector('.header_scroll');
const white_bar = document.querySelector('.white');
const header_fix = document.querySelector('header');
const navClickScroll = document.querySelectorAll('.header_scroll span');
const search_icon = document.querySelector('.header_nav_lower img');
const modalView = document.querySelector('#modal_view');
const modalViewForm = document.querySelector('#modal_view form');
const textBox = document.querySelector('.text_box');
const searchIconScroll = document.querySelector ('.header_scroll img');
const textBoxMail = document.querySelectorAll('.a');
const form_hotel = document.querySelector('#modal_view_hotel form');
const modalViewHotel = document.querySelector('#modal_view_hotel');
const modalViewArtworks = document.querySelector('#modal_view_artworks');
const artworkResults = document.querySelector('#artworks_results');
const hotel_grid = document.querySelector('.hotel_grid');
const nearby_hotel_click = document.querySelectorAll('.hotel');
const my_api_key = '605fe4c119msh474c466ec9a765dp14fd40jsn77c52d3be8dc';
//chiavi scadute "838310cca6msh7d61d361461e895p122d46jsn6a90eb379efb"
//chiavi non usate '022b4901d2mshc22ec5bba4faa35p19c891jsndd905e2f2fba'
const latitude = "40.730610";
const longitude = "-73.935242";
const client_id = "b29a8bd46d37ea752b70";
const client_secret ="c2bef07647734ee67d2b7e86b47469a0";
let token;


function showMenu (event){
    const index = parseInt(event.currentTarget.dataset.index);
    for (p of popUpMenu){
        p.classList.add('hidden');
    }
    document.body.classList.add('no-scroll');
    switch(index){
        case 1:
            const popUpMenu1 = document.querySelector('#pop_up_m_v');
            popUpMenu1.classList.remove('hidden');
            break;
        case 2:
            const popUpMenu2 = document.querySelector('#pop_up_m_w');
            popUpMenu2.classList.remove('hidden');
            break;
        case 3:
            const popUpMenu3 = document.querySelector('#pop_up_m_a');
            popUpMenu3.classList.remove('hidden');
            break;
    }
}

for (n of navClick){
    n.addEventListener('click', showMenu);
}

for (n of navClickScroll){
    n.addEventListener('click', showMenu);
}

function hideMenu(){
    for (const p of popUpMenu){
        p.classList.add('hidden');
    }
    document.body.classList.remove('no-scroll');
}

for (const c of closeButton){
    c.addEventListener('click', hideMenu);    
}

function changeImg(event) {
    const image = event.currentTarget;
    const index = parseInt(image.dataset.index);
    switch (index) {
        case 1:
            image.src = 'images/s1_js.jpg';
            break;
        case 2:
            image.src = 'images/s2_js.jpg';
            break;
        case 3:
            image.src = 'images/s3_js.jpg';
            break;
        case 4:
            image.src = 'images/s4_js.jpg';
            break;
        case 5:
            image.src = 'images/s5_js.avif';
            break;
        case 6:
            image.src = 'images/s6_js.jpg';
            break;
        case 7:
            image.src = 'images/s7_js.jpg';
            break;
        case 8:
            image.src = 'images/s8_js.webp';
            break;
    }
}

function resetImg(event) {
    const image = event.currentTarget;
    const index = parseInt(image.dataset.index);
    switch (index) {
        case 1:
            image.src = 'images/section_s1.webp';
            break;
        case 2:
            image.src = 'images/section_s2.jpg';
            break;
        case 3:
            image.src = 'images/section_s3.jpg';
            break;
        case 4:
            image.src = 'images/section_s4.jpg';
            break;
        case 5:
            image.src = 'images/section_s5.jpg';
            break;
        case 6:
            image.src = 'images/section_s6.jpg';
            break;
        case 7:
            image.src = 'images/section_s7.jpg';
            break;
        case 8:
            image.src = 'images/section_s8.jpg';
            break;
    }
}


for (const image of images) {
    image.addEventListener('mouseenter', changeImg);
    image.addEventListener('mouseleave', resetImg);
}

function checkScrolling(event)
{
    let scroll = document.documentElement.scrollTop;
    if(scroll > 0) 
    {
        header_scroll.classList.remove('hidden');
        white_bar.classList.remove('hidden');
        header_fix.classList.add('hidden');
        
    }
    else
    {
        header_scroll.classList.add('hidden');
        white_bar.classList.add('hidden');
        header_fix.classList.remove('hidden');
    }
}

document.addEventListener('scroll',checkScrolling);

function showSearchBar(){
    modalView.classList.remove('hidden');
    document.body.classList.add('no-scroll');
}

search_icon.addEventListener('click', showSearchBar);
searchIconScroll.addEventListener('click', showSearchBar);

function hideSearchBar(event){
        modalView.classList.add('hidden');
        document.body.classList.remove('no-scroll');
}

modalView.addEventListener('click', hideSearchBar);

function stopProp(event)
{
    event.stopPropagation();
}

textBox.addEventListener('click', stopProp);

function onWriteText(){
    const newDiv = document.createElement("span");  
    newDiv.textContent='CANCEL';
    newDiv.classList.add('modal_view_div');
    modalViewForm.appendChild(newDiv); 
    textBox.removeEventListener('input', onWriteText);
    newDiv.addEventListener('click', deleteText); 
    newDiv.addEventListener('click', stopProp);
}

textBox.addEventListener('input', onWriteText);

function deleteText(){
    textBox.value='';
}

function storeMail (event){
    const type=event.currentTarget.dataset.info;
    if(event.key === 'Enter'){
        event.currentTarget.value='';
        if(type === 'newsLetter'){
            event.currentTarget.placeholder="You are now subscribed.";
        }
        else {
            event.currentTarget.placeholder="We'll keep you posted!";
        }
    event.currentTarget.disabled = true;
    event.currentTarget.removeEventListener('keypress', storeMail);
    }
}

for(t of textBoxMail){  
    t.addEventListener('keypress', storeMail);
}

///////////////////////////////////////////////////////// API ////////////////

function onJson(json) {
    hotel_grid.innerHTML='';
    console.log(json);
    const status = json.status;
    if(status === false){
        const err_message = document.createElement("h1");
        err_message.textContent = 'No results found for this period.';
        err_message.classList.add('error_message');
        modalViewHotel.appendChild(err_message);
    }
    else{
        const list_result = json.data.data;
        for(result of list_result){
            const title = result.title;
            const rating = result.bubbleRating.rating;
            const price_number = result.priceForDisplay;
            const price = String(price_number);
            const provider = result.provider;
            const photo_list = result.cardPhotos;  
            const photo_full= photo_list[0].sizes.urlTemplate;
            const photo_array = photo_full.split('?');
            const photo = photo_array [0];
            const url_booking = result.commerceInfo.externalUrl;
            //aggiungo gli elementi estratti dalla query
            const hotel_box = document.createElement("div");
            hotel_grid.appendChild(hotel_box);
            hotel_box.classList.add('single_hotel');

            const h1 = document.createElement("h1");
            h1.textContent=title;
            const span1 = document.createElement("span");
            span1.textContent= 'rating: ' + rating;
            const img = document.createElement("img");
            img.src=photo;
            const span2 = document.createElement("span");
            span2.textContent= 'provider: ' + provider;
            const span3 = document.createElement("span");
            span3.textContent= 'price: ' + price;
            const link = document.createElement("a");
            link.href=url_booking;
            link.textContent='book now';

            
            hotel_box.appendChild(h1);
            hotel_box.appendChild(span1);
            hotel_box.appendChild(img);
            hotel_box.appendChild(span2);
            hotel_box.appendChild(span3);
            hotel_box.appendChild(link);
            
        }
    }
}
  

function onResponse(response) {
    if (!response.ok) {
      console.log("Error: " + response);
      return null;
    } else return response.json();
}

function search(event) {
    event.preventDefault();
    const check_in = document.querySelector("#check_in");
    const check_out = document.querySelector('#check_out');
    const adults = document.querySelector('#adult');
    const rooms = document.querySelector('#rooms');
    const check_in_value = encodeURIComponent(check_in.value);
    const check_out_value = encodeURIComponent(check_out.value);
    const adults_value = encodeURIComponent(adults.value);
    const rooms_value = encodeURIComponent(rooms.value);
  
    const url = 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotelsByLocation?latitude=' + latitude + '&longitude=' + longitude + '&checkIn=' + check_in_value + '&checkOut=' + check_out_value +'&pageNumber=1&adults=' + adults_value + '&rooms=' + rooms_value + '&currencyCode=USD';
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": my_api_key,
        "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
      },
    };

    fetch(url, options).then(onResponse).then(onJson);
}

form_hotel.addEventListener('submit', search);

function modalHotel(){
    modalViewHotel.classList.remove('hidden');
    document.body.classList.remove('no-scroll'); //perche sui click nella navbar c'è una funzione che leva lo scroll
}

for (n of nearby_hotel_click) { 
    n.addEventListener('click', modalHotel);
}

function hideModalHotel (event){
    if(event.key === "Escape"){
        modalViewHotel.classList.add('hidden');
        document.body.classList.remove('no-scroll'); //perche sui click nella navbar c'è una funzione che leva lo scroll
    }

}

document.addEventListener('keydown', hideModalHotel);

////////////////// API CON OAUTH ///////////////////////////////////////////

fetch("https://api.artsy.net/api/tokens/xapp_token?client_id=" + client_id + "&client_secret=" + client_secret,
{
    method: "post"
}
).then(onResponse).then(onTokenJson);


function onTokenJson(json)
{
  console.log(json)
  token = json.token;
}

function onTokenResponse(response)
{
  return response.json();
}

function search2(event){
    event.preventDefault();
    let url = "https://api.artsy.net/api/artists/";
    //il testo inserito dall'utente deve essere separato da trattini
    const user_input = textBox.value;
    console.log(user_input);
    const array = user_input.split(" ");
    for (let i=0; i<array.length; i++){
        if(i!=array.length-1)
            url += array[i] + "-";
        else url += array[i];
    }
    fetch(url, 
    {
      headers:
      {
        'X-Xapp-Token':  token
      }
    }
  ).then(onResponse).then(onJson2);

  
}

let artist_name;
let artist_location;

function onJson2(json){
    console.log(json);
    artist_name = json.name; //nome
    artist_location = json.location; //localita
    const id_artist = json.id;
    let url_artworks = "https://api.artsy.net/api/artworks?artist_id=";
    fetch(url_artworks + id_artist, 
        {
          headers:
          {
            'X-Xapp-Token':  token
          }
        }
      ).then(onResponse).then(onJson3);

}

function onJson3(json){
    modalView.classList.add('hidden');
    modalViewArtworks.classList.remove('hidden');
    textBox.value="";
    artworkResults.innerHTML='';
    const h1_remove = modalViewArtworks.querySelectorAll('h1');
    for (h of h1_remove)
        h.remove();

    const name = document.createElement("h1");
    name.textContent=artist_name;
    modalViewArtworks.insertBefore(name, artworkResults);
    const loc = document.createElement("h1");
    loc.textContent=artist_location;
    modalViewArtworks.insertBefore(loc, artworkResults);

    console.log(json); 
    const artworks = json._embedded.artworks;
    const thum_src = [];
    const titles = [];
    console.log(artworks);
    for (let i=0; i<artworks.length; i++){
            thum_src[i] = artworks[i]._links.thumbnail.href;
            titles[i]=artworks[i].title;
    }
    
    for(let i=0; i<thum_src.length; i++){
        const new_div = document.createElement("div");
        artworkResults.appendChild(new_div);
        new_div.classList.add('artworks_and_title');
        const img = document.createElement("img");
        img.src=thum_src[i];
        const title = document.createElement("span");
        title.textContent=titles[i];
        new_div.appendChild(img);
        new_div.appendChild(title);
    } 

    document.body.classList.add('no-scroll');
    modalViewArtworks.classList.add('scroll');
}

modalViewForm.addEventListener('submit', search2);

function hideArtworks(event){
    modalViewArtworks.classList.add('hidden');
    document.body.classList.remove('no-scroll');
    modalViewArtworks.classList.remove('scroll');
}

modalViewArtworks.addEventListener('click', hideArtworks);
artworkResults.addEventListener('click', stopProp);


