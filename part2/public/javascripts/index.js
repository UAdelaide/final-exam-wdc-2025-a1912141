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
        async login() {
          try {
            const res = await axios.post('/api/users/login', {
              username: this.username,
              password: this.password
            });

            var role = res.data.user.role;
            if (role === "owner") {
              this.redirect('/owner');
            } else {
              this.redirect('/walker');
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
