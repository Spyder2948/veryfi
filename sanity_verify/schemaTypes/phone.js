export const phone = {
    name: 'phone',
    title: 'Phone',
    type: 'document',
    fields: [
      { name: 'productName', title: 'Product Name', type: 'string'},
      { name: 'brand', title: 'Brand', type: 'string'},
      { name: 'features', title: 'Features', type: 'array', of: [{type: 'string'}]},
      { name: 'rating', title: 'Ratings', type: 'number' },
      { name: 'reviews', title: 'Reviews', type: 'string' },
      { name: 'image', title: 'Image URLs', type: 'array', of: [{type: 'url'}]},
      { name: 'amazon', title: 'Amazon Price', type: 'array', of: [{type: 'number'}]},
      { name: 'flipkart', title: 'Flipkart Price', type: 'array', of: [{type: 'number'}]},
      { name: 'croma', title: 'Croma Price', type: 'array', of: [{type: 'number'}]},
      { name: 'links', title: 'Product URLs', type: 'array', of: [{type: 'url'}]},
      { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'productName', maxLength: 90, slugify: input => input.toLowerCase().replace(/\s+/g, '-').slice(0, 90) }},
    ]
  }