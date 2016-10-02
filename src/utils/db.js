let indexedDB = window.indexedDB || window.webkitIndexedDB || window.msIndexedDB;

let IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

if (IDBTransaction)
{
    IDBTransaction.READ_WRITE = IDBTransaction.READ_WRITE || 'readwrite';
    IDBTransaction.READ_ONLY = IDBTransaction.READ_ONLY || 'readonly';
}

const queryFilter = (record, query) => {
  return ((record.title.indexOf(query)!== -1) || (record.metadata.level.indexOf(query)!== -1) || (record.language.indexOf(query)!== -1));
};

const filter = (record, filters) => {
  for (let value of filters) {
    if(record.compiler_status.indexOf(value)!==-1){
      return true;
    }
  }

  return false;
};

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
    const MAX_PAGE_COUNT = 1347;
    const promiseList = [];
    const _self = this;
    let api_url = 'https://hackerearth.0x10.info/api/ctz_coders?type=json&query=list_submissions&page=';

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

  search(query, filters){
    const _self = this;
    const result = [];
    let queryReq = _self.db.transaction(['websites'], 'readwrite').objectStore('websites').openCursor();
    return new Promise((resolve, reject)  => {
      queryReq.onsuccess = (evt) => {
        let cursor = evt.target.result;
        if(cursor){
          // console.log(cursor);
          const record = cursor.value;
          if(query && filters.length>0){
            if(queryFilter(record, query) && filter(record, filters)){
              result.push(record);
            }
          }else if (query) {
            if(queryFilter(record, query)){
              result.push(record);
            }
          }else if (filters.length>0) {
            if(filter(record, filters)){
              result.push(record);
            }
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

  getStats(){
    const _self = this;
    let queryReq = _self.db.transaction(['websites'], 'readwrite').objectStore('websites').openCursor();
    const stats = {};
    const compilation_result = {};
    const language_used = {};
    const problem_attempted = {};
    const problem_level_attempted = {};

    return new Promise((resolve, reject) => {
      queryReq.onsuccess = (evt) => {
        let cursor = evt.target.result;
        if(cursor){
          const record = cursor.value;
          stats.submissionCount += 1;

          if(!compilation_result[record.compiler_status]){
            compilation_result[record.compiler_status] = 0;
          }

          compilation_result[record.compiler_status] += 1;

          if(!language_used[record.language]){
            language_used[record.language] = 0;
          }

          language_used[record.language] += 1;

          if(!problem_attempted[record.title]){
            problem_attempted[record.title] = record.metadata.users_attempted;
          }

          if(!problem_level_attempted[record.metadata.level]){
            problem_level_attempted[record.metadata.level] = 0;
          }

          problem_level_attempted[record.metadata.level] += 1;

          cursor.continue();
        }else {
          //No More records
          //Show total submissions
          //Top three compilation result
          //Top three languages used
          //Top three level used
          //Top three problem attempted
          //Top rated problem
          resolve(stats)
        }
      };
    });
  }
}

const DBInstance = new Database('websites');
export default DBInstance;
