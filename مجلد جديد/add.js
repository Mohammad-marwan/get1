const addproduct = document.querySelector(".addproduct");
addproduct.onsubmit = async (e)=>{
e.preventDefault();
const elements = e.target.elements;
const title = elements[0].value;
const price = elements[1].value;
const {data} = await axios.post(`https://dummyjson.com/products/add`,{
    title,
    price
})  
}
