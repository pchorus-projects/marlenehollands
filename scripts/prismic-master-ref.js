const axios = require('axios');
const dotenv = require('dotenv').config();

async function getMasterRef(url, prismicAccessToken) {
  const res = await axios.get(`${url}/api?access_token=${prismicAccessToken}`, { method: 'GET' });
  return res.data.refs.find((ref) => ref.id === 'master').ref;
}

getMasterRef('https://marlenehollands.prismic.io', process.env.PRISMIC_TOKEN).then(console.log);
