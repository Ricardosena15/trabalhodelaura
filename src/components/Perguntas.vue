<template>
  <div class="container">

    <!-- QUIZ -->
    <div v-if="!finalizado" class="quiz-card">

      <div class="top">
        <h2> Quiz de Matemática</h2>
        <p>Pergunta {{ index + 1 }} de {{ perguntas.length }}</p>
      </div>

      <div class="pergunta">
        {{ perguntas[index]?.texto }}
      </div>

      <div class="opcoes">
        <button
          v-for="(op, i) in perguntas[index]?.opcoes"
          :key="i"
          class="opcao"
          :class="respostaSelecionada === i ? 'selecionada' : ''"
          @click="responder(i)"
        >
          {{ op }}
        </button>
      </div>

    </div>

  </div>
</template>

<script>
import Swal from "sweetalert2"

export default {
  name: "Perguntas",

  data() {
    return {
      index: 0,
      pontos: 0,
      finalizado: false,
      respostaSelecionada: null,
      nome: "",

      perguntas: [
  {
    texto: "Uma PA tem primeiro termo igual a 3 e razão igual a 5. Qual é o 6º termo?",
    opcoes: ["A) 23", "B) 25", "C) 28", "D) 30"],
    correta: 2,
    explicacao: "Fórmula: aₙ = a₁ + (n-1)·r → a₆ = 3 + (6-1)·5 = 3 + 25 = 28"
  },
  {
    texto: "A soma dos 5 primeiros termos de uma PA é 60. Sabendo que o primeiro termo é 4, qual é a razão?",
    opcoes: ["A) 2", "B) 4", "C) 6", "D) 8"],
    correta: 1,
    explicacao: "Sₙ = n(a₁ + aₙ)/2 → 60 = 5(4 + a₅)/2 → 60 = (5/2)(4 + a₅). Resolvendo, encontramos a₅ = 20. Agora: a₅ = a₁ + 4r → 20 = 4 + 4r → r = 4"
  },
  {
    texto: "Dada a função f(x) = 2x + 3, qual é o valor de f(4)?",
    opcoes: ["A) 8", "B) 10", "C) 11", "D) 13"],
    correta: 2,
    explicacao: "Substituindo: f(4) = 2·4 + 3 = 8 + 3 = 11"
  },
  {
    texto: "Uma função afim tem gráfico crescente e passa pelos pontos (0,2) e (2,6). Qual é a lei da função?",
    opcoes: ["A) F(X) = X + 2", "B) F(X) = 2X + 2", "C) F(X) = 3X + 2", "D) F(X) = 4X + 2"],
    correta: 1,
    explicacao: "Coeficiente angular: a = (6 - 2)/(2 - 0) = 4/2 = 2. Como passa por (0,2), então b = 2. Logo: f(x) = 2x + 2"
  },
  {
    texto: "Uma sequência segue a lei f(x) = 3x + 1, onde x ∈ N. Essa sequência é uma PA. Qual é a razão dessa PA?",
    opcoes: ["A) 1", "B) 2", "C) 3", "D) 4"],
    correta: 2,
    explicacao: "A razão de uma PA é a diferença entre termos consecutivos. f(x+1) - f(x) = [3(x+1)+1] - (3x+1) = 3. Logo, a razão é 3"
  },
  {
    texto: "Uma função afim f(x) = ax + b satisfaz as condições: f(2) = 7 e f(4) = 11. Qual é a expressão dessa função?",
    opcoes: ["A) f(x) = 2x + 3", "B) f(x) = x + 5", "C) f(x) = 3x + 1", "D) f(x) = 2x + 1"],
    correta: 0,
    explicacao: "Sistema: 2a + b = 7 e 4a + b = 11. Subtraindo: (4a+b)-(2a+b)=11-7 → 2a=4 → a=2. Substituindo: 2·2 + b = 7 → b=3. Logo: f(x)=2x+3"
  }
]
    }
  },

  mounted() {
    const nomeSalvo = localStorage.getItem("nome")
    if (nomeSalvo) this.nome = nomeSalvo
  },

  methods: {
    responder(i) {
      const correta = this.perguntas[this.index].correta
      this.respostaSelecionada = i

      if (i === correta) {
  this.pontos++

  Swal.fire({
    icon: 'success',
    title: 'Acertou!',
    timer: 800,
    showConfirmButton: false
  }).then(() => {
    this.proxima()
  })

} else {
  Swal.fire({
    icon: 'error',
    title: 'Errou!',
    html: `
      <p><strong>Resposta correta:</strong> ${this.perguntas[this.index].opcoes[correta]}</p>
      <div style="margin-top:10px; padding:10px; background:#0f172a; border-radius:8px;">
        ${this.perguntas[this.index].explicacao}
      </div>
    `,
    confirmButtonText: 'Próxima'
  }).then(() => {
    this.proxima()
  })
}

    proxima() {
      this.respostaSelecionada = null

      if (this.index < this.perguntas.length - 1) {
        this.index++
      } else {
        this.finalizado = true

        const ranking = JSON.parse(localStorage.getItem("ranking")) || []

        ranking.push({
          nome: this.nome || "Jogador",
          pontos: this.pontos,
          acertos: this.pontos,
          erros: this.perguntas.length - this.pontos,
          data: new Date().toLocaleString()
        })

        localStorage.setItem("ranking", JSON.stringify(ranking))

        Swal.fire({
          icon: 'info',
          title: 'Fim do Quiz',
          text: `${this.nome}, você fez ${this.pontos} pontos`,
          timer: 1500,
          showConfirmButton: false
        })

        setTimeout(() => {
          this.$router.push("/Classificacao")
        }, 1500)
      }
    },

    reiniciar() {
      this.index = 0
      this.pontos = 0
      this.finalizado = false
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0f172a;
  color: white;
  font-family: Arial;
}

.quiz-card {
  width: 90%;
  max-width: 500px;
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(15px);
  padding: 25px;
  border-radius: 18px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.4);
}

.top p {
  opacity: 0.7;
}

.pergunta {
  font-size: 1.4rem;
  margin: 20px 0;
  font-weight: bold;
}

.opcoes {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.opcao {
  padding: 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background: rgba(255,255,255,0.08);
  color: white;
  transition: 0.3s;
}

.opcao:hover {
  transform: scale(1.03);
  background: rgba(56,189,248,0.3);
}

.selecionada {
  background: #38bdf8;
  color: black;
  font-weight: bold;
}
</style>
