var items = {
    cereal:[
        {
            id:'cereal-1',
            des:'Gluten Free Cereals Cinnamon Heaven',
            price:2.00,
            img:'cereal2.jpg'
        },
        {
            id:'cereal-2',
            des:'The healthy cereals',
            price:2.00,
            img:'cereal1.jpeg'
        },
        {
            id:'cereal-3',
            des:'Cereal-Bowl Cake Recipe ',
            price:1.90,
            img:'cereal3.jpeg'
        },
        {
            id:'cereal-4',
            des:'Cold Cereals - Quaker Life Cereal,',
            price:1.90,
            img:'cereal4.jpg'
        },
        {
            id:'cereal-5',
            des:'The First Breakfast Cereal',
            price:1.90,
            img:'cereal5.jpg'
        },
        {
            id:'cereal-6',
            des:'Linux and breakfast cereal',
            price:1.90,
            img:'cereal6.jpg'
        },
    ],
    juice:[
        {
            id:'juice-1',
            des:'carrot coconut juice ',
            price:1.90,
            img:'juice1.jpg'
            
        },
        {
            id:'juice-2',
            des:'Juicy Juice – Harvest Hill',
            price:1.90,
            img:'juice2.png'
            
        },
        {
            id:'juice-3',
            des:'Juices With the Highest Sugar Content ',
            price:2.90,
            img:'juice3.jpg'
            
        },
        {
            id:'juice-4',
            des:'Ocean Spray 100% Juice Cranberry',
            price:3.90,
            img:'juice4.jpeg'
            
        },
        {
            id:'juice-5',
            des:'Ocean Spray 100% Orange Juice',
            price:7.90,
            img:'juice5.jpg'
            
        },
        {
            id:'juice-6',
            des:'Fresh Apple Juice',
            price:5.90,
            img:'juice6.jpeg'
            
        },
    ],
    candy:[
        {
            id:'candy-1',
            des:'24 Piece Bento Box of Candy',
            price:1.90,
            img:'candy1.jpg'
            
        },
        {
            id:'candy-2',
            des:'Passion Fruit Swirly Lollipop - Spun Candy',
            price:1.90,
            img:'candy2.jpeg'
            
        },
        {
            id:'candy-3',
            des:'Candy & Gum',
            price:2.90,
            img:'candy3.jpg'
            
        },
        {
            id:'candy-4',
            des:'Special Candy',
            price:3.90,
            img:'candy4.jpg'
            
        },
        {
            id:'candy-5',
            des:'AnnoDeel 12 pcs Sweet candy',
            price:7.90,
            img:'candy5.jpg'
            
        },
        {
            id:'candy-6',
            des:'Rainbow Candy Kabobs ',
            price:5.90,
            img:'candy6.jpg'
            
        },
        

    ]
};

(function(){
    var lclstrg = window.localStorage;
    var preiousClick = null;
    var displayOneByOne = function(next){
       if(next.length > 0){
            next.show(500);
            setTimeout(function() { 
                displayOneByOne(next.next());
            }, 300);
       }
       
    }
    $('#category > a').click(function(e){
       var category = $(this).data('cate').toString().toLowerCase();
     
       if(preiousClick !== category){
        $('#category > a').removeClass('selected');
        $(this).addClass('selected');
           $('#items ul').empty();
           var selectedItems = items[category];
            if( selectedItems !== undefined){
                for(var i=0; i < selectedItems.length; i++){
                    var ele = '<li class="displayNone"><div><div><img src="/images/'+selectedItems[i].img+'"></div><h3>'+selectedItems[i].des+'</h3>';
                    ele += '<p><span>$'+selectedItems[i].price.toFixed(2)+'</span><span class=""><span>$'+selectedItems[i].price.toFixed(2)+'</span><span data-id="'+selectedItems[i].id+'" class="addtocart">Add to Cart</span></p></div></li>';
                    $('#items ul').append(ele);

                }
                displayOneByOne($('#items ul li:first-child'));
                
            }
       }
       preiousClick = category;
    });
    var boughtItem = {};
    $('#items ul').on('click','li div p span.addtocart',function(e){
        var id = $(this).data('id');
       
        items[id.split('-')[0]].forEach(function(item){
           if(item.id === id){
               if(boughtItem[id] ===undefined){
                    boughtItem[id] = {
                        qty:1,
                        img:item.img,
                        des:item.des,
                        total:item.price,
                        price:item.price,
                    };
               }else{
                    boughtItem[id]['qty']  = boughtItem[id]['qty'] + 1;
                    boughtItem[id]['total']  = (boughtItem[id].qty + 1) *item.price;

               }
               cartManage('add');
           
           }
        });
        $('#st').show();
       
    });
    $('#cartItems').on('click','i.removeItem',function(e){
        delete boughtItem[$(this).data('id')];
        cartManage();
      
    });
    $('#cartItems').on('change','input.qty',function(e){
        var id = $(this).parent('div').siblings('i').data('id');
        var val = Math.floor($(this).val());
        boughtItem[id]['qty'] = $(this).val();
        boughtItem[id]['total']  = val * boughtItem[id].price;
        cartManage();
    });
    $( document ).ready(function() {
        $('#category >  a:first-child').trigger( "click" );
        var carts = lclstrg.getItem('cart');
        if(carts != null){
            boughtItem = JSON.parse(carts);
            cartManage();
        }
        
    });
    function cartManage(stat){
        var ele = '';
        var subtotal = 0;
        // var cartItems = $('#cartItems div i.removeItem');    
        for (var prp in boughtItem) {
        
            ele +=  '<div class="cartsItems "><div class="fl">';
            ele += '<img src="images/'+boughtItem[prp].img+'"/>'+boughtItem[prp].des+'</div><div class="fl">Qty.</br>';
            ele += '<input type="text" value="'+boughtItem[prp].qty+'" class="qty"/></div><div class="fl">Total </br>';
            ele += '<input type="text" value="'+boughtItem[prp].total.toFixed(2)+'" readonly class="total"/></div>';
            ele += '<div class="clear"></div><i data-id="'+prp+'" class="removeItem">x</i></div>';
            subtotal += boughtItem[prp].total;
            
        }
        $('#cartItems').empty().append(ele);
        if(subtotal == 0){
        $('#st span').empty().parent('p').hide();
        }else{
        $('#st span').empty().text(subtotal.toFixed(2));
        $('#st').show();
        // $('.cartsItems').show(500);
        }
           
        
        lclstrg.setItem('cart', JSON.stringify(boughtItem));
       

       
       
      
    }
})();