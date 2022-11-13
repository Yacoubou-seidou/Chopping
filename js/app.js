const items = ['sweets', 'cupcakes', 'cakes', 'doughnuts'];

(()=>{
    const cartInfo = document.getElementById('cart-info');
    const cart = document.getElementById('cart');

    cartInfo.addEventListener('click', ()=>{
        cart.classList.toggle('show-cart')
    });
})();

(()=>{
    const filterBtn = document.querySelectorAll('.filter-btn');
    filterBtn.forEach(btn =>{
        btn.addEventListener('click', event => {
            itemHidden ();
            const itemClass = event.target.getAttribute('data-filter');
            if(itemClass == 'all'){
                for(item of items){
                    hiddeOrVisibleMe (item, 'visible');
                }
            } else {
                hiddeOrVisibleMe (itemClass, 'visible');
            }
        })
    })
})();

(()=>{
    const searchItem = document.getElementById('search-item');
    const errorItem = document.getElementById('error-item');
    
    searchItem.addEventListener('change', () => {
        const search = searchItem.value.toLowerCase();
        if(items.indexOf(search) == '-1'){
            searchItem.value = '';
            errorItem.textContent = `Choix possible : ${(items.join(', '))}`;
            errorItem.style.color = '#EF7998';
        } else {
            errorItem.textContent = '';
        }
    })
})();

(()=> {
    const searchIcon = document.getElementById('search-icon');
    const searchItem = document.getElementById('search-item');
    const errorItem = document.getElementById('error-item');

    searchIcon.addEventListener('click', ()=>{
        const search = searchItem.value;
        if(search == ''){
            errorItem.textContent = `Choix possible : ${(items.join(', '))}`;
            errorItem.style.color = '#13CAF0';
        } else {
            for(item of items){
                if(item == search.toLowerCase()){
                    hiddeOrVisibleMe (item, 'visible');
                } else {
                    hiddeOrVisibleMe (item, 'hidde');
                }
                
            }
        }
    });
})();

(()=>{
    const cartBtn = document.querySelectorAll('.store-item-icon');
    cartBtn.forEach(btn =>{
        btn.addEventListener('click', event =>{
            if(event.target.parentElement.classList.contains('store-item-icon')) {
                const fullSrc = event.target.parentElement.previousElementSibling.src;

                const src = fullSrc.slice(fullSrc.indexOf('img') + 3);

                const name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;

                const price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;

                const item = {
                    img : `img-cart${src}`,
                    name : name,
                    price : price.slice(1).trim()
                };

                const cartItem = document.createElement('div');
                cartItem.classList.add(
                    'cart-item',
                    'd-flex',
                    'justify-content-between',
                    'text-capitalize',
                    'my-3'
                );
                cartItem.innerHTML = `
                    <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
                    <div class="item-text">
                        <p class="font-weight-bold mb-0">${item.name}</p>
                        <span>$</span>
                        <span class="cart-item-price" class="mb-0">${item.price}</span>
                    </div>
                    <a href="#" class="cart-item-remove">
                        <i class="fas fa-trash"></i>
                    </a>
                `;
                const cart = document.getElementById('cart');
                const total = document.querySelector('.cart-total-container');

                cart.insertBefore(cartItem, total);
                showTotals();
                alert('Element ajouté au panier avec success')
            }
        });
    });
    
})();

(()=> {
    const items = document.getElementById('cart');
    items.addEventListener('click', e =>{
        if(e.target.parentElement.classList.contains('cart-item-remove')){
            const item = e.target.parentElement.parentElement;
            item.parentElement.removeChild(item);
        }
        showTotals();
    })
})();

(()=>{
    const clearItems = document.getElementById('clear-cart');
    clearItems.addEventListener('click', ()=>{
        const allItems = document.querySelectorAll('.cart-item-remove');
        allItems.forEach(item =>{
            item.parentElement.parentElement.removeChild(item.parentElement);
        });
    });
})();

function itemHidden () {
    for(item of items){
        hiddeOrVisibleMe (item, 'hidde');
    }
}

function hiddeOrVisibleMe (me, hiddeOrVisible) {
    const display = (hiddeOrVisible == 'visible' ? 'block' : 'none')
    const itemList = document.querySelectorAll(`.${me}`);
    itemList.forEach(hidde => {
        hidde.style.transition = 'all 1s ease-in-out';
        hidde.style.display = display;
    });
}

function showTotals(){
    const total = [];
    const itemsElement = document.querySelectorAll('.cart-item-price');

    itemsElement.forEach(item =>{
        total.push(parseFloat(item.textContent));
    });
    const money = total.reduce((total, item)=>{
        total += item;
        return total;
    }, 0);
    const totalMoney = money.toFixed(2);
    
    document.getElementById('item-total').textContent =  document.getElementById('cart-total').textContent = totalMoney;
    document.getElementById('item-count').textContent = total.length
}

function notif(alert){
    const notif = document.getElementById('notif');
    notif.innerHTML = `
        <div class="alert alert-primary d-flex align-items-center" role="alert">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:"><use xlink:href="#info-fill"/></svg>
            <div>
                ${alert}
            </div>
        </div>
    `;

    setInterval(() => {
        notif.innerHTML = "";
    }, 5000);
}