/* упрощение обработки http запросов к серверу*/
export default class ApiService {
 
    constructor(endPoint) { // сохранить базовый URL
      this._endPoint = endPoint;
    }
  
    // обработка HTTP-запросов
    async _load({
      url,
      method = 'GET',
      body = null,
      headers = new Headers(), //HTTP-заголовки
    }) {
      const response = await fetch( //асинхронный HTTP-запрос по переданному URL
        `${this._endPoint}/${url}`,
        { method, body, headers },
      );
       try {
        ApiService.checkStatus(response);
        return response;
      } catch (err) {
        ApiService.catchError(err);
      }
    }
  
    static parseResponse(response) {
      return response.json();
    }
    
    static checkStatus(response) {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
    }
   
    static catchError(err) {
      throw err;
    }
  }
 