<template>
  <div class="container">

    <div class="bg-glow"></div>
    <div class="bg-glow2"></div>

      <h1>Bem-vindo</h1>
      <p>Digite seu nome para começar o quiz</p>

      <div class="campo">
        <input
          v-model="nome"
          @input="nomeDigitado = true"
          maxlength="25"
          placeholder="Seu nome..."
        />
        <small>{{ nome.length }}/25</small>
      </div>

      <button
        class="btn-play"
        :class="{ ativo: nome }"
        :disabled="!nome"
        @click="salvar"
      >
        Começar
      </button>

      <button class="btn-back" @click="$router.push('/')">
        Voltar
      </button>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      nome: "",
      nomeDigitado: false
    }
  },

  computed: {
  inicial() {
    return this.nome && this.nomeDigitado
      ? this.nome.charAt(0).toUpperCase()
      : "?"
  }
},

  mounted() {
    const salvo = localStorage.getItem("nome")
    if (salvo) this.nome = salvo
  },

  methods: {
    salvar() {
      localStorage.setItem("nome", this.nome)

      this.$router.push({
        path: "/perguntas",
        query: {
          nome: this.nome
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0c29, #302b63, #1e1b4b);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 20px;
}

/* GLOWS */
.bg-glow {
  position: absolute;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #a855f7, transparent 60%);
  top: -150px;
  right: -150px;
  filter: blur(120px);
  opacity: 0.5;
}

.bg-glow2 {
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #6366f1, transparent 60%);
  bottom: -150px;
  left: -150px;
  filter: blur(120px);
  opacity: 0.4;
}

/* CARD */
.card {
  width: 100%;
  max-width: 360px;
  padding: 35px 25px;
  border-radius: 28px;
  background: rgba(255,255,255,0.07);
  backdrop-filter: blur(25px);
  text-align: center;
  color: white;
  box-shadow: 0 25px 70px rgba(0,0,0,0.6);
  animation: fade 0.6s ease;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

/* TOPO */
.topo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.topo h1 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
}

.topo p {
  margin: 0;
  opacity: 0.7;
  font-size: 14px;
}

/* AVATAR */
.avatar {
  width: 85px;
  height: 85px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7c3aed, #6366f1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
  box-shadow: 0 0 30px rgba(124,58,237,0.6);
  transition: 0.3s;
}

.avatar:hover {
  transform: scale(1.08);
}

/* CAMPO */
.campo {
  width: 100%;
}

/* INPUT (AQUI FOI O PRINCIPAL FIX) */
.campo input {
  width: 100%;
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.08);
  color: white;
  font-size: 15px;
  outline: none;
  transition: 0.3s;
  box-sizing: border-box; /* 🔥 CORREÇÃO PRINCIPAL */
}

.campo input::placeholder {
  color: rgba(255,255,255,0.5);
}

.campo input:focus {
  background: rgba(255,255,255,0.15);
  border: 1px solid #7c3aed;
  box-shadow: 0 0 12px rgba(168,85,247,0.4);
}

/* CONTADOR */
small {
  display: block;
  margin-top: 6px;
  opacity: 0.6;
  font-size: 12px;
  text-align: right;
}

/* BOTÃO */
.btn-play {
  width: 100%;
  padding: 15px;
  border-radius: 50px;
  border: none;
  background: #555;
  color: white;
  font-size: 15px;
  font-weight: bold;
  transition: 0.3s;
}

.btn-play.ativo {
  background: linear-gradient(90deg, #7c3aed, #6366f1);
  box-shadow: 0 10px 30px rgba(124,58,237,0.6);
  cursor: pointer;
}

.btn-play.ativo:hover {
  transform: translateY(-2px) scale(1.04);
}

/* VOLTAR */
.btn-back {
  margin-top: 5px;
  background: none;
  border: none;
  color: #cbd5f5;
  cursor: pointer;
  font-size: 13px;
  transition: 0.2s;
}

.btn-back:hover {
  opacity: 0.7;
}

/* ANIMAÇÃO */
@keyframes fade {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
