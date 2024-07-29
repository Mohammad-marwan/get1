const gitproduct = async (page)=>{
    const limit = 20;
    const skip =(page-1)*limit;
const{data} = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);

return data;

}

gitproduct();
const displayproduct = async(page = 1)=>{
    try{
    const data = await gitproduct(page);
    const product = data.products;
    const numberOfPage = Math.ceil( data.total / data.limit);
    const result = product.map((product)=>{
        return `
        <div class="product">
        <h2>${product.title}</h2>
        <img src="${product.thumbnail}" />
        <div class="flex">
        <a href="detils.html?id=${product.id}">detils</a>
        <button onclick = 'deletdata(${product.id}) '>delete</button>
        </div>
        </div>
        `

    }).join('');
    document.querySelector(".products").innerHTML = result;
    let pagination = ` `;
    if(page > 1){
        pagination += `<li class="page-item"><button onclick = displayproduct(${page - 1}) class="page-link">&laquo;</button></li>`
    }else{
         pagination += `<li class="page-item"><button class="page-link disable">&laquo;</button></li>`
    }
    for(let i = 1; i <=numberOfPage; i++) {
        pagination +=` <li class="page-item"><button onclick = displayproduct(${i})  class="page-link">${i}</button></li>`
    }
    if(numberOfPage > page){
 pagination += `<li class="page-item"><button onclick = displayproduct(${page + 1}) class="page-link" href="#">&raquo;</button></li>`
    
    }else{
        pagination += `<li class="page-item"><button class="page-link disable" href="#">&raquo;</button></li>`
    }
   
   document.querySelector(".pagination").innerHTML = pagination;

   const my_modal = document.querySelector('.my_modal');
const close_btn = document.querySelector('.close_btn');
const right_btn = document.querySelector('.right_btn');
const left_btn  = document.querySelector('.left_btn');
const all_image =Array.from (document.querySelectorAll('img'));
let curentindex = 0;
right_btn.addEventListener('click',()=>{
    curentindex++;
    if(curentindex >= all_image.length ){
        curentindex = 0;
    }
    const nextImg = all_image[curentindex].getAttribute("src");
    my_modal.querySelector("img").setAttribute("src",nextImg) ;


});
left_btn.addEventListener('click',()=>{
    curentindex--;
    if(curentindex < 0 ){
        curentindex = all_image.length;
    }
    const prevImg = all_image[curentindex].getAttribute("src");
    my_modal.querySelector("img").setAttribute("src",prevImg) ;


});





    for(let i=0; i<all_image.length; i++){
        all_image[i].addEventListener("click", (e) =>{
            my_modal.classList.remove("d_none");
            my_modal.querySelector("img").setAttribute("src",e.target.src) ;
            const currentimg = e.target;
           curentindex = all_image.indexOf(currentimg);
          
        
           
            
        });
    }
    close_btn.addEventListener("click", (e) =>{

        my_modal.classList.add("d_none");

    });

}
catch(e){
    const  result = `
    <h2>error</h2>`;
    document.querySelector(".products").innerHTML = result;
}
finally{
    document.querySelector(".overlay").classList.add("d_none");
 
}
}
const deletdata = async (id)=>{
try{
const {data} = await axios.delete(`https://dummyjson.com/products/${id}`);
console.log(data);

}
catch(e){
    alert("error deleting");
}
}
displayproduct();
window.onscroll=function(){
    const nav = document.querySelector(".navbar");
    const about = document.querySelector(".about");
    const list_about = document.querySelector(".list_about");
    if(window.scrollY > about.offsetTop){
        nav.classList.add("scrollnav");
        list_about.classList.add("scrollnav");

    }
    else{
        nav.classList.remove("scrollnav");
        list_about.classList.remove("scrollnav");
    }
 
}
