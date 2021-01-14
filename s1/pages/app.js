(function(){
    var firebaseConfig = {
        apiKey: "AIzaSyDP-AATubsk3i7MsQY0dGCmfqPLjnKkD0c",
        authDomain: "coffeeshop-af697.firebaseapp.com",
        databaseURL: "https://coffeeshop-af697.firebaseio.com",
        projectId: "coffeeshop-af697",
        storageBucket: "coffeeshop-af697.appspot.com",
        messagingSenderId: "965372833348",
        appId: "1:965372833348:web:32f77eb934932f0b895611",
        measurementId: "G-Q5Z9M35NGK"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();

    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnLogout');
    const userName = document.getElementById('userName');
    const btnSetName = document.getElementById('btnSetName');
    const welcomeScript = document.getElementById('welcome');

    // Add login event
    btnLogin.addEventListener('click', e=> {
        // Get email andd pass
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        // Sign In
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    btnSignUp.addEventListener('click', e=> {
        // Get email andd pass
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        // Sign In
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
    });

    btnSetName.addEventListener('click', e => {
        var user = firebase.auth().currentUser;
        user.updateProfile({displayName: userName.value}).then(function(){
            console.log(user.displayName);
            welcomeScript.innerHTML = "Welcome, "+user.displayName;
            localStorage.setItem("customerName", user.displayName);
        });
    });

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            // console.log('logged in');
            // console.log(firebaseUser.email);

            btnLogout.style.display = "block";
            userName.style.display = "block";
            btnSetName.style.display = "block";
            if (firebaseUser.displayName != null){
            welcomeScript.innerHTML = "Welcome, "+firebaseUser.displayName;
            localStorage.setItem("customerName", firebaseUser.displayName);
            }

        } else {
            // console.log('not logged in');
            btnLogout.style.display = "none";
            userName.style.display = "none";
            btnSetName.style.display = "none";
            welcomeScript.innerHTML = "Welcome, Customer";
            localStorage.setItem("customerName", "");
        }
    });
    
}());