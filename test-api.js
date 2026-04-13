const axios = require('axios');
const base = 'http://localhost:5000';

async function run() {
  try {
    console.log('--- OMDb SEARCH ---');
    const search = await axios.get(`${base}/search?q=batman`);
    console.log('SEARCH status:', search.status);
    console.log('SEARCH results count:', search.data.Search?.length ?? 0);
    console.log('SEARCH first items:', JSON.stringify(search.data.Search?.slice(0, 3), null, 2));

    console.log('\n--- WATCHLIST POST ---');
    const postRes = await axios.post(`${base}/watchlist`, { title: 'Inception', year: '2010' });
    console.log('POST status:', postRes.status, 'body:', postRes.data);

    console.log('\n--- WATCHLIST GET ---');
    const getRes = await axios.get(`${base}/watchlist`);
    console.log('GET status:', getRes.status, 'total items:', getRes.data.length);
    const item = getRes.data.find(m => m.title === 'Inception' && m.year === '2010');
    console.log(item ? 'FOUND item id=' + item.id : 'INCEPTION not found');
    if (!item) return;

    console.log('\n--- WATCHLIST PUT ---');
    const putRes = await axios.put(`${base}/watchlist/${item.id}`, { favorite: true });
    console.log('PUT status:', putRes.status, 'body:', putRes.data);

    console.log('\n--- WATCHLIST GET AFTER UPDATE ---');
    const getRes2 = await axios.get(`${base}/watchlist`);
    const updated = getRes2.data.find(m => m.id === item.id);
    console.log('UPDATED favorite value:', updated?.favorite);

    console.log('\n--- WATCHLIST DELETE ---');
    const deleteRes = await axios.delete(`${base}/watchlist/${item.id}`);
    console.log('DELETE status:', deleteRes.status, 'body:', deleteRes.data);

    console.log('\n--- WATCHLIST GET AFTER DELETE ---');
    const getRes3 = await axios.get(`${base}/watchlist`);
    const still = getRes3.data.find(m => m.id === item.id);
    console.log(still ? 'Item still exists' : 'Item removed');
  } catch (err) {
    console.error('ERROR', err.response ? err.response.status : err.code, err.response ? err.response.data : err.message);
  }
}

run();