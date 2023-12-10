const maindiv = document.querySelector(".main");
const inp = document.querySelector(".inpbox input");
const clearbtn = document.querySelector(".inpbox ion-icon");
const setting = document.querySelector(".setting");
const settingbtn = document.querySelector(".settingbtn");
const closesetting = document.querySelector(".closesetting");
const sign = document.querySelector(".sign");
const signbtn = document.querySelector(".sign button");
const logout = document.querySelector(".logout");
const sendbtn = document.querySelector(".sendbtn");
const chatlist = document.querySelector(".list");
const pop = document.querySelector(".pop");
const notisound = new Audio('/noti')
let me,now;

const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    setInterval(() => {
        let hour = date.getHours();
        let minute = date.getMinutes();
        const ampm = hour >= 12 ? 'PM' : 'AM';
        let formattedhour = hour;
        if(formattedhour > 12){formattedhour -= 12;};
        if(formattedhour === 0){formattedhour = 12};
        let formattedMinutes = minute;
        if (minute < 10) {
        formattedMinutes = `0${minute}`;
        }
        now = `${formattedhour}:${formattedMinutes}${ampm} ${day}.${month}.${year}`;
    }, 5000);


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, GoogleAuthProvider ,signInWithPopup, signOut} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, onSnapshot, addDoc, serverTimestamp, orderBy, query } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD4o0vU_Gm4SEE2iGxf4kCJt9gHv9-BHbo",
    authDomain: "mongmao-b7af4.firebaseapp.com",
    projectId: "mongmao-b7af4",
    storageBucket: "mongmao-b7af4.appspot.com",
    messagingSenderId: "1079805513218",
    appId: "1:1079805513218:web:7f2d2033f89e5d0571a11b",
    measurementId: "G-11ECGVWWVS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fs = getFirestore(app);

const messageref = collection(fs,'messages');
const q = query(messageref,orderBy("timestamp","desc"));
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

onAuthStateChanged(auth,(user)=>{
    if(user){
        me = user;
        document.querySelector(".prof img").src = user.photoURL;
        document.querySelector(".prof h1").innerHTML = `${user.displayName}<span><ion-icon name="flash-outline"></ion-icon>${user.uid}</span>`;
        maindiv.style.display = 'flex';
        document.querySelector(".sign").remove();
    }else{
        sign.style.display = 'flex';
        document.querySelector(".main").remove();
    }
})

onSnapshot(q,(querySnapshot)=>{
    const list = [];
    chatlist.innerHTML = '';
    querySnapshot.forEach((doc)=>{
        const msg = doc.data();
        msg.id = doc.id;
        list.push(msg);        
    })
    let all = list.reverse()
    checknoti(all.length);
    all.forEach((msg)=>{
        if(msg.senderid == me.uid){
            chatlist.innerHTML += `<div class="line out">
                <div class="text"><p>${msg.text}</p><span><ion-icon name="time-outline"></ion-icon>${msg.time}</span></div>
                <img src="${msg.senderimg}" alt="">
            </div>`
        }else{
            chatlist.innerHTML += `<div class="line in">
                <img title="Message from ${msg.sendername}" src="${msg.senderimg}" alt="">
                <div class="text"><p>${msg.text}</p><span><ion-icon name="time-outline"></ion-icon>${msg.time}</span></div>
            </div>`;
        }
    })
})

function checknoti(num){
    let notinum = localStorage.getItem('notinum');
    if(notinum){
        if(num > notinum){
            notisound.play()
        }
    }else{
        localStorage.setItem('notinum',num);
    }
}

function checkdl(){
    var got = localStorage.getItem("dl");
    if(got){
        if(got == 'dark'){
            document.documentElement.style.setProperty("--color","#fff");
            document.documentElement.style.setProperty("--back","#333");
        }else{
            document.documentElement.style.setProperty("--color","#333");
            document.documentElement.style.setProperty("--back","#fff");
        }
    }else{
        localStorage.setItem("dl","light");
        document.documentElement.style.setProperty("--color","#333");
        document.documentElement.style.setProperty("--back","#fff");
    }
}
checkdl();

inp.onkeyup=()=>{
    if(inp.value.length>0){
        clearbtn.style.display = 'block';    
    }else{
        clearbtn.style.display = 'none';
    }
}

clearbtn.onclick=()=>{
    inp.value = '';
    clearbtn.style.display = 'none';
}
settingbtn.onclick=()=>{
    setting.style.right = 0;
}
closesetting.onclick=()=>{
    setting.style.right = '-369px';
}

sendbtn.onclick=()=>{
    if(inp.value.length>0){
        addDoc(messageref,{
            text:inp.value,
            sendername: me.displayName,
            senderimg:me.photoURL,
            senderid:me.uid,
            time:now,
            timestamp:serverTimestamp()
        })
        clearbtn.click();
    }
}

signbtn.onclick=()=>{
    signInWithPopup(auth,provider)
    .then((result)=>{
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        window.location.reload()
    })
    //signInWithRedirect(auth, provider);
}
logout.onclick=()=>{
    let ask = confirm("Are you sure to logout?");
    if(ask == true){
        signOut(auth).then(()=>{
            window.location.reload;
        })
    }else{

    }
}

document.querySelector('.dlbtn').onclick=()=>{
    var got = localStorage.getItem('dl');
    if(got == 'dark'){
        localStorage.setItem("dl","light");
        document.documentElement.style.setProperty("--color","#333");
        document.documentElement.style.setProperty("--back","#fff");
        checkdl() 
    }else{
        localStorage.setItem("dl","dark");
        document.documentElement.style.setProperty("--color","#fff");
        document.documentElement.style.setProperty("--back","#333");
        checkdl()
    }
}

document.querySelector(".share").onclick=()=>{
    navigator.share({
        title:"မိူင်းမၢဝ်း Mong Mao",
        url:window.location.href
    })
}
document.querySelector(".pop .div ion-icon").onclick=()=>{
    pop.style.display = 'none';
}
document.querySelector(".qrbtn").onclick=()=>{
    pop.style.display = 'flex';
}
document.querySelector(".pop .div img").src = 'http://maoapi.vercel.app/qrcode?text='+window.location.href;