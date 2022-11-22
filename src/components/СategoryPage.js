import React from 'react';
import Link from "react-router-dom/Link";
import CardHover from "../svg/CardHover.svg";
import OutOfStock from "../svg/OutOfStock.svg";

class CategoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            loading: true,
            productID: '0',
            category: null,
            galleryIndex: 0,
            itemsInCart:[],
        }
    }

    componentDidMount() {

        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then((response) => {
            this.setState({ data: response, loading: false })
                })
    }




    showProductItem=(id)=>{
        console.log(id)
        this.props.showProduct(id)
    }

    addProductArr = () => {
        console.log(this.state.data.products[0])
        console.log(this.props.productID)

       this.props.addToCart(
            (this.props.productID) ? {

                indexId: this.props.itemsInCart.length,
                data: this.state.data.products[this.props.productID-1],
                quantity: 1,
                imageIndex: 0,
                itemCurrency: this.props.currencies[this.props.currentCurrency].symbol,
                priceForAll: this.state.data.products[this.props.productID-1].price,


            } : null)
    }



    render() {

        const {loading, data} = this.state
        if (loading) return "Loading...";
        let currency = this.props.currencies[this.props.currentCurrency]

/*        data.products.sort((a, b) => {
             const nameA = a.title.toUpperCase();
             const nameB = b.title.toUpperCase();
             if (nameA < nameB) {
                 return -1;
             }
             if (nameA > nameB) {
                 return 1;
            }
             return 0;
         })*/

        return (
                <div className={this.props.contentState}>
                    <div className="contentCategoryName">{this.props.categoryName}</div>
                    <ul className="contentUnorderedCards" >
                       {data.products.map((item, index) => item.category.includes(this.props.categoryName) ? (

                            <li className="contentListCards"  key={index} >
                                <div className="contentCard"
                                >
                                <Link to={`/product/${item.id}`}><img
                                    className="contentImg"
                                  onMouseOver={() =>
                                { this.showProductItem(item.id)}}

                                    key={item.id}
                                    src={item.images[0]}
                                    alt={"logo"}/>
                                </Link>
                                    {console.log(this.props.isAuthenticated)}
                                    {console.log(this.props.isAuthenticated !== false)}
                                    {this.props.isAuthenticated !== false ?   data.products.map(item1 => item1.id===this.props.productID ? item1.stock > 30 ?
                                        <img className="cardHoverSvg"  src={CardHover} alt={"logo"}
                                             onClick={() =>
                                             { this.addProductArr()}}
                                        />:
                                            <Link className="OutOfStock" to={`/product/${item.id}`}>
                                                <img src={OutOfStock} alt={"logo"}/>
                                            </Link>: null
                                    ): null}
                                <div className="contentTextName"
                                    onMouseOver={() =>
                                { this.showProductItem(item.id)}}
                                >
                                    {item.brand}</div>
                            <div className="contentTextName"
                                onMouseOver={() =>
                            { this.showProductItem(item.id)}}
                            >
                                {item.title}</div>
                                <div className="contentTextPrice"
                                     onMouseOver={() =>
                                { this.showProductItem(item.id)}}
                                >{item.price}{' '}{currency.symbol}
                                </div>
                            </div>
                            </li>
                        ): null )}
                    </ul>
                </div>
        );
    }
}

export default CategoryPage

