const shoppingcart=document.getElementById('shoppingcart')
const totalprice=document.getElementById('totalprice')
const shoppingcount=document.getElementById('shoppingcount')
const myselect=document.getElementById('myselect')
const summarryprice=document.getElementById('summarryprice')
const coupon = document.getElementById('coupon');
const applycoupon = document.getElementById('applycoupon');
const couponmessage = document.getElementById('couponmessage');
 let cart=JSON.parse(localStorage.getItem('cart'))||[]


function displaycart(){
   
    shoppingcart.innerHTML=''
    shoppingcount.innerHTML=`${cart.length} items`
    cart.forEach((product)=>{
    
        shoppingcart.innerHTML+=`<div class='addedproduct'>
        <img src='${product.image}' class='cartimage'>
        <p>${product.name}</p>
        <p>price:$${product.price}</p>
        <div class='productbottom'><div>quantity:<button class='minusbtn' data-id='${product.id}' >-</button> <span>${product.quantity}</span>
        <button class='plusbtn' data-id='${product.id}' >+</button></div>
         <button class='removebtn' data-id='${product.id}'>remove</button> </div>       
        </div> <br>
        `
    })
  const plusbtns=document.querySelectorAll('.plusbtn')
  plusbtns.forEach((button)=>{
    button.addEventListener('click',function(){
        const id=Number(button.dataset.id)
        const selectedplus=cart.find((product)=>{
            return product.id===id
        })
        selectedplus.quantity++
        localStorage.setItem('cart', JSON.stringify(cart));
        displaycart()
        totalamount()
    })
  })
  const minusbtns=document.querySelectorAll('.minusbtn')
  minusbtns.forEach((button)=>{
    button.addEventListener('click',function(){
        const id=Number(button.dataset.id)
        const selectedminus=cart.find((product)=>{
            return product.id===id
        })
        if(selectedminus.quantity===1){
            return
        }
        else{ selectedminus.quantity--}
        localStorage.setItem('cart', JSON.stringify(cart));
       
        displaycart()
        totalamount()
    })
      
  })
  const removebtns=document.querySelectorAll('.removebtn')
  removebtns.forEach((button)=>{
    button.addEventListener('click',function(){
         const id=Number(button.dataset.id)
         cart=cart.filter((product)=>{
            return product.id!==id
         })
              localStorage.setItem('cart', JSON.stringify(cart));

         displaycart()
         totalamount()
    })
  })

const clear=document.getElementById('clear')
clear.addEventListener('click',function(){
   cart=[]
   localStorage.removeItem('cart')
   displaycart()
   totalamount()
})
}
 myselect.addEventListener('change',function(){
        totalamount()
    })
  function totalamount(){

    let subtotal=0
    cart.forEach((product)=>{

        subtotal+=product.price*product.quantity
    })
       let discount = 0;

    if (coupon.value.toUpperCase() === 'SAVE10') {
        discount = subtotal * 0.10;
    }

    if (coupon.value.toUpperCase() === 'SAVE20') {
        discount = subtotal * 0.20;
    }
    let shipping=0
   
    if(myselect.value==='standard-delivery-$5'){
        shipping=5
    }
    if(myselect.value==='higher-order-delivery-$10'){
        shipping=10
    }
    let total=subtotal-discount+shipping
    summarryprice.innerHTML=`$${subtotal}`
    totalprice.innerHTML=`total price:$${total}`
    
}
applycoupon.addEventListener('click',function(){
    const code=coupon.value.trim().toUpperCase()
    if(code==='SAVE10'||code==='SAVE20'){
              couponmessage.textContent = 'Coupon applied successfully!';
        totalamount();
    } else {
        couponmessage.textContent = 'Invalid coupon code.';
    }
    }
)
displaycart()
totalamount()
window.addEventListener('storage', function () {
    cart = JSON.parse(localStorage.getItem('cart')) || []
    displaycart()
    totalamount()
})