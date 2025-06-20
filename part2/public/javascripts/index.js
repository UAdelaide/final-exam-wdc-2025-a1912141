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
            // error message
          } catch (e) {
            console.error("Auth Failed");
            this.errorMessage = "Auth Failed";
          }
        },
        // redirect func
        redirect(path) {
          window.location.href = path;
        },
        async logout() {
          try {
            await axios.post('/api/users/logout');
            window.location.href = '/';
          }
          catch (err) {
            console.error('Logout failed error:', err);
          }
        }
      }
    }).mount('#app');
