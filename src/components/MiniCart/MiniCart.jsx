import React, { PureComponent } from 'react';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import classes from './MiniCart.module.css';
import { connect } from 'react-redux';
import { getCurrentPrice } from '../../utilities/getCurrentPrice';
import { addMoreItem, addLessItem, deleteItem } from '../../store/cart/actions';
import { cartModalAction } from '../../store/modals/actions';
import MiniCartAttr from './MiniCartAttr/MiniCartAttr';

export class MiniCart extends PureComponent {
  calEachItem = (item) => {
    const itemCount = this.props.cart?.find((x) => x.name === item.name)?.count;
    return (
      itemCount * getCurrentPrice(item.prices, this.props.currency)
    ).toFixed(2);
  };

  calTotal = (cart) => {
    const eachItemPrice = [];
    for (let item of cart) {
      const price = getCurrentPrice(item.prices, this.props.currency);
      eachItemPrice.push(price * item.count);
    }

    const totalPrice = eachItemPrice.reduce((curr, acc) => curr + acc, 0);
    return totalPrice.toFixed(2);
  };

  render() {
    const {
      open,
      cart,
      count,
      currency,
      increaseItem,
      descreaseItem,
      removeItem,
      cartModalHandler,
      currSymbol,
    } = this.props;

    return (
      <Modal open={open} top='150%' className={classes.MiniCart}>
        <h2 className={classes.MiniCartTitle}>
          My Bag, <span>{count} items</span>
        </h2>
        <div className={classes.Content}>
          {cart.map((item, i) => (
            <div className={classes.Item} key={i}>
              <div className={classes.ItemTitleAndPrice}>
                <p className={classes.Title}>{item.name}</p>
                <p className={classes.Price}>
                  {currSymbol + ' ' + getCurrentPrice(item.prices, currency)}{' '}
                </p>

                <MiniCartAttr attributes={item.selectedAttributes} />
              </div>
              <div className={classes.ImgAndAmountBtns}>
                <div className={classes.AmountBtns}>
                  <Button
                    sqMini
                    type='square'
                    onClick={() => increaseItem(item)}
                  >
                    <i className='fas fa-plus'></i>
                  </Button>
                  <p>{item.count}</p>
                  <Button
                    sqMini
                    type='square'
                    onClick={() => {
                      item.count > 1 ? descreaseItem(item) : removeItem(item);
                    }}
                  >
                    <i className='fas fa-minus'></i>
                  </Button>
                </div>
                <div className={classes.ItemImg}>
                  <img src={item.gallery[0]} alt='' />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={classes.Total}>
          <p className={classes.TotalText}>total</p>
          <p className={classes.TotalNumber}>
            {currSymbol + ' ' + this.calTotal(cart)}
          </p>
        </div>
        <div className={classes.ActionBtns}>
          <Button
            type='link'
            to='/mycart'
            variant='outline'
            onClick={cartModalHandler}
          >
            View Bag
          </Button>
          <Button>Check Out</Button>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  count: state.cart.count,
  currency: state.currency.currency,
  currSymbol: state.currency.symbol,
});

const mapDispatchToProps = {
  increaseItem: addMoreItem,
  descreaseItem: addLessItem,
  removeItem: deleteItem,
  cartModalHandler: cartModalAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);
