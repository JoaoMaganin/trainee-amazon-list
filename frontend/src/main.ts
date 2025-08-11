import './style.css';


// Element from DOM
const keywordInput = document.getElementById('keyword-input') as HTMLInputElement;
const scrapeButton = document.getElementById('scrape-button') as HTMLButtonElement;
const resultsContainer = document.getElementById('results-container')!;
const loadingIndicator = document.getElementById('loading')!;
const errorMessageDiv = document.getElementById('error-message')!;

// Main search function
const handleSearch = async () => {
  const keyword = keywordInput.value.trim();
  if (!keyword) {
    alert('Enter a product to search for.');
    return;
  }

  scrapeButton.disabled = true;
  scrapeButton.textContent = 'Searching...';
  resultsContainer.innerHTML = '';
  errorMessageDiv.classList.add('hidden');
  loadingIndicator.classList.remove('hidden');

  try {
    const response = await fetch(`/api/scrape?keyword=${encodeURIComponent(keyword)}`);

    if (!response.ok) {
      throw new Error(`An error occurred on the server: ${response.statusText}`);
    }

    const products = await response.json();

    // Render the products
    displayProducts(products);

  } catch (error) {
    console.error('Failed to fetch products:', error);
    errorMessageDiv.textContent = `Error fetching products. Check if the backend is running and try again. Details: ${error instanceof Error ? error.message : 'Erro desconhecido.'}`;
    errorMessageDiv.classList.remove('hidden');
  } finally {
    //Restore a UI to normal
    scrapeButton.disabled = false;
    scrapeButton.textContent = 'Serach';
    loadingIndicator.classList.add('hidden');
  }
};

// Render products
const displayProducts = (products: any[]) => {
  resultsContainer.innerHTML = '';

  if (products.length === 0) {
    resultsContainer.innerHTML = '<p>No products found for this search.</p>';
    return;
  }

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    // Fallbacks for null values
    card.innerHTML = `
      <img src="${product.imageUrl}" alt="Image from ${product.title}" />
      <h3>${product.title}</h3>
      <p class="rating">⭐ ${product.rating || 'N/A'}</p>
      <p>${product.reviews || '0'} reviews</p>
    `;
    
    resultsContainer.appendChild(card);
  });
};

// Adding event listeners
scrapeButton.addEventListener('click', handleSearch);

keywordInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleSearch();
  }
});