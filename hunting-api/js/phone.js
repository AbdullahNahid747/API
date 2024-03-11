const loadPhone = async (searchTest='13', isShowAll)  => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchTest}`);
    const data = await res.json();
    const  phones = data.data
    // console.log(data.data);
    displayPhones(phones, isShowAll)
}


const displayPhones = (phones, isShowAll) =>{
    console.log(phones)

    const phoneContainer = document.getElementById("phone-container")

    phoneContainer.textContent = " ";

        // show all button
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    console.log("Is Show All", isShowAll);
    // display only first 12 phones if not show  all
    if(!isShowAll){
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        // console.log(phone)
        // create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-gray-100 shadow-xl mx-2 my-4`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
             <h2 class="card-title">${phone.phone_name}</h2>
             <h3 class="card-title">${phone.brand}</h3>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-center mt-10">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">SHOW DETAILS</button>
          </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner
    toggleLoadingSpinner(false);
}

const handleShowDetails = async (id) => {
    // console.log('Clicked Show Details', id);
    const res = await  fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone);
}

    const showPhoneDetails = (phone) => {
        console.log(phone);
        const phoneName = document.getElementById( 'show-detail-phone-name' );
        phoneName.innerText = phone.name;
        const showDetailContainer = document.getElementById("show-detail-container");

        showDetailContainer.innerHTML = `
            <img src="${phone.image}" alt="" />
            <p>Storage: ${phone?.mainFeatures.storage}</p>
            <br>
            <p>Display Size: ${phone?.mainFeatures.displaySize
            }</p>
            <br>
            <p>Chipset : ${phone?.mainFeatures.chipSet}</p>
            <br>
            <p>Memory: ${phone?.mainFeatures.memory}</p>
            <br>
            <p>Slug: ${phone?.slug}</p>
            <br>
            <p>Release Date: ${phone?.releaseDate}</p>
            <br>
            <p>Brand: ${phone.brand}</p>
        `

        // show the modal
        show_ditails_modal.showModal();
    }

    // handle search button
 const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById( "search-field");
    const filterValue = searchField.value;
    console.log(filterValue);
    loadPhone(filterValue, isShowAll);
 }

//   handle search button recap
//  const handleSearch2 = () =>{
//     toggleLoadingSpinner(true);
//     const searchField = document.getElementById( "search-field2");
//     const filterValue = searchField.value;
//     console.log(filterValue);
//     loadPhone(filterValue);
//  }

 const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById("loading-spinner");
    if(isLoading){
       loadingSpinner.classList.remove("hidden"); 
    }
    else{
        loadingSpinner.classList.add("hidden"); 
    }
 }

//  handle show all 
const handleShowAll = () => {
    handleSearch(true);
}
loadPhone();