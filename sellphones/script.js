
// close cart

var closeCart = document.querySelector('.header_cart>i')
var gallery = document.querySelector('.gallery')
var body = document.querySelector('.body')


closeCart.addEventListener('click', function () {
  gallery.style.display = 'none'
  body.style.overflow = 'visible'

})

// display cart
var iconCart = document.querySelector('.fa-cart-shopping')
iconCart.addEventListener('click', function () {
  gallery.style.display = 'block'
  body.style.overflow = 'hidden'
})



// buy_product
var clickBuyProduct = document.querySelectorAll('.buy_product')
var nameProduct = document.querySelectorAll('.name_product')
var priceProduct = document.querySelectorAll('.price_product')
var imgProduct = document.querySelectorAll('.imge>img')
var tableCart = document.getElementById('table')
var arr = []
var PriceCart = document.querySelector('.total_price_cart')
var numberProductInHome = document.querySelector('.number_product_in_home')
var numberProductInCart = document.querySelector('.number_product_in_cart')



function numberProductInCarts() {
  numberProductInHome.innerHTML = arr.length
  numberProductInCart.innerHTML = arr.length
}



function displayAll() {
  let str = `  <tr>
 <th>Ảnh</th>
 <th>Tên sản phẩm</th>
 <th>Số lượng mua</th>
 <th>Xóa</th>
 <th>Số tiền 1 sản phẩm</th>
 <th>Tổng số tiền</th>
 
</tr>`
  arr.forEach((item, index) => {
    str += `<tr>
  <td class="table_cart_img"><img src=${item.srcImg}></td>
  <td>${item.name}</td>
  <td>
  <button onclick=reduce(${index})>-</button><span >${item.number}</span><button onclick=increase(${index})>+</button>
  </td>
  <td><button onclick=deleteProduct(${index})>Xóa</button></td>
  <td>${item.price}</td>
  <td>${item.totalPrice}</td>
  </tr>`
  })
  tableCart.innerHTML = str
}
displayAll()

function deleteProduct(index) {
  arr.splice(index, 1)
  numberProductInCarts()
  totalPriceCart()
  displayAll()
}

function increase(index) {
  let numbers = parseInt(arr[index].number)
  numbers += 1
  arr[index].number = numbers
  increasePrice(index)
  totalPriceCart()
  displayAll()
}

function reduce(index) {
  let numbers = parseInt(arr[index].number)
  numbers <= 1 ? deleteProduct(index) : numbers -= 1
  arr[index].number = numbers
  increasePrice(index)
  totalPriceCart()
  displayAll()
}

function increasePrice(index) {
  let split_str = parseInt(arr[index].price.replace(/[^0-9]/g, ''));
  let numberNew = parseInt(arr[index].number)
  let total = split_str * numberNew
  arr[index].totalPrice = total.toLocaleString() + 'đ'
}

function totalPriceCart() {
  let totalPriceCart = 0
  arr.forEach((item, index) => {
    totalPriceCart += parseInt(item.totalPrice.replace(/[^0-9]/g, ''))
  })
  PriceCart.innerHTML = 'Tổng Tiền :' + totalPriceCart.toLocaleString() + 'đ'
}


clickBuyProduct.forEach((item, index) => {
  item.addEventListener('click', () => {
    let oj = {
      name: nameProduct[index].innerText,
      price: priceProduct[index].innerText,
      totalPrice: priceProduct[index].innerText,
      srcImg: imgProduct[index].src,
      number: '1'
    }
    if (arr.length === 0) {
      arr.push(oj)
      numberProductInCarts()
      totalPriceCart()
      displayAll()
      return
    }
    let checkArr=false
    arr.forEach((item,index)=>{
      if( item.name===oj.name){
        let numbers = parseInt(arr[index].number)
        numbers += 1
        arr[index].number = numbers
        increasePrice(index)
        totalPriceCart()
        displayAll()
        checkArr=true
      }
    })
    if(checkArr===false){
      arr.push(oj)
      numberProductInCarts()
      totalPriceCart()
      displayAll()
    }

  })
})




