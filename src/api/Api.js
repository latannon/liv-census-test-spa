

/**
 * Permet de centraliser les acces a l'API
 * Voir la notion de proxy configurable dans
 * le package.json. cela peut etre une meilleure 
 * façon de gerer cela ...
 * 
 * @export
 * @class Api
 */
export default class Api {
  static getRootUrl() {
    return process.env.REACT_APP_API_ROOT_URL;
  }
}
