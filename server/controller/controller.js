var messDb = require('D:/Atom/Projects/nodekb/server/model/modelSchemaMess.js');
const fs = require('fs');

// salveaza un mesaj
exports.create = (req,res) =>{
  if(!req.body){
    res.status(400).send({message: "Nu poate fi empty!"});
    return;
  }

  const mess = new messDb({
    users : req.body.users,
    date : req.body.date,
    messages: req.body.messages,
  })
  //aici se salveaza userul in database
  mess
    .save(mess)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
        res.status(500).send({
        message:err.message || "Eroare!"
      })
    })
}

exports.find = (req,res) =>{
  messDb.find()
  .then(mess => {
    res.json(mess);
    let data  = JSON.stringify(mess);
    fs.writeFileSync('fisier.json',data);
  })
  .catch(err =>{
    res.status(500).send({message:err.message || "Eroare!"})
  })
}

exports.findSort = (req,res) =>{
  const messAux = messDb;
  messAux.find().sort({date : -1})
  .then(mess => {
    res.send(mess)
    let data = JSON.stringify(mess);
    fs.writeFileSync('fisier.json',data);
  })
  .catch(err =>{
    res.status(500).send({message:err.message || "Eroare!"})
  })
}

exports.findSortAgregate = (req,res) =>{
  const messAux = messDb.find();
  messDb.aggregate([
    {
     $sort :{date : -1}
    }
  ])
  .then(mess =>{
    console.log(mess.messages)
    res.send(mess)
  })
  .catch(err=>{
    res.status(500).send({message:err.message || "Eroare!"})
  })
}

//Updateaza un mesaj
exports.update = (req,res) =>{
  if(!req.body){
    return res
      .status(400)
      .send({message:"Nu poate sa fie empty"})
  }

  const id = req.params.id;
  messDb.findByIdAndUpdate(id,req.body,{useFindAndModify : false})
    .then(data =>{
      if(!data){
        res.status(404).send({message:err.message || "Eroare nu exista id!"})
      } else{
        res.send(data)
      }
    })
    .catch(err =>{
      res.status(500).send({message:err.message || "Eroare la updatare!"})
    })

}

//Sterge un mesaj
exports.delete = (req,res) =>{
  const id = req.params.id;
  messDb.findByIdAndDelete(id)
    .then(data =>{
      if(!data){
        res.status(404).send({message:err.message || "Eroare nu exista id!"})
      }else{
        res.send({message:"s-a sters cu succesc!"})
      }
    })
    .catch(err =>{
      res.status(500).send({message:err.message || "Eroare la stergere!"})
    })
}
