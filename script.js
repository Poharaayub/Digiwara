const apps = [
    { name: "Camwa", description: "Camwa adalah aplikasi kamera praktis dengan fitur stempel otomatis (tanggal, waktu, lokasi, teks khusus) yang langsung bisa dibagikan ke WhatsApp. Cocok untuk kebutuhan kerja, laporan harian, atau berbagi momen cepat tanpa repot.", image: "https://i.postimg.cc/1RqFTVYQ/file-0000000013b861f887bfa1ca25387d3e.png/400x200.png?text=Chat+AI", category: "Android Apps", price: "Rp10.000" },
    
];

const appContainer = document.getElementById('appContainer');
const modal = document.getElementById('appModal');
const modalImage = document.getElementById('modalImage');
const modalName = document.getElementById('modalName');
const modalCategory = document.getElementById('modalCategory');
const modalDescription = document.getElementById('modalDescription');
const modalPrice = document.getElementById('modalPrice');
const modalBuyBtn = document.getElementById('modalBuyBtn');
const modalConfirmBtn = document.getElementById('modalConfirmBtn');
const categorySelect = document.getElementById('categorySelect');

// Tambahkan kategori otomatis ke dropdown
const categories = [...new Set(apps.map(app => app.category))];
categories.forEach(cat => {
    if (![...categorySelect.options].some(o => o.value === cat)) {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categorySelect.appendChild(option);
    }
});

function renderApps(filteredApps){
    appContainer.innerHTML = '';
    filteredApps.forEach(app=>{
        const card=document.createElement('div');
        card.className='app-card';
        card.innerHTML=`
            <img src="${app.image}" alt="${app.name}">
            <div class="app-content">
                <h3>${app.name}</h3>
                <p>${app.description}</p>
                <p class="price">${app.price}</p>
                <button onclick="openModal('${app.name}')">Beli Sekarang</button>
            </div>
        `;
        appContainer.appendChild(card);
    });
}

function filterApps(){
    const searchValue=document.getElementById('searchInput').value.toLowerCase();
    const categoryValue=document.getElementById('categorySelect').value;
    const filtered=apps.filter(app=>{
        const matchesSearch=app.name.toLowerCase().includes(searchValue);
        const matchesCategory=categoryValue==='all'||app.category===categoryValue;
        return matchesSearch && matchesCategory;
    });
    renderApps(filtered);
}

function buyApp(name){
    const app = apps.find(a=>a.name===name);
    alert(
        `Anda memilih "${app.name}" seharga ${app.price}.\n`+
        `Silakan lakukan pembayaran ke DANA: 0895-3654-62393 atas nama (E** Nov******).\n`+
        `Setelah pembayaran, konfirmasi ke admin. Link download akan segera dikirim, terimakasih.`
    );
}

function confirmPayment(name){
    const app = apps.find(a => a.name === name);
    const message = encodeURIComponent(
        `Halo, saya telah melakukan pembayaran untuk aplikasi "${app.name}" seharga ${app.price}. ` +
        `Mohon konfirmasi pembayaran & segera kirim link downloadnya. Terima kasih!`
    );
    window.open(`https://wa.me/6289637126728?text=${message}`, '_blank');
}

function openModal(name){
    const app = apps.find(a=>a.name===name);
    modalImage.src=app.image;
    modalName.textContent=app.name;
    modalCategory.textContent="Kategori: "+app.category;
    modalDescription.textContent=app.description;
    modalPrice.textContent="Harga: "+app.price;
    modalBuyBtn.onclick=()=>buyApp(app.name);
    modalConfirmBtn.onclick=()=>confirmPayment(app.name);
    modal.style.display="flex";
}

function closeModal(){ modal.style.display="none"; }
window.onclick=function(event){ if(event.target===modal){ closeModal(); } }

// Render semua aplikasi saat pertama kali dibuka
renderApps(apps);