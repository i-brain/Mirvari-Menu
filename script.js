// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, query, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAFbHGl4N-Pg4hJVz-lTYDbf_XhHe0r1o",
  authDomain: "mirvari-yevlax.firebaseapp.com",
  projectId: "mirvari-yevlax",
  storageBucket: "mirvari-yevlax.appspot.com",
  messagingSenderId: "672765241376",
  appId: "1:672765241376:web:33b3011e25b7da3542b445"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', async () => {
    const categoriesContainer = document.getElementById('categories-container');
    const categoryContent = document.getElementById('category-content');

    // Fetch categories from Firestore
    const categoryQuery = query(collection(db, 'category'), orderBy('timestamp'));
    const categorySnapshot = await getDocs(categoryQuery);
    const categories = categorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    console.log('Categories:', categories);

    // Loop through categories and fetch products for each category
    for (const category of categories) {
        // Create category button
        const categoryButton = document.createElement('div');
        categoryButton.classList.add('category');
        categoryButton.innerText = category.title;
        categoryButton.onclick = () => scrollToCategory(`category${category.id}`);
        categoriesContainer.appendChild(categoryButton);

        // Create category section
        const categorySection = document.createElement('div');
        categorySection.id = `category${category.id}`;
        categorySection.classList.add('category-section');

        const categoryTitle = document.createElement('h2');
        categoryTitle.innerText = category.title;
        categorySection.appendChild(categoryTitle);

        // Fetch products for the category
        const productQuery = query(collection(db, `category/${category.id}/product`), orderBy('timestamp'));
        const productSnapshot = await getDocs(productQuery);
        const products = productSnapshot.docs.map(doc => doc.data());

        console.log(`Products for category ${category.title}:`, products);

        // Create items
        products.forEach(itemData => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item');
            itemElement.innerHTML = `
                <div class="item-details">
                    <h3>${itemData.title}</h3>
                    <p>${itemData.price} ₼</p>
                </div>
                ${itemData.image ? `<img src="${itemData.image}" alt="${itemData.title}">` : ''}
            `;
            categorySection.appendChild(itemElement);
        });

        categoryContent.appendChild(categorySection);
    }
});

function scrollToCategory(categoryId) {
    const categoryElement = document.getElementById(categoryId);

    if (categoryElement) {
        const offset = 80; // Adjust this value based on the height of the fixed category list

        // Calculate the position of the category element with an offset
        const position = categoryElement.offsetTop - offset;

        // Smoothly scroll to the position
        window.scrollTo({
            top: position,
            behavior: 'smooth'
        });
    }
}

let lastScrollTop = 0;
const categoriesContainer = document.querySelector('.categories-container');

document.addEventListener('scroll', () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        categoriesContainer.style.top = '-80px'; // Adjust based on the height of your category list
    } else {
        // Scrolling up
        categoriesContainer.style.top = '0';
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
});
