import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CheckBox from '../components/CheckBox'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Helmet from '../components/Helmet'
import CartItem from '../components/CartItem'
import Button from '../components/Button'
import productData from '../assets/fake-data/products'
import numberWithCommas from '../utils/numberWithCommas'
import apiUrl from "../assets/fake-data/api"

const Cart = () => {
    // console.log('re load')
    const api = apiUrl.getAPI(`get-cart`).api
    const apiPayment = apiUrl.getAPI(`payment`).api
    const token=localStorage.getItem(`accessToken`)
    let listCart =[
        // {
        //     id: 1,
        //     itemDto: {
        //         id: 5,
        //         name: "",
        //         code: "ao-doi-tuyen-anh-san-khach-2022",
        //         description: null,
        //         categoryCode: "trang-phuc_bong-da",
        //         image: ['3','2'],
        //         size: "M",
        //         color: "",
        //         type: null,
        //         quantity: 0,
        //         price: 57,
        //     },
        //     username: ``,
        //     quantity: '',
        //     price: ''
        // },
    ]

    // const [buy, setBuy] = useState([])
    const [typeCard, setTypeCard] = useState(undefined)

    const [numberCard, setNumberCard] = useState(undefined)

    const [ownCard, setOwnCard] = useState(undefined)

    const [dateCard, setDateCard] = useState(undefined)

    const [cvv, setCvv] = useState(undefined)

    // const cartItems = useSelector((state) => state.cartItems.value)

    const [cartProducts, setCartProducts] = useState(listCart)
    const [totalPrice, setTotalPrice] = useState(0)
    

    const initFilter = []
    const [filter, setFilter] = useState(initFilter)

    const filterSelect = (checked, item) => {
        if (!filter.includes(item)) {
            setFilter([...filter, item])
            
        } else {
            const newCategory = filter.filter(e => e !== item)
            setFilter(newCategory)
            
            
        }
    }
    console.log(filter)
    const getCart = async () => {
        
        
        try {
          const res = await axios.get(
            api,
            { headers: {"Authorization" : `Bearer ${token}`} }
          );
        //   console.log(res.data);
          setCartProducts(res.data)
        } catch (error) {
          console.log(error);
        }
    };
    const callbackFunction = (childData) => {
        
        switch (childData[0]) {
            case '+':
                let add = totalPrice+childData[1]
                // totalPrice = totalPrice+childData[1]
                console.log(add)
                setTotalPrice(add)
                break;
            case '-':
                let sub = totalPrice-childData[1]
                console.log(sub)
            
                setTotalPrice(sub)
                break;
        
            default:
                break;
        }
    }
    
    useEffect(() => {
        getCart()
        
    }, [])

    const check = () => {
        if (typeCard === undefined) {
            alert('Vui l??ng ch???n lo???i th???!')
            return false
        }
        if (numberCard === undefined) {
            alert('Vui l??ng nh???p s??? th???!')
            return false
        }

        if (ownCard === undefined) {
            alert('Vui l??ng nh???p t??n!')
            return false
        }
        if (dateCard === undefined) {
            alert('Vui l??ng nh???p h???n th???!')
            return false
        }
        if (cvv === undefined) {
            alert('Vui l??ng nh???p cvv!')
            return false
        }
        return true
    }

    const payment = ()=>{
        if (true) {
            
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
            "address": "HN",
            "cartList": 
                filter.map(e=>{return {
                    "id": e.id,
                    "username": e.username,
                    "itemId": e.itemDto.id,
                    "quantity": e.quantity,
                    "price": e.price
                }})
            
            });
            console.log(raw)
            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch(apiPayment, requestOptions)
            .then(response => {
                console.log(response)
                if (response.ok) {
                    return response.json()
                }
                throw Error(response.status)
            })
            .then(result => {
                console.log(result)
                window.location.reload(false);
            })
            .catch(error => {
                console.log('error', error)
                alert(`Th???t b???i`)
            });
        }
    }
    return (
        <Helmet title="Gi??? h??ng">
            <div className="cart">
                <div className="cart__info">
                    <div className="cart__info__txt">
                        <p>
                            B???n ??ang c?? {cartProducts.length} s???n ph???m trong gi??? h??ng
                        </p>
                        <div className="cart__info__txt__price">
                            <span>T???ng ti???n:</span> <span>{numberWithCommas(Number(totalPrice))}</span>
                        </div>
                    </div>
                    <div className="cart__info__btn">
                        <Button size="block">
                            <a className='pay' data-toggle="modal" data-target="#checkoutModal">?????t h??ng</a> 
                            
                        </Button>
                        <Link to="/catalog">
                            <Button 
                                size="block"
                                
                                >
                                Ti???p t???c mua h??ng
                            </Button>

                        </Link>
                        
                    </div>
                </div>
                <div className="cart__list ">
                    {
                        cartProducts.map((item, index) => (
                            <React.Fragment>
                                <div className="d-flex flex-nowrap">

                                            <CheckBox
                                                onChange={(input) => filterSelect(input.checked, item)}
                                                checked={filter.includes(item)}
                                            />
                                            <CartItem 
                                                item={item} 
                                                key={index}
                                                parentCallback={callbackFunction}
                                            />
                                </div>
                            </React.Fragment>
                        ))
                    }
                </div>
            </div>

            <div id="checkoutModal" className="modal fade" role="dialog">
                <div className="modal-dialog">

                    <div className="modal-content">
                        <div className="payment-info p-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <h4><b>Thanh to??n qua th???</b></h4>
                        </div>
                        <span className="type d-block mt-3 mb-1">Lo???i th???</span>
                        <label className="radio"> <input type="radio" name="card" value="mastercard" checked
                            onClick={(e)=>setTypeCard(e.target.value)}
                        /> <span><img width="30" src="https://img.icons8.com/color/48/000000/mastercard.png"/></span> </label>
                        <label className="radio"> <input type="radio" name="card" value="visa"
                            onClick={(e)=>setTypeCard(e.target.value)}
                        /> <span><img width="30" src="https://img.icons8.com/officel/48/000000/visa.png"/></span> </label>
                        
                        <label className="radio"> <input type="radio" name="card" value="paypal"
                            onClick={(e)=>setTypeCard(e.target.value)}
                        /> <span><img width="30" src="https://img.icons8.com/officel/48/000000/paypal.png"/></span> </label>
                        <div className="mb-3">
                            <label className="credit-card-label">T??n ch??? th???</label>
                            <input type="text" className="form-control credit-inputs" placeholder="Name"
                                onChange={(e)=>setOwnCard(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="credit-card-label">S??? th???</label>
                            <input type="number" className="form-control credit-inputs" placeholder="0000 0000 0000 0000" onChange={(e)=>setNumberCard(e.target.value)}/>
                        </div>
                        <div className="row">
                            <div className="col-md-6"><label className="credit-card-label">H???n</label><input type="date" className="form-control credit-inputs" placeholder="12/24" onChange={(e)=>setDateCard(e.target.value)}/></div>
                            <div className="col-md-6 mb-5"><label className="credit-card-label">CVV</label><input type="number" className="form-control credit-inputs" placeholder="342" onChange={(e)=>setCvv(e.target.value)}/></div>
                        </div>
                        <Button size="block" onClick={() => payment()}>
                            Thanh to??n qua th???
                        </Button>
                        <Button size="block" backgroundColor="orange" onclick={payment}>
                            Thanh to??n khi nh???n h??ng
                        </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default Cart
