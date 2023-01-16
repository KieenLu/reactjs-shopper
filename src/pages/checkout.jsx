import React from 'react'

const CheckOutPage = () => {
  return (
    <div>
    {/* BREADCRUMB */}
    <nav className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Breadcrumb */}
            <ol className="breadcrumb mb-0 font-size-xs text-gray-400">
              <li className="breadcrumb-item">
                <a className="text-gray-400" href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a className="text-gray-400" href="shopping-cart.html">Shopping Cart</a>
              </li>
              <li className="breadcrumb-item active">
                Checkout
              </li>
            </ol>
          </div>
        </div>
      </div>
    </nav>
    {/* CONTENT */}
    <section className="pt-7 pb-12">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            {/* Heading */}
            <h3 className="mb-4">Checkout</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-7">
            {/* Form */}
            <form>
              {/* Heading */}
              <h6 className="mb-7">Shipping Details</h6>
              <p className="mb-5">
                <a data-toggle="modal" href="#modalCheckoutAddress">
                  Select another address
                </a>
                or <a href="#">edit this address</a></p>
              {/* Billing details */}
              <div className="row mb-9">
                <div className="col-12">
                  {/* First Name */}
                  <div className="form-group">
                    <label htmlFor="checkoutBillingFirstName">Full Name *</label>
                    <input defaultValue="Daniel" disabled className="form-control form-control-sm" id="checkoutBillingFirstName" type="text" placeholder="First Name" required />
                  </div>
                </div>
                <div className="col-6">
                  {/* Mobile Phone */}
                  <div className="form-group">
                    <label htmlFor="checkoutBillingPhone">Mobile Phone *</label>
                    <input defaultValue={123456789} disabled className="form-control form-control-sm" id="checkoutBillingPhone" type="tel" placeholder="Mobile Phone" required />
                  </div>
                </div>
                <div className="col-6">
                  {/* Email */}
                  <div className="form-group">
                    <label htmlFor="checkoutBillingEmail">Email *</label>
                    <input defaultValue="example@gmail.com" disabled className="form-control form-control-sm" id="checkoutBillingEmail" type="email" placeholder="Email" required />
                  </div>
                </div>
                <div className="col-6">
                  {/* Company Name */}
                  <div className="form-group">
                    <label htmlFor="checkoutBillingCompany">Province *</label>
                    <input disabled defaultValue="Province" className="form-control form-control-sm" id="checkoutBillingCompany" type="text" placeholder="Company name (optional)" />
                  </div>
                </div>
                <div className="col-6">
                  {/* Country */}
                  <div className="form-group">
                    <label htmlFor="checkoutBillingCountry">District *</label>
                    <input defaultValue="District" disabled className="form-control form-control-sm" id="checkoutBillingCountry" type="text" placeholder="Country" required />
                  </div>
                </div>
                <div className="col-12">
                  {/* Address Line 1 */}
                  <div className="form-group">
                    <label htmlFor="checkoutBillingAddress">Address *</label>
                    <input defaultValue="Address..." disabled className="form-control form-control-sm" id="checkoutBillingAddress" type="text" placeholder="Address Line 1" required />
                  </div>
                </div>
              </div>
              {/* Heading */}
              <h6 className="mb-7">Shipping Method</h6>
              {/* Shipping details */}
              <div className="table-responsive mb-6">
                <table className="table table-bordered table-sm table-hover mb-0">
                  <tbody>
                    <tr>
                      <td>
                        <div className="custom-control custom-radio">
                          <input className="custom-control-input" id="checkoutShippingStandard" name="shipping" type="radio" />
                          <label className="custom-control-label text-body text-nowrap" htmlFor="checkoutShippingStandard">
                            Giao hàng tiêu chuẩn
                          </label>
                        </div>
                      </td>
                      <td>Delivery in 5 - 7 working days</td>
                      <td>$8.00</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="custom-control custom-radio">
                          <input className="custom-control-input" id="checkoutShippingExpress" name="shipping" type="radio" />
                          <label className="custom-control-label text-body text-nowrap" htmlFor="checkoutShippingExpress">
                            Giao hàng nhanh
                          </label>
                        </div>
                      </td>
                      <td>Delivery in 3 - 5 working days</td>
                      <td>$12.00</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="custom-control custom-radio">
                          <input className="custom-control-input" id="checkoutShippingFree" name="shipping" type="radio" />
                          <label className="custom-control-label text-body text-nowrap" htmlFor="checkoutShippingFree">
                            Giao hàng miễn phí
                          </label>
                        </div>
                      </td>
                      <td>Living won't the He one every subdue
                        meat replenish face was you morning
                        firmament darkness.</td>
                      <td>$0.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Heading */}
              <h6 className="mb-7">Payment</h6>
              {/* List group */}
              <div className="list-group list-group-sm mb-7">
                <div className="list-group-item">
                  {/* Radio */}
                  <div className="custom-control custom-radio">
                    {/* Input */}
                    <input className="custom-control-input" id="checkoutPaymentCard" name="payment" type="radio" data-toggle="collapse" data-action="show" data-target="#checkoutPaymentCardCollapse" />
                    {/* Label */}
                    <label className="custom-control-label font-size-sm text-body text-nowrap" htmlFor="checkoutPaymentCard">
                      Credit Card <img className="ml-2" src="./img/brands/color/cards.svg" alt="..." />
                    </label>
                  </div>
                </div>
                <div className="list-group-item collapse py-0" id="checkoutPaymentCardCollapse">
                  {/* Form */}
                  <div className="form-row py-5">
                    <div className="col-12">
                      <div className="form-group mb-4">
                        <label className="sr-only" htmlFor="checkoutPaymentCardNumber">Card Number</label>
                        <input className="form-control form-control-sm" id="checkoutPaymentCardNumber" type="text" placeholder="Card Number *" required />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mb-4">
                        <label className="sr-only" htmlFor="checkoutPaymentCardName">Name on Card</label>
                        <input className="form-control form-control-sm" id="checkoutPaymentCardName" type="text" placeholder="Name on Card *" required />
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="form-group mb-md-0">
                        <label className="sr-only" htmlFor="checkoutPaymentMonth">Month</label>
                        <select className="custom-select custom-select-sm" id="checkoutPaymentMonth">
                          <option>January</option>
                          <option>February</option>
                          <option>March</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="form-group mb-md-0">
                        <label className="sr-only" htmlFor="checkoutPaymentCardYear">Year</label>
                        <select className="custom-select custom-select-sm" id="checkoutPaymentCardYear">
                          <option>2017</option>
                          <option>2018</option>
                          <option>2019</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="input-group input-group-merge">
                        <input className="form-control form-control-sm" id="checkoutPaymentCardCVV" type="text" placeholder="CVV *" required />
                        <div className="input-group-append">
                          <span className="input-group-text" data-toggle="popover" data-placement="top" data-trigger="hover" data-content="The CVV Number on your credit card or debit card is a 3 digit number on VISA, MasterCard and Discover branded credit and debit cards.">
                            <i className="fe fe-help-circle" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="list-group-item">
                  {/* Radio */}
                  <div className="custom-control custom-radio">
                    {/* Input */}
                    <input className="custom-control-input" id="checkoutPaymentPaypal" name="payment" type="radio" data-toggle="collapse" data-action="hide" data-target="#checkoutPaymentCardCollapse" />
                    {/* Label */}
                    <label className="custom-control-label font-size-sm text-body text-nowrap" htmlFor="checkoutPaymentPaypal">
                      Trả tiền khi nhận hàng
                    </label>
                  </div>
                </div>
              </div>
              {/* Notes */}
              <textarea className="form-control form-control-sm mb-9 mb-md-0 font-size-xs" rows={5} placeholder="Order Notes (optional)" defaultValue={""} />
            </form>
          </div>
          <div className="col-12 col-md-5 col-lg-4 offset-lg-1">
            {/* Heading */}
            <h6 className="mb-7">Order Items (3)</h6>
            {/* Divider */}
            <hr className="my-7" />
            {/* List group */}
            <div className="product-card">
              <div className="card-body">
                <ul className="list-group list-group-lg list-group-flush">
                  <li className="list-group-item px-0">
                    <div className="row align-items-center">
                      <div className="col-4">
                        {/* Image */}
                        <a href="./product.html">
                          <img className="img-fluid" src="./img/products/product-6.jpg" alt="..." />
                        </a>
                      </div>
                      <div className="col-8">
                        {/* Title */}
                        <p className="font-size-sm font-weight-bold mb-6">
                          <a className="text-body" href="./product.html">Cotton floral print Dress</a> <br />
                          <span className="card-product-price">
                            <span className="sale text-primary">45,000</span>
                            <span className="text-muted line-through ml-1 inline-block">60,000</span>
                          </span> <br />
                          x 3 = 135,000 <u>vnđ</u>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item px-0">
                    <div className="row align-items-center">
                      <div className="col-4">
                        {/* Image */}
                        <a href="./product.html">
                          <img className="img-fluid" src="./img/products/product-10.jpg" alt="..." />
                        </a>
                      </div>
                      <div className="col-8">
                        {/* Title */}
                        <p className="font-size-sm font-weight-bold mb-6">
                          <a className="text-body" href="./product.html">Suede cross body Bag</a> <br />
                          <span className="card-product-price">
                            <span className="sale text-primary">45,000</span>
                            <span className="text-muted line-through ml-1 inline-block">60,000</span>
                          </span> <br />
                          x 3 = 135,000 <u>vnđ</u>
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/* Card */}
            <div className="product-card card mb-9 bg-light">
              <div className="card-body">
                <ul className="list-group list-group-sm list-group-flush-y list-group-flush-x">
                  <li className="list-group-item d-flex">
                    <span>Subtotal</span> <span className="ml-auto font-size-sm">$89.00</span>
                  </li>
                  <li className="list-group-item d-flex">
                    <span>Promotion</span> <span className="ml-auto font-size-sm">-$44.50</span>
                  </li>
                  <li className="list-group-item d-flex">
                    <span>Shipping</span> <span className="ml-auto font-size-sm">$8.00</span>
                  </li>
                  <li className="list-group-item d-flex">
                    <span>Tax</span> <span className="ml-auto font-size-sm">$00.00</span>
                  </li>
                  <li className="list-group-item d-flex font-size-lg font-weight-bold">
                    <span>Total</span> <span className="ml-auto">$97.00</span>
                  </li>
                </ul>
              </div>
            </div>
            {/* Disclaimer */}
            <p className="mb-7 font-size-xs text-gray-500">
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our privacy policy.
            </p>
            {/* Button */}
            <a href="./order-completed.html" className="btn btn-block btn-dark">
              Place Order
            </a>
          </div>
        </div>
      </div>
    </section>
    {/* FEATURES */}
    <section className="bg-light py-9">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-3">
            {/* Item */}
            <div className="d-flex mb-6 mb-lg-0">
              {/* Icon */}
              <i className="fe fe-truck font-size-lg text-primary" />
              {/* Body */}
              <div className="ml-6">
                {/* Heading */}
                <h6 className="heading-xxs mb-1">
                  Free shipping
                </h6>
                {/* Text */}
                <p className="mb-0 font-size-sm text-muted">
                  From all orders over $100
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            {/* Item */}
            <div className="d-flex mb-6 mb-lg-0">
              {/* Icon */}
              <i className="fe fe-repeat font-size-lg text-primary" />
              {/* Body */}
              <div className="ml-6">
                {/* Heading */}
                <h6 className="mb-1 heading-xxs">
                  Free returns
                </h6>
                {/* Text */}
                <p className="mb-0 font-size-sm text-muted">
                  Return money within 30 days
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            {/* Item */}
            <div className="d-flex mb-6 mb-md-0">
              {/* Icon */}
              <i className="fe fe-lock font-size-lg text-primary" />
              {/* Body */}
              <div className="ml-6">
                {/* Heading */}
                <h6 className="mb-1 heading-xxs">
                  Secure shopping
                </h6>
                {/* Text */}
                <p className="mb-0 font-size-sm text-muted">
                  You're in safe hands
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            {/* Item */}
            <div className="d-flex">
              {/* Icon */}
              <i className="fe fe-tag font-size-lg text-primary" />
              {/* Body */}
              <div className="ml-6">
                {/* Heading */}
                <h6 className="mb-1 heading-xxs">
                  Over 10,000 Styles
                </h6>
                {/* Text */}
                <p className="mb-0 font-size-sm text-muted">
                  We have everything you need
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  
  )
}

export default CheckOutPage