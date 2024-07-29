const getproduct = async ()=>{
    const prams = new URLSearchParams(window.location.search);
    const id = prams.get('id');
    console.log(id);
const {data} = await axios.get(`https://dummyjson.com/products/${id}`) ;
return data;
}
getproduct();
const displayproduct = async ()=>{
const data = await getproduct();
const title = `<h2>${data.title}</h2>`
const image = data.images.map((img)=>{
    return `<img src="${img}">
    `
}).join('');
document.querySelector(".products_detils").innerHTML=title;
document.querySelector(".products_images").innerHTML=image;
document.querySelector(".overlay").classList.add("d_none");
}

displayproduct();
