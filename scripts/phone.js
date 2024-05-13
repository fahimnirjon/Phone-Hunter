const loadPhone = async (searchText) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones);
}

const displayPhones = phones =>{

    const phoneContainer = document.getElementById('phone-container');
    // clear search box
    phoneContainer.textContent = '';

// display show all
    const showAll = document.getElementById('show-button');

    if(phones.length > 10){
        showAll.classList.remove('hidden')
    }
    else{
        showAll.classList.add('hidden');
    }
// display 1-10
    phones = phones.slice(0,10);

    phones.forEach(phone => {
        console.log(phone);

        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-base-100 shadow-2xl`;
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
        <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>${phone.slug}</p>
        <div class="card-actions">
          <button class="btn btn-primary">Buy Now</button>
        </div>
      </div>
        `;
        phoneContainer.appendChild(phoneCard);
    })

}

// search button

const handleSearch = () => {
   const searchField = document.getElementById('search-handler');
   const searchText = searchField.value;
   console.log(searchText);
   loadPhone(searchText);
}
