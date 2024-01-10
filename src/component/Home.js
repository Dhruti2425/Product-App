import { useEffect, useState } from 'react';

import { Container } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { FaStar } from 'react-icons/fa';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const colors = {
    yellow: "#FACE69",
    gray: "gray"
}

function Home(){

    let [product , setProduct] = useState({});
    let [data , setData] = useState([]);
    let [error , setError] = useState({});

    let [category , SetCategory] = useState(['Accessories','Fitness','Clothing','Beauty','Health','Food','Education','Electronics']);

    const stars = Array(5).fill(0);
    let [currentValue, setCurrentValue] = useState(0);
    let [mouseValue, setMouseValue] = useState(0);

    useEffect(()=>{
        setTimeout(() => {
            let localData = JSON.parse(localStorage.getItem('Product'));
            if(localData == null){
                setData([]);
            }
            else{
                setData(localData);
            }
        },1000);
    },setData);

    const handleClick = (pos) => {
        setCurrentValue(pos);
        setProduct({ ...product, ['star']: pos });
        setCurrentValue(0);
    }

    const handleMouse = (pos) => {
        setMouseValue(pos)
    }
            
    let getInputValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if(name == 'pname'){
            if(value == ''){
                setError({...error , ['pname'] : "Name is required..."})
            }
            else if(value.length < 3){
                setError({...error , ['pname'] : "Name must be atleast 3 or more characters..."})
            }
            else{
                setError({...error , ['pname'] : ""})
            }
        }
        else if(name == 'price'){
            if(value == ''){
                setError({...error , ['price'] : "Price is required..."})
            }
            else{
                setError({...error , ['price'] : ""})
            }
        }
        else if(name == 'category'){
            if(value == ''){
                setError({...error , ['category'] : "category is required..."})
            }
            else{
                setError({...error , ['category'] : ""})
            }
        }
        else if(name == 'img'){
            if(value == ''){
                setError({...error , ['img'] : "Image is required..."})
            }
            else{
                setError({...error , ['img'] : ""})
            }
        }
        

        if (name == 'img') {
            value = value.substr(12, value.length);
        }

        setProduct({...product , [name] : value});
    }

    let handleSubmitData = (e) => {
        e.preventDefault();

        if(e.target.pname.value == ''){
            setError({...error , ['pname'] : "Name is required..."})
        }
        else if(e.target.price.value == ''){
            setError({...error , ['price'] : "Price is required..."})
        }
        else if(e.target.category.value == ''){
            setError({...error , ['category'] : "Category is required..."})
        }
        else if(e.target.img.value == ''){
            setError({...error , ['img'] : "Image is required..."})
        }

        else{

            let quantity = parseInt(prompt("Enter Quantity Of Your Product"));

            let status;
    
            if(quantity <= 0){
                status = 'OUT OF STOCK';
            }
            else if(quantity < 10){
                status = 'LOW STOCK';
            }
            else{
                status = 'INSTOCK';
            }
    
            if(quantity){
    
                let newRecord = {...product , ['status'] : status};
                setProduct(newRecord);
                
                let record = [...data,newRecord];
                setData(record);
    
                let confirm = window.confirm('Are You Sure To Store Data In LocalStorage...');
                if (confirm) {
    
                    toast.success("Data Inserted SuccessFully...");
                    localStorage.setItem('Product' , JSON.stringify(record));
    
                    setProduct({});
                }
                else {
    
                    toast.error("Data Not Inserted !!!");
                    setProduct({});
                
                }
                e.target.img.value = "";
    
            }
            else{
                toast.error("Data Not Inserted !!!");
            }
        }
    }

    return(
        <Container>
            <Form className='mt-4' onSubmit={(e) => handleSubmitData(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Product Name" value={product.pname ? product.pname : ""} name='pname' onChange={(e) => getInputValue(e)}/>
                    <span style={{color : "red"}}>{error.pname ? error.pname : ""}</span>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" placeholder="Enter Product Price" value={product.price ? product.price : ""} name='price' onChange={(e) => getInputValue(e)}/>
                    <span style={{color : "red"}}>{error.price ? error.price : ""}</span>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Select value={product.category ? product.category : ""} name='category' onChange={(e) => getInputValue(e)} >
                        <option value='' hidden>Select Product Category</option>
                        {category.map((v,i)=>{
                            return(
                                <option value={v}>{v}</option>
                            )
                        })}
                    </Form.Select>
                    <span style={{color : "red"}}>{error.category ? error.category : ""}</span>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicImage">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" name='img' onChange={(e) => getInputValue(e)}/>
                    <span style={{color : "red"}}>{error.img ? error.img : ""}</span>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicImage">
                    <Form.Label>Review</Form.Label>
                    <div>
                        {stars.map((v, index) => {
                            return (
                                <FaStar key={index} color={(currentValue || mouseValue) > index ? colors.yellow : colors.gray} size={30} onClick={() => handleClick(index + 1)} onMouseOver={() => handleMouse(index + 1)} />
                            )
                        })}
                    </div>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <ToastContainer position="top-center" />
        </Container>
    )
}

export default Home;