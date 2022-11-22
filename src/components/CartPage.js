import React from 'react'
import svgCart from '../svg/Cart.svg';


class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.showOverlay = this.showOverlay.bind(this);

        this.state = {
            data: null,
            loading: true,
            productID: null,
            quantityInCart: 1,
            itemsInCart:[],
        }
    }

    showOverlay() {if(this.props.showLabels === false)
       if (this.props.overlay === 'overlayClosed')
            {   this.props.homeContainerChange('homeContainerOpened')
                this.props.overlayChange('overlayOpened')
                this.props.contentChange('contentFixed')
            } else
            {
                this.props.homeContainerChange('homeContainerClosed')
                this.props.overlayChange('overlayClosed')
                this.props.contentChange('content')
            }
    }

    quantityCounter=() => {
        let x
        return this.props.itemsInCart.map(res=>x+=res.quantity, x=0).reverse()[0]
    }

    render() {return this.props.itemsInCart.length===0 ?
        (<div id="cart">
                   <div onClick={() =>
                   {this.showOverlay()}}><img src={svgCart} alt={"logo"}/></div>
            </div>) :  (<div id="cart">
            <div onClick={() =>
            {this.showOverlay()}}>
                    <svg width="31" height="29" xmlns="http://www.w3.org/2000/svg" fill="none">
                        <rect
                            id="svg_1" fill="black" y="0" x="11" rx="10" height="20" width="20"/>
                        <text x="21" y="10" textAnchor="middle" fill="white" fontSize="10px" fontFamily="Arial" dy=".3em">{this.quantityCounter()}</text>
                        <path id="svg_2" fill="#43464E" d="m19.561,14.8736c-0.379,-0.4633 -0.969,-0.7449 -1.579,-0.7449l-12.823,0l-0.4,-1.4897c-0.232,-0.866 -1.031,-1.4701 -1.958,-1.4701l-2.148,0c-0.358,0 -0.653,0.2816 -0.653,0.6246c0,0.3421 0.294,0.6245 0.653,0.6245l2.148,0c0.316,0 0.589,0.2014 0.673,0.5034l2.569,9.7863c0.232,0.866 1.032,1.4701 1.959,1.4701l8.401,0c0.926,0 1.748,-0.6041 1.958,-1.4701l1.579,-6.202c0.148,-0.5647 0.022,-1.1688 -0.379,-1.6321l0,0zm-0.904,1.3489l-1.58,6.202c-0.084,0.302 -0.358,0.5034 -0.673,0.5034l-8.402,0c-0.316,0 -0.59,-0.2014 -0.674,-0.5034l-1.832,-7.0269l12.487,0c0.211,0 0.421,0.1006 0.548,0.2619c0.126,0.1604 0.188,0.3618 0.126,0.5632l0,-0.0002z"/>
                        <path id="svg_3" fill="#43464E" d="m8.444,24.9816c-1.2,0 -2.189,0.9463 -2.189,2.0938c0,1.1474 0.989,2.0937 2.189,2.0937c1.2,0.0007 2.19,-0.9455 2.19,-2.0931c0,-1.1477 -0.99,-2.0946 -2.19,-2.0946l0,0.0002zm0,2.9197c-0.484,0 -0.863,-0.3626 -0.863,-0.8259c0,-0.4632 0.379,-0.8259 0.863,-0.8259c0.485,0 0.864,0.3627 0.864,0.8259c-0.001,0.4436 -0.401,0.8259 -0.864,0.8259z"/>
                        <path id="svg_4" fill="#43464E" d="m15.688,24.9814c-1.201,0 -2.19,0.9463 -2.19,2.0938c0,1.1474 0.99,2.0937 2.19,2.0937c1.2,0 2.189,-0.9463 2.189,-2.0937c-0.021,-1.1468 -0.989,-2.0938 -2.189,-2.0938zm0,2.9197c-0.485,0 -0.864,-0.3626 -0.864,-0.8259c0,-0.4632 0.379,-0.8259 0.864,-0.8259c0.484,0 0.863,0.3627 0.863,0.8259c0,0.4436 -0.4,0.8259 -0.863,0.8259z"/>
                    </svg>


            </div>
        </div>

        )}
}
export default CartPage