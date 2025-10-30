// Test the stats calculation logic with an empty array
const fetchedProducts = [];

console.log('Testing stats calculation with empty products array...');

// Calculate stats
console.log('Calculating stats...');
const totalProducts = fetchedProducts.length;
console.log('Total products:', totalProducts);

const categories = [...new Set(fetchedProducts.map(p => p.category))];
console.log('Categories:', categories);

const totalValue = fetchedProducts.reduce((sum, product) => {
    console.log('Adding product price:', product.price);
    return sum + (product.price || 0);
}, 0);
console.log('Total value:', totalValue);

const averagePrice = totalProducts > 0 ? totalValue / totalProducts : 0;
console.log('Average price:', averagePrice);

console.log('Stats calculated successfully!');