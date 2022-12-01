<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    id="register"
    class="register"
  >
    <div class="content">
      <header class="header">
        <h1 class="title">{{ data.title }}</h1>
        <h2 class="subtitle">{{ data.subtitle }}</h2>
        <p class="description">{{ data.text }}</p>
        <p class="description big">{{ data.text2 }}</p>
        <p class="description big">{{ data.text3 }}</p>
      </header>

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
          <div class="checkbox">
            <div class="checkbox-title">
              <span>Escolha um curso ou mais:</span>
            </div>

            <div class="checkbox-line">
              <input
                id="eletronica"
                v-model="curso"
                type="checkbox"
                value="Introdução à eletrônica"
              >
              <label for="eletronica">Introdução à eletrônica</label>
            </div>

            <div class="checkbox-line">
              <input
                id="programacao"
                v-model="curso"
                type="checkbox"
                value="Introdução à programação"
              >
              <label for="programacao">Introdução à programação</label>
            </div>

            <div class="checkbox-line">
              <input
                id="hacking"
                v-model="curso"
                type="checkbox"
                value="Hacking, pentesting, servidores, etc."
              >
              <label for="hacking">Hacking, pentesting, servidores, etc.</label>
            </div>
          </div>

          <div class="checkbox">
            <div class="checkbox-title">
              <span>Escolha um dia/horário de interesse ou mais:</span>
            </div>

            <div class="checkbox-line">
              <input
                id="quinta"
                v-model="horario"
                type="checkbox"
                value="Quinta-feira, 19h-21h"
              >
              <label for="quinta">Quinta-feira, 19h-21h</label>
            </div>

            <div class="checkbox-line">
              <input
                id="sabado1"
                v-model="horario"
                type="checkbox"
                value="Sábado, 13h-15h"
              >
              <label for="sabado1">Sábado, 13h-15h</label>
            </div>

            <div class="checkbox-line">
              <input
                id="sabado2"
                v-model="horario"
                type="checkbox"
                value="Sábado, 16h-18h"
              >
              <label for="sabado2">Sábado, 16h-18h</label>
            </div>
          </div>

          <input
            id="nome"
            v-model="nome"
            class="input"
            type="text"
            name="nome"
            placeholder="Nome"
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
            id="bairro"
            v-model="bairro"
            class="input"
            type="text"
            name="bairro"
            placeholder="Bairro"
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
  name: 'RegisterComponent',
  directives: {
    mask,
    type
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      nome: '',
      telefone: '',
      curso: [],
      horario: [],
      bairro: '',
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
        errors.push('Nome é obrigatório.')
      }

      if (!this.telefone) {
        errors.push('Telefone é obrigatório.')
      }

      if (!this.horario.length) {
        errors.push('Dia/horário de interesse são obrigatórios.')
      }

      if (!this.curso.length) {
        errors.push('Escolher pelo menos um curso é obrigatório.')
      }

      if (!this.bairro) {
        errors.push('Bairro é obrigatório.')
      }

      if (!this.cidade) {
        errors.push('Cidade é obrigatório.')
      }

      if (errors.length) {
        this.errors = errors
        return
      }

      this.errors = []

      const data = {
        id: uuid(),
        nome: this.nome,
        telefone: this.telefone,
        horario: this.horario,
        curso: this.curso,
        bairro: this.bairro,
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
          this.success = 'Registrado com sucesso!'
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
.register {
  margin-bottom: 40px;
}

.header {
  margin-bottom: 40px;
}

.title,
.subtitle,
.description {
  font-family: Barlow, sans-serif;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
}

.title {
  color: #f2b132;
  font-size: 40px;
  margin-bottom: 10px;
}

@media (min-width: 1024px) {
  .title {
    font-size: 60px;
    margin-bottom: 20px;
  }
}

.subtitle {
  color: #c9922b;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 40px;
  text-align: center;
  text-transform: uppercase;
}

@media (min-width: 1024px) {
  .subtitle {
    font-size: 30px;
  }
}

.description {
  color: #fff;
  font-size: 18px;
  font-weight: 400;
  margin: 0 auto;
  max-width: 600px;
  text-align: left;
  text-transform: none;
}

.description.big {
  font-size: 20px;
  font-weight: 700;
}

@media (min-width: 1024px) {
  .description.big {
    font-size: 24px;
  }
}

.description:not(:last-child) {
  margin-bottom: 20px;
}

@media (min-width: 1024px) {
  .description {
    font-size: 22px;
  }
}

.errors {
  background-color: #ffe1e1;
  border-radius: 10px;
  margin: 0 auto 20px;
  max-width: 600px;
  padding: 10px;
}

@media (min-width: 1024px) {
  .errors {
    margin-bottom: 40px;
  }
}

.error {
  display: block;
  color: #f00;
  font-size: 14px;
  font-weight: 700;
  text-transform: none;
  text-align: left;
}

.error:not(:last-child) {
  margin-bottom: 5px;
}

@media (min-width: 1024px) {
  .error {
    font-size: 16px;
  }
}

.success {
  background-color: #e1ffe1;
  border-radius: 10px;
  margin: 0 auto 20px;
  max-width: 600px;
  padding: 10px;
}

.success .success-message {
  color: #005d06;
  display: block;
  font-size: 16px;
  font-weight: 700;
  padding: 20px;
  text-align: left;
  text-transform: none;
}

@media (min-width: 1024px) {
  .success .success-message {
    font-size: 18px;
  }
}

.form {
  margin: 0 auto;
  max-width: 600px;
  width: 100%;
}

.checkbox {
  margin: 0 0 20px;
}

.checkbox-line {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}

input[type="checkbox"] {
  height: 20px;
  margin-right: 10px;
  width: 20px;
  border: 3px solid #333
}

.checkbox-title {
  color: #fff;
  display: block;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
  text-align: left;
}

.checkbox:not(:last-child) {
  margin-bottom: 10px;
}

.checkbox label {
  display: inline-block;
  color: #fff;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 10px;
  text-align: left;
}

.form .input,
.form .dropdown {
  background-color: #fff;
  border-radius: 10px;
  border: 3px solid #333;
  box-shadow: 0 0 10px 0 #000;
  color: #000;
  display: block;
  font-family: Barlow, sans-serif;
  font-size: 18px;
  font-weight: 700;
  height: 50px;
  margin: 0 auto 10px;
  outline: none;
  padding: 10px;
  transition: all 0.3s ease;
  width: 100%;
}

.form .dropdown {
  color: #767676;
}

.form .input:focus,
.form .dropdown:focus {
  box-shadow: 0 0 10px 0 #463412;
  color: #000;
}

.form .button {
  background-color: #c9922b;
  border-radius: 10px;
  border: none;
  color: #000;
  display: block;
  font-family: Barlow, sans-serif;
  font-size: 18px;
  font-weight: 700;
  height: 50px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  width: 100%;
}

.form .button:hover {
  background-color: #ac8129;
  cursor: pointer;
}

@media (min-width: 1024px) {
  .form .button {
    margin: 0 auto;
    max-width: 200px;
  }
}

</style>
