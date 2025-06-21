const { createApp } = Vue;
    createApp({
      data() {
        return {
          message: 'Welcome to the Dog Walking Service!',
          password: '',
          username: '',
          dogs: [],
          loading: false
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
        // functions for dog table
        // fetch data
        async doggo_data() {
          try {
            const res = await axios.get('/api/walks/dogs');
            return res.data;
          } catch (error) {
            console.error("doggo data not available");
            return [];
          }
        },
        // get random image
        async doggo_image() {
          this.loading = true;
          try {
            const res = await axios.get("https://dog.ceo/api/breeds/image/random");
            return res.data.message;
          } catch (error) {
            console.error("cant get doggo image");
            return '';
          }
        },
        // combine data and image
        async combine_dogs() {
          try {
            const res = await this.doggo_data();
            this.dogs = [];

            for (const dog of res) {

              const p = await this.doggo_image();

              this.dogs.push({
                ...dog,
                img: p
              });
            }
          } catch (error) {
            console.error("Can't load my doggo", error);
          } finally {
            this.loading = false;
          }
        }
      },
      mounted() {
        this.combine_dogs();
      }
    }).mount('#app');
