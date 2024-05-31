import axios from 'axios';

const serverRequest = async (query, pageNum, pageLim) => {
  const { data } = await axios.get('https://pixabay.com/api', {
    params: {
      key: '43998690-c32ec46c3205eb1d30dd41df5',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: pageNum,
      per_page: pageLim,
    },
  });
  return data;
};

export { serverRequest };
