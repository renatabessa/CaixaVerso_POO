const botaoAdicionar = document.getElementById("btn_form");
const formularioCadastro = document.getElementById("cadastro-form");
const cardapioArea = document.querySelector(".cardapio-area");

const produtos = [];

class Produto {
  constructor(id, nome, descricao, preco, categoria) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.preco = preco;
    this.categoria = categoria;
    //this.imagem = imagem; // Adicionei a propriedade de imagem, mas ainda não está sendo usada
  }
}
// Recuperar produtos do localStorage ao carregar a página

window.onload = () => {
  recuperarProdutos();
  exibirProdutos();
};

function recuperarProdutos() {
  const produtosArmazenados = localStorage.getItem("produtos");
  if (produtosArmazenados) {
    const lista = JSON.parse(produtosArmazenados);
    lista.forEach((p) => (p.preco = parseFloat(p.preco))); // força conversão
    produtos.push(...lista);
  }
}

console.log(produtos); //apenas para verificar se os produtos estão sendo recuperados corretamente, depois dele funcionar, pode ser removido

// Adicionatr produto ao cardápio

botaoAdicionar.addEventListener("click", (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const descricao = document.getElementById("descricao").value;
  const preco = parseFloat(document.getElementById("preco").value);
  const categoria = document.getElementById("categoria").value;
  //const imagemInput = document.getElementById("imagem");
  //const imagem = imagemInput.files[0]; // Obtém o arquivo de imagem selecionado

  const id = Date.now(); // Gera um ID único para o produto

  cadastrarProduto(new Produto(id, nome, descricao, preco, categoria));
  console.log(nome, descricao, preco, categoria);
  armazenarProdutos();
  exibirProdutos();
  limparFormulario();
});

function cadastrarProduto(produto) {
  produtos.push(produto);
  console.log(produtos);
}

function armazenarProdutos() {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}

function exibirProdutos() {
  cardapioArea.innerHTML = "";
  produtos.forEach((produto) => {
    const card = document.createElement("li");
    card.classList.add("cardapio-card");
    card.innerHTML = `
            <img class="imagem-card" src="assets/massa-italiana-penne.jpg" alt="${produto.nome}">
            <h3 class="titulo-card">${produto.nome}</h3>
            <p class="descricao-card">${produto.descricao}</p>
            <div class="footer-card">      
                <button class="btn-card" data-id="${produto.id}">Remover</button>
                <p class="preco-card">R$ ${produto.preco.toFixed(2)}</p>
            </div>
        `;
    cardapioArea.appendChild(card);
  });
}

function limparFormulario() {
  document.getElementById("nome").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("preco").value = "";
  document.getElementById("categoria").value = "Selecione a categoria";
  //document.getElementById("imagem").value = ""; // Limpa o campo de imagem
}

//remover produto do cardápio

cardapioArea.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("btn-card")) {
    const id = evento.target.getAttribute("data-id");
    removerProduto(id);
    console.log("click ok" + id);
  }
});

function removerProduto(id) {
  const index = produtos.findIndex((produto) => produto.id === Number(id));
  console.log("index encontrado: " + index);    
  if (index !== -1) {
    produtos.splice(index, 1);
  }
  armazenarProdutos();
  exibirProdutos();
}
