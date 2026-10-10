
let products = [

    {
        image: './images/sneakers.jpg',
        id: 1,
        name: 'sneakers',
        category: 'shoes',
        price: 90,

    },
    {
        image: './images/scarf.webp',
        id: 2,
        name: 'scarf',
        category: 'clothing',
        price: 30
    },
    {
        image: './images/paintbrush.jpg',
        id: 3,
        name: 'paintbrush',
        category: 'painting',
        price: 20
    },
    {
        image: './images/guache.jpg',
        id: 4,
        name: 'gauche',
        category: 'painting',
        price: 40,
    },
    {
        image: './images/hats.jpg',
        id: 5,
        name: 'hat',
        category: 'clothing',
        price: 20
    },
    {
        image: './images/colored pencils.jpg',
        id: 6,
        name: 'colored pencil',
        category: 'painting',
        price: 50
    },
    {
        image: './images/watercolor.jpg',
        id: 7,
        name: 'watercolor',
        category: 'painting',
        price: 25
    },
    {
        image: './images/jacket.jpg',
        id: 8,
        name: 'jacket',
        category: 'clothing',
        price: 100
    },
    {
        image: './images/gloves.jpg',
        id: 9,
        name: 'gloves',
        category: 'clothing',
        price: 35
    }
    , {
        image: './images/sunglasses.jpg',
        id: 10,
        name: 'sunglasses',
        category: 'accessories',
        price: 37
    },
    {
        image: './images/watch.jpg',
        id: 11,
        name: 'watch',
        category: 'accessories',
        price: 44
    },
    {
        image: './images/tshirt.jpg',
        id: 12,
        name: 'tshirt',
        category: 'clothing',
        price: 50
    }

]
const displayproducts = document.getElementById('displayproducts')
const message = document.getElementById('message')
const cartcount = document.getElementById('cartcount')
function displayproductsfunc() {
    products.forEach((product) => {
        displayproducts.innerHTML += `<div class='product'>
    <img src='${product.image}' class='productimg' ><br>
    <p><strong>name:</strong>  ${product.name}</p>
    <p><strong>category:</strong> ${product.category}</p>
    <p><strong>price:</strong>  $ ${product.price}</p>
    <button class='addtocart' data-id='${product.id}'>Add to cart</button>
    </div>
    
    `
    })
}
displayproductsfunc()
const addbtns = document.querySelectorAll('.addtocart')

let cart = []
addbtns.forEach((button) => {
    button.addEventListener('click', function () {
        
        cart = JSON.parse(localStorage.getItem('cart')) || [];
        const id = Number(button.dataset.id)
        const selectedproduct = products.find((product) => {
            return product.id === id
        })
        const existingproduct = cart.find((product) => {
            return product.id === id
        })
        if (existingproduct) {
            existingproduct.quantity++
        }
        else {
            let shopitem = {
                image:selectedproduct.image,
                id:selectedproduct.id,
                name: selectedproduct.name,
                price: selectedproduct.price,
                quantity: 1
            }
              cart.push(shopitem)
        }

      

        localStorage.setItem('cart', JSON.stringify(cart))
         updatecartcount()

    })
})
function updatecartcount(){
    let cart=JSON.parse(localStorage.getItem('cart'))||[]
    let count=0
    cart.forEach((product)=>{
        count+=product.quantity
    })
    cartcount.textContent=count
}
updatecartcount()
window.addEventListener('storage', function () {
    updatecartcount()
})