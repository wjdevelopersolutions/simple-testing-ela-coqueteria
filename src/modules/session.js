
const postLoginBtn = document.querySelector('#post-login-btn');
const postLogOutBtn = document.querySelector('#log-out-btn');


if( postLoginBtn ) {


    postLoginBtn.addEventListener('click', () => {


        fetch('http://localhost:3000/api/v1/auth/login', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log(res);
            return res.json();
        })
        .catch(err => console.log(err))
        .then(response => {
            console.log(response);  
        })
        
    
    })
}

if(postLogOutBtn) {

    postLogOutBtn.addEventListener('click', () => {

            fetch('http://localhost:3000/api/v1/auth/logout', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                console.log(res);
                return res.json();
            })
            .catch(err => console.log(err))
            .then(response => {
                console.log(response);  
            });

    });
}