// search

var allSearchButton = document.querySelector('.all_search')
var searchInput = document.querySelector('.search')
var cars = document.querySelector('.cars')
var form = document.querySelectorAll('#form>input')
var iphoneProduct = document.querySelector('.iphone_product')
var samsungProduct = document.querySelector('.samsung_product')
var nokiaProduct = document.querySelector('.nokia_product')
var formInput
var ele = 0
var arrCheckDivNone = []



function price(ojb) {
  ele = ojb.value;

}
function formCheck() {
  for (var i = 0; i < form.length; i++) {
    if (form[i].checked === true) {
      formInput = form[i].value
    }
  }

}

allSearchButton.addEventListener('click', () => {
  formCheck()
  arrCheckDivNone = []
  searchName()
  searchSelect(arrCheckDivNone)
  searchButton()
  ele = 0
  searchInput.value = ''

})

function searchName() {
  nameProduct.forEach((item, index) => {
    if (!item.innerHTML.toLowerCase().includes(searchInput.value.toLowerCase())) {
      item.parentElement.style.display = 'none'
    }
  })
  displayCheckAll()
  checkDivNone()
}

function displayCheckAll() {
  if (searchInput.value.toLowerCase() === '') {
    nameProduct.forEach(items => {
      if (items.parentElement.style.display === 'none') {
        items.parentElement.style.display = 'block'
      }
    })
  }
}
function displayAlls() {
  iphoneProduct.style.display = 'block'
  samsungProduct.style.display = 'block'
  nokiaProduct.style.display = 'block'
}

function checkDivNone() {
  nameProduct.forEach((item, index) => {
    if (item.parentElement.style.display !== 'none') {
      arrCheckDivNone.push(index)
    }
  })
}

function searchSelect(arr) {
  arr.forEach(item => {
    if (ele === '1') {
      if (parseInt(priceProduct[item].innerHTML.replace(/[^0-9]/g, '')) > 10000000) {
        priceProduct[item].parentElement.style.display = 'none'
      }
    }
    if (ele === '2') {
      if (parseInt(priceProduct[item].innerHTML.replace(/[^0-9]/g, '')) > 25000000 ||
        parseInt(priceProduct[item].innerHTML.replace(/[^0-9]/g, '')) < 10000000) {
        priceProduct[item].parentElement.style.display = 'none'
      }
    }
    if (ele === '3') {
      if (parseInt(priceProduct[item].innerHTML.replace(/[^0-9]/g, '')) < 25000000) {
        priceProduct[item].parentElement.style.display = 'none'
      }
    }
  })
}


function searchButton() {
  if (formInput === 'All') {
    displayAlls()
    displayCheckAll()
  }
  if (formInput === '1') {
    displayAlls()
    samsungProduct.style.display = 'none'
    nokiaProduct.style.display = 'none'
  }
  if (formInput === '2') {
    displayAlls()
    iphoneProduct.style.display = 'none'
    nokiaProduct.style.display = 'none'
  }
  if (formInput === '3') {
    displayAlls()
    iphoneProduct.style.display = 'none'
    samsungProduct.style.display = 'none'
  }
}




// display div gallery_compare

var iconCompare = document.querySelector('.icon_compare')
var galleryCompare = document.querySelector('.gallery_compare')
var iconInCompare = document.querySelector('.gallery_compare>i')
var checkGalleryCompare = false
iconCompare.addEventListener('click', () => {
  if (checkGalleryCompare === false) {
    galleryCompare.style.display = 'block'
    checkGalleryCompare = true
  }
})

iconInCompare.addEventListener('click', () => {
  if (checkGalleryCompare === true) {
    galleryCompare.style.display = 'none'
    checkGalleryCompare = false
  }
})




// add Product Compare



