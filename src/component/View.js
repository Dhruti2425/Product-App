import { Container } from "react-bootstrap";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useEffect, useState } from 'react';

import { FaStar } from 'react-icons/fa';

import NavDropdown from 'react-bootstrap/NavDropdown';

const colors = {
    yellow: "#FACE69",
    gray: "gray"
}

function View(){

    let [data, setData] = useState([]); 
    let [search , setSearch] = useState('');
    let [symbol, setSymbol] = useState("");

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

    let sortDataByName = (e) => {
        let dd = [...data];
        let ds;
        if (symbol == "↑") {
            setSymbol("↓")
            ds = dd.sort((a, b) => a.pname < b.pname ? 1 : -1);
        }
        else {
            setSymbol("↑")
            ds = dd.sort((a, b) => a.pname > b.pname ? 1 : -1);
        }

        setData(ds);
    }

    let sortDataByPrice = (e) => {
        let dd = [...data];
        let ds;
        if (symbol == "↑") {
            setSymbol("↓")
            ds = dd.sort((a, b) => a.price < b.price ? 1 : -1);
        }
        else {
            setSymbol("↑")
            ds = dd.sort((a, b) => a.price > b.price ? 1 : -1);
        }

        setData(ds);
    }

    let sortDataByCategory = (e) => {
        let dd = [...data];
        let ds;
        if (symbol == "↑") {
            setSymbol("↓")
            ds = dd.sort((a, b) => a.category < b.category ? 1 : -1);
        }
        else {
            setSymbol("↑")
            ds = dd.sort((a, b) => a.category > b.category ? 1 : -1);
        }

        setData(ds);
    }

    return(
        <Container>

            <div className="search">
                <Form.Group className="mt-4 d-flex align-items-center" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Searching..." name="search" onChange={(e) => setSearch(e.target.value)}/>
                    <NavDropdown title="Sort By" id="basic-nav-dropdown" className="px-4 py-2 ms-3 bg-warning rounded">
                        <NavDropdown.Item onClick={(e) => sortDataByName(e)}>Name</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={(e) => sortDataByPrice(e)}>Price</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={(e) => sortDataByCategory(e)}>Category</NavDropdown.Item>
                    </NavDropdown>
                </Form.Group>
            </div>

            <div className="viewProduct my-5 w-100 p-5">
                <div className="product border border-1 rounded px-4 py-3 mb-3">
                    <h2 className="m-0 p-0">Products</h2>
                </div>

                <div>
                    <Row className="px-2 py-4 mx-1 border-bottom border-3 mb-3">
                        <Col><h5 className="m-0">Name</h5></Col>
                        <Col><h5 className="m-0">Image</h5></Col>
                        <Col><h5 className="m-0">Price</h5></Col>
                        <Col><h5 className="m-0">Category</h5></Col>
                        <Col><h5 className="m-0">Reviews</h5></Col>
                        <Col><h5 className="m-0">Status</h5></Col>
                    </Row>
                </div>


                {data.filter((v,i) => {
                    if(v.pname.toLocaleLowerCase().match(search.toLocaleLowerCase())){
                        return v;
                    }
                    else if(v.category.toLocaleLowerCase().match(search.toLocaleLowerCase())){
                        return v;
                    }
                    else if(v.status.toLocaleLowerCase().match(search.toLocaleLowerCase())){
                        return v;
                    }

                }).map((v,i) => {
                    return(
                        <div className="productDetail px-4 py-2 border-bottom border-1">
                            <Row className="align-items-center">
                                <Col>{v.pname}</Col>
                                <Col>{v.img ? <img src={require("../assets/images/" + v.img)} width={100} height={100}/> : ""}</Col>
                                <Col>{v.price} Rs</Col>
                                <Col>{v.category}</Col>
                                <Col>
                                    <div className='review-show'>
                                        <p>{v.star > 4 ?
                                            <>
                                                <FaStar key={i} color={colors.yellow} size={25} />
                                                <FaStar key={i + 1} color={colors.yellow} size={25} />
                                                <FaStar key={i + 2} color={colors.yellow} size={25} />
                                                <FaStar key={i + 3} color={colors.yellow} size={25} />
                                                <FaStar key={i + 4} color={colors.yellow} size={25} />
                                            </>
                                            :
                                            v.star > 3 ?
                                                <>
                                                    <FaStar key={i + 1} color={colors.yellow} size={25} />
                                                    <FaStar key={i + 2} color={colors.yellow} size={25} />
                                                    <FaStar key={i + 3} color={colors.yellow} size={25} />
                                                    <FaStar key={i + 4} color={colors.yellow} size={25} />
                                                </>
                                                :
                                                v.star > 2 ?
                                                    <>
                                                        <FaStar key={i} color={colors.yellow} size={25} />
                                                        <FaStar key={i + 1} color={colors.yellow} size={25} />
                                                        <FaStar key={i + 2} color={colors.yellow} size={25} />
                                                    </>
                                                    :
                                                    v.star > 1 ?
                                                        <>
                                                            <FaStar key={i} color={colors.yellow} size={25} />
                                                            <FaStar key={i + 1} color={colors.yellow} size={25} />
                                                        </>
                                                        :
                                                        <>
                                                            <FaStar key={i} color={colors.yellow} size={25} />
                                                        </>
                                        }</p>
                                    </div>
                                </Col>
                                <Col>{v.status}</Col>
                            </Row>
                        </div>
                    )
                })}
            </div>
        </Container>
    )
}

export default View;