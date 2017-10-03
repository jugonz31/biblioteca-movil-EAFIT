import * as firebase from 'firebase'
import RNFetchBlob from 'react-native-fetch-blob'
import { Platform } from 'react-native'

export default class Database {

  static createUser(firstname, lastname, email, password) {
    try {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
          res.updateProfile({
            displayName: (firstname + ' ' + lastname),
            photoURL: "https://firebasestorage.googleapis.com/v0/b/gurbia-79ddc.appspot.com/o/Profile%2Fplaceholder.png?alt=media&token=87da416d-ab29-4f6b-857f-c06a3618c11f"
          });
          firebase.database().ref('users/' + res.uid).set({
            username: (firstname + ' ' + lastname),
            email,
            photoURL: "https://firebasestorage.googleapis.com/v0/b/gurbia-79ddc.appspot.com/o/Profile%2Fplaceholder.png?alt=media&token=87da416d-ab29-4f6b-857f-c06a3618c11f",
            rate: 0,
            raters: 0
          });
        });
    } catch (error) {
      console.error(error);
    }
  }

  static async loginUser(email, password) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      return true;
    }
    catch (error) {
      alert(error.toString());
      return false;
    }
  }

  static uploadImage(uri, refFire, mime = 'application/octet-stream', ) {
    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      const sessionId = new Date().getTime()
      let uploadBlob = null
      const imageRef = firebase.storage().ref(refFire).child(`${sessionId}`)

      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          resolve(url)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static writePost(picture, title, description, location, portions, price) {
    this.uploadImage(picture, 'Food')
      .then(res => {
        var user = firebase.auth().currentUser;
        var newPostKey = firebase.database().ref().child('posts').push().key;
        var postData = {
          uid: user.uid,
          authorName: user.displayName,
          picture: res,
          title: title,
          description: description,
          location: location,
          portions: portions,
          price: price,
          subscribedUsers: {}
        };

        var updates = {};
        updates['posts/' + newPostKey] = postData;
        updates['user-posts/' + user.uid + '/' + newPostKey] = postData;

        firebase.database().ref().update(updates);
      })
  }

  static updateProfileFireBase(name, email, picture) {
    this.uploadImage(picture, 'Profile')
      .then(res => {
        try {
          var user = firebase.auth().currentUser;
          user.updateProfile({
            displayName: name,
            photoURL: res
          });
          user.updateEmail(email);
        }
        catch (error) {
          alert(error.toString());
        }
      });
  }

  static reviewPost(postAuthorUid, rate) {
    var refUsers = firebase.database().ref('users/' + postAuthorUid);
    refUsers.once('value').then(data => {
      var raters = data.val().raters;
      var rateD = data.val().rate;
      var avg = (rateD * raters + rate) / (raters + 1);
      refUsers.child('raters').set(raters + 1);
      refUsers.child('rate').set(avg);

    });
  }

  static getPost(postId) {
    return firebase.database().ref('posts/' + postId);
  }

  static async subscribeToPost(
    username, email,
    userUID, postKey, postAuthorUid) {
    var userData = {
      userName: username,
      email: email
    };
    var review = {
      postAuthorUid: postAuthorUid,
      postKey: postKey,
      rate: 0
    };
    var updates = {};
    updates['posts/' + postKey + '/subscribedUsers/' + userUID] = userData;
    updates['user-posts/' + postAuthorUid + '/'
      + postKey + '/subscribedUsers/' + userUID] = userData;
    updates['orders/' + userUID + '/' + postKey] = review;
    firebase.database().ref().update(updates);

    let response = await fetch('https://backgurbia.herokuapp.com/addLiked', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        postID: postKey,
        userID: userUID
      })
    }).catch(err => {
      console.error(err);
    });
  }


  static getPosts() {
    var posts = [];
    return new Promise((resolve, reject) => {
      firebase.database().ref('posts').limitToLast(20)
        .once('value').then((data) => {
          resolve(data.val());
        }).catch(error => {
          reject(error);
        })
    })
  }

  static getPost(postId) {
    return firebase.database().ref('posts/' + postId);
  }

  static getOrders() {
    var posts = [];
    let postArr = [];
    var user = firebase.auth().currentUser;
    return new Promise((resolve, reject) => {
      firebase.database().ref('orders/' + user.uid).limitToLast(20)
        .once('value').then(async (data) => {
          posts = data.val();
          for (var i in posts) {
            var a = await this.getPost(posts[i].postKey)
              .once('value').then(data => { return data.val() })
            postArr.push(a)
          }
          resolve(postArr);
        }).catch(error => {
          reject(error);
        })
    })
  }

  static async getPostsByKeys(keys) {
    var posts = [];
    console.log(keys);
    for (var i in keys) {
      console.log(keys[i])
      var post = await this.getPost(keys[i])
        .once('value').then(data => {
          console.log(data.val());
          return data.val();
        })
        .catch(err => {
          console.error(err);
        });
      posts.push(post);
    }
    return posts;
  }

  static getUserPosts() {
    var posts = [];
    var user = firebase.auth().currentUser;
    return new Promise((resolve, reject) => {
      firebase.database().ref('user-posts/' + user.uid).limitToLast(20)
        .once('value').then((data) => {
          resolve(data.val());
        }).catch(error => {
          reject(error);
        })
    })
  }

  static getRecommendedPosts() {
    let userUID = firebase.auth().currentUser.uid;
    return new Promise(async (resolve, reject) => {
      await fetch('https://backgurbia.herokuapp.com/getRecommendations', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          recs: 1,
          userID: userUID
        })
      })
        .then(res => {
          let posts = this.getPostsByKeys(JSON.parse(res._bodyText));
          resolve(posts)
        })
        .catch(err => {
          reject(err)
        });
    })
  }

  static getUser() {
    return firebase.auth().currentUser
  }

  static getUserRate(uid) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('users/' + uid)
        .once('value').then((data) => {
          resolve(data.val());
        }).catch(error => {
          reject(error);
        })
    })
  }
}
