import React from 'react';
import parse from 'html-react-parser';
import callAlert from "../utils/callAlert";

class ProductPage extends React.Component{
    constructor(props) {
        super(props);
        this.handlerGallery = this.handlerGallery.bind(this)
        this.state = {
            data: [],
            loading: true,
            category: null,
            galleryIndex: 0,
            itemsInCart:[],
        }
    }

    componentDidMount() {

        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then((response) => {
                this.setState({ data: response.products[this.props.productID-1], loading: false })
            })
        window.scrollTo(0, 0)

    }

    handlerGallery = (index)=> {
        this.setState({ galleryIndex: index })
        this.props.updateGallery(index)}

/*    handlerAttributesItem = (id)=> {if (this.props.attributesItemId!==id)
    {this.setState({ attributesItemId: id })
        this.props.updateAttributesItemId(id)}}

    handlerAttributesItemSwatch = (id)=> {if (this.props.attributesItemIdSwatch!==id)
    {this.setState({ attributesItemIdSwatch: id })
        this.props.updateAttributesItemIdSwatch(id)}}

    handlerAttributesItemAdd1 = (id)=> {if (this.props.attributesItemIdAdd1!==id)
    {this.setState({ attributesItemIdAdd1: id })
        this.props.updateAttributesItemIdAdd1(id)}}

    handlerAttributesItemAdd2 = (id)=> {if (this.props.attributesItemIdAdd2!==id)
    {this.setState({ attributesItemIdAdd2: id })
        this.props.updateAttributesItemIdAdd2(id)}}*/

    addProductArr = () => {
        this.props.addToCart(
            (this.props.productID) ? {
                indexId: this.props.itemsInCart.length,
                data: this.state.data,
                quantity: 1,
                imageIndex: 0,
                itemCurrency: this.props.currencies[this.props.currentCurrency].symbol,
                priceForAll: this.state.data.price,

            } : null)

    }

