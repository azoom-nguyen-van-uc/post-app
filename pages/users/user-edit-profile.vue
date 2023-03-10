<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'

export default {
  name: 'EditProfilePage',

  mixins: [validationMixin],

  middleware: 'auth',

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
      dob: '',
      gender: '',
      showDatePicker: false,
    }
  },

  head() {
    return {
      title: 'Edit profile',
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
        dob: this.dob,
        gender: this.gender,
      }
      let listUser = localStorage.getItem('user')

      if (listUser || listUser !== undefined) {
        listUser = JSON.parse(listUser)
        listUser = listUser.map((users) => {
          if (
            users.phoneNumber === user.phoneNumber ||
            users.email === user.email
          ) {
            return Object.assign({}, users, user)
          } else {
            return users
          }
        })

        this.$toast.open({
          message: 'Update profile success',
          type: 'success',
        })
        this.$store.dispatch('user/setUserLogin', {
          loggedIn: true,
          username: this.username,
          email: this.email,
        })
        localStorage.setItem('user', JSON.stringify(listUser))
      } else {
        this.$toast.open({
          message: 'User not found',
          type: 'success',
        })
      }
    },
  },
}
</script>

<template>
  <div class="layout-login">
    <v-card>
      <v-card-title>Edit profile</v-card-title>
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

          <v-btn type="submit" color="primary">Save</v-btn>
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
