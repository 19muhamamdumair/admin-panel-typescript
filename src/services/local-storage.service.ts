class getLocalStorageServices {
 
    getLocalStorageObject = (key : string) : any => {
        let value = localStorage.getItem(key);
        if (value) return JSON.parse(value);
        else return null;
   }
    setLocalStorageObject = (key : string, value : any) : any => {
        return localStorage.setItem(key, JSON.stringify(value))
    }
}
export default new getLocalStorageServices();
