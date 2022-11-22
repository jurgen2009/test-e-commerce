import React from 'react';
import '../App.js'
import CartPage from "./CartPage";
import svgBack from '../svg/Backout.svg';
import Link from "react-router-dom/Link";
import ArrowUp from "../svg/ArrowUp.svg";
import ArrowDown from "../svg/ArrowDown.svg";
import Dollar from "../svg/Dollar.svg";
import Cart2 from "../svg/Cart2.svg";
import LoginPopup from "./login/LoginPopup";


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handlerCategoryName = this.handlerCategoryName.bind(this)
        this.changeCurrency = this.changeCurrency.bind(this)
        this.homeContainerChange = this.homeContainerChange.bind(this) // needed for bind function with the context of this component, otherwise this function doesn't get props
        this.overlayChange = this.overlayChange.bind(this)
        this.contentChange = this.contentChange.bind(this)
        this.state = {
            categories: [],
            dataC: [],
            loading: true,
            category: null,
            total: 0.00,
            itemsInCart: this.props.itemsInCart,
            currentCurrency: localStorage.getItem('currentCurrency')===null ? 0 : localStorage.getItem('currentCurrency'),
            labels: [],
            showLabels: false,
            selectedLabels: localStorage.getItem('selectedCurrency')===null ? "$" : localStorage.getItem('selectedCurrency'),
            overlay:'overlayClosed',
            homeContainerChange: 'homeContainerClosed',
            contentChange: 'content',
            currencies: [{id:0, label: 'USD', symbol: '$'},{id:1, label: 'GBP', symbol: '£'},{id:2, label: 'AUD', symbol: 'A$'},
                {id:3, label: 'JPY', symbol: '¥'},{id:4, label: 'RUB', symbol: '₽'}]
        } }


    componentDidMount() {

        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then((response) => {
                let cat1=response.products.map(items => items.category)
                let categories = [...new Set(cat1)];
                console.log(categories)

                this.setState({ categories: categories, loading: false })
            })
    }


    dropDown = () => {if(this.props.overlay !== 'overlayOpened')
        this.setState(prevState => ({
            showLabels: !prevState.showLabels}
        ));
    };

    selectItem =   (item, index) =>  {
         this.setState({
            selectedLabels: item.symbol,
            showLabels: false,
            currentCurrency: index
        });
        localStorage.setItem('currentCurrency', (index))
        localStorage.setItem('selectedCurrency', (item.symbol))
    };

    handlerCategoryName = (index) => { this.props.updateDataName(index)}


    signInObserver1 = (isAuth, user) => {
        console.log(user)
        this.props.signInObserver(isAuth, user)
    }


    changeCurrency = (value) => {
        this.props.updateUpCurrency(value)}

    homeContainerChange () {if (this.props.overlay === 'overlayOpened'){
        this.props.homeContainerChange('homeContainerClosed')} else {
        this.props.homeContainerChange('homeContainerOpened')}}

    overlayChange () {if (this.props.overlay === 'overlayOpened'){
        this.props.overlayChange('overlayClosed')} else {
        this.props.overlayChange('overlayOpened')}}

    contentChange () {if (this.props.contentState === 'contentFixed'){
        this.props.contentChange('content')} else {
        this.props.contentChange('contentFixed')}}

    render() {
        let dataA = Object.keys(this.state.dataC).map((key) => [Number(key), this.state.dataC[key]])
        // currency fetched object to array
        const {loading, currencies} = this.state
        console.log(currencies)
        if (loading) return "Loading...";
        return (
            <header>

                <ul id="nav">
{                    this.state.categories.map((item, index) => (
                        <li key={item}><Link to={`/${item}`} className="label" key={index} onClick={() =>
                        {this.handlerCategoryName(item)}}>
                            {item}</Link></li>
                    ))}

                    <button className="buttonSelectBox">
                        <div className="select-box--box">
                            <div className="select-box--container">
                                <div className="select-box--selected-item">
                                    {this.state.selectedLabels}
                                </div>
                                <div className="select-box--arrow" onClick={this.dropDown}>
                                    <img src={`${
                                        this.state.showLabels
                                            ? ArrowUp
                                            : ArrowDown
                                    }`} alt=""/>

                                </div>

                                <div
                                    style={{ display: this.state.showLabels ? "block" : "none" }}
                                    className={"select-box--items"}
                                >
                                    {currencies.map((item, index) => (
                                        <div
                                            key={item.id}

                                            onClick={() =>  {this.selectItem(item, index); this.changeCurrency(index)}}
                                            className={this.state.selectedLabels === item ? "selected" : ""}
                                        >
                                            {item.symbol}{' '}{item.label}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </button>


                <div className="backOutButton">
                    <Link to={`/`} id="backout-button">
                        <img src={svgBack} alt={"logo"}/>
                    </Link>

                </div>
                <div className="checkOut">

                    {this.props.user ===null ?
                    <button className="ui inverted green button">
                        <LoginPopup
                            user={this.props.user}
                            signInObserver1={this.signInObserver1} />
                    </button> :
                    <div className="checkOutTotal">
                        <CartPage
                            itemsInCart={this.props.itemsInCart}
                            showLabels={this.state.showLabels}
                            homeContainerChange={this.homeContainerChange}
                            overlayChange={this.overlayChange}
                            contentChange={this.contentChange}
                            overlay={this.props.overlay}
                        />


                    </div>}

                </div></ul>

                <div className="progressBar">

                    <div className="progressBar1"
    style={{backgroundColor: this.props.itemsInCart.length > 0 ?  '#5ECE7B' :  'white'}}
                    ><img src={`${
                        this.props.itemsInCart.length > 0
                            ? Cart2
                            : 'none'
                    }`} alt=""/></div>
                    <div className="progressBar2"
    style={{backgroundColor: this.props.itemsInOrder.length > 0 ?  '#5ECE7B' :  'white'}}
                    ><img src={`${
                        this.props.itemsInOrder.length > 0
                            ? Dollar
                            : 'none'
                    }`} alt=""/></div>
                    <div className="progressBar3"

                    />
                    <div className="progressBar4"

                    />
                    </div>
            </header>
        );
    }
}
export default Header
