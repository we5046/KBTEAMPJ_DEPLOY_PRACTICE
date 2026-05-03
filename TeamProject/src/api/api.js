import axios from 'axios';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const shouldUseSupabase = Boolean(supabaseUrl && supabaseAnonKey);

const jsonServerApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
});

const resourceToTable = {
  users: 'users',
  transactions: 'transactions',
  categories: 'categories',
  couples: 'couples',
  coupleRequests: 'coupleRequests',
  coupleGoals: 'coupleGoals',
};

const defaultCategories = {
  income: ['급여', '부수입', '기타', '커플'],
  expense: ['식비', '교통/차량', '주거/통신', '쇼핑/생활', '의료/건강', '문화/여가', '기타'],
};

const parseRequestUrl = (url, config = {}) => {
  const [pathPart, queryString = ''] = url.split('?');
  const [resource, id] = pathPart.replace(/^\/+/, '').split('/');
  const params = new URLSearchParams(queryString);

  Object.entries(config.params || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.set(key, value);
    }
  });

  return {
    resource,
    table: resourceToTable[resource],
    id,
    params,
  };
};

const getSupabaseRestBaseUrl = () => {
  const trimmedUrl = supabaseUrl.replace(/\/$/, '');
  return trimmedUrl.endsWith('/rest/v1')
    ? trimmedUrl
    : `${trimmedUrl}/rest/v1`;
};

const getSupabaseEndpoint = (table) => `${getSupabaseRestBaseUrl()}/${table}`;

const requestSupabase = async ({ method, url, data, config }) => {
  const { table, id, params } = parseRequestUrl(url, config);

  if (!table) {
    throw new Error(`Unknown API resource: ${url}`);
  }

  const search = new URLSearchParams();
  search.set('select', '*');

  if (id) {
    search.set('id', `eq.${id}`);
  }

  params.forEach((value, key) => {
    if (key === '_sort' || key === '_order' || key === 'q') return;
    search.set(key, `eq.${value}`);
  });

  if (params.has('_sort')) {
    const sort = params.get('_sort');
    const order = params.get('_order') === 'desc' ? 'desc' : 'asc';
    search.set('order', `${sort}.${order}`);
  }

  const fetchOptions = {
    method,
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
  };

  if (data && method !== 'GET') {
    fetchOptions.body = JSON.stringify(data);
  }

  const response = await fetch(`${getSupabaseEndpoint(table)}?${search}`, fetchOptions);
  const responseText = await response.text();
  const parsedData = responseText ? JSON.parse(responseText) : null;

  if (!response.ok) {
    throw new Error(parsedData?.message || `Supabase request failed: ${response.status}`);
  }

  let responseData = parsedData;

  if (method === 'GET' && params.has('q')) {
    const keyword = params.get('q').toLowerCase();
    responseData = (responseData || []).filter((item) =>
      Object.values(item).some((value) =>
        String(value ?? '').toLowerCase().includes(keyword),
      ),
    );
  }

  if (id && method === 'GET') {
    responseData = responseData?.[0] || null;
  }

  if (table === 'categories' && method === 'GET' && !id) {
    responseData = responseData?.[0] || defaultCategories;
    responseData = {
      income: responseData.income?.length ? responseData.income : defaultCategories.income,
      expense: responseData.expense?.length ? responseData.expense : defaultCategories.expense,
    };
  }

  if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(method)) {
    responseData = Array.isArray(responseData) ? responseData[0] : responseData;
  }

  if (method === 'GET') {
    responseData = Array.isArray(responseData)
      ? responseData.map((item) => ({ ...item }))
      : responseData;
  }

  return { data: responseData };
};

const supabaseApi = {
  get: (url, config) => requestSupabase({ method: 'GET', url, config }),
  post: (url, data, config) => requestSupabase({ method: 'POST', url, data, config }),
  put: (url, data, config) => requestSupabase({ method: 'PATCH', url, data, config }),
  patch: (url, data, config) => requestSupabase({ method: 'PATCH', url, data, config }),
  delete: (url, config) => requestSupabase({ method: 'DELETE', url, config }),
};

const api = shouldUseSupabase ? supabaseApi : jsonServerApi;

export default api;
