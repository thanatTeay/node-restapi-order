import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Modal from 'react-modal'

export default function Homepage() {
    const [productList, setProductList] = useState<any[]>([]);
    const [optionList, setOptionList] = useState<any[]>([]);
    const [addOptionList, setAddOptionList] = useState<any[]>([]);
    const [cartList, setCartList] = useState<any[]>([]);
    const [total, setTotal] = useState(0)
    const [optionP, setOptionP] = useState(0)
    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState(0)
    const [productID, setProductID] = useState("")
    const [quatity, setQuatity] = useState(1)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [selecte, setSelecte] = useState(false)


    const customStyles = {
        content: {
            top: '20%',
            left: '20%',
            right: '20%',
            bottom: '20%',
            transform: 'translate(0%, 0%)',
        },
    };

    useEffect(() => {
        Axios.get('http://localhost:8080/api/beverages/get/beverages').then((res) => {
            setProductList(res.data.beverage)
        })
        Axios.get('http://localhost:8080/api/options/get/options').then((res) => {
            setOptionList(res.data.option)
        })

    }, [])

    function openModal(id: string, name: string, price: number) {
        setModalIsOpen(true);
        setProductID(id);
        setProductName(name);
        setPrice(price);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    const addQuatity = () => {
        setQuatity(quatity + 1)

    }
    const deleteQuatity = () => {
        setQuatity(quatity - 1)

    }
    const addToCart = () => {
        closeModal()

        const cart = { option: addOptionList, _ID: productID, name: productName, price: price, orderPrice: (price + optionP) * quatity, quatity: quatity }
        setTotal(total => (total + optionP + price) * quatity)
        setCartList(curr => [...curr, cart])
        console.log(cart)
        setAddOptionList([])
        setOptionP(0)
    }

    const addOption = (id: any, name: any, price: any) => {
        setSelecte(true)
        const option = { _id: id, name: name, price: price }
        setOptionP(optionP => optionP + price)
        setAddOptionList(curr => [...curr, option])


    }

    const deleteItem = (key: number, id: string, price: number) => {

        setCartList(cartList.filter(item => item.id !== id));
        setTotal(total => total - price)
        const temp = [...cartList];
        temp.splice(key, 1);
        setCartList(temp);
    }

    const showProduct = () => {
        Axios.get('http://localhost:8080/api/beverages/get/beverages').then((res) => {
            setProductList(res.data.beverage)
        })
    }

    const createOrder = () => {
        console.log(cartList)
        Axios.post('http://localhost:8080/api/orders/create/order', {
            beverage: cartList,
            total: total
            
        
        }).then(() => {
            console.log("Successfully add product")
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
                                            <p className="card-text">{val.price} ฿</p>
                                            <a href="#" className="text-decoration-none" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => openModal(val._id, val.name, val.price)}> Add to cart</a>
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
                                cartList.map((val: any, key: any) => {
                                    return (
                                        <div className="product card " key={key}>
                                            <div className="card-body text-left" >
                                                <div className="row">
                                                    <div className="col-8">
                                                        <p className="card-text">{val.name} x {val.quatity}</p>

                                                    </div>
                                                    <div className="col-4">
                                                        <h5 className="card-text">{val.orderPrice} ฿</h5>

                                                    </div>
                                                </div>

                                                <p className="card-text">{val.price} ฿</p>

                                                {
                                                    val.option.map((val2: any, key2: any) => {
                                                        return (
                                                            <div className="product card " key={key2}>
                                                                <div className="card-body text-left" >
                                                                    <p className="card-text">{val2.name}</p>
                                                                    <p className="card-text">+({val2.price})</p>
                                                                </div>
                                                            </div>
                                                        )

                                                    })
                                                }

                                                <a href="#" className="text-decoration-none" onClick={() => deleteItem(key, val._id, val.orderPrice)}> Delete</a>
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                    <div className="row">
                        <div className="col align-self-center">
                            <div className="" >
                                <div className="col align-self-center">

                                    <button className="btn btn-primary" onClick={createOrder}>Submit</button>

                                </div>
                            </div>
                        </div>
                    </div>

                    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal " ariaHideApp={false}>
                        <div className="modal-header">
                            <h5 className="modal-title">{productName}</h5>
                            <button type="button" className="btn-close" onClick={closeModal} data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <div className="modal-body">
                            <h5 className="modal-title">Quantity</h5>
                            <br />
                            <div className="row">
                                <div className="col-2">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={deleteQuatity}>-</button>
                                </div>
                                <div className="col-2">
                                    <h4>{quatity}</h4>
                                </div>
                                <div className="col-1">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={addQuatity}>+</button>
                                </div>
                            </div>
                            <br />
                            <h5 className="modal-title">Option</h5>

                            <div className="row row-cols-2 row-cols-lg-2 g-4 g-lg-6">
                                {
                                    optionList.map((val, key) => {
                                        return (
                                            <div className="product card " key={key}>
                                                <div className="card-body text-left" >
                                                    <p className="card-text">{val.name}</p>
                                                    <p className="card-text">{val.price} Bath</p>
                                                    <a href="#" className="text-decoration-none" onClick={() => addOption(val._id, val.name, val.price)}>{selecte ? 'Selected' : 'Add Option'}</a>
                                                </div>

                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => addToCart()}>Add to Cart</button>
                        </div>
                    </Modal>

                </div>
            </div>
        </div>





    )
}
