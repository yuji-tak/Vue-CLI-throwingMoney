// firebaseモジュールの読み込み
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

if (!firebase.apps.length) {
    const config = {
        apiKey: "AIzaSyCb3fC91PO7IxExGut54Dkdu67f3wMD0Oo",
        authDomain: "vue-cli-throwingmoney.firebaseapp.com",
        databaseURL: "https://vue-cli-throwingmoney.firebaseio.com",
        projectId: "vue-cli-throwingmoney",
        storageBucket: "vue-cli-throwingmoney.appspot.com",
        messagingSenderId: "884745452100",
        appId: "1:884745452100:web:71028fdb85ea9bdaebda11"
    };
    firebase.initializeApp(config);
}
const db = firebase.firestore();

// コンポーネントから利用できるようにexport
export {
    firebase,
    db
}