    render() {

        const {loading, data} = this.state
        console.log(data)
        if (loading) return "Loading...";
        console.log(data.images)
        let currency = this.props.currencies[this.props.currentCurrency]


        if (this.props.productID!==null) {
            return (
                <div>
                    <div className="product">

                        <ul id="galleryList" className="galleryList">{data.images.map((item, index)=>
                            ( <li key={index} onClick={() => {this.handlerGallery(index)}}>
                                <img className="galleryListImg" key={index} src={item} alt={"logo"} style={index === 0 ?
                                    {display:'none'} : {}}  />
                            </li>))}</ul>
                        <div className="galleryItem">
                            <div className="galleryItemImg">
                                <img src={data.images[this.props.galleryIndex]} alt={"logo"} />
                            </div>
                            <div className="galleryAddInfo">
                                <span className="attributesItemName">{data.title}</span>
                                <br/>
{/*                                <span className="attributesItemType">{data.product.attributes.map((item1)=>{
                                    if (item1.type !== 'swatch' && item1.id !== 'With USB 3 ports' && item1.id !== 'Touch ID in keyboard')
                                    {return item1.id+":"} else {return null}})}</span>
                                <div className="galleryAttributes">
                                    {data.product.attributes.map((item1)=>item1.type==='text' && item1.id !=='With USB 3 ports' && item1.id !=='Touch ID in keyboard' ?
                                        item1.items.map(item2=>{
                                            return this.state.attributesItemId!==null ? (<div className={this.state.attributesItemId===item2.id ? "attributesItemClicked":"attributesItem" } key={item2.id}
                                                                                              onClick={() =>
                                                                                              {this.handlerAttributesItem(item2.id)}}>
                                                    <span className="attributesItemText">{item2.value}</span>
                                                </div>) :
                                                (<div className="attributesItem" key={item2.id}  onClick={() =>
                                                {this.handlerAttributesItem(item2.id)}}>
                                                    <span className="attributesItemText">{item2.value}</span>
                                                </div>)
                                        }) : null) }
                                    <br/>
                                </div>
                                <span className="attributesItemSwatchType">
                                {data.product.attributes.map((item1, index)=> {if (item1.type === 'swatch'|| item1.id==='With USB 3 ports')
                                {return item1.id+":"} else {return null}})}</span>
                                <div className="galleryAttributesSwatch">

                                    {data.product.attributes.map((item1)=>(item1.type==='swatch') ? item1.items.map(item2=>{

                                            return this.state.attributesItemIdSwatch!==null ? (<div className="attributesItemSwatchSelected" key={item2.id}
                                                                                                    style={this.state.attributesItemIdSwatch === item2.id ?
                                                                                                        {   backgroundColor: item2.id,
                                                                                                            outlineStyle: 'solid',
                                                                                                            outlineColor: 'lawngreen',
                                                                                                            outlineOffset: '2px',
                                                                                                            outlineWidth: '2px'
                                                                                                        } : {backgroundColor: item2.id}} onClick={() => {
                                                this.handlerAttributesItemSwatch(item2.id)
                                            }}/>) : (<div className="attributesItemSwatch" key={item2.id}  style={{backgroundColor: item2.id}} onClick={() =>
                                            {this.handlerAttributesItemSwatch(item2.id)}}>{""}</div>)
                                        }) : null
                                    )}
                                    <br/>
                                </div>
                                <div className="galleryAttributesAdd1">
                                    {data.product.attributes.map((item1)=>(item1.id.includes("USB"))  ? item1.items.map(item2=>{
                                        return this.state.attributesItemIdAdd1 !==null ?
                                            (<div className={this.state.attributesItemIdAdd1===item2.id ? "attributesItemAdd1Clicked":"attributesItemAdd1"} key={item2.id}
                                                  onClick={() => {this.handlerAttributesItemAdd1(item2.id)}}>
                                                <div className="attributesItemText">{item2.id}</div>
                                            </div>) : (<div className="attributesItemAdd1" key={item2.id}  onClick={() =>
                                            {this.handlerAttributesItemAdd1(item2.id)}}><span className="attributesItemText">{item2.id}</span></div>)}) : null) }
                                    <br/>
                                </div>

                                <div className="galleryAttributesAdd2">
                                    <div className="galleryAttributesAdd2Caption"><span className="attributesItemType">
                                        {data.product.attributes.map((item1, index)=>{if (index === 2) {return item1.id+":"} else {return null}})}</span></div>
                                    {data.product.attributes.map((item1)=>(item1.id.includes("USB"))  ? item1.items.map(item2=>{
                                        return this.state.attributesItemIdAdd2 !==null ?
                                            (<div className={this.state.attributesItemIdAdd2===item2.id ? "attributesItemAdd2Clicked":"attributesItemAdd2"} key={item2.id}
                                                  onClick={() => {this.handlerAttributesItemAdd2(item2.id)}}>
                                                <span className="attributesItemText">{item2.id}</span>
                                            </div>) : (<div className="attributesItemAdd2" key={item2.id}  onClick={() =>
                                            {this.handlerAttributesItemAdd2(item2.id)}}><span className="attributesItemText">{item2.id}</span></div>)}) : null) }
                                    <br/>
                                </div>*/}

                                <div className="galleryAddInfoPrice">
                                    {"PRICE: "}{data.price}{' '}{currency.symbol} </div>
                                <div className="galleryAddInfoPriceNumbers">
                                  {/*  {data.prices[parseInt(this.props.currentCurrency)].currency.symbol}{" "}{data.product.prices[parseInt(this.props.currentCurrency)].amount}*/}

                                </div>
                                <div className="galleryRight">

                                    {<button id="galleryAddInfoButton" onClick={() =>{
                                        if (this.props.isAuthenticated !==false) {if (data.stock > 30) {return this.addProductArr()} else {callAlert('success', 'product out of stock!')}} else {callAlert('success', 'You need to login to access!')}

                                    }}>ADD TO CART
                                    </button>}
                                    <div className="galleryAddInfoDescription">{parse(data.description)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )} else { return "Loading..."}
    }
}


export default ProductPage




