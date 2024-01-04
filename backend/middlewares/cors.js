// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
    'https://mestoprojectnotcommertial.nomoredomainsmonster.ru',
    'http://mestoprojectnotcommertial.nomoredomainsmonster.ru',
    'https://api.mestoprojectnotcommertial.nomoredomainsmonster.ru',
    'http:/api.mestoprojectnotcommertial.nomoredomainsmonster.ru',
    'https://localhost:3001',
    'http://localhost:3001',
  ];
  
  module.exports = (req, res, next) => {
    const { origin } = req.headers;
    console.log(origin); // Сохраняем источник запроса в переменную origin
    const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
    // сохраняем список заголовков исходного запроса
    const requestHeaders = req.headers['access-control-request-headers'];
    const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  
    // проверяем, что источник запроса есть среди разрешённых
    if (allowedCors.includes(origin)) {
      // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
      res.header('Access-Control-Allow-Origin', origin);
    }
  
    // Если это предварительный запрос, добавляем нужные заголовки
    if (method === 'OPTIONS') {
      // разрешаем кросс-доменные запросы любых типов (по умолчанию)
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', requestHeaders);
      // завершаем обработку запроса и возвращаем результат клиенту
      return res.end();
    }
  
    return next();
  };