var iconAddCompare = document.querySelectorAll('.iphone_icon')
var arrCompare = []
var divCompareProduct = document.querySelector('.compare_product')
var notification = document.querySelector('.notification_Compare')
var chip = document.querySelectorAll('.chip')
var ram = document.querySelectorAll('.ram')
var camera = document.querySelectorAll('.camera')
var pin = document.querySelectorAll('.pin')



function checkLengthCompare(item) {
  if (arrCompare.length === 3) {
    divCompareProduct.innerHTML += `<div class="btn_compare">
    <button onclick=btnCompare() >So sánh</button><br>
    <button onclick=deleteAll()>Xóa tất cả</button>
</div>`

  }
}

function displayProductCompare() {
  let str = ` `
  arrCompare.forEach((item, index) => {
    str += `<div>
                    <i class="fa-solid fa-xmark " onclick=deleteCompare(${index})></i>
                   <div>
                    <img src="${item.srcImg}" alt="">
                   </div>
                   <div>
                    ${item.name}
                   </div>
                </div>
     `

  })
  divCompareProduct.innerHTML = str
}
displayProductCompare()

function checkProductCompare() {
  notification.style.display = 'flex'
  setTimeout(() => {
    notification.style.display = 'none'
  }, 2000);
}


iconAddCompare.forEach((item, index) => {
  item.addEventListener('click', () => {
    var ojCompare = {
      srcImg: imgProduct[index].src,
      name: nameProduct[index].innerHTML,
      price: priceProduct[index].innerHTML,
      chip: chip[index].innerHTML,
      ram: ram[index].innerHTML,
      camera: camera[index].innerHTML,
      pin: pin[index].innerHTML,

    }
    if (arrCompare.length === 0) {
      arrCompare.push(ojCompare)
      displayProductCompare()
      checkLengthCompare()
      return
    }
    let check = false
    arrCompare.forEach((items, indexs) => {
      if (items.name === ojCompare.name) {
        check = true
        checkProductCompare()
      }
    })
    if (check === false) {
      if (arrCompare.length < 3) {
        arrCompare.push(ojCompare)
        displayProductCompare()
        checkLengthCompare()
      }

    }
  })
})

function deleteCompare(index) {
  arrCompare.splice(index, 1)
  displayProductCompare()
}
function deleteAll() {
  arrCompare = []
  displayProductCompare()
  if (checkGalleryCompare === true) {
    galleryCompare.style.display = 'none'
    checkGalleryCompare = false
  }
}
// add div Compare
function btnCompare() {
  var btn = document.createElement('button')
  var div = document.createElement("div");
  var table = document.createElement("table")
  var galleryTextCompare = body.appendChild(div)
  var galleryTextCompareTable = galleryTextCompare.appendChild(table)
  var btnDiv = galleryTextCompare.appendChild(btn)
  btnDiv.innerHTML = 'Đóng'
  galleryTextCompare.classList.add('bgStyle')
  displayTableCompare(galleryTextCompareTable)
  if (checkGalleryCompare === true) {
    galleryCompare.style.display = 'none'
    checkGalleryCompare = false
  }
  btnDiv.addEventListener('click', () => {
    document.querySelector('.bgStyle').remove()
  })
}

function displayTableCompare(galleryTextCompareTable) {
  let str = `<tr>
  <th>Tên</th>
  <th>Hình Ảnh</th>
  <th>Giá</th>
  <th>Chíp</th>
  <th>Ram</th>
  <th>Camera</th>
  <th>Pin</th>
</tr>`
  arrCompare.forEach((item, index) => {
    str += `
  <tr>
  <td>${item.name}</td>
  <td>
    <img src="${item.srcImg}" alt="" class="imgcheck">
  </td>
  <td>${item.price}</td>
  <td>${item.chip}</td>
  <td>${item.ram}</td>
  <td>Camera sau :${item.camera}</td>
  <td>${item.pin}</td>
</tr>
  `
    galleryTextCompareTable.innerHTML = str
  })
}



