

var product = [{
    id: 1,
    img: 'https://images.unsplash.com/photo-1644031995386-fe9665dc5b57?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Thai Tea',
    price: 40,
    type: 'Tea',
}, {
    id: 2,
    img: 'https://images.unsplash.com/photo-1554600740-951beab4712b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Black Coffe',
    price: 50,
    type: 'Coffe',
}, {
    id: 3,
    img: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Green Tea',
    price: 60,
    type: 'Tea',}];

    $(document).ready(() => {
        var html = '';
        for (let i = 0; i < product.length; i++) {
            html += ` <div onclick ="openproductdetail(${i})" class="pruduct-items ${product[i].type}">

                <div class="img">
                    <img class="product-img" src="${product[i].img}" alt="">
                </div>

                <div class="font-tea">${product[i].name}</div>

                <div class="font-teaprice">${product[i].price} bath</div>

            </div>`;
            
        }
        $("#product-list").html(html)
    })

function serchsomething(elem)
{
        var value = $('#'+elem.id).val()
        console.log(value)

        var html = '';
        for (let i = 0; i < product.length; i++) {
            if (product[i].name.includes(value)) {

                html += ` <div class="pruduct-items"${product[i].type}>

                <div class="img">
                    <img class="product-img" src="${product[i].img}" alt="">
                </div>

                <div class="font-tea">${product[i].name}</div>

                <div class="font-teaprice">${product[i].price} bath</div>

            </div>`;
            }
        }
        if (html == '') {
            $("#product-list").html(`<p> Not Found Product</p>`);
        }
        else{
        $("#product-list").html(html)}
      
}

function serchproduct(param)
{
    console.log(param)
    $(".pruduct-items").css('display','none')
    if (param == 'All') 
    {
        $(".pruduct-items").css('display','block')
    }
    else {
        $("."+param).css('display','block')
    }
    
}


var productindex =0;
function openproductdetail(index)
{
    productindex = index;
    console.log(productindex)
    $("#modaldesc").css('display','flex')
    $("#mdd-img").attr('src',product[index].img)
    $("#mdd-name").text(product[index].name)
    $("#mdd-price").text(product[index].price + ' bth')

}

function closemodal(){
    $(".modal").css('display','none')
}



var cart = [];
function addtocart()
{
    var pass = true;

    for (let i = 0; i < cart.length; i++) 
    {
       if (productindex == cart[i].index) 
        {
            console.log('found saame product')
        cart[i].count++;
        pass = false;
        } 
        
    }

    if(pass)
    {
        var obj = 
        {
            index: productindex,
            id: product[productindex].id,
            name: product[productindex].name,
            price: product[productindex].price,
            img: product[productindex].img,
            count: 1
        };
        //console.log(obj)
        cart.push(obj)

    }
  console.log(cart)

  Swal.fire
  ({
    icon: 'success',
    title: 'ADD ' + product[productindex].name + ' to cart',
  })
  $('#cart-count').css('display','flex').text(cart.length)



}

function opencart()
{
    $('#modalcart').css('display','flex')
    rendercart();

}

function rendercart()
{
    if (cart.length > 0) 
    {
       var html ='';
       for (let i = 0; i < cart.length; i++) 
       {
        html += `<div class="cartlist-items">
                   
                    <div class="cartlist-left">
                        <img  src="${cart[i].img}" alt="">
                        <div class="cartlist-detail">
                            <p style="font-size: 1.5vw;">${cart[i].name}</p>
                            <p style="font-size: 1.2vw;">${cart[i].price * cart[i].count} bath</p>
                        </div>
                    </div>
                    
                    <div class="cartlist-right">
                        <p onclick="deinitems('-' , ${i})" class="btnc">-</p>
                        <p id= "countitems${i}" style="margin: 0 20px;">${cart[i].count}</p>
                        <p onclick="deinitems('+' , ${i})" class="btnc">+</p>

                    </div>
                </div>`;
        
       } 
       $("#mycart").html(html)
    }
    else
    {
       $("#mycart").html(`<h3>Not found product-list</h3>`)
    }
}

function deinitems(action, index)
{
  if(action == '-')
  {
     if(cart[index].count > 0)
     {
        cart[index].count--; 
        $("#countitems"+index).text(cart[index].count) 

        if(cart[index].count <=0)
        {
            Swal.fire
            ({
                icon: 'warning',
                title: 'Are you sure to delete?',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: 'Delete',
                cancelButtonText: 'Cancle'

            }).then((res) => {
                if(res.isConfirmed)
                {
                    cart.splice(index, 1)
                    rendercart();
                    $('#cart-count').css('display','flex').text(cart.length)
                    if(cart.length <= 0)
                    {
                        $('#cart-count').css('display','none')

                    }  
                }
                else{
                    cart[index].count++;
                    $("#countitems"+index).text(cart[index].count) 


                }
            })

        }




     }
  }
  else if (action == '+')
  {
    cart[index].count++;
    $("#countitems"+index).text(cart[index].count)
    

  }




}

