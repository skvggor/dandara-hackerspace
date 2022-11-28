<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    id="lead"
    class="lead"
  >
    <div class="content">
      <div class="form-container">
        <div
          v-if="errors.length > 0"
          class="errors"
        >
          <span
            v-for="(error, index) in errors"
            :key="index"
            class="error"
          >
            {{ error }}
          </span>
        </div>

        <div
          v-if="success"
          class="success"
        >
          <span
            class="success-message"
            v-html="success"
          />
        </div>

        <form
          v-if="!success"
          class="form"
          @submit.prevent="submit"
        >
          <input
            id="nome"
            v-model="nome"
            class="input"
            type="text"
            name="nome"
            placeholder="Nome"
          >

          <input
            id="email"
            v-model="email"
            class="input"
            type="text"
            name="email"
            placeholder="E-mail"
          >

          <input
            id="telefone"
            v-model="telefone"
            v-mask="['(##) #####-####', '(##) ####-####']"
            class="input"
            type="tel"
            name="telefone"
            placeholder="Telefone"
          >

          <input
            id="cidade"
            v-model="cidade"
            class="input"
            type="text"
            name="cidade"
            placeholder="Cidade"
          >

          <button
            type="submit"
            class="button"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { uuid } from 'uuidv4'
import Firebase from 'firebase/app'
import { mask, type } from 'vue-the-mask'

require('firebase/firestore')

export default {
  name: 'LeadComponent',
  directives: {
    mask,
    type
  },
  data () {
    return {
      nome: '',
      email: '',
      telefone: '',
      cidade: '',
      errors: [],
      success: '',
      db: null
    }
  },
  computed: {
    projectId () {
      return this.$config.PROJECT_ID
    },
  },
  mounted () {
    // let db = null

    console.log('---->', this.projectId)

    if (!Firebase.apps.length) {
      this.db = Firebase.initializeApp({
        projectId: this.projectId,
      })
        .firestore()
    } else {
      this.db = Firebase.app()
    }
  },
  methods: {
    submit () {
      const errors = []

      if (!this.nome) {
        errors.push('Nome é obrigatório')
      }

      if (!this.email || !this.email.includes('@')) {
        errors.push('E-mail é obrigatório')
      }

      if (!this.telefone) {
        errors.push('Telefone é obrigatório')
      }

      if (!this.cidade) {
        errors.push('Cidade é obrigatório')
      }

      if (errors.length) {
        this.errors = errors
        return
      }

      this.errors = []

      const data = {
        leadId: uuid(),
        nome: this.nome,
        email: this.email,
        telefone: this.telefone,
        cidade: this.cidade,
        createdAt: new Date().toLocaleString('pt-BR'),
      }

      this.saveData(data)
    },
    saveData (data) {
      this.success = 'Enviando...'

      this.db.collection('cadastros')
        .add(data)

        .then(() => {
          this.success = 'Enviado com sucesso!'
        })

        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error)
        })
    }
  }
}
</script>

<style>
.header {
  color: #fff;
  font-family: Barlow, sans-serif;
  font-weight: 700;
  margin-bottom: 20px;
}

.text {
  color: #ccc;
  font-family: Barlow, sans-serif;
  font-weight: 400;
}
</style>
