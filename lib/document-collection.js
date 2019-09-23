const files = require('./files');
// use npm to find a module for creating ids
const shortid = require('shortid');
const path = require('path');

class DocumentCollection {
  constructor(folder) {
    this.folder = folder;
  }

  save(object) {

    let id = shortid.generate();
    object._id = id;
    let serializedObject = JSON.stringify(object);
    return files.writeFile(`${this.folder}/${id}.json`, serializedObject, 'utf8')
      .then(() => {
        return object;
      })
      .catch(err => { console.log(err); });
  }

  get(id) {

    const filePath = `${this.folder}/${id}.json`;
    return files.readFile(filePath, 'utf8')
      .then(json => {
        return JSON.parse(json);
      })
      .catch(err => { console.log(err); });
  }

  getAll() {

    return files.readdir(this.folder)
      .then(files => {
        return Promise.all(files.map(file => {
          const fileId = path.parse(file).name;
          return this.get(fileId);
        }));
      })
      .catch(err => { console.log(err); });
  }
}

module.exports = DocumentCollection;