import React from 'react';
import './App.scss'
import './utils/callAlert.css';
import Alert from 'react-s-alert';
import Header from './components/Header';
import CategoryPage from './components/СategoryPage';
import ProductPage from "./components/ProductPage";
import CartPageOverlay from "./components/CartPageOverlay";
import Bag from "./components/Bag";
import { Route, Switch } from 'react-router-dom';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.addToCart = this.addToCart.bind(this);
        this.updateUpCurrency = this.updateUpCurrency.bind(this);
        this.state = {
            isAuthenticated: localStorage.getItem('isAuthenticated') === null ? false : localStorage.getItem('isAuthenticated'),
            user: localStorage.getItem('user') === null ? null : localStorage.getItem('user'),
            data: null,
            loading: true,
            categoryName: localStorage.getItem('categoryName') === null ? '' : localStorage.getItem('categoryName'),
            productID: localStorage.getItem('productID') === null ? 0 : localStorage.getItem('productID'),
            galleryIndex: 1,
            currentCurrency: localStorage.getItem('currentCurrency') === null ? 0 : localStorage.getItem('currentCurrency'),
            items: [],
            amountToPay: null,
            itemsInCart: JSON.parse(localStorage.getItem('itemsInCart')) === null ? [] : JSON.parse(localStorage.getItem('itemsInCart')),
            itemsInOrder: [],
            homeContainerState: 'homeContainerClosed',
            overlay: 'overlayClosed',
            contentState: 'content',
            currencies: [{id:0, label: 'USD', symbol: '$'},{id:1, label: 'GBP', symbol: '£'},{id:2, label: 'AUD', symbol: 'A$'},
                {id:3, label: 'JPY', symbol: '¥'},{id:4, label: 'RUB', symbol: '₽'}]
        }
    }

    signInObserver = (isAuth, user) => {
        if (isAuth) {
            console.log(user)
            this.setState({ isAuthenticated: true, user: user })
            localStorage.setItem('user', user);
            localStorage.setItem('isAuthenticated', isAuth);
        } else {
            this.setState({ isAuthenticated: false });
        }
    }



    addToCart = (arr) => {
        console.log(arr)
        const updatedCart = [...this.state.itemsInCart];//copying an array of products in the cart
        const updatedItemIndex = updatedCart.findIndex(res => res.data.title // check if there is the same product in the cart
             === arr.data.title );
        console.log(updatedCart)
        console.log(updatedItemIndex)
        if (updatedItemIndex === -1)//if the same product is not found, then this product added to the cart and to the localstorage
        {
            this.setState({itemsInCart: [...this.state.itemsInCart, arr]});
            localStorage.setItem('itemsInCart', JSON.stringify([...this.state.itemsInCart, arr]))
        } else {
            const updatedItem = {
                ...updatedCart[updatedItemIndex]//if the same product is found, the variable is set
            };
/*            const updatedPriceIndex = this.state.itemsInCart.findIndex(item => item.id === arr.id)// find the id for prices in the array from the database
            const updatedPrice = this.state.itemsInCart[updatedPriceIndex].price.map(price => {
                if (price.currency.symbol) return price.amount
                else
                    return null
            })// price should be displayed in the current currency
            function compareNumeric(a, b) {
                if (a > b) return 1;
                if (a === b) return 0;
                if (a < b) return -1;
            }// sorting the array in ascending order so that the resulting price in the corresponding currency is under the index 0*/
            updatedItem.quantity++;//if the same product is found, increase the quantity of product by one
            /*updatedItem.data.price = updatedItem.data.price * updatedItem.quantity;// total cost = price with sorting * quantity*/
            updatedCart[updatedItemIndex] = updatedItem;//replacing an element with a new value
            this.setState(prevState => ({...prevState, itemsInCart: updatedCart})); //cart and localstorage updating
            (localStorage.setItem('itemsInCart', JSON.stringify([...this.state.itemsInCart])));
        }

    }

    bagArrowRight = (index) => {
        const updatedCart = [...this.state.itemsInCart];
        const updatedItemIndex = updatedCart.findIndex(res => res.indexId === index.indexId);
        if (updatedItemIndex < 0) {
            updatedCart.push({...index, imageIndex: 0});
        } else {
            const updatedItem = {
                ...updatedCart[updatedItemIndex]
            };
            const imgControl = updatedItem.data.images.length
            if (updatedItem.imageIndex < (imgControl - 1)) {
                updatedItem.imageIndex++
            } else {
                updatedItem.imageIndex = 0
            }
            updatedCart[updatedItemIndex] = updatedItem;
        }
        setTimeout(() => {
            this.setState(prevState => ({...prevState, itemsInCart: updatedCart}));
        }, 300);
    };

    bagArrowLeft = (index) => {
        const updatedCart = [...this.state.itemsInCart];
        const updatedItemIndex = updatedCart.findIndex(res => res.indexId === index.indexId);
        if (updatedItemIndex < 0) {
            updatedCart.push({...index, imageIndex: 0});
        } else {
            const updatedItem = {
                ...updatedCart[updatedItemIndex]
            };
            if (updatedItem.imageIndex < (1)) {
                updatedItem.imageIndex = 0
            } else {
                updatedItem.imageIndex--
            }
            updatedCart[updatedItemIndex] = updatedItem;
        }
        setTimeout(() => {
            this.setState(prevState => ({...prevState, itemsInCart: updatedCart}));
        }, 300);
    };

    sendToOrder = (value) => {
        this.setState({itemsInOrder: [...this.state.itemsInOrder, value]});
    }

    increaseQuantity = (dataId) => {
        console.log(dataId)
        const updatedCart = [...this.state.itemsInCart];//copying an array of products in the cart
        const updatedItemIndex = updatedCart.findIndex(res => res.data.title // check if there is the same product in the cart
            === dataId.data.title );
        console.log(updatedCart)
        console.log(updatedItemIndex)
        if (updatedItemIndex === -1)//if the same product is not found, then this product added to the cart and to the localstorage
        {
            this.setState({itemsInCart: [...this.state.itemsInCart, dataId]});
            localStorage.setItem('itemsInCart', JSON.stringify([...this.state.itemsInCart, dataId]))
        } else {
            const updatedItem = {
                ...updatedCart[updatedItemIndex]//if the same product is found, the variable is set
            };
            /*            const updatedPriceIndex = this.state.itemsInCart.findIndex(item => item.id === arr.id)// find the id for prices in the array from the database
                        const updatedPrice = this.state.itemsInCart[updatedPriceIndex].price.map(price => {
                            if (price.currency.symbol) return price.amount
                            else
                                return null
                        })// price should be displayed in the current currency
                        function compareNumeric(a, b) {
                            if (a > b) return 1;
                            if (a === b) return 0;
                            if (a < b) return -1;
                        }// sorting the array in ascending order so that the resulting price in the corresponding currency is under the index 0*/
            updatedItem.quantity++;//if the same product is found, increase the quantity of product by one
            /*updatedItem.data.price = updatedItem.data.price * updatedItem.quantity;// total cost = price with sorting * quantity*/
            updatedCart[updatedItemIndex] = updatedItem;//replacing an element with a new value
            this.setState(prevState => ({...prevState, itemsInCart: updatedCart})); //cart and localstorage updating
            (localStorage.setItem('itemsInCart', JSON.stringify([...this.state.itemsInCart])));
        }
    };

    decreaseQuantity = (index) => {
        const updatedCart = [...this.state.itemsInCart];
        console.log(updatedCart)
        updatedCart.findIndex(res => console.log(res.data.id))
        const updatedItemIndex = updatedCart.findIndex(res => res.data.id === index.data.id);
        const updatedItem = {
            ...updatedCart[updatedItemIndex]
        };
        console.log(updatedItemIndex)
        console.log(updatedItem)

        updatedItem.quantity--;
        if (updatedItem.quantity <= 0) {
            updatedCart.splice(updatedItemIndex, 1);
        } else {
            updatedCart[updatedItemIndex] = updatedItem;
            updatedItem.priceForAll = updatedItem.priceForAll-updatedItem.data.price;
        }
        setTimeout(() => {
            this.setState(prevState => ({...prevState, itemsInCart: updatedCart}));
        }, 300);

        setTimeout(() => {
            (localStorage.setItem('itemsInCart', JSON.stringify([...this.state.itemsInCart])));
        }, 300);
    };

    showProduct = (value) => {
        console.log(value)
         this.setState({productID: value})
        localStorage.setItem('productID', value)
    }

    updateUpCurrency = async (value) => {
      this.setState({currentCurrency: value})// value from header number 0-4
       localStorage.setItem('currentCurrency', (value))
      /*  const updatedItems = this.state.itemsInCart.filter(res => this.state.itemsInCart.map(item => item.id.includes(res.id)))
//copying an array of products in the cart
        console.log(updatedItems)

        for (let i = 0; i < updatedItems.length; i++) {
            updatedItems[i].currency = updatedItems[i].prices[value].currency.symbol
            console.log(updatedItems[i].currency)
            const updatedPriceIndex = this.state.itemsInCart.findIndex(item => item.id === updatedItems[i].id)
            console.log(updatedPriceIndex)
            updatedItems[i].priceForOne = this.state.itemsInCart.findIndex(item => item.id === updatedItems[i].id)
            const updatedPrice = this.state.itemsInCart[i].prices.map(item => {
                if (item.currency.symbol === updatedItems[i].currency) return item.amount
                else
                    return console.log(item.amount) //dummy return, needed for the function to work correctly
            })

            function compareNumeric(a, b) {
                if (a > b) return 1;
                if (a === b) return 0;
                if (a < b) return -1;
            }
            console.log(updatedPrice)
            updatedItems[i].currency = updatedItems[i].prices[value].currency.symbol
            updatedItems[i].price = updatedPrice.sort(compareNumeric)[0] * updatedItems[i].quantity;
            updatedItems[i].priceForOne = updatedPrice.sort(compareNumeric)[0]
                 }

        this.setState(prevState => ({...prevState, itemsInCart: updatedItems}));

        (localStorage.setItem('itemsInCart', JSON.stringify([...this.state.itemsInCart])));*/

    }


    updateDataName = (value) => {
        this.setState({categoryName: value})
        localStorage.setItem('categoryName', value)
    }

    updateGallery = (index) => {
        this.setState({galleryIndex: index})
    }


    homeContainerChange=(value)=> {
        this.setState({homeContainerState: value})
    }

    overlayChange=(value)=> {
        this.setState({overlay: value})
    }

    contentChange=(value)=> {
        this.setState({contentState: value})
    }

    render() {


                return (
                    <div className={this.state.homeContainerState}>
                        <Header
                            updateDataName={this.updateDataName}
                            isAuthenticated={this.state.isAuthenticated}
                            data1={this.state}
                            updateUpCurrency={this.updateUpCurrency}
                            quantity={this.state.quantity}
                            amountToPay={this.state.amountToPay}
                            itemsInCart={this.state.itemsInCart}
                            currentCurrency={this.state.currentCurrency}
                            homeContainerChange={this.homeContainerChange}
                            overlayChange={this.overlayChange}
                            contentChange={this.contentChange}
                            overlay={this.state.overlay}
                            contentState={this.state.contentState}
                            currencies={this.state.currencies}
                            itemsInOrder={this.state.itemsInOrder}
                            signInObserver={this.signInObserver}
                            user={this.state.user}
                        />
                        <Switch>
                            <Route exact path={[`/${localStorage.getItem('categoryName') === null ?
                                this.state.categoryName : localStorage.getItem('categoryName')}`, '']} render={() =>
                                <CategoryPage
                                    categoryName={this.state.categoryName}
                                    isAuthenticated={this.state.isAuthenticated}
                                    showProduct={this.showProduct}
                                    currentCurrency={this.state.currentCurrency}
                                    addToCart={this.addToCart}
                                    productID={this.state.productID}
                                    itemsInCart={this.state.itemsInCart}
                                    contentState={this.state.contentState}
                                    currencies={this.state.currencies}
                                />
                            }
                            />

                            <Route path={`/product/${localStorage.getItem('productID')}`} render={() =>
                                <ProductPage
                                    updateGallery={this.updateGallery}
                                    productID={this.state.productID}
                                    currentCurrency={this.state.currentCurrency}
                                    updateAttributesItemId={this.updateAttributesItemId}
                                    updateAttributesItemIdSwatch={this.updateAttributesItemIdSwatch}
                                    addToCart={this.addToCart}
                                    updateAttributesItemIdAdd1={this.updateAttributesItemIdAdd1}
                                    updateAttributesItemIdAdd2={this.updateAttributesItemIdAdd2}
                                    itemsInCart={this.state.itemsInCart}
                                    showProduct={this.showProduct}
                                    galleryIndex={this.state.galleryIndex}
                                    currencies={this.state.currencies}
                                    user={this.state.user}
                                    isAuthenticated={this.state.isAuthenticated}
                                />
                            }
                            />

                            <Route path="/bag" render={() =>
                                <Bag
                                    data={this.state}
                                    itemsInCart={this.state.itemsInCart}
                                    itemsInOrder={this.state.itemsInOrder}
                                    sendToOrder={this.sendToOrder}
                                    updateGallery={this.updateGallery}
                                    productID={this.state.productID}
                                    currentCurrency={this.state.currentCurrency}
                                    updateAttributesItemId={this.updateAttributesItemId}
                                    updateAttributesItemIdSwatch={this.updateAttributesItemIdSwatch}
                                    addToCart={this.addToCart} items={this.state.items}
                                    increaseQuantity={this.increaseQuantity}
                                    decreaseQuantity={this.decreaseQuantity}
                                    updateAttributesItemIdAdd1={this.updateAttributesItemIdAdd1}
                                    updateAttributesItemIdAdd2={this.updateAttributesItemIdAdd2}
                                    attributesItemIdAdd1={this.state.attributesItemIdAdd1}
                                    attributesItemIdAdd2={this.state.attributesItemIdAdd2}
                                    amountToPay={this.state.amountToPay}
                                    bagArrowRight={this.bagArrowRight}
                                    bagArrowLeft={this.bagArrowLeft}
                                    currencies={this.state.currencies}
                                />
                            }
                            />
                        </Switch>


                        <CartPageOverlay
                            data={this.state}
                            itemsInCart={this.state.itemsInCart}
                            updateGallery={this.updateGallery}
                            productID={this.state.productID}
                            currentCurrency={this.state.currentCurrency}
                            updateAttributesItemId={this.updateAttributesItemId}
                            updateAttributesItemIdSwatch={this.updateAttributesItemIdSwatch}
                            addToCart={this.addToCart} items={this.state.items}
                            increaseQuantity={this.increaseQuantity}
                            decreaseQuantity={this.decreaseQuantity}
                            updateAttributesItemIdAdd1={this.updateAttributesItemIdAdd1}
                            updateAttributesItemIdAdd2={this.updateAttributesItemIdAdd2}
                            attributesItemIdAdd1={this.state.attributesItemIdAdd1}
                            attributesItemIdAdd2={this.state.attributesItemIdAdd2}
                            amountToPay={this.state.amountToPay}
                            homeContainerChange={this.homeContainerChange}
                            overlay={this.state.overlay}
                            overlayChange={this.overlayChange}
                            contentChange={this.contentChange}
                            contentState={this.state.contentState}
                            currencies={this.state.currencies}
                            user={this.state.user}
                            isAuthenticated={this.state.isAuthenticated}
                        />
                        <Alert stack={{ limit: 5, spacing: 10 }} offset={40} />
                        </div>
                )
            }

}
export default App;
