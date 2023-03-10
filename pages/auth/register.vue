<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'

export default {
  name: 'RegisterPage',

  mixins: [validationMixin],

  layout: 'empty',

  middleware({ store, redirect }) {
    if (store.state.user.loggedIn) {
      return redirect('/')
    }
  },

  validations: {
    username: {
      required,
      minLength: minLength(3),
    },
    email: {
      required,
    },
    phoneNumber: {
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
    cfPassword: {
      required,
    },
    dob: {
      required,
      dateMaxValue() {
        const maxDate = new Date(this.dob)
        const today = new Date()
        return maxDate < today || !maxDate
      },
    },
    gender: {
      required,
    },
  },

  data() {
    return {
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      cfPassword: '',
      dob: '',
      gender: '',
      showDatePicker: false,
    }
  },

  head() {
    return {
      title: 'Register',
    }
  },

  computed: {
    validateUsername() {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.minLength &&
        errors.push('Username have minimum length is 3 characters.')
      !this.$v.username.required && errors.push('Username is required.')
      return errors
    },
    validateEmail() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !email(this.email) && errors.push('Email invalidate.')
      !this.$v.email.required && errors.push('Email is required.')

      return errors
    },
    validatePhoneNumber() {
      const errors = []
      const isPhoneNumber = /^[0-9]{10,11}$/.test(this.phoneNumber)
      if (!this.$v.phoneNumber.$dirty) return errors

      !this.$v.phoneNumber.required && errors.push('E-mail/phone is required')

      if (!isPhoneNumber) {
        errors.push(
          'Must be valid number phone and number phone have minimum length from 10 to max length 11'
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
    validateCfPassword() {
      const errors = []
      if (!this.$v.cfPassword.$dirty) return errors

      !this.$v.cfPassword.required &&
        errors.push('Confirm password is required.')

      this.$v.cfPassword.$model !== this.$v.password.$model &&
        errors.push('Password and password confirming are not the same')

      return errors
    },
    validateDoB() {
      const errors = []
      if (!this.$v.dob.$dirty) return errors

      !this.$v.dob.dateMaxValue &&
        errors.push('Date of birthday is not correct.')

      if (!this.$v.dob.required) errors.push('Date is required.')

      return errors
    },
    validateGender() {
      const errors = []
      if (!this.$v.gender.$dirty) return errors

      !this.$v.gender.$model && errors.push('Gender is required.')

      return errors
    },
  },

  methods: {
    register() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return false
      }

      const user = {
        username: this.username,
        email: this.email,
        phoneNumber: this.phoneNumber,
        password: this.password,
        cfPassword: this.cfPassword,
        dob: this.dob,
        gender: this.gender,
      }
      let listUser = localStorage.getItem('user')

      if (listUser === null || listUser === 'undefined') {
        localStorage.setItem('user', JSON.stringify([user]))
        this.$toast.open({
          message: 'Register success!',
          type: 'success',
        })
        this.$store.dispatch('user/setUserLogin', {
          loggedIn: true,
          username: this.username,
          email: this.email,
        })

        this.$router.push('/')
        return
      }

      listUser = JSON.parse(listUser)
      listUser.push(user)
      localStorage.setItem('user', JSON.stringify(listUser))

      this.$toast.open({
        message: 'Register success!',
        type: 'success',
      })
      this.$store.dispatch('user/setUserLogin', {
        loggedIn: true,
        username: this.username,
        email: this.email,
      })

      this.$router.push('/')
    },
  },
}
</script>

<template>
  <div class="layout-login">
    <v-card>
      <v-card-title>Register</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="register">
          <v-text-field
            v-model.trim="username"
            :error-messages="validateUsername"
            label="Username"
            outlined
            required
            @input="$v.username.$touch()"
            @blur="$v.username.$touch()"
          ></v-text-field>
          <v-text-field
            v-model.trim="email"
            :error-messages="validateEmail"
            label="Email"
            outlined
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>
          <v-text-field
            v-model.trim="phoneNumber"
            :error-messages="validatePhoneNumber"
            label="Phone number"
            outlined
            required
            @input="$v.phoneNumber.$touch()"
            @blur="$v.phoneNumber.$touch()"
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
          <v-text-field
            v-model.trim="cfPassword"
            :error-messages="validateCfPassword"
            label="Confirm Password"
            outlined
            type="password"
            @input="$v.cfPassword.$touch()"
            @blur="$v.cfPassword.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="dob"
            :error-messages="validateDoB"
            label="Date"
            readonly
            outlined
            @blur="$v.dob.$touch()"
            @click="showDatePicker = true"
          >
            <template #append>
              <v-btn icon @click="showDatePicker = true">
                <v-icon>mdi-calendar</v-icon>
              </v-btn>
            </template>
          </v-text-field>
          <v-row justify="center">
            <v-date-picker
              v-if="showDatePicker"
              v-model="dob"
              @input="showDatePicker = false"
            ></v-date-picker>
          </v-row>
          <v-radio-group v-model="gender" :error-messages="validateGender" row>
            <v-radio label="Male" :value="'male'"></v-radio>
            <v-radio label="Female" :value="'female'"></v-radio>
          </v-radio-group>
          <v-btn type="submit" color="primary">Register</v-btn>
          <p>
            Already have an account!
            <router-link color="primary" to="/auth/login">
              Login now</router-link
            >
          </p>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
.layout-login {
  max-width: 500px;
  margin: 50px auto;
}
</style>
