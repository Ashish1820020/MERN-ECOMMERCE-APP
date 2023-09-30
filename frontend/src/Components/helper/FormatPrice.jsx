const FormatPrice = ({ price, discount }) => {

  let discountedPrice = price;

  if(discount!==undefined){
    discountedPrice = price - Math.ceil(((price*discount)/100));
  }
  

  return Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(discountedPrice);
};

export default FormatPrice;