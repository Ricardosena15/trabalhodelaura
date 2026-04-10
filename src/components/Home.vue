<template>
  <div class="container">

  <!-- 🔥 PARTÍCULAS ALGÉBRICAS -->
  <div class="particles">
    <span v-for="n in 20" :key="n" class="particle">
      {{ simbolos[Math.floor(Math.random() * simbolos.length)] }}
    </span>
  </div>

  <h1 class="title">Quiz <span>Álgebra</span></h1>

  <p class="subtitle">
    Teste sua lógica e desafie seus conhecimentos em matemática
  </p>

  <button class="btn play" @click="jogar">
    Jogar agora
  </button>

  <button class="btn secondary" @click="config">
    Classificação
  </button>

</div>
</template>

<script>
export default {
  data() {
    return {
      simbolos: ["+", "-", "×", "÷", "=", "√", "x²", "π", "∆"]
    }
  },
  methods: {
    jogar() {
      this.$router.push("/Configuracao")
    },
    config() {
      this.$router.push("/Classificacao")
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: radial-gradient(circle at top, #6d28d9, #1e1b4b);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  padding: 20px;
}

/* TÍTULO */
.title {
  font-size: 2.8rem;
  margin-top: 20px;
  font-weight: 700;
  letter-spacing: 1px;
  animation: pulseTitle 2s ease-in-out infinite;
}

.title span {
  background: linear-gradient(90deg, #a855f7, #6366f1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* SUBTÍTULO */
.subtitle {
  opacity: 0.75;
  max-width: 320px;
  margin: 15px 0 35px;
  font-weight: 300;
  line-height: 1.5;
}

/* BOTÕES */
.btn {
  width: 260px;
  padding: 15px;
  border-radius: 40px;
  border: none;
  margin: 10px;
  font-size: 1.05rem;
  cursor: pointer;
  font-weight: 600;
  transition: 0.3s;
}

/* BOTÃO PRINCIPAL */
.play {
  background: linear-gradient(90deg, #a855f7, #6366f1);
  color: white;
  box-shadow: 0 10px 25px rgba(99,102,241,0.5);
}

.play:hover {
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 15px 35px rgba(99,102,241,0.7);
}

/* BOTÃO SECUNDÁRIO */
.secondary {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.2);
  color: white;
  backdrop-filter: blur(10px);
}

.secondary:hover {
  background: rgba(255,255,255,0.1);
  transform: scale(1.03);
}
.particles {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  color: rgba(255,255,255,0.15);
  font-size: 20px;
  animation: float 10s linear infinite;
}

/* posições aleatórias */
.particle:nth-child(odd) {
  left: 20%;
  animation-duration: 12s;
}

.particle:nth-child(even) {
  left: 70%;
  animation-duration: 15s;
}

.particle:nth-child(3n) {
  left: 40%;
  font-size: 28px;
}
@keyframes float {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: translateY(-10vh) rotate(360deg);
    opacity: 0;
  }
}

@keyframes pulseTitle {
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
}


@keyframes glow {
  from {
    box-shadow: 0 0 20px rgba(168,85,247,0.5);
  }
  to {
    box-shadow: 0 0 40px rgba(168,85,247,1);
  }
}
</style>
