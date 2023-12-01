import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  resultado: string = "0";
  memoria: string = "";
  verifica_zero: boolean = true;
  operador_inserido: boolean = false;
  is_segundo_elemento: boolean = false;
  primeiro_elemento: string = "";
  segundo_elemento: string = "";
  operador: string = "";
  is_novo_calculo: boolean = false;


  constructor() { }

  digitos(valor: string) {
    if (valor === '.' && ((this.is_segundo_elemento && this.segundo_elemento.includes('.')) || (!this.is_segundo_elemento && this.primeiro_elemento.includes('.')))) {
      return;
    }
    if (this.is_novo_calculo) {
      this.resetar();
    }
    if (this.verifica_zero && valor !== '.') {
      this.resultado = valor;
      this.verifica_zero = false;
    } else {
      this.resultado += valor;
    }
    if (this.is_segundo_elemento) {
      this.segundo_elemento += valor;
    } else {
      this.primeiro_elemento += valor;
    }
  }

  operadores(operador: string) {
    if (this.verifica_zero == false) {
      if (this.operador_inserido) {
        this.calcular();
        this.primeiro_elemento = this.resultado;
        this.segundo_elemento = "";
      } else {
        this.primeiro_elemento = this.resultado;
      }
      this.resultado += operador;
      this.operador_inserido = true;
      this.operador = operador;
      this.is_segundo_elemento = true;
    }
  }
  
  calcular() {
    if (this.operador && this.segundo_elemento !== "") {
      // realiza o cálculo
      const primeiro = parseFloat(this.primeiro_elemento.replace(',', '.'));
      const segundo = parseFloat(this.segundo_elemento.replace(',', '.'));

      let resultadoCalculado: number | string = 0;
      switch (this.operador) {
        case "+":
          resultadoCalculado = primeiro + segundo
          break;

        case "-":
          resultadoCalculado = primeiro - segundo
          break;

        case "x":
          resultadoCalculado = primeiro * segundo
          break;

        case "÷":
          resultadoCalculado = primeiro / segundo
          break;

        case "%":
          resultadoCalculado = (primeiro * segundo) / 100
          break;
        default:
          break;
      }

      this.resultado = resultadoCalculado.toString().replace('.', ',');
    
        // Substituir pontos por vírgulas na exibição para o usuário
        const mostrarPrimeiro = this.primeiro_elemento.replace('.', ',');
        const mostrarSegundo = this.segundo_elemento.replace('.', ',');
        const mostrarResultado = this.resultado.replace('.', ',');
      
        this.memoria = `${mostrarPrimeiro} ${this.operador} ${mostrarSegundo} = ${mostrarResultado}`;
    }
  }

  potenciacao() {
    this.resultado = (Math.pow(parseFloat(this.primeiro_elemento), parseFloat(this.segundo_elemento))).toFixed(2);
    this.memoria = this.primeiro_elemento + "^" + this.segundo_elemento + "=" + this.resultado;
  }

  resetar() {
    this.resultado = "0";
    this.memoria = "";
    this.verifica_zero = true;
    this.operador_inserido = false;
    this.is_segundo_elemento = false;
    this.primeiro_elemento = "";
    this.segundo_elemento = "";
    this.operador = "";
    this.is_novo_calculo = false;
  }

  raiz() {
    let primeiroNumero = parseFloat(this.resultado);
    if (!isNaN(primeiroNumero) && primeiroNumero >= 0) {
      this.resultado = Math.sqrt(primeiroNumero).toFixed(2);
      this.memoria = `√ ${this.primeiro_elemento} = ${this.resultado}`;
    } else {
      alert("Entrada inválida para a raiz quadrada");
    }
  }

  porcentagem() {
    this.resultado = ((parseFloat(this.primeiro_elemento) * parseFloat(this.segundo_elemento)) / 100).toFixed(2);
    this.memoria = this.primeiro_elemento + "%" + this.segundo_elemento + "=" + this.resultado;
  }

  decimal() {
    if (!this.resultado.includes(',')) {
      this.resultado += ',';
      this.verifica_zero = false;
    }
  }

  apagar() {
    this.resultado = "0";
    this.verifica_zero = true;
  }
}
