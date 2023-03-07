<template>
  <div class="layout-login">
    <v-card>
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field
            v-model.trim="account"
            :error-messages="validateAccount"
            label="Email/phone"
            outlined
            required
            @input="$v.account.$touch()"
            @blur="$v.account.$touch()"
          ></v-text-field>
          <v-text-field
            v-model.trim="password"
            :error-messages="validatePassword"
            label="Password"
            outlined
            type="password"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          ></v-text-field>
          <v-btn type="submit" color="primary">Login</v-btn>
          <p>
            Don't have an account!
            <router-link color="deep-purple lighten-2" text to="/auth/register">
              Register now</router-link
            >
          </p>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'

export default {
  name: 'LoginPage',

  mixins: [validationMixin],

  layout: 'empty',

  middleware({ store, redirect }) {
    if (store.state.user.loggedIn) {
      return redirect('/')
    }
  },

  validations: {
    account: {
      required,
    },
    password: {
      required,
      minLength: minLength(8),
      specialCharacter() {
        if (!this.password) return true
        const regex = /[*@!#%&()^~{}]+/
        return regex.test(this.password)
      },
    },
  },

  data() {
    return {
      account: '',
      password: '',
    }
  },

  head() {
    return {
      title: 'Login',
    }
  },

  computed: {
    validateAccount() {
      const errors = []
      const isEmail = email(this.account)
      const isPhoneNumber = /^[0-9]{10,11}$/.test(this.account)
      if (!this.$v.account.$dirty) return errors

      if (!this.$v.account.required) {
        errors.push('E-mail/phone is required')
      }

      if (!isEmail && !isPhoneNumber) {
        errors.push(
          'Must be valid email or number phone and number phone have minimum length from 10 to max length 11'
        )
      }

      return errors
    },

    validatePassword() {
      const errors = []
      if (!this.$v.password.$dirty) return errors

      !this.$v.password.minLength &&
        errors.push('Password have minimum length is 8 characters.')

      !this.$v.password.required && errors.push('Password is required.')

      !this.$v.password.specialCharacter &&
        errors.push('Please use one special character in password.')

      return errors
    },
  },

  methods: {
    login() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return false
      }

      const listUser = localStorage.getItem('user')
      const account = this.account
      const password = this.password

      if (listUser) {
        const user = JSON.parse(listUser).filter(function (user) {
          return (
            ((user.email === account && user.password === password) ||
              (user.phoneNumber === account && user.password === password)) &&
            user
          )
        })

        if (user.length > 0) {
          this.$store.dispatch('user/setUserLogin', {
            loggedIn: true,
            username: user[0].username,
            email: user[0].email,
          })
          this.$toast.open({
            message: 'Login success!',
            type: 'success',
          })
          this.$router.push('/')
        }
      }
    },
  },
}
</script>

<style scoped>
.layout-login {
  max-width: 500px;
  margin: 50px auto;
}
</style>
