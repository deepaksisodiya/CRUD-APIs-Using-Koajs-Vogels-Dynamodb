/**
 * Created by deepaksisodiya on 17/05/16.
 */


import model from './model';

export const createUser = function *() {
  console.log('name ', this.request.body);
  this.body = yield create(model, this.request.body);
};

export const getUsers = function *() {
  this.body = yield getAllUsers(model);
};

export const getUser = function *() {
  this.body = yield getSingleUser(model, this.params.userId);
};

export const deleteUser = function *() {
  this.body = yield deleteSingleUser(model, this.params.userId);
};

export const updateUser = function *() {
  let data = Object.assign({}, {userId:this.params.userId}, this.request.body);
  this.body = yield updateSingleUser(model, data);
};

const create = (model, data) => {
  return new Promise((resolve, reject) => {
    model.create(data, (err, user) => {
      if(err) {
        reject(new Error('error in creating the user'))
      }
      resolve(user)
    });
  });
};

const getAllUsers = (model) => {
  return new Promise((resolve, reject) => {
    model.scan().exec((err, users) => {
      if(err) {
        reject(new Error('error in getting the users'))
      }
      resolve(users.Items);
    });
  });
};

const getSingleUser = (model, userId) => {
  return new Promise((resolve, reject) => {
    model.get({userId: userId}, (err, user) => {
      if(err) {
        reject(new Error('Error in getting the user'));
      }
      resolve(user);
    });
  });
};

const deleteSingleUser = (model, userId) => {
  return new Promise((resolve, reject) => {
    model.destroy({userId: userId}, (err) => {
      if(err) {
        reject(new Error('Error in deleting the user'));
      }
      resolve('User deleted successfully');
    });
  });
};

const updateSingleUser = (model, data) => {
  return new Promise((resolve, reject) => {
    model.update(data, (err, user) => {
      if(err) {
        reject(new Error('error in updating the user'));
      }
      resolve(user);
    });
  });
};