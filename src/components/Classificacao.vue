<template>
  <div class="container">

    <!-- HEADER -->
    <div class="header">
      <h1> Ranking</h1>
      <p>Top jogadores do quiz</p>

      <button class="close" @click="$router.push('/')">✕</button>
    </div>

    <!-- LISTA -->
    <div class="lista">
      <div
        v-for="(jogador, i) in ranking"
        :key="i"
        class="card"
        :class="getClasse(i)"
      >

        <!-- POSIÇÃO -->
        <div class="posicao">
  <span v-if="getPosicao(i) === 1">🥇</span>
  <span v-else-if="getPosicao(i) === 2">🥈</span>
  <span v-else-if="getPosicao(i) === 3">🥉</span>
  <span v-else>{{ getPosicao(i) }}</span>
</div>

        <!-- INFO -->
        <div class="info">
          <h3>{{ jogador.nome }}</h3>
          <p>{{ jogador.data }}</p>

          <div class="stats">
            <span class="ok">✔ {{ jogador.acertos }}</span>
            <span class="erro">✖ {{ jogador.erros }}</span>
          </div>
        </div>

        <!-- PONTOS -->
        <div class="pontos">
          {{ jogador.pontos }}
          <span>pts</span>
        </div>

      </div>
    </div>

    <!-- FOOTER -->
    <div class="footer">
      <div>
        <h2>{{ ranking.length }}</h2>
        <p>Total</p>
      </div>

      <div>
        <h2>{{ media }}</h2>
        <p>Média</p>
      </div>

      <div>
        <h2>{{ melhor }}</h2>
        <p>Recorde</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      ranking: []
    }
  },

  mounted() {
    const dados = JSON.parse(localStorage.getItem("ranking")) || []

    // ORDENAÇÃO CORRETA
    this.ranking = dados.sort((a, b) => {
      if (b.acertos !== a.acertos) {
        return b.acertos - a.acertos
      }
      return b.pontos - a.pontos
    })
  },

  computed: {
    media() {
      if (!this.ranking.length) return 0
      const total = this.ranking.reduce((acc, j) => acc + j.pontos, 0)
      return (total / this.ranking.length).toFixed(1)
    },

    melhor() {
      if (!this.ranking.length) return 0
      return Math.max(...this.ranking.map(j => j.acertos))
    }
  },

  methods: {
    // ✅ POSIÇÃO CORRETA (COM EMPATE)
    getPosicao(index) {
      if (index === 0) return 1

      const atual = this.ranking[index]
      const anterior = this.ranking[index - 1]

      if (
        atual.acertos === anterior.acertos &&
        atual.pontos === anterior.pontos
      ) {
        return this.getPosicao(index - 1)
      }

      return index + 1
    },

    getClasse(i) {
      const pos = this.getPosicao(i)

      if (pos === 1) return "gold"
      if (pos === 2) return "silver"
      if (pos === 3) return "bronze"
      return ""
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: linear-gradient(160deg, #0f0c29, #302b63, #1e1b4b);
  color: white;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
}

/* HEADER */
.header {
  position: relative;
  margin-bottom: 25px;
}

.header h1 {
  margin: 0;
  font-size: 2rem;
}

.header p {
  opacity: 0.7;
}

.close {
  position: absolute;
  right: 0;
  top: 0;
  background: rgba(255,255,255,0.1);
  border-radius: 50%;
  width: 35px;
  height: 35px;
  border: none;
  color: white;
  cursor: pointer;
}

/* LISTA */
.lista {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* CARD */
.card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 18px;
  border-radius: 18px;
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(15px);
  transition: 0.3s;
  border: 1px solid rgba(255,255,255,0.08);
}

.card:hover {
  transform: translateY(-4px) scale(1.02);
}

.card:hover {
  transform: translateY(-3px) scale(1.02);
}

/* POSIÇÃO */
.posicao {
  min-width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

/* INFO */
.info {
  flex: 1;
  text-align: left;
}

.info h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.info p {
  margin: 2px 0;
  font-size: 12px;
  opacity: 0.6;
}

.stats {
  font-size: 13px;
  margin-top: 5px;
}

.ok {
  color: #22c55e;
  margin-right: 8px;
}

.erro {
  color: #ef4444;
}

/* PONTOS */
.pontos {
  font-size: 1.5rem;
  font-weight: bold;
  color: #a855f7;
}

.pontos span {
  font-size: 0.8rem;
  opacity: 0.7;
}

/* TOP 3 */
.gold {
  border: 2px solid gold;
  box-shadow: 0 0 20px gold;
  transform: scale(1.03);
}

.silver {
  border: 2px solid silver;
}

.bronze {
  border: 2px solid #cd7f32;
}

/* FOOTER */
.footer {
  margin-top: 25px;
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(12px);
  border-radius: 18px;
  padding: 15px;
  display: flex;
  justify-content: space-around;
  text-align: center;
}

.footer h2 {
  margin: 0;
}
.numero {
  font-weight: bold;
  opacity: 0.7;
}
</style>