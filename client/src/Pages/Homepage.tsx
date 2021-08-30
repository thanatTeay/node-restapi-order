import React, { useState, useEffect } from 'react'
import Axios from 'axios'

export default function Homepage() {
    const [productList, setProductList] = useState<any[]>([]);
    const [optionList, setOptionList] = useState<any[]>([]);
    const [cartList, setCartList] = useState<any[]>([]);
    const [total, setTotal] = useState(0)
    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState(0)
    const [quatity, setQuatity] = useState("")


    useEffect(() => {
        Axios.get('http://localhost:8080/api/beverages/get/beverages').then((res) => {

            setProductList(res.data.beverage)
        })

    }, [])
    const addToCart = (id: string, name: string, price: number) => {
        
        const cart = {id: id, name: name, price: price}

        setTotal(total => total+price)

        setCartList(curr => [...curr,cart])
    }

    const deleteItem = (key: number,id: string, price: number) => {
        
        setCartList(cartList.filter(item => item.id !== id));
        setTotal(total => total-price)
        const temp = [...cartList];
        temp.splice(key,1);
        setCartList(temp);
    }

    const showProduct = () => {
        Axios.get('http://localhost:8080/api/beverages/get/beverages').then((res) => {
            setProductList(res.data.beverage)
        })
    }

    return (
        <div className="container">
            <h1>Beverage List</h1>
            
            <div className="row">
                <div className="col-8">
                    <div className="row row-cols-2 row-cols-lg-2 g-4 g-lg-6">
                        {

                            productList.map((val, key) => {
                                return (
                                    <div className="product card" key={key}>
                                        <div className="card-body text-left" >
                                            <p className="card-text">{val.name}</p>
                                            <p className="card-text">{val.price} Bath</p>
                                            <a href="#" className="text-decoration-none" onClick={() => addToCart(val._id, val.name, val.price )}> Add to cart</a>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="col product card" >
                    <h3>Cart</h3>
                    <hr />
                    <h3>Total: {total} Bath</h3>
                    <hr />
                    <div className="row-md-3">
                        <div className="col align-self-center">
                            {
                                cartList.map((val, key) => {
                                    return (
                                        <div className="product card " key={key}>
                                            <div className="card-body text-left" >
                                                <p className="card-text">{val.name}</p>
                                                <p className="card-text">{val.price} Bath</p>
                                                <a href="#" className="text-decoration-none" onClick={() => deleteItem(key,val._id, val.price)}> Delete</a>
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                        
                    </div>
                    <div className="col align-self-center">
                            <div className="" >
                                <div className="col align-self-center">

                                    <button className="btn btn-primary" onClick={showProduct}>Submit</button>

                                </div>

                            </div>
                        </div>



                </div>

            </div>

        </div>




    )
}
