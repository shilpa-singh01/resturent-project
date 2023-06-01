import {useEffect, useState} from 'react';

import './main.css'

const Main = () => {
const[products , setProducts] = useState([]);

useEffect(()=>{
    const savedProducts = JSON.parse(localStorage.getItem("id"));
    if(savedProducts){
        setProducts(savedProducts);
    }
},[]);



    const submitHandler = (e) => {
        e.preventDefault();

       
        const id = e.target.pid.value;
        const pprice = e.target.pprice.value
        const pname = e.target.pname.value
        const category = document.getElementById("select").value;

        const newProduct ={
            id,
            pprice,
            pname,
            category,
        }

        const updatedProducts = [...products ,newProduct ]
        localStorage.setItem(id , JSON.stringify(updatedProducts));
        setProducts(updatedProducts);

        e.target.reset();

 
      

    }

    const handleDelete = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
    
        localStorage.setItem("id", JSON.stringify(updatedProducts));
        setProducts(updatedProducts);
      };
    
    return (
        <>
        <h1 className='h1'>Seller Admin Page</h1>
        <form onSubmit={submitHandler}>
        <div className='container'>
            <label>Product ID :</label>
            <input type='number' id='pid' required />
            <label>Product Name :</label>
            <input type='text' id='pprice' required />
            <label>Product Price :</label>
            <input type='number' id='pname' required />
            <label>Choose a category</label>
            <select name="category" id="select">
                <option>Electronics</option>
                <option>Food</option>
                <option>Skincare</option>
            </select> 

            <button>Add</button>
        </div>
        </form>

        <ul>
            {products.map((product , index)=>(
                <li key={index}>
                    <div>
                        <p>Product ID:{product.id}</p>
                        <p>Product Name:{product.pname}</p>
                        <p>Product Price:{product.pprice}</p>
                        <p>Category: {product.category}</p>
                        <button onClick={() => handleDelete(index)}>Delete</button>
                    </div>

                </li>
            ))}
        </ul>
        </>
    )

}
export default Main;