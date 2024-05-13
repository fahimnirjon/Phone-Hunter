const loadPhone = async (searchText) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    console.log(phones);
    displayPhones(phones);
}

const displayPhones = phones =>{

    const phoneContainer = document.getElementById('phone-container');
    // clear search box
    phoneContainer.textContent = '';

// display show all
    const showAll = document.getElementById('show-button');

    if(phones.length > 20){
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
          <button onclick="showDetail('${phone.slug}');my_modal_5.showModal()" class="btn btn-primary">Show Details</button>
        </div>
      </div>
        `;
        // append child
        phoneContainer.appendChild(phoneCard);
    });

    // hide loading spinner
    loadingSpinner(false);
}

const showDetail =async(id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
   const phoneData = data.data;
    showPhoneDeatils(phoneData);
}

// search button

const handleSearch = () => {
    loadingSpinner(true);
   const searchField = document.getElementById('search-handler');
   const searchText = searchField.value;
   console.log(searchText);
   loadPhone(searchText);
}

const loadingSpinner = (isTrue) =>{
      const load = document.getElementById('spin-loadding'); 
      if(isTrue){
        load.classList.remove('hidden'); 
      }
       else{
        load.classList.add('hidden');
       }
}

const showPhoneDeatils = (phoneData) =>{

    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phoneData.name;


    my_modal_5.showModal();
    console.log(phoneData)

    const showAllContainer = document.getElementById('all-container');
    showAllContainer.innerHTML = `
        
        <img src="${phoneData.image}" alt=""/>
        <p><span>Brand:</span>${phoneData.brand}</p>
        <p><span>Chipset:</span>${phoneData.mainFeatures.chipSet}</p>
        <p><span>Display Size:</span>${phoneData.mainFeatures.displaySize}</p>
        <p><span>Memory:</span>${phoneData.mainFeatures.memory}</p>
        <p><span>Storage:</span>${phoneData.mainFeatures.storage}</p>
        <p><span>Sensors:</span>${phoneData.mainFeatures.sensors}</p>
        <p><span>Others:</span>${phoneData.others.Bluetooth}</p>
        <p><span>Release Date:</span>${phoneData.
            releaseDate}</p>
    `


}