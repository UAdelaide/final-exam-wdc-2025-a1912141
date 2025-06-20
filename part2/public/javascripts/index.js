const { createApp } = Vue;
    createApp({
      data() {
        return {
          message: 'Welcome to the Dog Walking Service!',
          password: '',
          username: ''
        };
      },
      methods: {
        // method to handle login
        async login() {
          try {
            const res = await axios.post('/api/users/login', {
              username: this.username,
              password: this.password
            });

            // get role
            var role = res.data.user.role;
            // if role is owner, redirect to owner dash
            if (role === "owner") {
              this.redirect('/owner-dashboard.html');
              // otherwise redirect to owner dash
            } else {
              this.redirect('/walker-dashboard.html');
            }
          } catch (e) {
            console.error("Auth Failed");
            this.errorMessage = "Auth Failed";
          }
        },
        redirect(path) {
          window.location.href = path;
        }
      }
    }).mount('#app');
