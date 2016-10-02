let indexedDB = window.indexedDB || window.webkitIndexedDB || window.msIndexedDB;

let IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

if (IDBTransaction)
{
    IDBTransaction.READ_WRITE = IDBTransaction.READ_WRITE || 'readwrite';
    IDBTransaction.READ_ONLY = IDBTransaction.READ_ONLY || 'readonly';
}

class Database {
  constructor(name){
    if(indexedDB){
      this.name = name;
      this.dbVersion = 1;
      const _self = this;

      // open DB
     const openReq = indexedDB.open(name);
     openReq.onerror = (evt) => {
       console.error(evt.target.error);
     };

     openReq.onsuccess = (evt) => {
       const db = evt.target.result;
       _self.db = db;
       console.log('Successfully created db', _self.db);
     };

     openReq.onupgradeneeded = (evt) => {
       console.log('on upgrade needed called');
       const db = evt.target.result;
       if(!db.objectStoreNames.contains('websites')){
         let objectStore = db.createObjectStore(name, {keyPath: 'id'});
         objectStore.createIndex("title", "title", {
           unique: false
         });
       }
     }
   }else {
     alert('Your Browser does not support Index DB');
   }
  }

  loadData(){
    const MAX_PAGE_COUNT = 1;
    const promiseList = [];
    const _self = this;
    let api_url = 'http://hackerearth.0x10.info/api/ctz_coders?type=json&query=list_submissions&page=';

    for (let i = 0; i < MAX_PAGE_COUNT; i++) {
      let promise = new Promise((resolve, reject) => {
        fetch(api_url+i)
        .then(res => res.json())
        .then(res => {
          if(res.websites){
            let counter = 0;
            res.websites.forEach(item => {
              let dbReq = _self.db.transaction(['websites'], 'readwrite').objectStore('websites').add(item);
              dbReq.onerror = (evt) => {
                console.error(evt.target.error);
                counter += 1;
                if(counter === res.websites.length){
                  resolve();
                }
              }
              dbReq.onsuccess = (evt) => {
                counter += 1;
                if(counter === res.websites.length){
                  resolve();
                }
              }
            });

          }
        })
      });
      promiseList.push(promise);
    }

    return Promise.all(promiseList);
  }

  search(query){
    const _self = this;
    const result = [];
    var queryReq = _self.db.transaction(['websites'], 'readwrite').objectStore('websites').openCursor();
    return new Promise((resolve, reject)  => {
      queryReq.onsuccess = (evt) => {
        let cursor = evt.target.result;
        if(cursor){
          // console.log(cursor);
          const record = cursor.value;
          if((record.title.indexOf(query)!== -1) || (record.source_code.indexOf(query)!== -1) || (record.language.indexOf(query)!== -1)){
            result.push(record);
          }
          cursor.continue();
        }else {
          //No more record
          console.log(result,result.length);
          resolve(result);
        }
      }
    });
  }
}

const DBInstance = new Database('websites');
export default DBInstance;
